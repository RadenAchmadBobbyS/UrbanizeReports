import { database } from "@/config/mongodb";
import { VoteType } from "@/types/types";
import { ObjectId } from "mongodb";

export class VoteModel {
  static collection() {
    return database.collection<VoteType>("votes");
  }

  static async castVote(userId: string, reportId: string) {
    const existing = await this.collection().findOne({ userId, reportId });
    if (existing) throw new Error("Already voted");

    await this.collection().insertOne({
      _id: new ObjectId(),
      userId,
      reportId,
      createdAt: new Date(),
    });

    return await database.collection("reports").updateOne(
      { _id: new ObjectId(reportId) },
      { $inc: { voteCount: 1 } }
    );
  }

  static async getVotesByUser(userId: string) {
    return await this.collection().find({ userId }).toArray();
  }
}
