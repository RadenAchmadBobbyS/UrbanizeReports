import { ObjectId } from "mongodb";

export type UserType = {
  _id: string | ObjectId;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export type Category = "infrastruktur" | "kebersihan" | "keamanan" | "sosial" | "lainnya";
export type Status = "Dilaporkan" | "Menunggu Verifikasi" | "Dalam Proses" | "Selesai";

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

export interface ReportType {
  _id?: string | ObjectId;
  userId: string;
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
  createdBy: string;
  voteCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt?: Date;
};

export type VoteType = {
  _id: string| ObjectId
  reportId?: string | ObjectId // kalau voting untuk laporan
  solutionId?: string | ObjectId // atau untuk solusi
  userId: string
  createdAt: Date
}

