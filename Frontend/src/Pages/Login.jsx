import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { APIS, useAPI } from "../api/config";
import Swal from "sweetalert2";
// import ThemeProvider from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function Login() {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const [loginUser, loginLoading] = useAPI(APIS.login);
  const [_, setUser] = useContext(UserContext);
  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        // setError(false);
      }, 4000);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("signupButton").disabled = true;
    document.getElementById("signupButton").innerText = "LOADING...";
    const data = new FormData(event.currentTarget);
    loginUser({
      email: data.get("email"),
      password: data.get("password"),
    })
      .then((res) => {
        console.log(res);
        if (res?.code) return Swal.fire("Error", res.message, "error");
        if (res.data.token) {
          if (data.get("email") == "admin@gmail.com")
            localStorage.setItem("admin", "admin@gmail.com");
          else localStorage.setItem("email", data.get("email"));
          setUser({ token: res.data.token });
          return navigate("/user");
        } else {
          Swal.fire({
            title: "Wrong Credentials",
            text: "Please enter correct credentials",
            icon: "error",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        document.getElementById("signupButton").disabled = false;
        document.getElementById("signupButton").innerText = "LOGIN";
      });
    // setUser({ id: email });

    // return navigate("/");
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        className="my-10 passenger-info-form"
      >
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
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error?.email && true}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={
                    error?.email && "User with this email doesnot exists"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error?.password && true}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={error?.password && "Incorrect Password"}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              id="signupButton"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Not Have an Account? Signup Now
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
