/* eslint-disable react/prop-types */
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Grid,
	IconButton,
	Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
	},
	height: {
		// minHeight: "100vh",
	},
	media: {
		width: 150,
		height: 150,
		borderRadius: 6,
	},
	container: {
		maxWidth: 150,
		display: "inline-block",
		margin: theme.spacing(0, 1, 0, 0),
		borderRadius: 6,
		boxShadow: "none",
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

const Search = ({ history }) => {
	const classes = useStyles();

	const [search, setSearch] = useState("");
	const [musics, setMusics] = useState([]);
	const [searching, setSearching] = useState(false);

	const getItems = (url) => {
		return Axios.get(url).then((response) => response.data["hydra:member"]);
		// .catch((error) => error.response);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearching(true);
		getItems(`/apip/music?author.username=${search}`).then((data) => {
			setMusics(data);
			setSearching(false);
		});
	};
	console.log(musics);

	return (
		<div className={classes.height}>
			<Container>
				<IconButton
					aria-label=""
					onClick={() => {
						history.goBack();
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>
			</Container>
			<Divider />
			<Container>
				<form method="GET" onSubmit={handleSubmit}>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel htmlFor="search">
							{"Rechercher: Entrer le nom de l'artiste"}
						</InputLabel>
						<Input
							type="search"
							autoFocus
							id="search"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							startAdornment={
								<InputAdornment position="start">
									<SearchRoundedIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
				</form>
				<Grid container spacing={1} direction="row" justify="space-between">
					{musics &&
						musics.map((music, index) => (
							<Grid item key={index}>
								<Card className={classes.container}>
									<CardActionArea className={classes.actionArea}>
										<CardMedia
											component="img"
											alt={music.title}
											className={classes.media}
											image={music.coverUrl}
											title={music.title}
										/>
										<CardContent>
											<Typography className={classes.title} noWrap>
												{music.title}
											</Typography>
											<Typography className={classes.author} noWrap>
												{music.author.username}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}
					{searching && <Typography>Recherche...</Typography>}
				</Grid>
			</Container>
		</div>
	);
};

export default Search;
