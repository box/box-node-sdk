import * as ts from 'typescript';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { OpenAPI, OpenAPIPathItem } from './openapi';
import {
	BinaryExpression,
	Block,
	CallExpression,
	ClassDeclaration,
	ConstructorDeclaration,
	ExpressionStatement,
	Identifier,
	ImportClause,
	ImportDeclaration,
	JSDocComment,
	JSDocParameterTag,
	JSDocReturnTag,
	MethodDeclaration,
	ObjectLiteralExpression,
	ParameterDeclaration,
	PropertyAccessExpression,
	PropertyAssignment,
	PropertyDeclaration,
	PropertySignature,
	ReturnStatement,
	StringLiteral,
	Super,
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

function makeFactorialFunction() {
	const functionName = ts.factory.createIdentifier('factorial');
	const paramName = ts.factory.createIdentifier('n');
	const parameter = ts.factory.createParameterDeclaration(
		/*decorators*/ undefined,
		/*modifiers*/ undefined,
		/*dotDotDotToken*/ undefined,
		paramName
	);

	const condition = ts.factory.createBinaryExpression(
		paramName,
		ts.SyntaxKind.LessThanEqualsToken,
		ts.factory.createNumericLiteral(1)
	);
	const ifBody = ts.factory.createBlock(
		[ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))],
		/*multiline*/ true
	);

	const decrementedArg = ts.factory.createBinaryExpression(
		paramName,
		ts.SyntaxKind.MinusToken,
		ts.factory.createNumericLiteral(1)
	);
	const recurse = ts.factory.createBinaryExpression(
		paramName,
		ts.SyntaxKind.AsteriskToken,
		ts.factory.createCallExpression(functionName, /*typeArgs*/ undefined, [
			decrementedArg,
		])
	);
	const statements = [
		ts.factory.createIfStatement(condition, ifBody),
		ts.factory.createReturnStatement(recurse),
	];

	return ts.factory.createFunctionDeclaration(
		/*decorators*/ undefined,
		/*modifiers*/ [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		/*asteriskToken*/ undefined,
		functionName,
		/*typeParameters*/ undefined,
		[parameter],
		/*returnType*/ ts.factory.createKeywordTypeNode(
			ts.SyntaxKind.NumberKeyword
		),
		ts.factory.createBlock(statements, /*multiline*/ true)
	);
}

//
// NOTE https://ts-ast-viewer.com/
//

// TODO generator should be able to generate any (params) mathod for calling a single endpoint directly
// types are either translated inline or a separate type is created
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
						<TypeReferenceNode typeName={parameter.schema.type} />
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
				typeExpression={ts.factory.createJSDocTypeExpression(
					ts.factory.createTypeReferenceNode(
						ts.factory.createIdentifier('Promise<object>')
					)
				)}
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
										type={
											<TypeReferenceNode typeName={parameter.schema.type} />
										}
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
										argumentsArray={[
											<Identifier text="BASE_PATH" />,
											<Identifier text="weblinkId" />,
										]}
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
										name="get"
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

// create class declaration with methods responsible for different calls
// take in operation ids as arguments
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
					'get_sign_requests',
					'get_sign_requests_id',
					'post_sign_requests',
				],
			}),
			// makeFactorialFunction(),
		]),
		resultFile
	);

	// save file to sign-requests
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
