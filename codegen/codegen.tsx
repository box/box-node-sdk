//
// NOTE https://ts-ast-viewer.com/
//

import * as fs from 'fs/promises';
import { camelCase, upperFirst } from 'lodash';
import * as path from 'path';
import * as ts from 'typescript';
import {
	isOpenAPIReference,
	OpenAPI,
	OpenAPIPathItem,
	OpenAPIReference,
	OpenAPISchema,
} from './openapi';
import {
	BinaryExpression,
	Block,
	CallExpression,
	ClassDeclaration,
	ConstructorDeclaration,
	ExportAssignment,
	Identifier,
	ImportClause,
	ImportDeclaration,
	InterfaceDeclaration,
	JSDocComment,
	JSDocParameterTag,
	JSDocReturnTag,
	MethodDeclaration,
	Null,
	ObjectLiteralExpression,
	ParameterDeclaration,
	PropertyAccessExpression,
	PropertyAssignment,
	PropertyDeclaration,
	PropertySignature,
	ReturnStatement,
	StringLiteral,
	This,
	TypeLiteralNode,
	TypeReferenceNode,
	VariableDeclaration,
	VariableDeclarationList,
	VariableStatement,
} from './ts-factory';

export function createJsxElement(
	type: (...args: any[]) => ts.Node,
	props?: Record<string, any>,
	...children: any[]
): ts.Node {
	return type(props || {}, ...children);
}

function getIdentifierForSchemaName(name: string): ts.Identifier {
	return <Identifier text={upperFirst(camelCase(name))} />;
}

function createTypeNodeForSchema({
	spec,
	schema,
}: {
	spec: OpenAPI;
	schema: OpenAPISchema | OpenAPIReference;
}): ts.TypeNode {
	if (isOpenAPIReference(schema)) {
		const { $ref } = schema;

		const parts = $ref.match(/^#\/components\/schemas\/([\w-]+)$/);
		if (!parts) {
			throw new Error(`Invalid reference in schema: ${$ref}`);
		}

		const refSchemaName = parts[1];
		return (
			<TypeReferenceNode typeName={getIdentifierForSchemaName(refSchemaName)} />
		);
	}

	if (schema.allOf) {
		// TODO better support for allOf
		return createTypeNodeForSchema({ spec, schema: schema.allOf[0] });
	}

	const { type } = schema;
	switch (type) {
		case 'string':
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);

		case 'number':
		case 'integer':
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);

		case 'object':
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword);

		case 'boolean':
			return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);

		case 'null':
			return ts.factory.createLiteralTypeNode(<Null />);

		case 'array':
			const { items } = schema;
			if (!items) {
				throw new Error(`Missing items for type array in the schema`);
			}
			return ts.factory.createArrayTypeNode(
				createTypeNodeForSchema({ spec, schema: items })
			);
		default:
			console.log(1, schema);
			throw new Error(`Invalid schema type: ${type}`);
	}
}

