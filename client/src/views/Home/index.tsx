import { useCallback, useEffect } from "react";
import {
  postsUpdated,
  selectPosts,
  selectToken,
  selectUser,
} from "state/appSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";
import User from "components/widgets/User";
import NewPost from "components/widgets/Post/CreatePost";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import Posts from "components/widgets/Post/Posts";
import Advert from "components/widgets/Advert";
import { typedFetch } from "utils";
import { IPost } from "types";
import FriendList from "@/components/widgets/FriendList";

const Home = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser)!;
  const token = useAppSelector(selectToken)!;
  const posts = useAppSelector(selectPosts);

  const getPosts = useCallback(async () => {
    const data = await typedFetch<{ posts: IPost[] }>(
      "http://localhost:3001/posts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();
        console.log("[getPosts]", posts);
        dispatch(postsUpdated(posts));
      } catch (err: any) {
        console.error("[posts-error]", err);
      }
    })();
  }, []);

  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  return (
    <Box
      width="100%"
      padding="2rem 5%"
      display={isMobile ? "block" : "flex"}
      justifyContent="space-between"
      gap="0.5rem"
    >
      <Box flexBasis={!isMobile ? "25%" : undefined}>
        <User user={user} />
      </Box>
      <Box
        flexBasis={!isMobile ? "40%" : undefined}
        mt={isMobile ? "2rem" : undefined}
      >
        <NewPost picturePath={user.picturePath} />
        {posts.length > 0 ? (
          <Posts posts={posts} />
        ) : (
          <Typography>No posts found</Typography>
        )}
      </Box>
      {!isMobile && (
        <Box display="flex" flexDirection="column" flexBasis="25%">
          <Box mb="2rem">
            <Advert />
          </Box>
          <Box>
            <FriendList userId={user._id} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
