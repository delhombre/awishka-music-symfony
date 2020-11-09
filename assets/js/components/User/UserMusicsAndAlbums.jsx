/* eslint-disable react/prop-types */
import {
	CardContent,
	CircularProgress,
	Container,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import React from "react";
import { withRouter } from "react-router-dom";
import config from "../../config";

const useStyles = makeStyles((theme) => ({
	title: {
		color: red[400],
		fontSize: "1.5rem",
		fontWeight: 400,
		[theme.breakpoints.down("lg")]: {
			fontSize: "1rem",
		},
	},
	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: 80,
		height: 80,
	},
}));

const UserMusicsAndAlbums = ({ user, history }) => {
	const classes = useStyles();

	const { API_URL } = config;

	return (
		<>
			<Grid container spacing={1} justify="center" alignContent="center">
				{user && user.musics.length > 0 && (
					<Grid item xs={12} sm={6}>
						<Container>
							<Typography paragraph>
								Ma playlist - {user.musics.length} son
								{user.musics.length > 1 && "s"}
							</Typography>

							{user.musics.map((music, index) => (
								<Grid
									container
									spacing={1}
									direction="row"
									justify="space-between"
									alignItems="center"
									alignContent="center"
									wrap="nowrap"
									key={index}
									className={classes.container}
								>
									{/* <Grid item>
										<Card>
											<CardActionArea>
												<CardMedia
													className={classes.image}
													component="img"
													alt={music.title}
													image={music.coverUrl}
												/>
											</CardActionArea>
										</Card>
									</Grid> */}
									<Grid item xs={10}>
										<Typography
											noWrap
											className={classes.title}
											onClick={() => {
												history.push(`/musiques/${music.id}`);
											}}
										>
											{music.title}
										</Typography>
									</Grid>
									<Grid item>
										<IconButton
											aria-label="whatsApp button"
											onClick={() => {
												const encodedUri = encodeURIComponent(
													`${API_URL}/musiques/${music.id}`
												);
												window.location.href = `whatsapp://send?text=${encodedUri}`;
											}}
										>
											<WhatsAppIcon fontSize="small" />
										</IconButton>
									</Grid>
								</Grid>
							))}
						</Container>
					</Grid>
				)}
				{user && user.albums.length > 0 && (
					<Grid item xs={12} sm={6}>
						<Container>
							<Typography paragraph>
								Mes albums et mixtapes - {user.albums.length}
								{user.albums.length > 1 && "s"}
							</Typography>

							<Grid container spacing={1}>
								{user.albums.map((album, index) => (
									<Grid item xs={6} key={index}>
										<Card
											onClick={() => {
												history.push(`/albums/${album.id}`);
											}}
										>
											<CardActionArea>
												{/* <CardMedia
													component="img"
													title="lorem"
													image={album.coverUrl}
												/> */}
												<CardContent>
													<Typography className={classes.title}>
														{album.title}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</Grid>
								))}
							</Grid>
						</Container>
					</Grid>
				)}
				{user && (user.musics.length === 0 || user.albums.length === 0) && (
					<>
						{user.musics.length === 0 && user.albums.length === 0 && (
							<Typography align="center">
								{"Vous avez ni d'album, ni de son."}
							</Typography>
						)}
						{user.musics.length === 0 && user.albums.length !== 0 && (
							<Typography align="center">Vous avez aucun son</Typography>
						)}
						{user.musics.length !== 0 && user.albums.length === 0 && (
							<Typography align="center">Vous avez aucun album</Typography>
						)}
					</>
				)}
				{!user && <CircularProgress style={{ margin: "auto" }} />}
			</Grid>
		</>
	);
};

export default withRouter(UserMusicsAndAlbums);
