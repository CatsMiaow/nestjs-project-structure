export class DateService {
  public static FORMAT(value: string): string {
    return new Date(value).toLocaleString();
  }

  /* // Using moment
  public static FORMAT(value: MomentInput) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }
  */
}
