/* eslint-disable import/no-extraneous-dependencies */
import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';

// https://docs.nestjs.com/recipes/swc#monorepo-and-cli-plugins
// https://docs.nestjs.com/graphql/cli-plugin#swc-builder
// https://docs.nestjs.com/openapi/cli-plugin#swc-builder
const generator = new PluginMetadataGenerator();
generator.generate({
  visitors: [new ReadonlyVisitor({ introspectComments: true, pathToSource: __dirname })],
  outputDir: __dirname,
  watch: true,
  tsconfigPath: 'tsconfig.json',
});
