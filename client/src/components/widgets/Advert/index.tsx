import FlexBetween from "@/components/FlexBetween";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import WidgetWrapper from "../Wrapper";

const Advert = () => {
  const { palette } = useTheme();
  const {
    neutral: { dark, main, medium },
  } = palette;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="Advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like a light.
      </Typography>
    </WidgetWrapper>
  );
};

export default Advert;
