import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid, IconButton } from "@mui/material";
import TodoForm from "./TodoForm";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../services/Api";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [todoList, SetTodoList] = useState([]);

  useEffect(() => {
    GetAllTodo();
  }, []);

  const GetAllTodo = () => {
    Api.get(`todos/all`).then((res) => {
      SetTodoList(res.data);
    });
  };

  const DeleteTodo = (todo) => {
    Api.delete(`todos/${todo._id}`).then((res) => {
      console.log(res.data);
      toast.success("Todo Deleted Successfully");
      GetAllTodo();
    });
  };

  return (
    <div className="dashboard">
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <TodoForm Get={GetAllTodo} />
        </Grid>

        <Grid container item sm={12} spacing={4}>
          {todoList.map((todo) => (
            <>
              <Grid item sm={4}>
                <Card>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {todo.title}
                    </Typography>
                    <IconButton onClick={() => DeleteTodo(todo)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
