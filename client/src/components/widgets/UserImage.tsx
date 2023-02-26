import { FC } from "react";
import { Box } from "@mui/material";

type UserImageProps = {
  image: string;
  size?: string;
};

const UserImage: FC<UserImageProps> = ({ image, size = "60px" }) => {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
