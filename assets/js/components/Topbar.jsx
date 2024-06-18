/* eslint-disable react/prop-types */
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../../images/logos/logo.png";

const useStyles = makeStyles(() => ({
	appbar: {
		backgroundColor: "rgba(0, 0, 0, 0.92)",
		color: "white",
		boxShadow: "none",
	},
	logo: {
		margin: "auto",
		width: 50,
		height: 50,
		"&>img": {
			width: 50,
			height: 50,
		},
	},
}));

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

const Topbar = (props) => {
	const classes = useStyles();

	const { onOpen } = props;
	const { history } = props;

	const handleClick = () => {
		history.push("/search");
	};

	return (
		<>
			<div style={{ display: "flex" }}>
				<HideOnScroll {...props}>
					<AppBar className={classes.appbar}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="open drawer"
								onClick={onOpen(true)}
								onKeyDown={onOpen(true)}
							>
								<MenuIcon />
							</IconButton>
							<figure className={classes.logo}>
								<img src={logo} alt="logo" />
							</figure>
							<IconButton
								edge="end"
								color="inherit"
								aria-label="show searchbar"
								onClick={handleClick}
							>
								<SearchIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
				</HideOnScroll>
				<Toolbar />
			</div>
		</>
	);
};

export default withRouter(Topbar);
