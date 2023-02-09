import React, { useState } from "react";
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
    Box,
    Link,
    Alert,
    AlertTitle,
    Backdrop,
    CircularProgress,
    FormControlLabel,
    Checkbox,
    FormGroup,
    FormControl,
    FormLabel,
    FormHelperText
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthService from "../services/AuthService";
import { Container } from "@mui/system";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [loadingMessage, setloadingMessage] = useState("");

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        username: Yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must not exceed 20 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password must be at least 4 characters")
            .max(20, "Password must not exceed 20 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf(
                [Yup.ref("password"), null],
                "Confirm Password does not match"
            ),
        role: Yup.array()
            .min(1, "Choose minimum one role").of(Yup.string().required())
            .required("Choose minimum one role").nullable(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const onSubmit = (data) => {
        setloadingMessage("Loading...");
        setAlertType("info");
        setLoading(true);
        console.log(data)
        AuthService.register(data.username, data.email, data.password, data.role).then(
            () => {
                navigate("/home");
                window.location.reload();
            },
            (error) => {
                setloadingMessage(error.message);
                setAlertType("error");
                setLoading(false);
                console.log(error.message);
            }
        );
    };

    return (
        <Container maxWidth="sm" sx={{ mb: 4 }}>
            <Paper elevation={3}>
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
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
                        <PersonAddOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {loadingMessage && (
                        <Alert severity={alertType} sx={{ mt: 2 }}>
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
                                    {...register("username")}
                                    error={errors.username ? true : false}
                                    helperText={errors.username?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    required
                                    fullWidth
                                    name="email"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    {...register("email")}
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
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
                                    {...register("password")}
                                    error={errors.password ? true : false}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="ConfirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    {...register("confirmPassword")}
                                    error={
                                        errors.confirmPassword ? true : false
                                    }
                                    helperText={errors.confirmPassword?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    error={errors.role ? true : false}
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormLabel component="legend">Choose role</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            value="ROLE_ADMIN"
                                            {...register("role")}
                                            control={<Checkbox />}
                                            label="Admin"
                                        />
                                        <FormControlLabel
                                            value="ROLE_USER"
                                            {...register("role")}
                                            control={<Checkbox />}
                                            label="User"
                                        />
                                    </FormGroup>
                                    <FormHelperText>{errors.role?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
