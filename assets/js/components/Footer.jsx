import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: theme.spacing(2),
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[200]
				: theme.palette.grey[800],
	},
	developer: {
		fontSize: "0.75rem",
		color: "#122740",
		paddingTop: theme.spacing(1),
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Awishka Music
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Container>
				<Typography>Tous droits réservés</Typography>
				<Copyright />
				<Typography className={classes.developer}>
					Dévéloppeur:{" "}
					<Link href="https://wa.me/22375604137">Bruno Dogbase.</Link>
				</Typography>
			</Container>
		</footer>
	);
};

export default Footer;
