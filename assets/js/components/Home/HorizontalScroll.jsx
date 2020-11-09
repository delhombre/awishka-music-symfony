/* eslint-disable react/prop-types */
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: "auto",
		whiteSpace: "nowrap",
		marginBottom: theme.spacing(2),
		WebkitOverflowScrolling: "touch",
	},
}));

const HorizontalScroll = (props) => {
	const classes = useStyles();

	return <div className={classes.root}>{props.children}</div>;
};

export default HorizontalScroll;
