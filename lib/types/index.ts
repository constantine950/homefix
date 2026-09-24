export type UserRole = "customer" | "provider";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
}
