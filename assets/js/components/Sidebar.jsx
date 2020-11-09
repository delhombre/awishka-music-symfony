/* eslint-disable react/prop-types */
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import AlbumRoundedIcon from "@material-ui/icons/AlbumRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import ContactSupportRoundedIcon from "@material-ui/icons/ContactSupportRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import PlaylistPlayRoundedIcon from "@material-ui/icons/PlaylistPlayRounded";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import logo2 from "../../images/logos/logo2.png";
import AuthContext from "../contexts/AuthContext";
import AuthApi from "../services/AuthApi";
import RouteContext from "./RouteContext";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 256,
	},
	logo: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		padding: theme.spacing(1, 0),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "center",
	},
}));

const Sidebar = ({ open, onOpen, history }) => {
	const classes = useStyles();

	const routeValue = useContext(RouteContext);
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const handleLogout = () => {
		AuthApi.logout();
		setIsAuthenticated(false);
		history.push("/");
	};

	const navs = [
		{
			name: "Accueil",
			icon: <HomeRoundedIcon />,
			onClick: () => {
				routeValue.updateTab("", 0);
			},
		},
		{
			name: "Playlist",
			icon: <PlaylistPlayRoundedIcon />,
			onClick: () => {
				routeValue.updateTab("", 1);
			},
		},
		{
			name: "Artistes",
			icon: <PersonRoundedIcon />,
			onClick: () => {
				routeValue.updateTab("", 2);
			},
		},
		{
			name: "Classements",
			icon: <TrendingUpRoundedIcon />,
			onClick: () => {
				routeValue.updateTab("", 3);
			},
		},
		{
			name: "Albums",
			icon: <AlbumRoundedIcon />,
			onClick: () => {
				routeValue.updateTab("", 4);
			},
		},
		// {
		// 	name: "Événements",
		// 	icon: <EventNoteRoundedIcon />,
		// 	onClick: () => {
		// 		routeValue.updateTab("", 5);
		// 	},
		// },
		{
			name: "Catégories",
			icon: <CategoryRoundedIcon />,
			onClick: () => {
				routeValue.updateTab("", 5);
			},
		},
	];

	return (
		<>
			<Drawer
				variant="temporary"
				anchor="left"
				open={open}
				onClose={onOpen(false)}
			>
				<div className={classes.root}>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							padding: 8,
							background: "rgba(0, 0, 0, 0.92)",
						}}
					>
						<IconButton
							aria-label="close drawer"
							onClick={onOpen(false)}
							style={{ color: "white" }}
						>
							<KeyboardBackspaceIcon />
						</IconButton>
					</div>
					<div className={classes.logo}>
						<img width={70} height={70} src={logo2} alt="logo" />
						<Typography>awishka music</Typography>
					</div>
					<Divider />
					<List component="nav" aria-label="main navigation">
						{navs.map((item, index) => (
							<ListItem button key={index} onClick={item.onClick}>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.name} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List component="nav" aria-label="account navigation">
						{(!isAuthenticated && (
							<>
								<ListItem button onClick={() => history.push("/connexion")}>
									<ListItemIcon>
										<LockOpenRoundedIcon />
									</ListItemIcon>
									<ListItemText primary="Connexion" />
								</ListItem>
								<ListItem button onClick={() => history.push("/inscription")}>
									<ListItemIcon>
										<LockRoundedIcon />
									</ListItemIcon>
									<ListItemText primary="Inscription" />
								</ListItem>
							</>
						)) || (
							<>
								<ListItem button onClick={() => history.push("/profil")}>
									<ListItemIcon>
										<AccountCircleRoundedIcon />
									</ListItemIcon>
									<ListItemText primary="Mon compte" />
								</ListItem>
								<ListItem button onClick={handleLogout}>
									<ListItemIcon>
										<ExitToAppRoundedIcon />
									</ListItemIcon>
									<ListItemText primary="Déconnexion" />
								</ListItem>
							</>
						)}
					</List>
					<Divider />
					<List component="nav" aria-label="contact">
						<ListItem button onClick={() => history.push("/contact")}>
							<ListItemIcon>
								<ContactSupportRoundedIcon />
							</ListItemIcon>
							<ListItemText primary="Contactez-nous !" />
						</ListItem>
					</List>
				</div>
			</Drawer>
		</>
	);
};

export default withRouter(Sidebar);
