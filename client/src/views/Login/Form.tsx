import { useAppDispatch } from "@/state/hooks";
import { Box, TextField, Theme, useMediaQuery, useTheme } from "@mui/material";
import { Field, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";

enum LoginPageTypes {
  "REGISTER",
  "LOGIN",
}

type initialValuesType = {
  [k in LoginPageTypes]: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    occupation?: string;
    picture?: string;
  };
};

const initialValues: initialValuesType = {
  [LoginPageTypes.LOGIN]: {
    email: "",
    password: "",
  },
  [LoginPageTypes.REGISTER]: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
    picture: "",
  },
};

const validationSchemas = {
  [LoginPageTypes.LOGIN]: {
    email: yup.string().email("Enter a valid email").required("Enter data"),
    password: yup
      .string()
      .min(8, "Password should be 8+ characters long")
      .matches(/[a-zA-Z]/, "Password should contain Latin letters only")
      .required("Enter data"),
  },
  [LoginPageTypes.REGISTER]: {
    firstName: yup.string().required("Enter data"),
    lastName: yup.string().required("Enter data"),
    email: yup.string().email("Enter a valid email").required("Enter data"),
    password: yup
      .string()
      .min(8, "Password should be 8+ characters long")
      .matches(/[a-zA-Z]/, "Password should contain Latin letters only")
      .required("Enter data"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords should match"),
    location: yup.string().required("Enter data"),
    occupation: yup.string().required("Enter data"),
    picture: yup.string().required("Enter data"),
  },
};

const Form = () => {
  const [pageType, setPageType] = useState<LoginPageTypes>(
    LoginPageTypes.LOGIN
  );
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  const handleFormSubmit = async (values, props) => {};

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues[pageType]}
      validationSchema={validationSchemas[pageType]}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isMobile ? "span 2" : null } }}
          >
            {pageType === LoginPageTypes.LOGIN && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={touched.firstName && Boolean(errors.firstName)}
                />
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
