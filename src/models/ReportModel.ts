import { database } from "@/config/mongodb";
import { CommentType, ReportType, Status } from "@/types/types";
import { ObjectId } from "mongodb";


export class ReportModel {
  static collection() {
    return database.collection<ReportType>("reports");
  }

  static async create(reportData: ReportType) {
    return await this.collection().insertOne({
      ...reportData,
      voteCount: 0,
      status: Status.DILAPORKAN,
      createdAt: new Date(),
    });
  }

  static async findSimilar(category: string, excludeId?: string, limit: number = 5) {
    const query: any = { category };
    if (excludeId) query._id = { $ne: new ObjectId(excludeId) };
    return await this.collection().find(query).limit(limit).toArray();
 }

  static async findById(reportId: string) {
    return await this.collection().findOne({ _id: new ObjectId(reportId) });
  }

  static async findAll(filter: Partial<ReportType> = {}) {
    return await this.collection().find(filter).toArray();
  }

  static async updateStatus(reportId: string, status: ReportType["status"]) {
    return await this.collection().updateOne(
      { _id: new ObjectId(reportId) },
      { $set: { status } }
    );
  }

  static async voteCount(reportId: string) {
    return await this.collection().findOne(
      { _id: new ObjectId(reportId) },
      { projection: { voteCount: 1 } }
    );
  }

  static async addComment(reportId: string, comment: CommentType) {
  return await this.collection().updateOne(
    { _id: new ObjectId(reportId) },
    {
      $push: { comments: comment },
      $inc: { commentCount: 1 }
    }
  );
}

  static async addPhoto(reportId: string, imageUrl: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(reportId) },
      { $push: { images: imageUrl } }
    );
  }
}
