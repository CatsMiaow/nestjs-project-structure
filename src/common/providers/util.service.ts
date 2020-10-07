import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateParameter = any[];

@Injectable()
export class UtilService {
  public template<T>(templateData: TemplateStringsArray, param: T[], delimiter: string = '\n'): string {
    let output = '';
    for (let i = 0; i < param.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      output += templateData[i] + param[i];
    }
    output += templateData[param.length];

    const lines: string[] = output.split(/(?:\r\n|\n|\r)/);

    return lines.map((text: string) => text.replace(/^\s+/gm, '')).join(delimiter).trim();
  }

  public pre(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, '\n');
  }

  public line(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, ' ');
  }

  public isKeyOfSchema<T>(key: unknown, schema: T): key is keyof T {
    return (typeof key === 'string') && key in schema;
  }

  public removeUndefined<T>(argv: T): Record<string, unknown> {
    // https://stackoverflow.com/questions/25421233
    // JSON.parse(JSON.stringify(args));
    return Object.fromEntries(Object.entries(argv).filter(([, value]: [string, unknown]) => value !== undefined));
  }
}
