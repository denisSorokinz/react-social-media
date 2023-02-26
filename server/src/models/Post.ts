import { Schema, model, ObjectId } from "mongoose";

interface IPost {
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  userPicturePath: string;
  picturePath: string;
  likes: Map<string, boolean>;
  comments: any; // Array<string>
}

const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    location: String,
    description: String,
    userPicturePath: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [""],
    },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

export default Post;
