import * as ts from 'typescript';
import {
	isOpenAPIReference,
	OpenAPI,
	OpenAPIReference,
	OpenAPISchema,
} from './openapi';
import * as tsx from './tsx';
import { Identifier, Null, TypeReferenceNode } from './tsx';
import { compressSchema, getIdentifierForSchemaRef } from './utils';
tsx;

export function createTypeNodeForSchema({
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
