/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { extractUrl } from "../../helpers";
import RouteContext from "../RouteContext";
import HorizontalScroll from "./HorizontalScroll";
import Titles from "./Titles";

const useStyles = makeStyles((theme) => ({
	media: {
		width: 200,
		height: 200,
		borderRadius: 6,
	},
	container: {
		maxWidth: 200,
		display: "inline-block",
		margin: theme.spacing(0, 1, 0, 0),
		borderRadius: 6,
	},
	actionArea: {
		borderRadius: 6,
	},
	title: {
		fontSize: "1.5rem",
		fontWeight: 500,
		color: "#122740",
	},
	author: {
		fontSize: "0.875rem",
		lineHeight: "normal",
		color: "#495869",
	},
}));

const Albums = ({ history }) => {
	const classes = useStyles();

	const routeValue = useContext(RouteContext);

	const [state, setState] = useState({ albums: [], loading: true });

	const { albums, loading } = state;

	const getAlbums = () => {
		Axios.get("/apip/albums?itemsPerPage=8")
			.then((response) => {
				console.log(response.data["hydra:member"]);
				setState({ albums: response.data["hydra:member"], loading: false });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getAlbums();
	}, []);

	return (
		<>
			<Titles title="Albums et Mixtapes" />
			<HorizontalScroll>
				{(loading ? Array.from(new Array(8)) : albums).map((album, index) => (
					<Card
						className={classes.container}
						key={index}
						onClick={() => {
							album && history.push(`/albums/${album.id}`);
						}}
					>
						<CardActionArea className={classes.actionArea}>
							{album ? (
								<CardMedia
									component="img"
									alt={album.title}
									className={classes.media}
									image={extractUrl(album.coverUrl)}
									title={album.title}
								/>
							) : (
								<Skeleton variant="rect" width={200} height={200} />
							)}
							<CardContent>
								<Typography className={classes.title} noWrap>
									{album ? album.title : <Skeleton variant="text" />}
								</Typography>
								<Typography className={classes.author} noWrap>
									{album ? album.author.username : <Skeleton variant="text" />}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</HorizontalScroll>
			<Grid
				container
				spacing={1}
				direction="row"
				justify="flex-end"
				wrap="nowrap"
			>
				<Grid item>
					<Button
						variant="outlined"
						size="small"
						onClick={() => {
							routeValue.updateTab("", 4);
						}}
					>
						Découvrir plus
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default withRouter(Albums);
