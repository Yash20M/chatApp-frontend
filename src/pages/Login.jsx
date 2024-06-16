import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../Components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducer/auth";
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single", 3);

  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    const toastId = toast.loading("Loading....");

    e.preventDefault();
    setisLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
      setisLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  const handleLogin = async (e) => {
    const toastId = toast.loading("Loading....");

    e.preventDefault();
    setisLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(
        data.message,
        { id: toastId },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            padding: "1vw 2vw",
            fontSize: "1vw",
          },
        }
      );
      setIsLogin(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Someting went wrong",
        { id: toastId },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            padding: "1vw 2vw",
            fontSize: "1vw",
          },
        }
      );
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,200,200,0.5), rgba(120,110,220,0.5))",
        }}
      >
        <Container
          component={"main"}
          maxWidth="xs"
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLogin ? (
              <>
                <Typography variant="h5">Login</Typography>

                <form style={{ width: "100%" }} onSubmit={handleLogin}>
                  <TextField
                    required
                    fullWidth
                    label="username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />

                  <TextField
                    required
                    fullWidth
                    type="password"
                    autoComplete="off"
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />

                  <Button
                    sx={{ marginTop: "1rem" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? "Please Wait..." : "Login"}
                  </Button>

                  <Typography textAlign="center" m="1rem">
                    Or
                  </Typography>
                  <Button
                    variant="text"
                    fullWidth
                    onClick={() => setIsLogin(false)}
                    disabled={isLoading}
                  >
                    Sign Up
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h5">Sign Up</Typography>

                <form style={{ width: "100%" }} onSubmit={handleSignup}>
                  <Stack position="relative" width="8rem" margin="auto">
                    <Avatar
                      sx={{ width: "8rem", height: "8rem", objectFit: "cover" }}
                      src={avatar.preview}
                    />

                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        ":hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                      component="label"
                    >
                      <>
                        <CameraAlt />
                        <VisuallyHiddenInput
                          type="file"
                          onChange={avatar.changeHandler}
                          accept="png/jpg/jpeg"
                        />
                      </>
                    </IconButton>
                  </Stack>
                  {avatar.error && (
                    <>
                      <Typography
                        color="error"
                        variant="caption"
                        margin="1rem"
                        width={"fullWidth"}
                        fontWeight={600}
                        textAlign={"center"}
                        display={"block"}
                      >
                        {avatar.error}
                      </Typography>
                    </>
                  )}

                  <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={name.value}
                    onChange={name.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  {username.error && (
                    <>
                      <Typography
                        color="error"
                        variant="caption"
                        fontWeight={600}
                      >
                        {username.error}
                      </Typography>
                    </>
                  )}
                  <TextField
                    required
                    fullWidth
                    type="password"
                    autoComplete="off"
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  <Button
                    sx={{ marginTop: "1rem" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </Button>

                  <Typography textAlign="center" m="1rem">
                    Or
                  </Typography>
                  <Button
                    variant="text"
                    fullWidth
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Login;
