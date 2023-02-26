import { FC, useCallback } from "react";
import { selectToken, selectUser, friendsUpdated } from "@/state/appSlice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { typedFetch } from "@/utils";
import { IUser } from "@/types";
import FlexBetween from "../FlexBetween";
import UserImage from "./UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

type UserBoxProps = {
  userId: string;
  name: string;
  location: string;
  picturePath: string;
};

const UserBox: FC<UserBoxProps> = ({ userId, name, location, picturePath }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken)!;
  const { _id: loggedInUserId, friends } = useAppSelector(selectUser)!;

  const isFriend = friends.find((friend) => (friend._id === userId));
  const patchFriend = useCallback(async () => {
    try {
      const data = await typedFetch<IUser[]>(
        `http://localhost:3001/users/${loggedInUserId}/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ friendId: userId }),
        }
      );
      console.log("[data]", data);
      
      dispatch(friendsUpdated(data));
    } catch (err: any) {
      console.error("[friend-error]", err);
    }
  }, [userId, userId]);

  const { palette } = useTheme();
  const {
    primary: { light, dark },
    neutral: { main, medium },
  } = palette;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${userId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{ cursor: "pointer", "&:hover": { light } }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={patchFriend}
        sx={{ backgroundColor: light, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: dark }} />
        ) : (
          <PersonAddOutlined sx={{ color: dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default UserBox;
