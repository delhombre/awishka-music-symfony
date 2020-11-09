/* eslint-disable react/prop-types */
import { CircularProgress, Divider, IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import Axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(6),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = ({ history }) => {
	const classes = useStyles();

	const [state, setState] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { username, email, password, confirmPassword } = state;

	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
		confirm_password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		Axios.post("/apip/users", state)
			// eslint-disable-next-line no-unused-vars
			.then((response) => {
				setLoading(false);
				setErrors({
					username: "",
					email: "",
					password: "",
					confirm_password: "",
				});
				history.replace("/connexion");
			})
			.catch((error) => {
				if (error.response.data.violations) {
					const apiErrors = {};
					error.response.data.violations.forEach((violation) => {
						apiErrors[violation.propertyPath] = violation.message;
					});
					setErrors(apiErrors);
					setLoading(false);
				}
			});
	};

	return (
		<>
			<Container>
				<IconButton
					aria-label="back to homepage"
					onClick={() => {
						history.push("/");
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>{" "}
				Accueil
			</Container>
			<Divider />
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockRoundedIcon fontSize="small" />
					</Avatar>
					<Typography component="h1" variant="h5">
						Inscription
					</Typography>
					<form
						className={classes.form}
						method="POST"
						onSubmit={handleSubmit}
						autoComplete="off"
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									name="username"
									variant="filled"
									required
									error={errors.username ? true : false}
									helperText={errors.username}
									fullWidth
									id="username"
									label="Nom d'utilisateur"
									autoFocus
									value={username}
									onChange={(e) => {
										setState({ ...state, username: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="filled"
									required
									error={errors.email ? true : false}
									helperText={errors.email}
									fullWidth
									id="email"
									label="Adresse Email"
									name="email"
									value={email}
									onChange={(e) => {
										setState({ ...state, email: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="filled"
									required
									error={errors.password ? true : false}
									helperText={errors.password}
									fullWidth
									name="password"
									label="Mot de passe"
									type="password"
									id="password"
									value={password}
									onChange={(e) => {
										setState({ ...state, password: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="filled"
									required
									error={errors.confirm_password ? true : false}
									helperText={errors.confirm_password}
									fullWidth
									name="confirm-password"
									label="Confirmation du mot de passe"
									type="password"
									id="confirm-password"
									value={confirmPassword}
									onChange={(e) => {
										setState({ ...state, confirmPassword: e.target.value });
									}}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							disabled={loading}
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							{(loading && <CircularProgress />) || "M'inscrire"}
						</Button>

						<Grid container justify="flex-end">
							<Grid item>
								<Link
									component="button"
									variant="body2"
									onClick={() => {
										history.push("/connexion");
									}}
								>
									Connexion
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
};

export default SignUp;
