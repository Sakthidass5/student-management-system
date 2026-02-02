import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup .string() .email("Please enter a valid email address") .required("Email is required"), password: yup .string() .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  name: yup .string() .min(3, "Name must be at least 3 characters") .max(30, "Name must be at most 30 characters") .required("Name is required"), email: yup .string() .email("Please enter a valid email address") .required("Email is required"), password: yup .string() .required("Password is required") .min(6, "Password must be at least 6 characters") .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/, "Password must contain at least one uppercase, one lowercase, and one special character" ),
});




export const studentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  className: yup
    .string()
    .matches(/^[0-9]+[A-Z]$/, "Class name must be like 10A, 9B")
    .required("Class is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Gender must be male or female")
    .required("Gender is required"),
  photo: yup
    .mixed()
    .required("Profile photo is required")
    .test("fileSize", "File size too large", (value) => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    }),
});
