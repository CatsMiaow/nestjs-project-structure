import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateParameter = any[];

@Injectable()
export class UtilService {
  public template(templateData: TemplateStringsArray, param: TemplateParameter, delimiter = '\n'): string {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let output = '';
    for (const [i, element] of param.entries()) {
      output += `${templateData[i]}${element}`;
    }
    output += templateData[param.length];

    const lines: string[] = output.split(/(?:\r\n|\n|\r)/);

    return lines
      .map((text: string) => text.replaceAll(/^\s+/gm, ''))
      .join(delimiter)
      .trim();
  }

  public pre(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, '\n');
  }

  public line(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, ' ');
  }

  public removeUndefined(argv: object): Record<string, unknown> {
    // https://stackoverflow.com/questions/25421233
    // JSON.parse(JSON.stringify(args));
    return Object.fromEntries(Object.entries(argv).filter(([, value]: [string, unknown]) => value !== undefined));
  }
}
