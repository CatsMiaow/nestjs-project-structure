import { before } from '@nestjs/graphql/plugin';
import ts from 'typescript';
import type { Plugin } from 'vitest/config';

import nestCli from '../nest-cli.json' with { type: 'json' };

// The default file suffixes of the GraphQL CLI plugin.
// https://docs.nestjs.com/graphql/cli-plugin#overview
const typeFile = /\.(input|args|entity|model)\.ts$/;
const options = nestCli.compilerOptions.plugins.find((plugin) => plugin.name === '@nestjs/graphql')?.options;

function createProgram(): ts.Program {
  const tsconfig = ts.readConfigFile('tsconfig.json', (file) => ts.sys.readFile(file));
  const { options: compilerOptions, fileNames } = ts.parseJsonConfigFileContent(tsconfig.config, ts.sys, process.cwd());

  return ts.createProgram(fileNames, {
    ...compilerOptions,
    // Emit ESM so that Vite keeps processing the files.
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmitOnError: false,
  });
}

/**
 * Runs the @nestjs/graphql CLI plugin on the test files, as `nest build` does with nest-cli.json.
 * The plugin reads the types with the type checker, so the files are compiled by a TypeScript program.
 */
export function nestGraphqlPlugin(): Plugin {
  let program: ts.Program | undefined;

  return {
    name: 'nestjs-graphql-plugin',
    enforce: 'pre',
    watchChange() {
      program = undefined;
    },
    transform(_code, id) {
      if (!typeFile.test(id)) return null;
      program ??= createProgram();
      const sourceFile = program.getSourceFile(id);
      if (!sourceFile) return null;

      let code: string | undefined;
      let map: string | undefined;
      program.emit(
        sourceFile,
        (fileName, text) => {
          if (fileName.endsWith('.map')) map = text;
          else if (fileName.endsWith('.js')) code = text;
        },
        undefined,
        false,
        { before: [before(options, program)] },
      );

      // The map is handed to Vite directly, so drop the link to the map file.
      return code === undefined ? null : { code: code.replace(/\/\/# sourceMappingURL=.*$/, ''), map };
    },
  };
}
