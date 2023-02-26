import { FC } from "react";
import { useAppSelector } from "state/hooks";
import { selectPosts } from "state/appSlice";
import SinglePost from "./SinglePost";
import { IPost } from "@/types";

type PostsProps = {
  posts: IPost[];
};

const Posts: FC<PostsProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </>
  );
};

export default Posts;