function createMethodForOperation({
	spec,
	pathKey,
	verb,
}: {
	spec: OpenAPI;
	pathKey: keyof OpenAPI['paths'];
	verb: ('get' | 'post') & keyof OpenAPIPathItem;
}): [ts.JSDoc, ts.MethodDeclaration] {
	const pathItem = spec.paths[pathKey][verb]!;
	const parameters = pathItem.parameters || [];
	const isOptionsRequired = parameters.some((parameter) => parameter.required);
	const returnType = (
		<TypeReferenceNode typeName={<Identifier text="Promise" />}>
			{ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword)}
		</TypeReferenceNode>
	);

	const bodySchema = pathItem.requestBody?.content['application/json']?.schema;
	const bodyId = <Identifier text="body" />;

	return [
		<JSDocComment
			comment={[pathItem.summary, pathItem.description]
				.filter(Boolean)
				.join('\n\n')}
		>
			{bodySchema && (
				<JSDocParameterTag
					name={bodyId}
					typeExpression={ts.factory.createJSDocTypeExpression(
						createTypeNodeForSchema({ spec, schema: bodySchema })
					)}
				/>
			)}
			<JSDocParameterTag
				name={<Identifier text="options" />}
				isBracketed={!isOptionsRequired}
				typeExpression={ts.factory.createJSDocTypeExpression(
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword)
				)}
			/>
			{parameters.map((parameter) => (
				<JSDocParameterTag
					name={<Identifier text={`options.${parameter.name}`} />}
					isBracketed={!parameter.required}
					typeExpression={ts.factory.createJSDocTypeExpression(
						createTypeNodeForSchema({
							spec,
							schema: parameter.schema,
						})
					)}
					comment={parameter.description.replace(/\s+/g, ' ')}
				/>
			))}
			<JSDocParameterTag
				name={<Identifier text="callback" />}
				isBracketed
				typeExpression={ts.factory.createJSDocTypeExpression(
					ts.factory.createTypeReferenceNode(
						ts.factory.createIdentifier('Function')
					)
				)}
				comment="Passed the result if succesful, error otherwise"
			/>
			<JSDocReturnTag
				typeExpression={ts.factory.createJSDocTypeExpression(returnType)}
				comment="A promise resolving to the result or rejecting with an error"
			/>
		</JSDocComment>,
		<MethodDeclaration
			name={pathItem.operationId}
			parameters={[
				bodySchema && (
					<ParameterDeclaration
						name={bodyId}
						type={createTypeNodeForSchema({ spec, schema: bodySchema })}
					/>
				),
				<ParameterDeclaration
					name="options"
					questionToken={!isOptionsRequired}
					type={
						<TypeLiteralNode>
							{parameters
								.map((parameter) => [
									<JSDocComment comment={parameter.description} />,
									<PropertySignature
										name={parameter.name}
										modifiers={[
											ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword),
										]}
										questionToken={!parameter.required}
										type={createTypeNodeForSchema({
											spec,
											schema: parameter.schema,
										})}
									/>,
								])
								.flat()}
						</TypeLiteralNode>
					}
				/>,
				<ParameterDeclaration
					name="callback"
					questionToken
					type={<TypeReferenceNode typeName="Function" />}
				/>,
			].filter(Boolean)}
			type={returnType}
		>
			<Block multiLine>
				<VariableStatement
					declarationList={
						<VariableDeclarationList flags={ts.NodeFlags.Const}>
							<VariableDeclaration
								name="apiPath"
								initializer={
									<CallExpression
										expression={<Identifier text="urlPath" />}
										argumentsArray={pathKey
											.split('/')
											.filter(Boolean)
											.map((part) => {
												if (/^{.+}$/.test(part)) {
													const param = parameters.find(
														(parameter) => `{${parameter.name}}` === part
													);
													if (!param) {
														throw new Error(
															`Uknown param ${part} in path ${pathKey}.`
														);
													}

													if (param.in !== 'path') {
														throw new Error(
															`Expected param ${part} to be in path not ${param.in}.`
														);
													}

													return (
														<PropertyAccessExpression
															expression={<Identifier text="options" />}
															name={<Identifier text={param.name} />}
														/>
													);
												}

												return <StringLiteral text={part} />;
											})}
									/>
								}
							/>
							<VariableDeclaration
								name="params"
								initializer={
									<ObjectLiteralExpression multiLine>
										<PropertyAssignment
											name="qs"
											initializer={<Identifier text="options" />}
										/>
									</ObjectLiteralExpression>
								}
							/>
						</VariableDeclarationList>
					}
				/>
				<ReturnStatement>
					<CallExpression
						expression={
							<CallExpression
								expression={
									<PropertyAccessExpression
										expression={
											<PropertyAccessExpression
												expression={<This />}
												name="client"
											/>
										}
										name="wrapWithDefaultHandler"
									/>
								}
								argumentsArray={[
									<PropertyAccessExpression
										expression={
											<PropertyAccessExpression
												expression={<This />}
												name="client"
											/>
										}
										name={verb}
									/>,
								]}
							/>
						}
						argumentsArray={[
							<Identifier text="apiPath" />,
							<Identifier text="params" />,
							<Identifier text="callback" />,
						]}
					/>
				</ReturnStatement>
			</Block>
		</MethodDeclaration>,
	];
}

