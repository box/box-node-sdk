//
// NOTE https://ts-ast-viewer.com/
//

import * as fs from 'fs/promises';
import { camelCase, kebabCase, merge, upperFirst } from 'lodash';
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
	ExportDeclaration,
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
	VariableStatement,
} from './ts-factory';

const SCHEMAS_RELATIVE_PATH = '../src/schemas';

export function createJsxElement(
	type: (...args: any[]) => ts.Node,
	props?: Record<string, any>,
	...children: any[]
): ts.Node {
	return type(props || {}, ...children);
}

export function createJsxFragment(props: void, ...children: any[]) {
	return children.flat().filter(Boolean);
}

function getIdentifierForSchemaName(name: string): ts.Identifier {
	return <Identifier text={upperFirst(camelCase(name))} />;
}

function getIdentifierForSchemaRef(ref: string): ts.Identifier {
	const parts = ref.match(/^#\/components\/schemas\/([\w-]+)$/);
	if (!parts) {
		throw new Error(`Invalid reference in schema: ${ref}`);
	}
	const name = parts[1];
	return getIdentifierForSchemaName(name);
}

function compressSchema(schema: OpenAPISchema | OpenAPIReference) {
	const { allOf, anyOf, oneOf } = schema as OpenAPISchema;
	if (anyOf || oneOf) {
		throw new Error('anyOf and oneOf in schema definition are not supported');
	}

	// TODO add better support for allOf
	allOf?.forEach((item) => merge(schema, item));
}

function createTypeNodeForSchema({
	spec,
	schema,
}: {
	spec: OpenAPI;
	schema: OpenAPISchema | OpenAPIReference;
}): ts.TypeNode {
	compressSchema(schema);

	if (isOpenAPIReference(schema)) {
		return (
			<TypeReferenceNode
				typeName={ts.factory.createQualifiedName(
					<Identifier text="schemas" />,
					getIdentifierForSchemaRef(schema.$ref)
				)}
			/>
		);
	}

	const { enum: schemaEnum } = schema;
	if (schemaEnum) {
		return ts.factory.createUnionTypeNode(
			schemaEnum
				.map((enumVal) => {
					switch (typeof enumVal) {
						case 'string':
							return ts.factory.createStringLiteral(enumVal);

						case 'number':
							return ts.factory.createNumericLiteral(enumVal);

						default:
							throw new Error(
								`Invalid enum value: ${schemaEnum}. Expecting string or number`
							);
					}
				})
				.map((literal) => ts.factory.createLiteralTypeNode(literal))
		);
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
			throw new Error(`Invalid schema type: ${type}`);
	}
}

function createMethodForOperation({
	spec,
	pathKey,
	verb,
	name,
}: {
	spec: OpenAPI;
	pathKey: keyof OpenAPI['paths'];
	verb: ('get' | 'post' | 'put' | 'delete') & keyof OpenAPIPathItem;
	name?: string;
}): ts.Node[] {
	const pathItem = spec.paths[pathKey][verb]!;
	const parameters = pathItem.parameters || [];
	const isOptionsRequired = parameters.some((parameter) => parameter.required);
	const returnTypeSchema = (
		pathItem.responses?.['200'] ?? pathItem.responses?.['201']
	)?.content?.['application/json']?.schema;
	const returnType = (
		<TypeReferenceNode typeName={<Identifier text="Promise" />}>
			{returnTypeSchema
				? createTypeNodeForSchema({
						spec,
						schema: returnTypeSchema,
				  })
				: ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword)}
		</TypeReferenceNode>
	);

	const bodySchema = pathItem.requestBody?.content['application/json']?.schema;
	const bodyId = <Identifier text="body" />;

	return (
		<>
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
					comment="Options for the request"
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
			</JSDocComment>
			<MethodDeclaration
				name={name || pathItem.operationId}
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
												ts.factory.createModifier(
													ts.SyntaxKind.ReadonlyKeyword
												),
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
					<VariableStatement flags={ts.NodeFlags.Const}>
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
														`Unknown param ${part} in path ${pathKey}.`
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
									{bodySchema && (
										<PropertyAssignment
											name="body"
											initializer={<Identifier text="body" />}
										/>
									)}
								</ObjectLiteralExpression>
							}
						/>
					</VariableStatement>
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
			</MethodDeclaration>
		</>
	);
}

