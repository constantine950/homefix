export type UserRole = "customer" | "provider";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Category {
  slug: string;
  name: string;
  imageUrl: string;
}

export interface Provider {
  id: string;
  name: string;
  profession: string;
  avatarUrl: string;
  isAvailable: boolean;
  distanceLabel: string; // e.g. "10 min away"
}
