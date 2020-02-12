import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateParameter = any[];

@Injectable()
export class UtilService {
  public template<T>(templateData: TemplateStringsArray, param: T[], delimiter: string = '\n'): string {
    let output = '';
    for (let i = 0; i < param.length; i += 1) {
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

  public isObject<T>(value: T): boolean {
    return value !== null && typeof value === 'object' && Array.isArray(value) === false;
  }

  public escapeRegExp(exp: string): string {
    return exp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $&는 일치한 전체 문자열을 의미합니다.
  }
}
