import * as ts from 'typescript';

export function BinaryExpression({
	left,
	operator,
	right,
}: {
	left: ts.Expression;
	operator: ts.BinaryOperator | ts.BinaryOperatorToken;
	right: ts.Expression;
}): ts.BinaryExpression {
	return ts.factory.createBinaryExpression(left, operator, right);
}

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

export function ConstructorDeclaration(
	{
		decorators,
		modifiers,
		parameters = [],
		body,
	}: {
		decorators?: readonly ts.Decorator[];
		modifiers?: readonly ts.Modifier[];
		parameters?: readonly ts.ParameterDeclaration[];
		body?: ts.Block;
	},
	child?: ts.Block
): ts.ConstructorDeclaration {
	return ts.factory.createConstructorDeclaration(
		decorators,
		modifiers,
		parameters,
		body || child
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

export function JSDocComment(
	{
		comment,
		tags,
	}: {
		comment?: string;
		tags?: readonly ts.JSDocTag[];
	},
	...children: ts.JSDocTag[]
): ts.JSDoc {
	return ts.factory.createJSDocComment(comment, (tags || children).flat());
}

export function JSDocParameterTag({
	tagName,
	name,
	isBracketed = false,
	typeExpression,
	isNameFirst = false,
	comment,
}: {
	tagName?: ts.Identifier;
	name: ts.EntityName;
	isBracketed?: boolean;
	typeExpression?: ts.JSDocTypeExpression;
	isNameFirst?: boolean;
	comment?: string;
}): ts.JSDocParameterTag {
	return ts.factory.createJSDocParameterTag(
		tagName,
		name,
		isBracketed,
		typeExpression,
		isNameFirst,
		comment
	);
}

export function JSDocReturnTag({
	tagName,
	typeExpression,
	comment,
}: {
	tagName?: ts.Identifier;
	typeExpression: ts.JSDocTypeExpression;
	comment?: string;
}): ts.JSDocReturnTag {
	return ts.factory.createJSDocReturnTag(tagName, typeExpression, comment);
}

export function MethodDeclaration(
	{
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
	},
	child?: ts.Block
): ts.MethodDeclaration {
	return ts.factory.createMethodDeclaration(
		decorators,
		modifiers,
		asteriskToken,
		name,
		questionToken ? QuestionToken() : undefined,
		typeParameters,
		parameters,
		type,
		body || child
	);
}

export function ObjectLiteralExpression(
	{
		properties,
		multiLine,
	}: {
		properties?: readonly ts.ObjectLiteralElementLike[];
		multiLine?: boolean;
	},
	...children: readonly ts.ObjectLiteralElementLike[]
): ts.ObjectLiteralExpression {
	return ts.factory.createObjectLiteralExpression(
		properties || children,
		multiLine
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

export function PropertyAccessExpression({
	expression,
	name,
}: {
	expression: ts.Expression;
	name: string | ts.Identifier | ts.PrivateIdentifier;
}): ts.PropertyAccessExpression {
	return ts.factory.createPropertyAccessExpression(expression, name);
}

export function PropertyAssignment({
	name,
	initializer,
}: {
	name: string | ts.PropertyName;
	initializer: ts.Expression;
}): ts.PropertyAssignment {
	return ts.factory.createPropertyAssignment(name, initializer);
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

export function ReturnStatement(
	{
		expression,
	}: {
		expression?: ts.Expression;
	},
	child?: ts.Expression
): ts.ReturnStatement {
	return ts.factory.createReturnStatement(expression || child);
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

export function This(): ts.ThisExpression {
	return ts.factory.createThis();
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

export function VariableDeclaration({
	name,
	exclamationToken,
	type,
	initializer,
}: {
	name: string | ts.BindingName;
	exclamationToken?: ts.ExclamationToken;
	type?: ts.TypeNode;
	initializer?: ts.Expression;
}): ts.VariableDeclaration {
	return ts.factory.createVariableDeclaration(
		name,
		exclamationToken,
		type,
		initializer
	);
}

export function VariableDeclarationList(
	{
		declarations,
		flags,
	}: {
		declarations?: readonly ts.VariableDeclaration[];
		flags?: ts.NodeFlags;
	},
	...children: readonly ts.VariableDeclaration[]
): ts.VariableDeclarationList {
	return ts.factory.createVariableDeclarationList(
		declarations || children,
		flags
	);
}

export function VariableStatement(
	{
		modifiers,
		declarationList,
	}: {
		modifiers?: readonly ts.Modifier[];
		declarationList?:
			| ts.VariableDeclarationList
			| readonly ts.VariableDeclaration[];
	},
	...children: readonly ts.VariableDeclaration[]
): ts.VariableStatement {
	return ts.factory.createVariableStatement(
		modifiers,
		declarationList || children
	);
}
