import { FC, useCallback, useMemo, useState } from "react";
import { IPost } from "@/types";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { postUpdated, selectToken, selectUser } from "@/state/appSlice";
import {
  Box,
  Divider,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { typedFetch } from "@/utils";
import WidgetWrapper from "../Wrapper";
import UserBox from "../UserBox";
import FlexBetween from "@/components/FlexBetween";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const SinglePost: FC<{ post: IPost }> = ({ post }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken)!;
  const { _id: userId } = useAppSelector(selectUser)!;

  const isLikedByUser = useMemo(() => post.likes[userId], [post.likes, userId]);
  const likeAmount = useMemo(
    () => Object.keys(post.likes).length,
    [post.likes]
  );

  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  const [showComments, setShowComments] = useState(false);
  const toggleShowComments = useCallback(
    () => setShowComments(!showComments),
    [showComments]
  );

  const { palette } = useTheme();
  const {
    neutral: { main: neutralMain },
    primary: { main: primaryMain },
  } = palette;

  const patchLike = useCallback(async () => {
    try {
      const data = await typedFetch<{ newPost: IPost }>(
        `http://localhost:3001/posts/${post._id}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: post._id }),
        }
      );
      dispatch(postUpdated(data));
    } catch (err: any) {
      console.error("[like-patch-err]", err);
    }
  }, [post]);

  return (
    <WidgetWrapper sx={{ mt: isMobile ? "2rem" : undefined }}>
      <UserBox
        userId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        location={post.location}
        picturePath={post.userPicturePath}
      />
      {/* <User
        friendId={post.userId}
        name={`${post.firstName} ${post.lastName}`}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
      /> */}
      <Typography color={neutralMain} sx={{ mt: "1rem" }}>
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          src={`http://localhost:3001/assets/${post.picturePath}`}
          width="100%"
          height="auto"
          alt={post.description}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.25rem">
            <IconButton onClick={patchLike}>
              {isLikedByUser ? (
                <FavoriteOutlined sx={{ color: primaryMain }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: primaryMain }} />
              )}
            </IconButton>
            <Typography>{likeAmount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem">
            <IconButton onClick={toggleShowComments}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {showComments && (
        <Box mt="0.5rem">
          {post.comments.map((comment) => (
            <Box key={comment}>
              <Divider />
              <Typography
                sx={{ color: primaryMain, m: "0.5rem 0", pl: "1rem" }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default SinglePost;
