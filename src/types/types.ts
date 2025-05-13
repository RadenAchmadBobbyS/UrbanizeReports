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

export type ReportType = {
  _id: string | ObjectId;
  title: string;
  description: string;
  category: 'infrastruktur' | 'kebersihan' | 'keamanan' | 'sosial' | 'lainnya';
  location: {
    lat: number;
    lng: number;
    address?: string;
  }
  mediaUrls?: string[]; // foto/video (opsional)
  status: 'terdaftar' | 'dikerjakan' | 'selesai';
  createdBy: string; // userId
  voteCount: number;
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

