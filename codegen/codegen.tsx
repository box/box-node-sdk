//
// NOTE https://ts-ast-viewer.com/
//

import * as fs from 'fs/promises';
import * as path from 'path';
import * as ts from 'typescript';
import type { OpenAPI, OpenAPIPathItem, OpenAPISchema } from './openapi';
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

function createTypeNodeForSchema({
	spec,
	schema,
}: {
	spec: OpenAPI;
	schema: OpenAPISchema;
}) {
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
		default:
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

	return [
		<JSDocComment
			comment={[pathItem.summary, pathItem.description]
				.filter(Boolean)
				.join('\n')}
		>
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
				<ParameterDeclaration
					name="options"
					questionToken={!isOptionsRequired}
					type={
						<TypeLiteralNode
							members={parameters
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
						/>
					}
				/>,
				<ParameterDeclaration
					name="callback"
					questionToken
					type={<TypeReferenceNode typeName="Function" />}
				/>,
			]}
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
}) {
	const clientId = <Identifier text="client" />;

	return (
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
		</ClassDeclaration>
	);
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
			createClassForOperations({
				spec,
				operationIds: [
					'get_sign_requests_id',
					'get_sign_requests',
					'post_sign_requests',
					'post_sign_requests_id_cancel',
					'post_sign_requests_id_resend',
				],
			}),
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