function createClassForOperations({
	spec,
	operationIds,
}: {
	spec: OpenAPI;
	operationIds: string[];
}): [ts.JSDoc, ts.ClassDeclaration] {
	const clientId = <Identifier text="client" />;

	return [
		<JSDocComment comment="Class for API access" />,
		<ClassDeclaration name="SignRequests">
			<PropertyDeclaration
				name={clientId}
				type={<TypeReferenceNode typeName="BoxClient" />}
			/>
			<ConstructorDeclaration
				parameters={[
					<ParameterDeclaration
						name={clientId}
						type={<TypeReferenceNode typeName="BoxClient" />}
					/>,
				]}
			>
				<Block multiLine>
					<BinaryExpression
						left={
							<PropertyAccessExpression expression={<This />} name={clientId} />
						}
						operator={ts.factory.createToken(ts.SyntaxKind.EqualsToken)}
						right={clientId}
					/>
				</Block>
			</ConstructorDeclaration>
			{operationIds
				.map((operationId) => {
					for (const [pathKey, pathItem] of Object.entries(spec.paths)) {
						for (const verb of ['get', 'post'] as const) {
							if (pathItem[verb]?.operationId === operationId) {
								return createMethodForOperation({
									spec,
									pathKey,
									verb,
								});
							}
						}
					}

					throw new Error(`Operation "${operationId}" not found in the spec`);
				})
				.flat()}
		</ClassDeclaration>,
	];
}

function createInterfaceForSchema({
	spec,
	name,
}: {
	spec: OpenAPI;
	name: string;
}): [ts.JSDoc, ts.InterfaceDeclaration] {
	const schema = spec.components?.schemas?.[name];
	if (!schema) {
		throw new Error(`Missing schema ${name} to create an interface`);
	}

	if (isOpenAPIReference(schema)) {
		throw new Error(`Reference in schema ${name} is not supported`);
	}

	return [
		<JSDocComment
			comment={[schema.title, schema.description].filter(Boolean).join('\n\n')}
		/>,
		<InterfaceDeclaration name={getIdentifierForSchemaName(name)}>
			{Object.entries(schema.properties || {})
				.map(([key, property]) => {
					if (isOpenAPIReference(property)) {
						return null; // TODO fixme
					}

					return [
						<JSDocComment
							comment={[
								property.description,
								property.example && `Example: ${property.example}`,
								property.default && `@default ${property.default}`,
							]
								.filter(Boolean)
								.join('\n')}
						/>,
						<PropertySignature
							name={key}
							type={createTypeNodeForSchema({ spec, schema: property })}
						/>,
					];
				})
				.flat()}
		</InterfaceDeclaration>,
	];
}

export async function generate(specPath: string) {
	const spec = require(specPath);

	const resultFile = ts.createSourceFile(
		'someFileName.ts',
		'',
		ts.ScriptTarget.Latest,
		/*setParentNodes*/ false,
		ts.ScriptKind.TS
	);
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
	const result = printer.printList(
		ts.ListFormat.MultiLine,
		ts.factory.createNodeArray([
			<ImportDeclaration
				moduleSpecifier={<StringLiteral text="../box-client" />}
				importClause={<ImportClause name={<Identifier text="BoxClient" />} />}
			/>,
			<ImportDeclaration
				moduleSpecifier={<StringLiteral text="../util/url-path" />}
				importClause={<ImportClause name={<Identifier text="urlPath" />} />}
			/>,
			...createClassForOperations({
				spec,
				operationIds: [
					'get_sign_requests_id',
					'get_sign_requests',
					'post_sign_requests',
					'post_sign_requests_id_cancel',
					'post_sign_requests_id_resend',
				],
			}),
			// TODO: save interfaces into separate files under src/schemas/
			// To make the PR smaller we can now only include the schemas that are used in the sign request
			...createInterfaceForSchema({ spec, name: 'SignRequestCreateRequest' }),
			<ExportAssignment
				isExportEquals
				expression={<Identifier text="SignRequests" />}
			/>,
		]),
		resultFile
	);

	await fs.writeFile(
		path.join(__dirname, '../src/managers/sign-requests.ts'),
		result
	);

	console.log(result);
}

(async () => {
	try {
		await generate('../openapi.json');
	} catch (e) {
		console.error(e);
	}
})();
