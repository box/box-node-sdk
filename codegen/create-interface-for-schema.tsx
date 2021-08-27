import { camelCase } from 'lodash';
import * as ts from 'typescript';
import { createTypeNodeForSchema } from './create-type-node-for-schema';
import {
	isOpenAPIReference,
	OpenAPI,
	OpenAPIReference,
	OpenAPISchema,
} from './openapi';
import * as tsx from './tsx';
import {
	Block,
	CallExpression,
	Identifier,
	ImportClause,
	ImportDeclaration,
	InterfaceDeclaration,
	JSDocComment,
	MethodDeclaration,
	ObjectLiteralExpression,
	ParameterDeclaration,
	PropertyAccessExpression,
	PropertyAssignment,
	PropertySignature,
	ReturnStatement,
	StringLiteral,
	TypeReferenceNode,
	VariableDeclaration,
	VariableStatement,
} from './tsx';
import {
	compressSchema,
	getIdentifierForSchemaName,
	getIdentifierForSchemaRef,
} from './utils';
tsx;

export function createInterfaceForSchema({
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
