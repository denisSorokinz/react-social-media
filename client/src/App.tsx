import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { themeSettings } from "theme/theme";
import Home from "views/Home";
import Login from "views/Login";
import Profile from "views/Profile";
import Logout from "views/Logout";
import Navbar from "./components/Navbar";
import { selectMode, selectUser } from "state/appSlice";

function App() {
  const mode = useSelector(selectMode);
  const user = useSelector(selectUser);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/logout" element={<Logout />} />
              </>
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/profile/:userId" element={<Profile />} />

            <Route path="*" element={<Navigate to='/' />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
