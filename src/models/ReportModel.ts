import { database } from "@/config/mongodb";
import { CommentType, ReportType, Status } from "@/types/types";
import { ObjectId, ReturnDocument } from "mongodb";


export class ReportModel {
  static collection() {
    return database.collection<ReportType>("reports");
  }

  static async create(reportData: ReportType) {
    return await this.collection().insertOne({
      ...reportData,
      voteCount: 0,
      voters: [],
      recentComments: [],
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

  static async voteCount(reportId: string, userId: string) {
    return await this.collection().findOneAndUpdate(
      { _id: new ObjectId(reportId) },
      { $inc: { voteCount: 1 }, $addToSet: { voters: userId } },
      { returnDocument: "after", projection: { voteCount: 1, voters: 1 }}
    );
  }

  static async unvoteCount(reportId: string, userId: string) {
  return await this.collection().findOneAndUpdate(
    { _id: new ObjectId(reportId) },
    { $inc: { voteCount: -1 }, $pull: { voters: userId } },
    { returnDocument: "after", projection: { voteCount: 1, voters: 1 } }
  );
}

  static async addComment(reportId: string, comment: CommentType) {
  return await this.collection().findOneAndUpdate(
    { _id: new ObjectId(reportId) },
    {
      $push: { comments: comment, recentComments: comment },
      $inc: { commentCount: 1 }
    },
    { returnDocument: "after", projection: { comments: 1, commentCount: 1, recentComments: 1 }}
  );
}

  static async addPhoto(reportId: string, imageUrl: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(reportId) },
      { $push: { images: imageUrl } }
    );
  }
}
