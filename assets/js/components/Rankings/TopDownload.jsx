/* eslint-disable react/prop-types */
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { cyan } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { extractUrl } from "../../helpers";
import { UsePagination } from "../../hooks/UsePagination";
import musicAPI from "../../services/musicAPI";
import Titles from "./Titles";

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: 60,
		height: 60,
	},
	smallAvatar: {
		height: theme.spacing(4),
		width: theme.spacing(4),
		margin: "auto",
	},
	background: {
		background: "white",
		padding: theme.spacing(4),
		borderRadius: theme.spacing(2),
	},
}));

const TopDownload = ({ history }) => {
	const classes = useStyles();

	const {
		items: musics,
		loading,
		load,
		hasMore,
	} = UsePagination("/apip/music?itemsPerPage=5&order[downloadCount]=desc");

	const { download } = musicAPI;

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<Titles
				title="Titres les plus téléchargés"
				style={{ marginTop: "2rem", marginBottom: "2rem" }}
			/>
			<div className={classes.background}>
				{(loading ? Array.from(new Array(5)) : musics).map((music, index) => (
					<Grid
						container
						spacing={1}
						direction="row"
						justify="space-between"
						alignItems="center"
						// alignContent="center"
						wrap="nowrap"
						key={index}
						className={classes.container}
					>
						<Grid item xs={1}>
							<Typography> {index + 1} </Typography>
						</Grid>
						<Grid item xs={3}>
							{music ? (
								<Card
									className={classes.image}
									onClick={() => {
										history.push(`/musiques/${music.id}`);
									}}
								>
									<CardActionArea>
										<CardMedia
											className={classes.image}
											component="img"
											alt=""
											image={extractUrl(music.coverUrl)}
										/>
									</CardActionArea>
								</Card>
							) : (
								<Skeleton className={classes.image} />
							)}
						</Grid>
						<Grid item xs={3}>
							<Typography noWrap>
								{music ? (
									music.title
								) : (
									<Skeleton variant="text" style={{ width: "100%" }} />
								)}
							</Typography>
							<Typography noWrap>
								{music ? (
									music.author.username
								) : (
									<Skeleton variant="text" style={{ width: "100%" }} />
								)}
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Avatar
								className={classes.smallAvatar}
								style={{ backgroundColor: cyan[100], color: cyan[600] }}
							>
								<GetAppRoundedIcon style={{ fontSize: "1.2rem" }} />
							</Avatar>
							<Typography align="center">
								{music ? (
									music.downloadCount ? (
										music.downloadCount
									) : (
										0
									)
								) : (
									<Skeleton />
								)}
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<IconButton
								aria-label="download button"
								onClick={() => music && download(music.id)}
							>
								<GetAppRoundedIcon />
							</IconButton>
						</Grid>
					</Grid>
				))}
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
			</div>
		</>
	);
};

export default withRouter(TopDownload);
