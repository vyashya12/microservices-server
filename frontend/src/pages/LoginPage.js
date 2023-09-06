import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Divider,
  Stack,
  TextField,
  InputAdornment,
  Checkbox,
  IconButton,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
// components
import Iconify from "../components/iconify/Iconify";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import jwt from "jwt-decode";
import { Config } from "../config";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "12px",
}));

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [inputLogin, setInputLogin] = useState({});

  const onChangeHandler = (e) => {
    setInputLogin((prev) => ({
      ...inputLogin,
      ...{ [e.target.name]: e.target.value },
    }));
  };

  const validReponse = (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      const user = jwt(data.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard", { replace: true });
    } else {
      setError(true);
      setHelperText("Something wrong Bang, Check your password see");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Object.keys(inputLogin).length === 0) {
      setError(true);
      setHelperText("Fill your input lah Bro!!");
    } else {
      // fetch(`${process.env.REACT_APP_URL}api/servers/login`, {
      console.log(Config.api_url);
      fetch(`${process.env.REACT_APP_URL}api/servers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputLogin),
      })
        .then((data) => data.json())
        .then((data) => validReponse(data));

      inputLogin.Password = "";
    }
  };
  return (
    <>
      <Helmet>
        <title> Login | Monitoring Dashboard </title>
      </Helmet>
      <StyledContent>
        <Container maxWidth="sm">
          <img
            style={{
              alignItems: "center",
              backgroundColor: "#F2F2FF",
              borderRadius: "30px",
              objectFit: "cover",
            }}
            src={require("../images/digiexa.png")}
            alt="Exabytes Secure Banner"
            width="440px"
            height="180px"
          />
          <Divider sx={{ my: 3 }}></Divider>
          <form>
            <Stack spacing={3}>
              <TextField
                name="Email"
                label="Email address"
                error={error}
                required={true}
                onChange={onChangeHandler}
              />

              <TextField
                name="Password"
                label="Password"
                error={error}
                required={true}
                type={showPassword ? "text" : "password"}
                onChange={onChangeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={<Checkbox size="small" />}
                label="Remember me"
              />
              <Link variant="subtitle2" underline="hover">
                Forgot password?
              </Link>
            </Stack>
            <FormHelperText
              sx={{ textAlign: "center", color: "red", fontSize: "16px" }}
            >
              {helperText}
            </FormHelperText>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={onSubmitHandler}
            >
              Login
            </LoadingButton>
          </form>
        </Container>
      </StyledContent>
    </>
  );
}

export default LoginPage;
