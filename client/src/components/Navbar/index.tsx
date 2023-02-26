import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import FlexBetween from "../FlexBetween";
import { useNavigate } from "react-router-dom";

import { useCallback, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "state/hooks";
import { loggedOut, selectUser, toggleMode } from "state/appSlice";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  const theme = useTheme();
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const darkColor = theme.palette.neutral.dark;

  const fullName = useMemo(
    () => `${user?.firstName} ${user?.lastName}`,
    [user]
  );

  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuToggled(!isMobileMenuToggled),
    [isMobileMenuToggled]
  );

  return (
    <FlexBetween padding="1rem 5%" bgcolor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {!isMobile && (
          <FlexBetween
            bgcolor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {!isMobile ? (
        <MenuItems
          direction="horizontal"
          darkColor={darkColor}
          neutralLightColor={neutralLight}
          fullName={fullName}
        />
      ) : (
        <IconButton onClick={toggleMobileMenu}>
          <Menu />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {isMobile && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bgcolor={background}
        >
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton onClick={toggleMobileMenu}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <MenuItems
            direction="vertical"
            darkColor={darkColor}
            neutralLightColor={neutralLight}
            fullName={fullName}
          />
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
