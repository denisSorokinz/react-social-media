import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

import { FC } from "react";
import FlexBetween from "../FlexBetween";
import { loggedOut, toggleMode } from "state/appSlice";
import { useAppDispatch } from "state/hooks";
import {
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
} from "@mui/icons-material";

type MenuItemsProps = {
  direction: "horizontal" | "vertical";
  darkColor: string;
  neutralLightColor: string;
  fullName: string;
};

const MenuItems: FC<MenuItemsProps> = ({
  direction,
  darkColor,
  neutralLightColor,
  fullName,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const containerStyles = {
    gap: direction === "horizontal" ? "2rem" : "3rem",
    flexDirection: direction === "horizontal" ? "row" : "column",
    justifyContent: direction === "horizontal" ? "space-between" : "center",
  };

  return (
    <FlexBetween sx={containerStyles}>
      <IconButton onClick={() => dispatch(toggleMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: darkColor, fontSize: "25px" }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} />
      <Notifications sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard">
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLightColor,
            width: "150px",
            borderRadius: "0.25rem",
            padding: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              width: "3rem",
              paddingRight: "0.25rem",
            },
            "& .Mui-select:focus": {
              backgroundColor: neutralLightColor,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(loggedOut)}>
            <Typography>Log Out</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );
};

export default MenuItems;