function createClassForOperations({
	spec,
	name,
	operations,
	comment,
}: {
	spec: OpenAPI;
	name: string;
	operations: Array<{
		name: string;
		operationId: string;
	}>;
	comment?: string;
}): ts.Node[] {
	const clientId = <Identifier text="client" />;

	return (
		<>
			<JSDocComment comment={comment} />
			<ClassDeclaration name={name}>
				<PropertyDeclaration
					name={clientId}
					type={<TypeReferenceNode typeName="BoxClient" />}
				/>
				<JSDocComment>
					<JSDocParameterTag
						name={<Identifier text="client" />}
						typeExpression={ts.factory.createJSDocTypeExpression(
							<TypeReferenceNode typeName="BoxClient" />
						)}
						comment="The Box API Client that is responsible for making calls to the API"
					/>
				</JSDocComment>
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
								<PropertyAccessExpression
									expression={<This />}
									name={clientId}
								/>
							}
							operator={ts.factory.createToken(ts.SyntaxKind.EqualsToken)}
							right={clientId}
						/>
					</Block>
				</ConstructorDeclaration>
				{operations
					.map(({ operationId, name }) => {
						for (const [pathKey, pathItem] of Object.entries(spec.paths)) {
							for (const verb of ['get', 'post', 'put', 'delete'] as const) {
								if (pathItem[verb]?.operationId === operationId) {
									return createMethodForOperation({
										spec,
										pathKey,
										verb,
										name: name,
									});
								}
							}
						}

						throw new Error(`Operation "${operationId}" not found in the spec`);
					})
					.flat()}
			</ClassDeclaration>
		</>
	);
}

