export class DateService {
  public static format(value: string): string {
    return new Date(value).toLocaleString();
  }

  /* // Using dayjs
  public static FORMAT(value: ConfigType) {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  }
  */
}
