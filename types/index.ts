export type UserRole = "tenant" | "landlord" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  nin: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  verified: boolean;
}

export interface RepairTicket {
  id: string;
  title: string;
  description: string;
  status: "reported" | "assigned" | "in_progress" | "fixed";
  createdAt: string;
  updatedAt: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  verified: boolean;
  avatarUrl: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: string;
  tag: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
}
