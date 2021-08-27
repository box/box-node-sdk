import * as fs from 'fs/promises';
import * as path from 'path';
import * as prettier from 'prettier';
import * as ts from 'typescript';

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

export async function writeNodesToFile({
	fullPath,
	nodes,
	languageVersion = ts.ScriptTarget.Latest,
}: {
	fullPath: string;
	nodes: readonly ts.Node[];
	languageVersion?: ts.ScriptTarget;
}) {
	const fileName = path.basename(fullPath);
	const source = printer.printList(
		ts.ListFormat.MultiLine,
		ts.factory.createNodeArray(nodes),
		ts.createSourceFile(fileName, '', languageVersion)
	);

	const prettierConfig = await prettier.resolveConfig(fullPath);
	if (!prettierConfig) {
		throw new Error(`Coundn't locate prettier config for file ${fullPath}`);
	}

	await fs.writeFile(
		fullPath,
		prettier.format(source, { parser: 'typescript', ...prettierConfig })
	);
}
