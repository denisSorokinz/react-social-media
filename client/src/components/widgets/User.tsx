import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "types";
import {
  ManageAccountsOutlined,
  WorkOutlineOutlined,
  LocationOnOutlined,
  EditOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/widgets/Wrapper";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage";

type UserProps = {
  user: IUser;
};

const User: FC<UserProps> = ({ user }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={user.picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={palette.neutral.dark}
              fontWeight="500"
              sx={{
                cursor: "pointer",
                "&:hover": { color: palette.primary.light },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={palette.neutral.medium}>
              {user.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0 0.5rem">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: palette.neutral.main }}
          />
          <Typography color={palette.neutral.medium}>
            {user.location}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{ color: palette.neutral.main }}
          />
          <Typography color={palette.neutral.medium}>
            {user.occupation}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0 0.5rem">
        <FlexBetween mb="0.5rem">
          <Typography color={palette.neutral.medium}>
            Who's viewed your profile
          </Typography>
          <Typography color={palette.neutral.main} fontWeight="500">
            {user.viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={palette.neutral.medium}>
            Post impressions
          </Typography>
          <Typography color={palette.neutral.main} fontWeight="500">
            {user.impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={palette.neutral.main}
          fontWeight="500"
          mb="1rem"
        >
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/twitter.png" alt="Twitter" />
            <Box>
              <Typography color={palette.neutral.main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={palette.neutral.medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: palette.neutral.main }} />
        </FlexBetween>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="/assets/linkedin.png" alt="LinkedIn" />
            <Box>
              <Typography color={palette.neutral.main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={palette.neutral.medium}>
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: palette.neutral.main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default User;
