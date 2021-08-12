import * as ts from 'typescript';
import type { OpenAPI, OpenAPIPathItem } from './openapi';
import {
	Block,
	CallExpression,
	ClassDeclaration,
	ConstructorDeclaration,
	ExpressionStatement,
	Identifier,
	ImportClause,
	ImportDeclaration,
	MethodDeclaration,
	ParameterDeclaration,
	PropertyDeclaration,
	PropertySignature,
	StringLiteral,
	Super,
	TypeLiteralNode,
	TypeReferenceNode,
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
}) {
	const pathItem = spec.paths[pathKey][verb]!;

	return (
		<MethodDeclaration
			name={pathItem.operationId}
			parameters={[
				<ParameterDeclaration
					name="options"
					questionToken={pathItem.parameters.every(
						(parameter) => !parameter.required
					)}
					type={
						<TypeLiteralNode
							members={pathItem.parameters
								.map((parameter) => [
									ts.factory.createJSDocComment(parameter.description),
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
			body={<Block />}
		/>
	);
}

// /**
//  *
//  * @param param1 ddgdg
//  * @param params2 gadgadga
//  * @returns
//  */
// function test(/*adgdagad */ param1: string, params2: string) {
// 	return 2;
// }

// create class declaration with methods responsible for different calls
// take in operation ids as arguments
function createClassForOperations({
	spec,
	operationIds,
}: {
	spec: OpenAPI;
	operationIds: string[];
}) {
	const dataId = <Identifier text="data" />;

	return (
		<ClassDeclaration name="SignRequests">
			<PropertyDeclaration
				name="client"
				type={<TypeReferenceNode typeName="BoxClient" />}
			/>
			<ConstructorDeclaration
				parameters={[
					<ParameterDeclaration
						name={dataId}
						questionToken
						type={
							<TypeReferenceNode typeName="Partial">
								<TypeReferenceNode typeName="foo" />
							</TypeReferenceNode>
						}
					/>,
				]}
				body={
					<Block multiLine>
						<ExpressionStatement>
							<CallExpression
								expression={<Super />}
								argumentsArray={[dataId]}
							/>
						</ExpressionStatement>
					</Block>
				}
			/>
			{ts.factory.createJSDocComment('comment for the method below', [
				ts.factory.createJSDocParameterTag(
					undefined /*identifier */,
					<Identifier text="param1" />,
					false /*is bracketed*/,
					undefined /* type expr */,
					true /*name first*/,
					'comment for this param'
				),
				ts.factory.createJSDocParameterTag(
					undefined /*identifier */,
					<Identifier text="ss.param1" />,
					false /*is bracketed*/,
					// undefined /* type expr */,
					ts.factory.createJSDocTypeExpression(
						ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
					),
					undefined /*name first*/,
					'comment for this param'
				),
				ts.factory.createJSDocDeprecatedTag(
					<Identifier text="agadgadg" />,
					// undefined as any,
					'dep id'
				),
			])}
			{operationIds.map((operationId) => {
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
			})}
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
					// 'post_sign_requests',
				],
			}),
			// makeFactorialFunction(),
		]),
		resultFile
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
