/** @jsx createTSElement */

import * as ts from 'typescript';
import * as fs from 'fs/promises';
import * as path from 'path';
import { type } from 'os';

class OpenApiManager {
	_spec: {
		paths: Record<
			'get' | 'post',
			{
				operationId: string; // unique operation identifier
				summary: string;
				tags: string[];
				'x-box-tag': string;
				description: string;
				parameters: Array<{
					name: string;
					description: string;
					in: 'query';
					required: boolean;
					example: string | number | boolean /* any? */;
					schema: {
						type: 'string';
					};
				}>;
			}
		>;
	};

	constructor(path: string) {
		this._spec = require(path);
		console.log(Object.keys(this._spec));
	}
}

export function hello() {
	const spec = require('./openapi.json');
	const x: string = 'world!';
	console.log('hello!', Object.keys(spec));
}

const openApiManager = new OpenApiManager('./openapi.json');

// hello();

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
// create class declaration with methods responsible for different calls
// take in operation ids as arguments
//
function makeClassDeclaration(operations: string[]) {
	const dataId = <Identifier text="data" />;

	return (
		<ClassDeclaration name="SignRequests">
			<ConstructorDeclaration
				parameters={[
					<ParameterDeclaration
						name={dataId}
						questionToken={ts.factory.createToken(ts.SyntaxKind.QuestionToken)}
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
		</ClassDeclaration>
	);
}

function TypeReferenceNode(
	{
		typeName,
		typeArguments,
	}: {
		typeName: string | ts.EntityName;
		typeArguments?: readonly ts.TypeNode[];
	},
	...children: ts.TypeNode[]
): ts.TypeReferenceNode {
	return ts.factory.createTypeReferenceNode(
		typeName,
		typeArguments || children
	);
}

function Identifier({ text }: { text: string }): ts.Identifier {
	return ts.factory.createIdentifier(text);
}

function ParameterDeclaration({
	decorators,
	modifiers,
	dotDotDotToken,
	name,
	questionToken,
	type,
	initializer,
}: {
	decorators?: readonly ts.Decorator[];
	modifiers?: readonly ts.Modifier[];
	dotDotDotToken?: ts.DotDotDotToken;
	name: string | ts.BindingName;
	questionToken?: ts.QuestionToken;
	type?: ts.TypeNode;
	initializer?: ts.Expression;
}): ts.ParameterDeclaration {
	return ts.factory.createParameterDeclaration(
		decorators,
		modifiers,
		dotDotDotToken,
		name,
		questionToken,
		type,
		initializer
	);
}

function Super(): ts.SuperExpression {
	return ts.factory.createSuper();
}

function CallExpression({
	expression,
	typeArguments,
	argumentsArray,
}: {
	expression: ts.Expression;
	typeArguments?: readonly ts.TypeNode[];
	argumentsArray?: readonly ts.Expression[];
}): ts.CallExpression {
	return ts.factory.createCallExpression(
		expression,
		typeArguments,
		argumentsArray
	);
}

function ExpressionStatement(
	{
		expression,
	}: {
		expression?: ts.Expression;
	},
	child: ts.Expression
): ts.ExpressionStatement {
	return ts.factory.createExpressionStatement(expression || child);
}

function Block(
	{
		statements,
		multiLine,
	}: { statements?: readonly ts.Statement[]; multiLine?: boolean },
	...children: readonly ts.Statement[]
): ts.Block {
	return ts.factory.createBlock(statements || children, multiLine);
}

function ConstructorDeclaration({
	decorators,
	modifiers,
	parameters = [],
	body,
}: {
	decorators?: readonly ts.Decorator[];
	modifiers?: readonly ts.Modifier[];
	parameters?: readonly ts.ParameterDeclaration[];
	body?: ts.Block;
}): ts.ConstructorDeclaration {
	return ts.factory.createConstructorDeclaration(
		decorators,
		modifiers,
		parameters,
		body
	);
}

function ClassDeclaration(
	{
		decorators,
		modifiers,
		name,
		typeParameters,
		heritageClauses,
		members,
	}: {
		decorators?: readonly ts.Decorator[];
		modifiers?: readonly ts.Modifier[];
		name?: string | ts.Identifier;
		typeParameters?: readonly ts.TypeParameterDeclaration[];
		heritageClauses?: readonly ts.HeritageClause[];
		members?: readonly ts.ClassElement[];
	},
	...children: readonly ts.ClassElement[]
): ts.ClassDeclaration {
	return ts.factory.createClassDeclaration(
		decorators,
		modifiers,
		name,
		typeParameters,
		heritageClauses,
		members || children
	);
}

function createTSElement(
	type: (...args: any[]) => ts.Node,
	props?: Record<string, any>,
	...children: any[]
): ts.Node {
	return type(props || {}, ...children);
}

export async function readFile() {
	// const source = await fs.readFile(
	// 	path.resolve(__dirname, './src/managers/web-links.ts'),
	// 	{
	// 		encoding: 'utf-8',
	// 	}
	// );

	// 	const source = `
	// /**
	//  * Simple manager for interacting with all metadata endpoints and actions.
	//  *
	//  * @constructor
	//  * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
	//  * @returns {void}
	//  */
	// class Metadata {}
	// `;

	// 	const sourceFile = ts.createSourceFile(
	// 		'afilename.ts',
	// 		source,
	// 		ts.ScriptTarget.ES2015,
	// 		false
	// 	);

	// 	// sourceFile.

	// 	console.log((sourceFile.statements[0] as any).jsDoc[0].tags);

	// console.log(JSON.stringify(sourceFile.statements, null, '\t'));

	const resultFile = ts.createSourceFile(
		'someFileName.ts',
		'',
		ts.ScriptTarget.Latest,
		/*setParentNodes*/ false,
		ts.ScriptKind.TS
	);
	const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

	const result = printer.printNode(
		ts.EmitHint.Unspecified,
		// makeFactorialFunction(),
		makeClassDeclaration([
			// operations ids
			'get_sign_requests',
			'post_sign_requests',
		]),
		resultFile
	);
	console.log(result);
}

(async () => {
	try {
		await readFile();
	} catch (e) {
		console.error(e);
	}
})();
