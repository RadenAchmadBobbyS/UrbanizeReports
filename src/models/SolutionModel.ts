import { database } from "@/config/mongodb";
import { SolutionType } from "@/types/types";
import { ObjectId } from "mongodb";


export class SolutionModel {
  static collection() {
    return database.collection<SolutionType>("solutions");
  }

  static async submit(solutionData: SolutionType) {
    return await this.collection().insertOne({
      ...solutionData,
      upvotes: 0,
      comments: [],
      createdAt: new Date(),
    });
  }

  static async findByReport(reportId: string) {
    return await this.collection()
      .find({ reportId })
      .toArray();
  }

  static async upvoteSolution(solutionId: string) {
    return await this.collection().updateOne(
      { _id: new ObjectId(solutionId) },
      { $inc: { upvotes: 1 } }
    );
  }

  static async comment(solutionId: string, commentData: { userId: string; text: string; name?:string; avatar?:string }) {
    const comment = {
      ...commentData,
      createdAt: new Date(),
    };
    return await this.collection().updateOne(
      { _id: new ObjectId(solutionId) },
      { $push: { comments: comment } }
    );
  }
}
