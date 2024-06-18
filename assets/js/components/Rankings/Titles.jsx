/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
	container: { marginBottom: theme.spacing(2) },
	title: {
		fontSize: "1.5rem",
		fontWeight: 500,
		lineHeight: "normal",
		color: "#122740",
	},
	subtitle: {
		fontSize: "0.875rem",
		lineHeight: "normal",
		color: "#495869",
	},
}));

const Titles = ({ title, subtitle, ...props }) => {
	const classes = useStyles();
	return (
		<div className={classes.container} {...props}>
			<Typography className={classes.title}>{title}</Typography>
			<Typography className={classes.subtitle}>{subtitle}</Typography>
		</div>
	);
};

export default Titles;
