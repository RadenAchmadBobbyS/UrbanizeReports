import { database } from "@/config/mongodb";
import { UserType } from "@/types/types";
import { ObjectId } from "mongodb";

export class UserModel {
  static collection() {
    return database.collection<UserType>("users");
  }

  static async register(userData: UserType) {
    const result = await this.collection().insertOne({
      ...userData,
      createdAt: new Date(),
    });
    return result;
  }

  static async login(email: string) {
    return await this.collection().findOne({ email });
  }

  static async findById(userId: string) {
    return await this.collection().findOne({ _id: new ObjectId(userId) });
  }

  static async updateProfile(userId: string, updateData: Partial<UserType>) {
    return await this.collection().updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
  }

  static async findAll() {
    return await this.collection().find().toArray();
  }
}
