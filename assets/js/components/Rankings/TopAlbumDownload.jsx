/* eslint-disable react/prop-types */
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { extractUrl } from "../../helpers";
import { UsePagination } from "../../hooks/UsePagination";
import Titles from "./Titles";

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: 100,
		height: 100,
	},
	background: {
		background: "white",
		padding: theme.spacing(4),
		borderRadius: theme.spacing(2),
	},
}));

const TopAlbumDownload = ({ history }) => {
	const classes = useStyles();

	const {
		items: albums,
		loading,
		load,
		hasMore,
	} = UsePagination("/apip/albums?itemsPerPage=3&order[countOfDownloads]=desc");

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<Titles
				title="Albums les plus téléchargés"
				style={{ marginTop: "2rem", marginBottom: "2rem" }}
			/>
			<div className={classes.background}>
				{(loading ? Array.from(new Array(3)) : albums).map((album, index) => (
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
							<Typography> {index + 1} </Typography>
						</Grid>
						<Grid item>
							{album ? (
								<Card
									onClick={() => {
										history.push(`/albums/${album.id}`);
									}}
								>
									<CardActionArea>
										<CardMedia
											className={classes.image}
											component="img"
											alt={album.title}
											image={extractUrl(album.coverUrl)}
										/>
									</CardActionArea>
								</Card>
							) : (
								<Skeleton width={100} height={100} />
							)}
						</Grid>
						<Grid item xs={3}>
							<Typography noWrap>
								{album ? (
									album.title
								) : (
									<Skeleton variant="text" style={{ width: "100%" }} />
								)}
							</Typography>
							<Typography noWrap>
								{album ? (
									album.author.username
								) : (
									<Skeleton variant="text" style={{ width: "100%" }} />
								)}
							</Typography>
						</Grid>
						<Grid item zeroMinWidth>
							<Typography align="center" style={{ fontWeight: 500 }}>
								{album ? (
									album.countOfDownloads ? (
										album.countOfDownloads
									) : (
										0
									)
								) : (
									<Skeleton />
								)}
							</Typography>
							<Typography noWrap style={{ fontSize: "0.875rem" }}>
								téléchargement
								{album && album.countOfDownloads > 1 && "s"}
							</Typography>
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

export default withRouter(TopAlbumDownload);
