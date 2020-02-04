
// Express Session User
// https://stackoverflow.com/questions/2814805/java-interfaces-implementation-naming-convention
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}
