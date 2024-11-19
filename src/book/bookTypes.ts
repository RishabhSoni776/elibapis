import { User } from "../user/userTypes";

export interface Book {
  _id: string;
  title: string;
  author: User;
  coverImage: string;
  description: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}
