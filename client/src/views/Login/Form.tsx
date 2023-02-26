import FlexBetween from "components/FlexBetween";
import {
  Box,
  Button,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import { EditOutlined } from "@mui/icons-material";
import * as yup from "yup";
import { useCallback, useMemo, useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { loggedIn, selectUser } from "state/appSlice";
import { IUser } from "types";
import { typedFetch } from "@/utils";

enum LoginPageTypes {
  "REGISTER",
  "LOGIN",
}

type FormValues = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  occupation?: string;
  picture?: File;
};

type initialValuesType = {
  [k in LoginPageTypes]: FormValues;
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
    picture: undefined,
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
    picture: yup.mixed().required("File is required"),
  },
};
type a = keyof FormValues[];

const Form = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pageType, setPageType] = useState<LoginPageTypes>(
    LoginPageTypes.LOGIN
  );
  const togglePageType = useCallback(
    (resetForm: () => void) => {
      setPageType(
        pageType === LoginPageTypes.LOGIN
          ? LoginPageTypes.REGISTER
          : LoginPageTypes.LOGIN
      );
      resetForm();
    },
    [pageType]
  );

  const register = useCallback(
    async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      const formData = new FormData();
      (Object.keys(values) as (keyof FormValues)[]).forEach((key) =>
        formData.append(key, values[key]!)
      );
      formData.append("picturePath", values.picture!.name);

      // const savedUser = await (
      //   await fetch("http://localhost:3001/auth/register", {
      //     method: "POST",
      //     body: formData,
      //   })
      // ).json();

      try {
        const savedUser = await typedFetch<IUser>(
          "http://localhost:3001/auth/register",
          {
            method: "POST",
            body: formData,
          }
        );
        helpers.resetForm();
        console.log("[register]", savedUser);
        if (savedUser) {
          setPageType(LoginPageTypes.LOGIN);
        }
      } catch (err) {
        console.error("[register-error]", err);
      }
    },
    []
  );

  const login = useCallback(
    async (values: FormValues, onSubmitProps: FormikHelpers<FormValues>) => {
      console.log("[values]", values);

      const data = await (
        await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
      ).json();
      // onSubmitProps.resetForm();

      console.log("[login]", data);

      if (data && !data.message) {
        dispatch(loggedIn(data));
        navigate("/home");
      }
    },
    []
  );

  const { palette } = useTheme();
  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    if (pageType === LoginPageTypes.REGISTER) register(values, onSubmitProps);
    if (pageType === LoginPageTypes.LOGIN) login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues[pageType]}
      validationSchema={yup.object(validationSchemas[pageType])}
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{ "& > div": { gridColumn: isMobile ? "span 2" : null } }}
          >
            {pageType === LoginPageTypes.REGISTER && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={touched.occupation && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box
                  gridColumn="span 2"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  padding="1rem"
                >
                  <Dropzone
                    accept={{ image: [".jpg,.jpeg,.png"] }}
                    multiple={false}
                    onDrop={(acceptedFiles: File[]) => {
                      console.log("[acceptedFiles]", acceptedFiles);
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        padding="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography variant="body1">
                            Add Picture Here
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography variant="body1">
                              {values.picture.name}
                            </Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}

            {pageType === LoginPageTypes.LOGIN && (
              <>
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 1" }}
                />
              </>
            )}
          </Box>

          {/* Buttons */}
          <Box>
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
            >
              {pageType === LoginPageTypes.LOGIN && "Login"}
              {pageType === LoginPageTypes.REGISTER && "Register"}
            </Button>
            <Typography
              onClick={() => togglePageType(resetForm)}
              sx={{
                cursor: "pointer",
                color: palette.primary.main,
                textDecoration: `underline ${palette.primary.main} dashed`,
                textUnderlineOffset: "4px",
              }}
            >
              {pageType === LoginPageTypes.LOGIN &&
                "Don't have an account? Register"}
              {pageType === LoginPageTypes.REGISTER &&
                "Already have an account? Login"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
