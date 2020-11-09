/* eslint-disable react/prop-types */
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AlbumRoundedIcon from "@material-ui/icons/AlbumRounded";
import CategoryRoundedIcon from "@material-ui/icons/CategoryRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import PlaylistPlayRoundedIcon from "@material-ui/icons/PlaylistPlayRounded";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import React, { useContext } from "react";
import Albums from "./Albums";
import Artists from "./Artists";
import Categories from "./Categories";
import Home from "./Home";
import Greeting from "./Home/Greeting";
import PageTitle from "./PageTitle";
import Playlist from "./Playlist";
import Rankings from "./Rankings";
import RouteContext from "./RouteContext";

const useStyles = makeStyles((theme) => ({
	homePageBackground: {
		height: "75vh",
		backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%)",
		marginBottom: theme.spacing(2),
	},
	background: {
		// height: "40vh",
		backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%)",
		marginBottom: theme.spacing(2),
	},
	paper: {
		flexGrow: 1,
		background: "rgba(242,242,242,0.07)",
		backdropFilter: "none",
		boxShadow: "none",
	},
	indicator: {
		display: "none",
	},
	root: {
		textTransform: "none",
		color: "white",
		minHeight: 100,
		fontFamily: ["Work Sans", "sans serif"].join(","),
	},
}));

const TabsNavigation = () => {
	const classes = useStyles();

	const routeValue = useContext(RouteContext);
	const selectedTab = routeValue.tab;
	const handleChange = routeValue.updateTab;

	return (
		<>
			<div
				className={
					selectedTab === 0 ? classes.homePageBackground : classes.background
				}
			>
				<Paper square className={classes.paper}>
					<Container>
						<Tabs
							value={selectedTab}
							onChange={handleChange}
							variant="scrollable"
							textColor="secondary"
							aria-label="navigation"
							classes={{ indicator: classes.indicator }}
						>
							<Tab
								icon={<HomeRoundedIcon />}
								label="Accueil"
								disableRipple
								classes={{ root: classes.root }}
							/>
							<Tab
								icon={<PlaylistPlayRoundedIcon />}
								label="Playlist"
								disableRipple
								classes={{ root: classes.root }}
							/>
							<Tab
								icon={<PersonRoundedIcon />}
								label="Artistes"
								disableRipple
								classes={{
									root: classes.root,
								}}
							/>
							<Tab
								icon={<TrendingUpRoundedIcon />}
								label="Classements"
								disableRipple
								classes={{
									root: classes.root,
								}}
							/>
							<Tab
								icon={<AlbumRoundedIcon />}
								label="Albums"
								disableRipple
								classes={{
									root: classes.root,
								}}
							/>
							{/* <Tab
								icon={<EventNoteRoundedIcon />}
								label="Événements"
								disableRipple
								classes={{
									root: classes.root,
								}}
							/> */}
							<Tab
								icon={<CategoryRoundedIcon />}
								label="Catégories"
								disableRipple
								classes={{
									root: classes.root,
								}}
							/>
						</Tabs>
					</Container>
				</Paper>
				{selectedTab === 0 && <Greeting />}
				{selectedTab === 1 && (
					<PageTitle
						title="Une collection de titres vous attend."
						subtitle="Écoutez, partagez, téléchargez dès à présent..."
					/>
				)}
				{selectedTab === 2 && (
					<PageTitle
						title="Les artistes de Awishka Music."
						subtitle="Restez proche de vos artistes."
					/>
				)}
				{selectedTab === 3 && (
					<PageTitle
						title="Classements"
						subtitle="Musiques et albums classés par nombre de téléchargements, nombre de notes ..."
					/>
				)}
				{selectedTab === 4 && (
					<PageTitle
						title="Albums"
						subtitle="Découvrez tous les albums et mixtapes de Awishka Music."
					/>
				)}
				{/* {selectedTab === 5 && (
					<PageTitle
						title="Toute l'actualité de la musique malienne, des artistes."
						subtitle="Ne louper plus aucun événement."
					/>
				)} */}
				{selectedTab === 5 && (
					<PageTitle
						title="Catégories de musiques"
						subtitle="Rap, Afro, Sumu, Trap ..."
					/>
				)}
			</div>
			{selectedTab === 0 && <Home />}
			{selectedTab === 1 && <Playlist />}
			{selectedTab === 2 && <Artists />}
			{selectedTab === 3 && <Rankings />}
			{selectedTab === 4 && <Albums />}
			{/* {selectedTab === 5 && <Events />} */}
			{selectedTab === 5 && <Categories />}
		</>
	);
};

export default TabsNavigation;
