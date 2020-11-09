/* eslint-disable react/prop-types */
import { CircularProgress, Divider, IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import AuthApi from "../services/AuthApi";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(6),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: green[400],
		color: "white",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		color: "white",
		backgroundColor: green[400],
		"&:hover": {
			backgroundColor: green[700],
		},
	},
}));

const Connexion = ({ history }) => {
	const classes = useStyles();

	const [state, setState] = useState({ username: "", password: "" });
	const [error, setError] = useState({ status: false, message: "" });
	const [loading, setLoading] = useState(false);
	const { setIsAuthenticated } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await AuthApi.authenticate(state);
			setError({ status: false, message: "" });
			setIsAuthenticated(true);
			setLoading(false);
			history.replace("/profil");
		} catch (error) {
			setError({
				status: true,
				message:
					"Aucun compte ne possède cette adresse ou les informations saisies ne correspondent pas.",
			});
			setLoading(false);
		}
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
						<LockOpenRoundedIcon fontSize="small" />
					</Avatar>
					<Typography component="h1" variant="h5">
						Connexion
					</Typography>
					<form
						className={classes.form}
						method="POST"
						autoComplete="off"
						onSubmit={handleSubmit}
					>
						<TextField
							variant="filled"
							margin="normal"
							required
							error={error.status}
							helperText={error.message}
							fullWidth
							type="email"
							label="Adresse Email"
							name="email"
							id="email"
							autoFocus
							onChange={(e) => {
								setState({ ...state, username: e.target.value });
							}}
						/>
						<TextField
							variant="filled"
							margin="normal"
							required
							error={error.status}
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							onChange={(e) => {
								setState({ ...state, password: e.target.value });
							}}
						/>
						<Button
							type="submit"
							disabled={loading}
							fullWidth
							variant="contained"
							className={classes.submit}
						>
							{(loading && <CircularProgress color="secondary" />) ||
								"Connexion"}
						</Button>
						<Grid container justify="space-between">
							<Grid item xs>
								<Link
									component="button"
									variant="body2"
									onClick={() => {
										history.push("/mot-de-passe-oublie");
									}}
								>
									Mot de passe oublié?
								</Link>
							</Grid>
							<Grid item>
								<Link
									component="button"
									href="#"
									variant="body2"
									onClick={() => {
										history.push("/inscription");
									}}
								>
									Inscription
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</>
	);
};

export default Connexion;
