/* eslint-disable react/prop-types */
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
	container: {
		justifyContent: "center",
		// alignItems: "center",
		display: "flex",
		// height: "75%",
		flexDirection: "column",
		textAlign: "center",
		padding: theme.spacing(5, 0),
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
}));

const PageTitle = ({ title, subtitle }) => {
	const classes = useStyles();

	return (
		<>
			<Container className={classes.container}>
				<Typography variant="h1" className={classes.title}>
					{title}
				</Typography>
				<Typography variant="h2" className={classes.subtitle}>
					{subtitle}
				</Typography>
			</Container>
		</>
	);
};

export default PageTitle;
