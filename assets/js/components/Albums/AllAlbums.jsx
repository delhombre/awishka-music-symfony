/* eslint-disable react/prop-types */
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CircularProgress,
	Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { UsePagination } from "../../hooks/UsePagination";
import Titles from "../Rankings/Titles";

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: "100%",
		height: "auto",
	},
	title: {
		fontSize: "1rem",
		fontWeight: 500,
		color: "#122740",
	},
	author: {
		fontSize: "0.875rem",
		lineHeight: "normal",
		color: "#495869",
	},
}));

const AllAlbums = ({ history }) => {
	const classes = useStyles();

	const { items: albums, loading, load, count, hasMore } = UsePagination(
		"/apip/albums"
	);

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<Titles title={`Tous les albums - ${count} albums`} />
			<Grid
				container
				justify="space-between"
				alignContent="space-between"
				spacing={1}
				className={classes.container}
			>
				{loading && <CircularProgress style={{ margin: "auto" }} />}
				{!loading &&
					albums.map((album, index) => (
						<Grid item xs={6} sm={4} lg={2} key={index}>
							<Card
								onClick={() => {
									history.push(`/albums/${album.id}`);
								}}
							>
								<CardActionArea>
									<CardMedia
										component="img"
										alt={album.title}
										title={album.title}
										image={album.coverUrl}
										className={classes.image}
									/>
									<CardContent>
										<Typography className={classes.title} noWrap>
											{album.title}
										</Typography>
										<Typography className={classes.author} noWrap>
											{album.author.username}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
			</Grid>
			{hasMore && (
				<Button
					variant="outlined"
					size="small"
					color="secondary"
					onClick={load}
					style={{ display: "block", margin: "auto" }}
					disabled={loading}
				>
					{"Charger plus d'albums"}
				</Button>
			)}
		</>
	);
};

export default withRouter(AllAlbums);
