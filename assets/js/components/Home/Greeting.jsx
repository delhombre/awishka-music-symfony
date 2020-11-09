import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import React, { useContext } from "react";
import RouteContext from "../RouteContext";

const useStyles = makeStyles((theme) => ({
	container: {
		justifyContent: "center",
		// alignItems: "center",
		display: "flex",
		height: "75%",
		flexDirection: "column",
		textAlign: "center",
	},
	title: {
		fontSize: "1.7rem",
		fontWeight: 600,
		color: "white",
		padding: theme.spacing(3, 0),
		lineHeight: 1.3,
	},
	subtitle: {
		fontSize: "1.2rem",
		color: "white",
		padding: theme.spacing(2, 0),
	},
	link: {
		padding: theme.spacing(1, 0),
	},
}));

const Greeting = () => {
	const classes = useStyles();

	const routeValue = useContext(RouteContext);

	return (
		<>
			<div className={classes.container}>
				<Container>
					<Typography variant="h1" className={classes.title}>
						Vivez la musique comme jamais sur votre nouvelle plateforme.
					</Typography>
					<Typography variant="h2" className={classes.subtitle}>
						Téléchargez en un clic la musique de vos artistes.
					</Typography>
					<Link
						component="button"
						className={classes.link}
						onClick={() => {
							routeValue.updateTab("", 1);
						}}
					>
						<Typography component="span" style={{ fontSize: "1rem" }}>
							Commencer
						</Typography>
						<ChevronRightRoundedIcon style={{ verticalAlign: "middle" }} />
					</Link>
				</Container>
			</div>
		</>
	);
};

export default Greeting;
