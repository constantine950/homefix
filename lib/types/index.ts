export type UserRole = "customer" | "provider";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  profession?: string;
  location?: string;
  whatsapp?: string;
  availableDays?: string[];
  isAvailable?: boolean;
  proofOfWorkUrls?: string[];
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
  distanceLabel: string;
  coverPhotoUrl?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  proofOfWorkUrls?: string[];
}

export interface ServiceRequest {
  id: string;
  category: string;
  description: string;
  status: "pending" | "accepted" | "completed";
  createdAt: string; // ISO date string
}

export interface HistoryEntry {
  id: string;
  providerName: string;
  providerAvatarUrl: string;
  profession: string;
  isAvailable: boolean;
  contactedLabel: string; // e.g. "32 secs ago", "1 week ago"
}
