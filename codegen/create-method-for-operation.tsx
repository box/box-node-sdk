import * as ts from 'typescript';
import { createTypeNodeForSchema } from './create-type-node-for-schema';
import { OpenAPI, OpenAPIPathItem } from './openapi';
import * as tsx from './tsx';
import {
	Block,
	CallExpression,
	Identifier,
	JSDocComment,
	JSDocParameterTag,
	JSDocReturnTag,
	MethodDeclaration,
	ObjectLiteralExpression,
	ParameterDeclaration,
	PropertyAccessExpression,
	PropertyAssignment,
	PropertySignature,
	ReturnStatement,
	StringLiteral,
	This,
	TypeLiteralNode,
	TypeReferenceNode,
	VariableDeclaration,
	VariableStatement,
} from './tsx';
tsx;

export function createMethodForOperation({
	spec,
	pathKey,
	verb,
	name,
}: {
	spec: OpenAPI;
	pathKey: keyof OpenAPI['paths'];
	verb: ('get' | 'post' | 'put' | 'delete' | 'options') & keyof OpenAPIPathItem;
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
					comment="Passed the result if successful, error otherwise"
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
