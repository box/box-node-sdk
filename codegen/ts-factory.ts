import * as ts from 'typescript';

export function Block(
	{
		statements,
		multiLine,
	}: { statements?: readonly ts.Statement[]; multiLine?: boolean },
	...children: readonly ts.Statement[]
): ts.Block {
	return ts.factory.createBlock(statements || children, multiLine);
}

export function CallExpression({
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

export function ClassDeclaration(
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
		(members || children).flat()
	);
}

export function ConstructorDeclaration({
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

export function ExpressionStatement(
	{
		expression,
	}: {
		expression?: ts.Expression;
	},
	child: ts.Expression
): ts.ExpressionStatement {
	return ts.factory.createExpressionStatement(expression || child);
}

export function Identifier({ text }: { text: string }): ts.Identifier {
	return ts.factory.createIdentifier(text);
}

export function ImportClause({
	isTypeOnly = false,
	name,
	namedBindings,
}: {
	isTypeOnly?: boolean;
	name?: ts.Identifier;
	namedBindings?: ts.NamedImportBindings;
}): ts.ImportClause {
	return ts.factory.createImportClause(isTypeOnly, name, namedBindings);
}

export function ImportDeclaration({
	decorators,
	modifiers,
	importClause,
	moduleSpecifier,
}: {
	decorators?: readonly ts.Decorator[];
	modifiers?: readonly ts.Modifier[];
	importClause?: ts.ImportClause;
	moduleSpecifier: ts.Expression;
}): ts.ImportDeclaration {
	return ts.factory.createImportDeclaration(
		decorators,
		modifiers,
		importClause,
		moduleSpecifier
	);
}

export function MethodDeclaration({
	decorators,
	modifiers,
	asteriskToken,
	name,
	questionToken,
	typeParameters,
	parameters,
	type,
	body,
}: {
	decorators?: readonly ts.Decorator[];
	modifiers?: readonly ts.Modifier[];
	asteriskToken?: ts.AsteriskToken;
	name: string | ts.PropertyName;
	questionToken?: boolean;
	typeParameters?: readonly ts.TypeParameterDeclaration[];
	parameters: readonly ts.ParameterDeclaration[];
	type?: ts.TypeNode;
	body?: ts.Block;
}): ts.MethodDeclaration {
	return ts.factory.createMethodDeclaration(
		decorators,
		modifiers,
		asteriskToken,
		name,
		questionToken ? QuestionToken() : undefined,
		typeParameters,
		parameters,
		type,
		body
	);
}

export function ParameterDeclaration({
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
	questionToken?: boolean;
	type?: ts.TypeNode;
	initializer?: ts.Expression;
}): ts.ParameterDeclaration {
	return ts.factory.createParameterDeclaration(
		decorators,
		modifiers,
		dotDotDotToken,
		name,
		questionToken ? QuestionToken() : undefined,
		type,
		initializer
	);
}

export function PropertyDeclaration({
	decorators,
	modifiers,
	name,
	questionOrExclamationToken,
	type,
	initializer,
}: {
	decorators?: readonly ts.Decorator[];
	modifiers?: readonly ts.Modifier[];
	name: string | ts.PropertyName;
	questionOrExclamationToken?: ts.QuestionToken | ts.ExclamationToken;
	type?: ts.TypeNode;
	initializer?: ts.Expression;
}): ts.PropertyDeclaration {
	return ts.factory.createPropertyDeclaration(
		decorators,
		modifiers,
		name,
		questionOrExclamationToken,
		type,
		initializer
	);
}

export function PropertySignature({
	modifiers,
	name,
	questionToken,
	type,
}: {
	modifiers?: readonly ts.Modifier[];
	name: ts.PropertyName | string;
	questionToken?: boolean;
	type?: ts.TypeNode;
}): ts.PropertySignature {
	const ps = ts.factory.createPropertySignature(
		modifiers,
		name,
		questionToken ? QuestionToken() : undefined,
		type
	);
	(ps as any).jsDoc = ts.factory.createJSDocComment('adgadggadgad');
	(ps as any).jsDocComments = ts.factory.createJSDocComment('adgadggadgad');
	return ps;
}

export function QuestionToken(): ts.QuestionToken {
	return ts.factory.createToken(ts.SyntaxKind.QuestionToken);
}

export function StringLiteral(
	{ text, isSingleQuote }: { text: string; isSingleQuote?: boolean },
	child: string
): ts.StringLiteral {
	return ts.factory.createStringLiteral(text, isSingleQuote);
}

export function Super(): ts.SuperExpression {
	return ts.factory.createSuper();
}

export function TypeLiteralNode({
	members,
}: {
	members?: readonly ts.TypeElement[] | undefined;
}): ts.TypeLiteralNode {
	return ts.factory.createTypeLiteralNode(members);
}

export function TypeReferenceNode(
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
