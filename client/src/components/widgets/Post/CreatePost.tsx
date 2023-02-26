import { FC, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { selectToken, selectUser } from "state/appSlice";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Theme } from "@mui/system";
import { Formik, FormikHelpers } from "formik";
import { typedFetch } from "utils";
import { IPost } from "@/types";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import WidgetWrapper from "../Wrapper";
import FlexBetween from "@/components/FlexBetween";
import UserImage from "../UserImage";
import {
  AttachFileOutlined,
  DeleteOutline,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

type NewPostProps = {
  picturePath: string;
};

type FormValues = {
  description: string;
  image?: File;
};

const initialValues: FormValues = {
  description: "",
};

const validationSchema = yup.object({
  description: yup
    .string()
    .required("Please enter description")
    .min(3, "Description should be 3+ characters long"),
  image: yup.mixed(),
});

const NewPost: FC<NewPostProps> = ({ picturePath }) => {
  const dispatch = useAppDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useAppSelector(selectUser)!;
  const token = useAppSelector(selectToken);

  const isMobile = useMediaQuery(
    (theme: Theme) => `(max-width: ${theme.breakpoints.values["md-lg"]}px)`
  );
  const { medium, mediumMain } = palette.neutral;

  // const handlePostSubmit = useCallback(
  //   async (
  //     { description, image }: FormValues,
  //     helpers: FormikHelpers<FormValues>
  //   ) => {
  //     const formData = new FormData();
  //     formData.append("userId", _id.toString());
  //     formData.append("description", description);
  //     if (image) {
  //       formData.append("picture", image);
  //       formData.append("picturePath", image.name);
  //     }

  //     try {
  //       const savedPost = await typedFetch<IPost>(
  //         "http://localhost:3001/post",
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: formData,
  //         }
  //       );
  //       console.log("[post]", savedPost);
  //       helpers.resetForm();
  //     } catch (err) {
  //       console.error("[post-error]", err);
  //     }
  //   },
  //   []
  // );

  // return <Formik></Formik>;

  const handlePost = useCallback(() => {}, []);

  return (
    <WidgetWrapper>
      <Box display="flex" flexDirection="column" gap="1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              p: "1rem",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Dropzone
            accept={{ image: [".jpg,.jpeg,.png"] }}
            multiple={false}
            onDrop={(acceptedFiles: File[]) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography>Upload post image</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        )}
      </Box>

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined
            sx={{
              color: mediumMain,
            }}
          />
          <Typography
            color={mediumMain}
            sx={{ cursor: "pointer", "&:hover": { color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {!isMobile ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ cursor: "pointer", "&:hover": { color: medium } }}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ cursor: "pointer", "&:hover": { color: medium } }}
              >
                Attachment
              </Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ cursor: "pointer", "&:hover": { color: medium } }}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Save
        </Button>
      </FlexBetween>
    </WidgetWrapper>

    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={handlePostSubmit}
    //   validationSchema={validationSchema}
    // >
    //   {({ values, handleSubmit, handleChange, touched, errors }) => (
    //     <form onSubmit={handleSubmit}>
    //       <TextField
    //         fullWidth
    //         id="description"
    //         name="description"
    //         label="Description"
    //         value={values.description}
    //         onChange={handleChange}
    //         error={touched.description && Boolean(errors.description)}
    //         helperText={touched.description && errors.description}
    //       />
    //       <Dropzone>
    //         {({ getRootProps, getInputProps }) => (
    //           <Box {...getRootProps()}>
    //             123
    //             <input
    //               {...getInputProps()}
    //             />
    //             text text text
    //           </Box>
    //         )}
    //       </Dropzone>
    //     </form>
    //   )}
    // </Formik>
  );
};

export default NewPost;
