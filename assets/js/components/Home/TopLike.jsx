/* eslint-disable react/prop-types */
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import { makeStyles } from "@material-ui/core/styles";
import WhatshotRoundedIcon from "@material-ui/icons/WhatshotRounded";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { extractUrl } from "../../helpers";
import { UsePagination } from "../../hooks/UsePagination";
import HorizontalScroll from "./HorizontalScroll";

const useStyles = makeStyles((theme) => ({
	media: {
		width: 180,
		height: 180,
		borderRadius: 2,
	},
	container: {
		maxWidth: 180,
		display: "inline-block",
		margin: theme.spacing(0, 1),
		borderRadius: 0,
		boxShadow: "none",
	},
	actionArea: {
		borderRadius: 2,
	},
	title: {
		fontSize: "1.2rem",
		fontWeight: 500,
		color: "#122740",
	},
	author: {
		fontSize: "0.875rem",
		lineHeight: "normal",
		color: "#495869",
	},
	content: {
		padding: theme.spacing(2, 0),
	},
	subtitle: {
		fontSize: "1.2rem",
		fontWeight: 500,
		lineHeight: "normal",
		color: "#122740",
		marginBottom: theme.spacing(1),
	},
	smallAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		margin: "auto",
	},
}));

const TopLike = ({ history }) => {
	const classes = useStyles();

	const {
		items: musics,
		loading,
		load,
	} = UsePagination("/apip/music?itemsPerPage=6&order[likesCount]=desc");

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<Typography className={classes.subtitle}>Mieux notés</Typography>
			<HorizontalScroll>
				{(loading ? Array.from(new Array(6)) : musics).map((music, index) => (
					<Card
						className={classes.container}
						key={index}
						onClick={() => {
							history.push(`/musiques/${music.id}`);
						}}
					>
						<CardActionArea className={classes.actionArea}>
							{music ? (
								<CardMedia
									component="img"
									alt={music.title}
									className={classes.media}
									image={extractUrl(music.coverUrl)}
								/>
							) : (
								<Skeleton variant="rect" width={180} height={180} />
							)}
							<CardContent className={classes.content}>
								<Grid
									container
									spacing={1}
									direction="row"
									justify="space-between"
									alignItems="center"
									alignContent="center"
									wrap="nowrap"
								>
									<Grid item zeroMinWidth>
										<Typography className={classes.title} noWrap>
											{music ? (
												music.title
											) : (
												<Skeleton
													variant="text"
													className={classes.title}
													width={100}
												/>
											)}
										</Typography>
										<Typography className={classes.author} noWrap>
											{music ? (
												music.author.username
											) : (
												<Skeleton
													variant="text"
													className={classes.author}
													width={100}
												/>
											)}
										</Typography>
									</Grid>
									<Grid item>
										<Avatar
											className={classes.smallAvatar}
											style={{
												backgroundColor: red[100],
												color: red[600],
											}}
										>
											<WhatshotRoundedIcon style={{ fontSize: "1.2rem" }} />
										</Avatar>
										<Typography align="center">
											{music ? (
												music.likesCount ? (
													music.likesCount
												) : (
													0
												)
											) : (
												<Skeleton />
											)}
										</Typography>
									</Grid>
								</Grid>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</HorizontalScroll>
		</>
	);
};

export default withRouter(TopLike);
