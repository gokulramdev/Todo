import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Grid, TextField } from "@mui/material";
import Api from "../services/Api";
import { toast } from "react-toastify";

const initialValues = {
  id: "",
  title: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
});

export default function TodoForm(props) {
  const { Get } = props;
  const onSubmit = (data) => {
    Api.post("todos/create", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          toast.success("Todo Created Successfully");
          Get();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form autoComplete="off">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item sm={12}>
              <Field
                name="title"
                as={TextField}
                label="Title"
                variant="outlined"
                required
                size="small"
              />
              <ErrorMessage name="name">
                {(error) => <div className="error">{error}</div>}
              </ErrorMessage>
            </Grid>
            <Grid item sm={12}>
              <Button type="submit" variant="contained" color="primary">
                submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
}
