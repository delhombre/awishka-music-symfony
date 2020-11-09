/* eslint-disable react/prop-types */
import {
	Avatar,
	Card,
	CardContent,
	CardMedia,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { cyan } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import musicAPI from "../../services/musicAPI";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		marginTop: theme.spacing(2),
	},
	details: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flex: "1 0 auto",
	},
	cover: {
		width: "100%",
	},
	controls: {
		paddingTop: "2rem",
		paddingBottom: theme.spacing(1),
	},

	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: 60,
		height: 60,
	},
	title: {
		fontSize: "1.5rem",
		fontWeight: 500,
		lineHeight: "normal",
		color: "#122740",
		marginBottom: theme.spacing(2),
	},
}));

const AlbumShow = (props) => {
	const { match, history } = props;
	const { params } = match;
	const { albumId } = params;

	const classes = useStyles();

	const [album, setAlbum] = useState(null);
	const [error, setError] = useState(false);

	const getAlbum = () => {
		Axios.get(`/apip/albums/${albumId}`)
			.then((response) => {
				setAlbum(response.data);
				setError(false);
			})
			.catch((error) => {
				setError(true);
				if (error.response.status === 404)
					alert(
						"Ressource introuvable, cette adresse est invalide ou la ressource a été supprimée."
					);
				else alert("Une erreur s'est produite, réessayez plus tard.");
			});
	};

	useEffect(() => {
		getAlbum();
	}, []);

	const { download, MusicPlayer } = musicAPI;

	return (
		<>
			<Container>
				<IconButton
					aria-label="step back"
					onClick={() => {
						history.goBack();
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>{" "}
				Retour
			</Container>
			<Divider />
			<Container maxWidth="sm" className={classes.container}>
				{album && (
					<Card className={classes.root}>
						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography variant="h5">{album.title}</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{album.author.username}
								</Typography>
								<div className={classes.controls}>
									<Typography style={{ fontSize: "unset" }}>
										{album.musics.length} chanson
										{album.musics.length > 1 && "s"}
									</Typography>
									<Typography style={{ fontSize: "unset" }}>
										{album.countOfDownloads ? album.countOfDownloads : 0}{" "}
										téléchargement
										{album.countOfDownloads > 1 && "s"}
									</Typography>
								</div>
							</CardContent>
						</div>
						<CardMedia className={classes.cover} image={album.coverUrl} />
					</Card>
				)}

				{!album && !error && (
					<>
						<CircularProgress
							style={{ display: "block", margin: "auto", marginTop: "3rem" }}
						/>
						<Typography align="center" style={{ marginTop: "2rem" }}>
							Chargement... Patientez !
						</Typography>
					</>
				)}
				{error && (
					<>
						<Typography align="center" style={{ marginTop: "3rem" }}>
							{"Oupss...! Une erreur s'est produite."}
						</Typography>
					</>
				)}
			</Container>
			{album && (
				<Container maxWidth="sm">
					{album.musics.map((music, index) => (
						<Grid
							container
							spacing={1}
							direction="row"
							justify="space-between"
							alignItems="center"
							alignContent="center"
							wrap="nowrap"
							key={index}
						>
							<Grid
								item
								xs={8}
								zeroMinWidth
								onClick={() => {
									history.push(`/musiques/${music.id}`);
								}}
							>
								<Typography noWrap>{music.title}</Typography>
							</Grid>
							<Grid item>
								<MusicPlayer music={music} />
							</Grid>
							<Grid item>
								<Avatar
									style={{
										backgroundColor: cyan[100],
										color: cyan[600],
										height: 30,
										width: 30,
									}}
								>
									<GetAppRoundedIcon style={{ fontSize: "1rem" }} />
								</Avatar>
								<Typography align="center" style={{ fontSize: "0.65rem" }}>
									{music.downloadCount ? music.downloadCount : 0}
								</Typography>
							</Grid>
							<Grid item>
								<IconButton
									aria-label="download button"
									onClick={() => download(music.id)}
								>
									<GetAppRoundedIcon fontSize="small" />
								</IconButton>
							</Grid>
						</Grid>
					))}
				</Container>
			)}
		</>
	);
};

export default AlbumShow;
