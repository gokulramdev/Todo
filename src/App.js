import { useEffect } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./components/routes/PrivateRoute";
import _ from "loadsh";

const theme = createTheme();

function App() {
  const history = useHistory();
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (!_.isEmpty(token)) {
      history.push("/dashboard");
    }
  }, [token]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Switch>
          <Route path="/" component={Login} exact></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
