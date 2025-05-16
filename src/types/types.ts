import { ObjectId } from "mongodb";

// ====== user type =======

export type UserType = {
  _id: string | ObjectId;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export type Category = "infrastruktur" | "kebersihan" | "keamanan" | "sosial" | "lainnya";

export enum Status {
  DILAPORKAN = 'Dilaporkan',
  MENUNGGU_VERIFIKASI = 'Menunggu Verifikasi',
  DALAM_PROSES = 'Dalam Proses',
  SELESAI = 'Selesai'
}


export interface ReportType {
  _id?: string | ObjectId;
  userId: string | ObjectId;
  title: string;
  description: string;
  category: Category;
  status: Status;
  recentComments: CommentType[];
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
    reporter?: {
    name?: string;
    avatar?: string;
    username?: string;
  };
  mediaUrls?: string[];
  voteCount: number;
  voters?: (string | ObjectId)[];
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentType {
  id: string;
  user: {
    avatar?: string;
    name: string;
    username: string;
  };
  comment: string;
  date: string;
  likes: number;
}

export type SolutionType = {
  _id?: string | ObjectId;
  reportId: string;
  userId: string;
  content: string;
  upvotes?: number;
  comments?: {
    userId: string;
    text: string;
    createdAt: Date;
  }[];
  commentCount?: number;
  createdAt?: Date;
};

export type VoteType = {
  _id: string| ObjectId
  reportId?: string | ObjectId // kalau voting untuk laporan
  solutionId?: string | ObjectId // atau untuk solusi
  userId: string
  createdAt: Date
  updatedAt?: Date;
}