function createInterfaceForSchema({
	spec,
	name,
	addSerialization = false,
}: {
	spec: OpenAPI;
	name: string;
	addSerialization?: boolean;
}): ts.Node[] {
	const schema = spec.components?.schemas?.[name] as OpenAPISchema &
		OpenAPIReference;
	if (!schema) {
		throw new Error(`Missing schema ${name} to create an interface`);
	}

	compressSchema(schema);

	if (schema.type !== 'object') {
		throw new Error(`Expecting ${name} to be an object schema`);
	}

	const id = getIdentifierForSchemaName(name);
	const { properties = {}, required = [] } = schema;

	const valueId = <Identifier text="value" />;
	const dataId = <Identifier text="data" />;

	const convertPropName = camelCase;

	const PropAssignmentCall = ({
		key,
		schemaId,
		name,
		argumentsArray,
	}: {
		key: string;
		schemaId: ts.Identifier;
		name: string;
		argumentsArray?: ts.Expression[];
	}) => (
		<PropertyAssignment
			name={key}
			initializer={
				<CallExpression
					expression={
						<PropertyAccessExpression
							expression={
								<PropertyAccessExpression
									expression={<Identifier text="schemas" />}
									name={schemaId}
								/>
							}
							name={name}
						/>
					}
					argumentsArray={argumentsArray}
				/>
			}
		/>
	);

	const comment = [schema.title, schema.description]
		.filter(Boolean)
		.join('\n\n');

	return (
		<>
			<ImportDeclaration
				importClause={
					<ImportClause
						namedBindings={ts.factory.createNamespaceImport(
							<Identifier text="schemas" />
						)}
					/>
				}
				moduleSpecifier={<StringLiteral text="." />}
			/>
			{addSerialization && (
				<ImportDeclaration
					importClause={
						<ImportClause
							namedBindings={ts.factory.createNamedImports([
								ts.factory.createImportSpecifier(
									undefined,
									<Identifier text="Serializable" />
								),
							])}
						/>
					}
					moduleSpecifier={<StringLiteral text="../util/serializable" />}
				/>
			)}
			{comment && <JSDocComment comment={comment} />}
			<InterfaceDeclaration
				name={id}
				modifiers={[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)]}
				heritageClauses={
					schema.$ref
						? [
								ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
									ts.factory.createExpressionWithTypeArguments(
										<PropertyAccessExpression
											expression={<Identifier text="schemas" />}
											name={getIdentifierForSchemaRef(schema.$ref)}
										/>,
										undefined
									),
								]),
						  ]
						: []
				}
			>
				{Object.entries(properties)
					.map(([key, property]) => {
						compressSchema(property);
						const propSchema = property as OpenAPISchema;

						const comment = [
							propSchema.description,
							propSchema.example && `Example: ${propSchema.example}`,
							propSchema.default && `@default ${propSchema.default}`,
						]
							.filter(Boolean)
							.join('\n');

						return [
							comment && <JSDocComment comment={comment} />,
							<PropertySignature
								name={addSerialization ? convertPropName(key) : key}
								questionToken={
									![
										...required,
										...((schema.$ref &&
											(
												spec.components?.schemas?.[
													getIdentifierForSchemaRef(schema.$ref).text
												] as OpenAPISchema
											)?.required) ||
											[]),
									].includes(key)
								}
								type={createTypeNodeForSchema({ spec, schema: property })}
							/>,
						];
					})
					.flat()
					.filter(Boolean)}
			</InterfaceDeclaration>
			{addSerialization && (
				<VariableStatement
					modifiers={[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)]}
					flags={ts.NodeFlags.Const}
				>
					<VariableDeclaration
						name={id}
						initializer={ts.factory.createNewExpression(
							<Identifier text="Serializable" />,
							undefined,
							[
								<ObjectLiteralExpression multiLine>
									<MethodDeclaration
										name="serialize"
										parameters={[
											<ParameterDeclaration
												name={valueId}
												type={<TypeReferenceNode typeName={id} />}
											/>,
										]}
									>
										<Block multiLine>
											<ReturnStatement>
												<ObjectLiteralExpression multiLine>
													{Object.entries(properties).map(([key, property]) => {
														compressSchema(property);

														const propAccessExpr: ts.PropertyAccessExpression =
															(
																<PropertyAccessExpression
																	expression={valueId}
																	name={convertPropName(key)}
																/>
															);

														if (isOpenAPIReference(property)) {
															return (
																<PropAssignmentCall
																	key={key}
																	name="serialize"
																	schemaId={getIdentifierForSchemaRef(
																		property.$ref
																	)}
																	argumentsArray={[propAccessExpr]}
																/>
															);
														}

														const { type } = property;

														if (!type) {
															console.log(`Missing type for ${key}`, property);
															return;
														}
														switch (type) {
															case 'string':
															case 'number':
															case 'integer':
															case 'boolean':
																return (
																	<PropertyAssignment
																		name={key}
																		initializer={propAccessExpr}
																	/>
																);

															case 'array':
																const { items } = property;
																if (!items) {
																	throw new Error(
																		`Missing items for type array in the schema`
																	);
																}
																if (isOpenAPIReference(items)) {
																	return (
																		<PropAssignmentCall
																			key={key}
																			name="serializeArray"
																			schemaId={getIdentifierForSchemaRef(
																				items.$ref
																			)}
																			argumentsArray={[propAccessExpr]}
																		/>
																	);
																}

																throw new Error(
																	`Type ${items.type} not supported in array property ${key}`
																);

															case 'object':
															case 'null':
															default:
																throw new Error(`Invalid schema type: ${type}`);
														}
													})}
												</ObjectLiteralExpression>
											</ReturnStatement>
										</Block>
									</MethodDeclaration>
									<MethodDeclaration
										name="deserialize"
										parameters={[
											<ParameterDeclaration
												name={dataId}
												type={ts.factory.createKeywordTypeNode(
													ts.SyntaxKind.AnyKeyword
												)}
											/>,
										]}
										type={<TypeReferenceNode typeName={id} />}
									>
										<Block multiLine>
											<ReturnStatement>
												<ObjectLiteralExpression multiLine>
													{Object.entries(properties).map(([key, property]) => {
														compressSchema(property);

														const propAccessExpr: ts.PropertyAccessExpression =
															(
																<PropertyAccessExpression
																	expression={dataId}
																	name={key}
																/>
															);

														if (isOpenAPIReference(property)) {
															return (
																<PropAssignmentCall
																	key={convertPropName(key)}
																	name="deserialize"
																	schemaId={getIdentifierForSchemaRef(
																		property.$ref
																	)}
																	argumentsArray={[propAccessExpr]}
																/>
															);
														}

														const { type } = property;

														if (!type) {
															console.log(`Missing type for ${key}`, property);
															return;
														}
														switch (type) {
															case 'string':
															case 'number':
															case 'integer':
															case 'boolean':
																return (
																	<PropertyAssignment
																		name={convertPropName(key)}
																		initializer={propAccessExpr}
																	/>
																);

															case 'array':
																const { items } = property;
																if (!items) {
																	throw new Error(
																		`Missing items for type array in the schema`
																	);
																}
																if (isOpenAPIReference(items)) {
																	return (
																		<PropAssignmentCall
																			key={convertPropName(key)}
																			name="deserializeArray"
																			schemaId={getIdentifierForSchemaRef(
																				items.$ref
																			)}
																			argumentsArray={[propAccessExpr]}
																		/>
																	);
																}

																throw new Error(
																	`Type ${items.type} not supported in array property ${key}`
																);

															case 'object':
															case 'null':
															default:
																throw new Error(`Invalid schema type: ${type}`);
														}
													})}
												</ObjectLiteralExpression>
											</ReturnStatement>
										</Block>
									</MethodDeclaration>
								</ObjectLiteralExpression>,
							]
						)}
					/>
				</VariableStatement>
			)}
		</>
	);
}

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

