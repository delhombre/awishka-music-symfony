/* eslint-disable react/prop-types */
import { Avatar, CircularProgress, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import WhatshotRoundedIcon from "@material-ui/icons/WhatshotRounded";
import Axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import musicAPI from "../../services/musicAPI";
import SocialButtons from "../SocialButtons";

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
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	likeMessageAvatar: {
		height: 30,
		width: 30,
		display: "inline-flex",
		marginTop: 10,
		verticalAlign: "sub",
	},
	inline: {
		display: "inline",
	},
	likeMessage: {
		fontSize: "14px",
		color: "rgba(0, 0, 0, 0.54)",
	},
}));

const MusicShow = (props) => {
	const { match, history } = props;
	const { params } = match;
	const { musicId } = params;

	const [music, setMusic] = useState(null);

	const [error, setError] = useState(false);

	const getMusic = () => {
		Axios.get(`/apip/music/${musicId}`)
			.then((response) => {
				setMusic(response.data);
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

	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		getMusic();
	}, []);

	const { download, LikeButton, MusicPlayer, likeMessage } = musicAPI;

	const classes = useStyles();

	return (
		<>
			<Container>
				<IconButton
					aria-label="back to homepage"
					onClick={() => {
						history.goBack();
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>{" "}
				Retour
			</Container>
			<Divider />
			<Container maxWidth="sm">
				{music && (
					<Card className={classes.root}>
						<div className={classes.details}>
							<CardContent className={classes.content}>
								<Typography variant="h5">{music.title}</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{music.author.username}
								</Typography>
								{music.featuring && (
									<>
										<Typography variant="subtitle2">Featuring:</Typography>
										<Typography variant="body1" color="textSecondary">
											{music.featuring}
										</Typography>
									</>
								)}
							</CardContent>
							<div className={classes.controls}>
								<MusicPlayer music={music} />
								<LikeButton music={music} />
								<IconButton
									aria-label="share"
									onClick={() => {
										setOpen(true);
									}}
								>
									<ShareRoundedIcon fontSize="small" />
								</IconButton>
								<IconButton
									aria-label="download"
									onClick={() => download(music.id)}
								>
									<GetAppRoundedIcon fontSize="small" />
								</IconButton>
							</div>
						</div>
						<CardMedia className={classes.cover} image={music.coverUrl} />
					</Card>
				)}
				{music && (
					<>
						<div>
							<Avatar className={classes.likeMessageAvatar} component="span">
								<WhatshotRoundedIcon style={{ fontSize: "1rem" }} />
							</Avatar>
							<Typography className={clsx(classes.inline, classes.likeMessage)}>
								&nbsp;
								{likeMessage(music)}
							</Typography>
						</div>
						<div>
							<Avatar className={classes.likeMessageAvatar} component="span">
								<GetAppRoundedIcon style={{ fontSize: "1rem" }} />
							</Avatar>
							<Typography className={clsx(classes.inline, classes.likeMessage)}>
								&nbsp;
								{music.downloadCount ? music.downloadCount : 0} téléchargement
								{music.downloadCount > 1 && "s"}
							</Typography>
						</div>
					</>
				)}
				{!error && !music && (
					<>
						<CircularProgress
							color="secondary"
							style={{ display: "block", margin: "auto", marginTop: "3rem" }}
						/>
						<Typography align="center" style={{ marginTop: "2rem" }}>
							Chargement de la page, patientez un instant...
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
			<SocialButtons open={open} onClose={handleClose} />
		</>
	);
};

export default MusicShow;
