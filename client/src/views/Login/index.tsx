import { Box, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.alt}
        p="1rem 5%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        ></Typography>
      </Box>

      <Box
        width={!isMobile ? "50%" : "93%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ marginBottom: "1.5rem" }}
        >
          Welcome to Sociopedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
