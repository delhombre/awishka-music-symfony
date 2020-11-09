/* eslint-disable react/prop-types */
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import React from "react";

const useStyles = makeStyles((theme) => ({
	avatarContainer: {
		textAlign: "center",
		margin: theme.spacing(1, 0, 6, 0),
	},
	avatar: {
		margin: "auto",
		width: 150,
		height: 150,
	},
	name: {
		color: "#122740",
		fontSize: "2rem",
		fontWeight: 500,
	},
	title: {
		color: "#122740",
		fontSize: "1.5rem",
		fontWeight: 400,
	},
	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: 100,
		height: 100,
	},
}));

const datas = [
	{
		image:
			"https://images.unsplash.com/photo-1532693752334-f8a58d5c4bbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	},
	{
		image:
			"https://images.unsplash.com/photo-1469510360132-9fa6abcd9df0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
	},
];

const ArtistShow = ({ history }) => {
	const classes = useStyles();

	return (
		<>
			<Container>
				<IconButton
					aria-label="back to the last page"
					onClick={() => {
						history.goBack();
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>{" "}
				Retour
			</Container>
			<Divider />
			<div className={classes.avatarContainer}>
				<Avatar className={classes.avatar} />
				<Typography variant="h1" className={classes.name}>
					Name
				</Typography>
			</div>
			<Container>
				<Typography paragraph className={classes.title}>
					Playlist - 2 sons
				</Typography>
				{datas.map((item, index) => (
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
						<Grid item>
							<Card>
								<CardActionArea>
									<CardMedia
										className={classes.image}
										component="img"
										alt=""
										image={item.image}
									/>
								</CardActionArea>
							</Card>
						</Grid>
						<Grid item zeroMinWidth>
							<Typography noWrap>Title</Typography>
							<Typography noWrap>author</Typography>
						</Grid>
						<Grid item>
							<IconButton aria-label="play button">
								<PlayArrowRoundedIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton aria-label="share button">
								<ShareRoundedIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton aria-label="download button">
								<GetAppRoundedIcon />
							</IconButton>
						</Grid>
					</Grid>
				))}
			</Container>
		</>
	);
};

export default ArtistShow;
