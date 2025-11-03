export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  institutionId?: string;
  profilePicture?: string;
  bio?: string;
  school?: string;
  level?: string;
  specialty?: string;
  verified: boolean;
  isPremium: boolean;
  followers: number;
  following: number;
  joinedDate: string;
  blockedUsers?: string[];
  followingUsers?: string[];
  privacySettings?: {
    profileVisibility: 'public' | 'followers' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
  notificationSettings?: {
    email: boolean;
    push: boolean;
    likes: boolean;
    comments: boolean;
    follows: boolean;
    messages: boolean;
    mentorship: boolean;
    opportunities: boolean;
  };
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  resourceLink?: string;
  category: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  bookmarked: boolean;
  liked: boolean;
  createdAt: string;
  editedAt?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  liked: boolean;
  replies: Comment[];
  createdAt: string;
  editedAt?: string;
  parentId?: string; // For replies
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  read: boolean;
  timestamp: string;
  attachment?: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'internship' | 'job' | 'scholarship' | 'event';
  location: string;
  specialty: string;
  description: string;
  institution: string;
  deadline: string;
  requirements: string[];
  link?: string;
  bookmarked: boolean;
  status: 'active' | 'expired' | 'pending';
  postedBy?: User;
  approvedBy?: User;
  isPremium?: boolean;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'research' | 'video' | 'pdf';
  author: string;
  specialty: string;
  tags: string[];
  description: string;
  url?: string;
  likes: number;
  saved: boolean;
  uploadedAt: string;
  thumbnail?: string;
  uploadedBy?: User;
  approvedBy?: User;
  status?: 'pending' | 'approved' | 'rejected';
  isPremium?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'mentorship' | 'opportunity' | 'announcement';
  user?: User;
  content: string;
  read: boolean;
  timestamp: string;
  link?: string;
  grouped?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
}

export interface MentorshipRequest {
  id: string;
  requester: User;
  mentor: User;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  seller: User;
  category: string;
  condition: 'new' | 'used' | 'refurbished';
  createdAt: string;
  status: 'active' | 'sold' | 'removed';
}
