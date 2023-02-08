import React, { useState } from "react";
import { Grid, Paper, Avatar, Typography, TextField, Button, Box, Link, Alert, AlertTitle, Backdrop, CircularProgress } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from "../services/AuthService";

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [loadingMessage, setloadingMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must not exceed 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters')
      .max(20, 'Password must not exceed 20 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = data => {

    setloadingMessage("Loading...")
    setAlertType("info")
    setLoading(true)

    AuthService.login(data.username, data.password)
    .then(() => {

      console.log(AuthService.getCurrentUser())
      setloadingMessage("Success")
      setAlertType("success")
      setLoading(false)
      }, (error) => {

        setloadingMessage(error.message)
        setAlertType("error")
        setLoading(false)
        console.log(error.message)
      }
    )
  }

  return (
    <div className="Login">
      <Paper elevation={3}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mt: 3, bgcolor: "purple" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {loadingMessage && (
            <Alert severity={alertType} sx={{ mt: 2}} >
              <AlertTitle> {loadingMessage} </AlertTitle>
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ m: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  name="username"
                  id="username"
                  label="Username"
                  type="text"
                  {...register('username')}
                  error={errors.username ? true : false}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...register('password')}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}  
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;