/* eslint-disable react/prop-types */
import {
	Button,
	CircularProgress,
	Container,
	Grid,
	TextField,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import AuthApi from "../../services/AuthApi";

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	accordion: {
		marginBottom: theme.spacing(3),
	},
}));

const MyAccordion = ({ userId, history }) => {
	const classes = useStyles();

	const [username, setUsername] = useState("");

	const { logout } = AuthApi;

	const [uLoading, setUloading] = useState(false);

	const updateUsername = (e) => {
		e.preventDefault();

		setUloading(true);

		Axios.patch(
			`/apip/users/${userId}`,
			{ username },
			{ headers: { "content-Type": "application/merge-patch+json" } }
		)
			.then((response) => {
				setUloading(false);
				console.log(response.data);
				toast.success(
					"Votre nom d'utilisateur a bien été modifié. Veuillez vous réconnecter 😎"
				);

				logout();

				history.replace("/connexion");
			})
			.catch(() => {
				setUloading(false);
				toast.error("Une erreur s'est produite. Réessayez plus tard.");
			});
	};

	const [password, setPassword] = useState("");

	const [pLoading, setPloading] = useState(false);

	const updatePassword = (e) => {
		e.preventDefault();

		setPloading(true);

		Axios.put(`/apip/users/${userId}`, { password })
			.then(() => {
				setPloading(false);

				toast.success("Mot de passe modifié avec succès 👌");

				logout();

				history.replace("/connexion");
			})
			.catch((error) => {
				setPloading(false);

				toast.error(
					error.response.data.violations
						? "Votre mot de passe est trop court. Minimum 8 caractères."
						: "Une erreur s'est produite. Réessayez plus tard."
				);
			});
	};

	return (
		<Container maxWidth="sm" className={classes.accordion}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>
						{"Changer mon nom d'utilisateur"}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<form
						className={classes.form}
						method="PUT"
						autoComplete="off"
						onSubmit={updateUsername}
					>
						<Grid container spacing={1} wrap="nowrap" alignItems="center">
							<Grid item>
								<TextField
									variant="filled"
									required
									fullWidth
									type="text"
									label="Nom d'utilisateur"
									name="username"
									id="email"
									autoFocus
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
									}}
								/>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									type="submit"
									disabled={uLoading}
								>
									{!uLoading ? <SendRoundedIcon /> : <CircularProgress />}
								</Button>
							</Grid>
						</Grid>
					</form>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2a-content"
					id="panel2a-header"
				>
					<Typography className={classes.heading}>
						Changer mon mot de passe
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<form
						className={classes.form}
						method="PUT"
						autoComplete="off"
						onSubmit={updatePassword}
					>
						<Grid container spacing={1} wrap="nowrap" alignItems="center">
							<Grid item>
								<TextField
									variant="filled"
									required
									fullWidth
									type="password"
									label="Votre nouveau mot de passe"
									name="password"
									id="password"
									autoFocus
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									type="submit"
									disabled={pLoading}
								>
									{pLoading ? <CircularProgress /> : <SendRoundedIcon />}
								</Button>
							</Grid>
						</Grid>
					</form>
				</AccordionDetails>
			</Accordion>
		</Container>
	);
};

export default withRouter(MyAccordion);
