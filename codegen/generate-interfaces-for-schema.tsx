import * as fs from 'fs/promises';
import { kebabCase } from 'lodash';
import * as path from 'path';
import * as ts from 'typescript';
import { OpenAPI } from './openapi';
import * as tsx from './tsx';
import { ExportDeclaration, StringLiteral } from './tsx';
import { getIdentifierForSchemaName } from './utils';
import { writeNodesToFile } from './write-nodes-to-file';
tsx;

const SCHEMAS_RELATIVE_PATH = '../src/schemas';

export async function generateInterfacesForSchema({
	spec,
	interfaces,
}: {
	spec: OpenAPI;
	interfaces: Record<string, ts.Node[]>;
}) {
	const schemasDirPath = path.join(__dirname, SCHEMAS_RELATIVE_PATH);
	// make sure the target directory exisits
	await fs.mkdir(schemasDirPath, { recursive: true });

	const indexExports: ts.ExportDeclaration[] = [];

	for (const name of Object.keys(interfaces)) {
		const schema = spec.components?.schemas?.[name];
		if (!schema) {
			throw new Error(`Missing schema ${name} in the OpenAPI spec`);
		}

		const { text: interfaceName } = getIdentifierForSchemaName(name);
		const baseFileName = `${kebabCase(interfaceName)}.generated`;
		const fileName = `${baseFileName}.ts`;

		await writeNodesToFile({
			fullPath: path.join(schemasDirPath, fileName),
			nodes: interfaces[name],
		});

		indexExports.push(
			<ExportDeclaration
				moduleSpecifier={<StringLiteral text={`./${baseFileName}`} />}
			/>
		);
	}

	// write index for schemas with exports
	await writeNodesToFile({
		fullPath: path.join(schemasDirPath, 'index.ts'),
		nodes: indexExports,
	});
}
