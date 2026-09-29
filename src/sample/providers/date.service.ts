export class DateService {
  public static format(value: string): string {
    return new Date(value).toLocaleString();
  }
}
