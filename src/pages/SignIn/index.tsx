import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

// Validation schema using Yup
const schema = yup.object().shape({
	email: yup.string().email("Enter a valid email").required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

const SignIn = () => {
	// Initialize useForm hook with yup validation schema
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data: any) => {
		console.log("Form Data:", data);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						fullWidth
						label="Email Address"
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
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
		</Container>
	);
};

export default SignIn;
