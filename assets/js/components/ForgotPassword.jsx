/* eslint-disable react/prop-types */
import { Divider, IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import React from "react";

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

const ForgotPassword = ({ history }) => {
	const classes = useStyles();

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
						<HelpOutlineRoundedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Mot de passe oublié? Renseignez votre adresse email
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="filled"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Adresse Email"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}
						>
							Envoyer
						</Button>
					</form>
				</div>
			</Container>
		</>
	);
};

export default ForgotPassword;
