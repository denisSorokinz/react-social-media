import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/state/hooks";
import { selectToken } from "@/state/appSlice";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { typedFetch } from "@/utils";
import { IPost, IUser } from "@/types";
import User from "@/components/widgets/User";
import Posts from "@/components/widgets/Post/Posts";
import FriendList from "@/components/widgets/FriendList";

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  useEffect(() => console.log("[0]", posts), [posts]);
  const { userId } = useParams();
  const token = useAppSelector(selectToken);
  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  const getUser = useCallback(async () => {
    const data = await typedFetch<IUser>(
      `http://localhost:3001/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }, [userId, token]);

  const getUserPosts = useCallback(async () => {
    const { posts } = await typedFetch<{ posts: IPost[] }>(
      `http://localhost:3001/posts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return posts;
  }, [userId, token]);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getUser();
        const currentPosts = await getUserPosts();
        console.log("[currentPosts]", currentPosts);

        setUser(currentUser);
        setPosts(currentPosts);
      } catch (err: any) {
        console.error("[profile]", err);
      }
    })();
  }, [userId, token]);

  if (!user)
    return (
      <Typography variant="h2" fontWeight="500">
        User not found
      </Typography>
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
        {posts && posts.length > 0 ? (
          <Posts posts={posts} />
        ) : (
          <Typography>No posts found</Typography>
        )}
      </Box>
      {!isMobile && (
        <Box display="flex" flexDirection="column" flexBasis="25%">
          {/* <FriendList userId={user._id} /> */}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
