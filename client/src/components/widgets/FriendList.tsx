import { FC, useCallback, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { friendsUpdated, selectToken, selectUser } from "state/appSlice";
import { typedFetch } from "utils";
import { IUser } from "types";
import WidgetWrapper from "./Wrapper";
import UserBox from "./UserBox";

type FriendListProps = {
  userId: string;
};

const FriendList: FC<FriendListProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken)!;
  const { friends } = useAppSelector(selectUser)!;
  const { palette } = useTheme();
  const {
    neutral: { dark },
  } = palette;

  const getFriends = useCallback(async () => {
    const data = await typedFetch<IUser[]>(
      `http://localhost:3001/users/${userId}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }, [userId, token]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFriends();
        console.log("[get-friends]", data);
        
        dispatch(friendsUpdated(data));
      } catch (err: any) {
        console.error("[get-friends]", err);
      }
    })();
  }, [userId, token]);

  return (
    <WidgetWrapper>
      <Typography
        color={dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1rem">
        {friends.map((friend) => (
          <UserBox
            key={friend._id}
            userId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            {...friend}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendList;
