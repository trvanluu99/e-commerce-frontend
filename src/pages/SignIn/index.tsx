import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signIn, selectUser, selectApiResStatus } from "../../redux/slices/userSlice";
import { SignInData } from "../../interfaces/user";
import { toast } from "react-toastify";

// Validation schema using Yup
const schema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup
		.string()
		.min(3, "Password must be at least 3 characters")
		.required("Password is required")
});

const SignIn = () => {
	// States
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const userApiResStatus = useAppSelector(selectApiResStatus);

	// Initialize useForm hook with yup validation schema
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	// useEffect hooks
	useEffect(() => {
		if (userApiResStatus === "failed") {
			toast.error("Sign in failed!");
		}
	}, [userApiResStatus]);

	// Functions
	const onSubmit = (signInData: SignInData) => {
		dispatch(signIn(signInData));
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center"
				}}
			>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						fullWidth
						label="Username"
						{...register("username")}
						error={!!errors.username}
						helperText={errors.username?.message}
					/>
					<TextField
						margin="normal"
						fullWidth
						label="Password"
						type="password"
						{...register("password")}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
				</Box>
			</Box>
			<Typography component="h1">User: {user}</Typography>
		</Container>
	);
};

export default SignIn;
