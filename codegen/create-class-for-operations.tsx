import * as ts from 'typescript';
import { createMethodForOperation } from './create-method-for-operation';
import { OpenAPI } from './openapi';
import * as tsx from './tsx';
import {
	BinaryExpression,
	Block,
	ClassDeclaration,
	ConstructorDeclaration,
	Identifier,
	JSDocComment,
	JSDocParameterTag,
	ParameterDeclaration,
	PropertyAccessExpression,
	PropertyDeclaration,
	This,
	TypeReferenceNode,
} from './tsx';
tsx;

export function createClassForOperations({
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
							for (const verb of [
								'get',
								'post',
								'put',
								'delete',
								'options',
							] as const) {
								if (pathItem[verb]?.operationId === operationId) {
									return createMethodForOperation({
										spec,
										pathKey,
										verb,
										name,
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