// TODO add Prettier phase
export async function writeNodesToFile({
	fullPath,
	nodes,
	languageVersion = ts.ScriptTarget.Latest,
}: {
	fullPath: string;
	nodes: readonly ts.Node[];
	languageVersion?: ts.ScriptTarget;
}) {
	const fileName = path.basename(fullPath);
	const data = printer.printList(
		ts.ListFormat.MultiLine,
		ts.factory.createNodeArray(nodes),
		ts.createSourceFile(fileName, '', languageVersion)
	);
	await fs.writeFile(fullPath, data);
}

export async function generateInterfacesForSchema({
	spec,
	names,
}: {
	spec: OpenAPI;
	names: string[];
}) {
	const schemasDirPath = path.join(__dirname, SCHEMAS_RELATIVE_PATH);
	// make sure the target directory exisits
	await fs.mkdir(schemasDirPath, { recursive: true });

	const indexExports: ts.ExportDeclaration[] = [];

	for (const name of names) {
		const schema = spec.components?.schemas?.[name];
		if (!schema) {
			throw new Error(`Missing schema ${name} in the OpenAPI spec`);
		}

		const { text: interfaceName } = getIdentifierForSchemaName(name);
		const baseFileName = `${kebabCase(interfaceName)}.generated`;
		const fileName = `${baseFileName}.ts`;

		await writeNodesToFile({
			fullPath: path.join(schemasDirPath, fileName),
			nodes: createInterfaceForSchema({ spec, name }),
		});

		indexExports.push(
			<ExportDeclaration
				moduleSpecifier={<StringLiteral text={`./${baseFileName}`} />}
			/>
		);
	}

	// write index for schemas with exports
	await writeNodesToFile({
		fullPath: path.join(schemasDirPath, 'index.ts'),
		nodes: indexExports,
	});
}

export async function generateManagerClass({
	name,
	comment,
	relativePath,
	spec,
	interfaceNames,
	operations,
}: {
	name: string;
	comment: string;
	relativePath: string;
	spec: OpenAPI;
	interfaceNames?: string[];
	operations: Array<{
		name: string;
		operationId: string;
	}>;
}) {
	if (interfaceNames) {
		await generateInterfacesForSchema({
			spec,
			names: interfaceNames,
		});
	}

	const fullPath = path.join(__dirname, relativePath);

	await writeNodesToFile({
		fullPath,
		nodes: (
			<>
				<ImportDeclaration
					moduleSpecifier={<StringLiteral text="../box-client" />}
					importClause={<ImportClause name={<Identifier text="BoxClient" />} />}
				/>
				<ImportDeclaration
					moduleSpecifier={<StringLiteral text="../util/url-path" />}
					importClause={<ImportClause name={<Identifier text="urlPath" />} />}
				/>
				<ImportDeclaration
					importClause={
						<ImportClause
							namedBindings={ts.factory.createNamespaceImport(
								<Identifier text="schemas" />
							)}
						/>
					}
					moduleSpecifier={
						<StringLiteral
							text={path.relative(
								path.dirname(fullPath),
								path.join(__dirname, SCHEMAS_RELATIVE_PATH)
							)}
						/>
					}
				/>
				{createClassForOperations({
					spec,
					name,
					comment,
					operations,
				})}
				<ExportAssignment
					isExportEquals
					expression={<Identifier text={name} />}
				/>
			</>
		),
	});
}

(async () => {
	try {
		const spec = require('../openapi.json');
		await generateManagerClass({
			name: 'SignRequestsManager', // avoid name clash with SignRequests schema
			comment:
				'Simple manager for interacting with all Sign Requests endpoints and actions.',
			relativePath: '../src/managers/sign-requests.generated.ts',
			spec,
			operations: [
				{
					name: 'getById',
					operationId: 'get_sign_requests_id',
				},
				{
					name: 'getAll',
					operationId: 'get_sign_requests',
				},
				{
					name: 'create',
					operationId: 'post_sign_requests',
				},
				{
					name: 'cancelById',
					operationId: 'post_sign_requests_id_cancel',
				},
				{
					name: 'resendById',
					operationId: 'post_sign_requests_id_resend',
				},
			],
			interfaceNames: [
				'File--Base',
				'File--Mini',
				'FileVersion--Base',
				'FileVersion--Mini',
				'Folder--Base',
				'Folder--Mini',
				'SignRequest',
				'SignRequestCreateRequest',
				'SignRequestCreateSigner',
				'SignRequestPrefillTag',
				'SignRequests',
				'SignRequestSigner',
				'SignRequestSignerInput',
			],
		});
	} catch (e) {
		console.error(e);
	}
})();
