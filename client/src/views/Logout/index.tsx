import { loggedOut } from "state/appSlice";
import { useAppDispatch } from "state/hooks";
import {
  Box,
  Button,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCallback } from "react";

const Logout = () => {
  const dispatch = useAppDispatch();
  
  const { palette } = useTheme();
  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  const handleLogoutClick = useCallback(
    () => dispatch(loggedOut()),
    [],
  )

  return (
    <Box>
      <Box
        width="100%"
        bgcolor={palette.background.alt}
        p="1rem 5%"
        textAlign="center"
      >
        <Button
          fullWidth
          type="submit"
          sx={{
            margin: "2rem 0",
            padding: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
          onClick={handleLogoutClick}
        >
          LOGOUT
        </Button>
      </Box>
    </Box>
  );
};

export default Logout;
