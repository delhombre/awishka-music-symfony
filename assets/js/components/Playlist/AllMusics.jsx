/* eslint-disable react/prop-types */
import { Button, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import config from "../../config";
import { extractUrl } from "../../helpers";
import { UsePagination } from "../../hooks/UsePagination";
import musicAPI from "../../services/musicAPI";

const useStyles = makeStyles((theme) => ({
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

const AllMusics = ({ history }) => {
	const classes = useStyles();

	const {
		items: musics,
		loading,
		load,
		count,
		hasMore,
	} = UsePagination("/apip/music?itemsPerPage=15");

	const { download, LikeButton } = musicAPI;
	const { API_URL } = config;

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<Typography className={classes.title}>
				{count} Chanson{count > 1 ? "s" : ""}
			</Typography>
			{loading && (
				<>
					<CircularProgress
						color="inherit"
						style={{ display: "block", margin: "auto" }}
					/>
					<Typography align="center">
						Chargement de la page... Patientez un instant.
					</Typography>
				</>
			)}
			{!loading &&
				musics.map((music, index) => (
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
						<Grid item xs={1}>
							{index + 1}
						</Grid>
						<Grid item /*  xs={3} */>
							<Card
								onClick={() => {
									history.push(`/musiques/${music.id}`);
								}}
							>
								<CardActionArea>
									<CardMedia
										className={classes.image}
										component="img"
										alt={music.title}
										title={music.title}
										image={extractUrl(music.coverUrl)}
									/>
								</CardActionArea>
							</Card>
						</Grid>
						<Grid
							item
							xs={4}
							zeroMinWidth
							onClick={() => {
								history.push(`/musiques/${music.id}`);
							}}
						>
							<Typography noWrap>{music.title}</Typography>
							<Typography noWrap style={{ fontSize: "18px" }}>
								{music.author.username}
							</Typography>
						</Grid>
						<Grid item>
							<LikeButton music={music} />
						</Grid>
						<Grid item>
							<IconButton
								aria-label="whatsapp button"
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
			<Grid container spacing={1} direction="row" justify="flex-end">
				<Grid item>
					{hasMore && (
						<Button
							variant="text"
							size="small"
							color="primary"
							onClick={load}
							style={{ display: "block", margin: "auto" }}
							disabled={loading}
						>
							{"Charger plus de musiques"}
						</Button>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default withRouter(AllMusics);
