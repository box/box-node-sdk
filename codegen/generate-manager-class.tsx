import * as path from 'path';
import * as ts from 'typescript';
import { createClassForOperations } from './create-class-for-operations';
import { generateInterfacesForSchema } from './generate-interfaces-for-schema';
import { OpenAPI } from './openapi';
import * as tsx from './tsx';
import {
	ExportAssignment,
	Identifier,
	ImportClause,
	ImportDeclaration,
	StringLiteral,
} from './tsx';
import { writeNodesToFile } from './write-nodes-to-file';
tsx;

const SCHEMAS_RELATIVE_PATH = '../src/schemas';

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
