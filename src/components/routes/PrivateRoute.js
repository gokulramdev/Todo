import React from "react";
import { Redirect, Route } from "react-router-dom";
import _ from "loadsh";
import Header from "../Header/Header";

const PrivateRoute = ({ component, ...rest }) => {
  let RenderComponents = component;
  let token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        return !_.isEmpty(token) ? (
          <>
            <Header />
            <RenderComponents {...props} />
          </>
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
