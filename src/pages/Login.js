import * as React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import {
  TextField,
  Avatar,
  Button,
  CssBaseline,
  FormHelperText,
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Api from "../services/Api";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .strict()
      .trim()
      .required("Please Enter the Mail")
      .email("Enter correct Format"),
    password: yup
      .string()
      .strict()
      .trim()
      .required("Please Enter the Password"),
  });

  const onSubmit = (data) => {
    Api.post("users/login", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("token", res.data);
          toast.success("Login Successfully");
          history.push(`/dashboard`);
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg)
        toast.error(err.response.data.msg);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1, width: 400 }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form autoComplete="off">
              <Field
                as={TextField}
                name="email"
                label="Email *"
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <FormHelperText>
                <ErrorMessage name="email">
                  {(error) => <div className="error">{error}</div>}
                </ErrorMessage>
              </FormHelperText>
              <Field
                as={TextField}
                name="password"
                label="Password *"
                variant="outlined"
                margin="normal"
                type="password"
                fullWidth
              />
              <FormHelperText>
                <ErrorMessage name="password">
                  {(error) => <div className="error">{error}</div>}
                </ErrorMessage>
              </FormHelperText>
              <Button
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Form>
          </Formik>
          <Grid container>
            <Grid item xs={12}>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
