/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import RouteContext from "../RouteContext";
import Titles from "./Titles";

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: theme.spacing(2),
	},
	card: {
		boxShadow: "none",
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
	featuring: {
		fontSize: "0.875rem",
		lineHeight: "normal",
		color: "#495869",
		"& > span": {
			color: "#122740",
			fontSize: "1rem",
		},
	},
	content: {
		padding: theme.spacing(1, 0),
	},
}));

const Musics = ({ history }) => {
	const classes = useStyles();

	const routeValue = useContext(RouteContext);

	const [state, setState] = useState({ musics: [], loading: true });

	const { musics, loading } = state;

	const getMusics = () => {
		Axios.get("/apip/music?itemsPerPage=6")
			.then((response) => {
				console.log(response.data["hydra:member"]);
				setState({ musics: response.data["hydra:member"], loading: false });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getMusics();
	}, []);

	return (
		<>
			<Titles title="Musiques" />
			<Grid
				container
				justify="space-between"
				// alignContent="space-between"
				spacing={1}
				className={classes.container}
			>
				{(loading ? Array.from(new Array(6)) : musics).map((item, index) => (
					<Grid item xs={6} sm={4} md={3} lg={2} key={index}>
						<Card
							className={classes.card}
							onClick={() => {
								item && history.push(`/musiques/${item.id}`);
							}}
						>
							<CardActionArea>
								{item ? (
									<CardMedia
										component="img"
										alt={item.title}
										image={item.coverUrl}
										className={classes.image}
									/>
								) : (
									<Skeleton style={{ width: "100%", height: 160 }} />
								)}

								<CardContent className={classes.content}>
									<Typography className={classes.title} noWrap>
										{item ? item.title : <Skeleton variant="text" />}
									</Typography>
									<Typography className={classes.author} noWrap>
										{item ? item.author.username : <Skeleton variant="text" />}
									</Typography>
									{item && item.featuring && (
										<Typography className={classes.featuring} noWrap>
											<span>ft: </span>
											{item.featuring}
										</Typography>
									)}
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
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
							routeValue.updateTab("", 1);
						}}
					>
						Plus de musiques
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default withRouter(Musics);
