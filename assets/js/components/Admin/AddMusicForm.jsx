/* eslint-disable react/prop-types */
import {
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	IconButton,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Typography,
	withStyles,
} from "@material-ui/core";
import { blue, indigo } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const useStyles = makeStyles(() => ({
	input: {
		display: "none",
	},
}));

function SelectField({
	name,
	value,
	onChange,
	datas,
	required,
	error = { status: false, message: "" },
}) {
	return (
		<>
			<FormControl variant="filled" fullWidth error={error.status}>
				<InputLabel id={`${value}-select-filled-label`}>{name}</InputLabel>
				<Select
					labelId={`${value}-select-filled-label`}
					id={`${value}-select-filled`}
					name={`${value}-select-filled`}
					value={value}
					onChange={onChange}
					required={required}
				>
					<IconButton value="" style={{ marginLeft: "auto", display: "block" }}>
						<CancelRoundedIcon />
					</IconButton>
					{datas.map((data, index) => (
						<MenuItem value={index} key={value + index}>
							{data.title || data.username}
						</MenuItem>
					))}
				</Select>
				{error.status && <FormHelperText>{error.message}</FormHelperText>}
			</FormControl>
		</>
	);
}

const CoverButton = withStyles(() => ({
	root: {
		// color: theme.palette.getContrastText(blue[400]),
		color: "rgba(0, 0, 0, 0.7)",
		backgroundColor: blue[500],
		"&:hover": {
			backgroundColor: blue[700],
		},
	},
}))(Button);

const SongButton = withStyles(() => ({
	root: {
		// color: theme.palette.getContrastText(blue[400]),
		color: "rgba(0, 0, 0, 0.7)",
		backgroundColor: indigo[500],
		"&:hover": {
			backgroundColor: indigo[700],
		},
	},
}))(Button);

const AddMusicForm = () => {
	const classes = useStyles();

	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");

	const [albums, setAlbums] = useState([]);
	const [album, setAlbum] = useState("");

	const [artists, setArtists] = useState([]);
	const [artist, setArtist] = useState("");

	const getItems = (url, changeState) => {
		Axios.get(url)
			.then((response) => {
				changeState(response.data["hydra:member"]);
			})
			.catch((error) => {
				return error;
			});
	};

	useEffect(() => {
		getItems("/apip/categories", setCategories);
		getItems("/apip/albums", setAlbums);
		getItems("/apip/users", setArtists);
	}, []);

	const [state, setState] = useState({
		title: "",
		featuring: "",
		imageFile: {},
		songFile: {},
		category: "",
		album: "",
		author: "",
	});

	const [errors, setErrors] = useState({
		title: "",
		featuring: "",
		imageFile: "",
		songFile: "",
		category: "",
		author: "",
	});

	const coverRef = useRef();
	const songRef = useRef();
	const [selectedMusicCover, setSelectedMusicCover] = useState(null);
	const [selectedSong, setSelectedSong] = useState(null);

	const formData = new FormData();
	formData.append("title", state.title);
	formData.append("featuring", state.featuring);
	formData.append("category", state.category);
	formData.append("album", state.album);
	formData.append("author", state.author);
	formData.append("imageFile", state.imageFile);
	formData.append("songFile", state.songFile);

	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		Axios.post("/apip/music", formData)
			// eslint-disable-next-line no-unused-vars
			.then((response) => {
				setLoading(false);
				setState({
					title: "",
					featuring: "",
					imageFile: {},
					songFile: {},
					category: "",
					album: "",
					author: "",
				});
				setSelectedMusicCover(null);
				setSelectedSong(null);
				setErrors({
					title: "",
					featuring: "",
					imageFile: "",
					songFile: "",
					category: "",
					author: "",
				});
				setCategory("");
				setAlbum("");
				setArtist("");
			})
			.catch((error) => {
				if (error.response.data.violations) {
					const apiErrors = {};
					error.response.data.violations.forEach((violation) => {
						apiErrors[violation.propertyPath] = violation.message;
					});
					setErrors(apiErrors);
					setLoading(false);
				} else {
					setLoading(false);
					alert(
						"Une erreur s'est produite. La musique n'a pas pu être uploadée !"
					);
				}
			});
	};

	return (
		<>
			<Container>
				<Typography style={{ fontSize: "1.3rem" }} paragraph>
					Ajouter une nouvelle musique
				</Typography>
				<form
					encType="multipart/form-data"
					onSubmit={handleSubmit}
					method="POST"
					autoComplete="off"
				>
					<Grid container spacing={2} justify="space-between">
						<Grid item xs={12} sm={6}>
							<TextField
								label="Titre du son"
								variant="filled"
								name="music-title"
								id="music-title"
								error={errors.title ? true : false}
								helperText={errors.title}
								fullWidth
								value={state.title}
								onChange={(e) => {
									setState({ ...state, title: e.target.value });
								}}
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Nom de l'artiste en featuring"
								variant="filled"
								name="music-featuring"
								id="music-featuring"
								error={errors.featuring ? true : false}
								helperText={errors.featuring}
								fullWidth
								value={state.featuring}
								onChange={(e) => {
									setState({ ...state, featuring: e.target.value });
								}}
							/>
							<p style={{ fontSize: "x-small" }}>
								{"↑ Laisser ce champ vide s'il n'ya pas de featuring"}
							</p>
						</Grid>
						<Grid item xs={12} sm={6}>
							<input
								accept="image/*"
								className={classes.input}
								id="upload-cover"
								type="file"
								ref={coverRef}
								onChange={() => {
									setState({ ...state, imageFile: coverRef.current.files[0] });

									setSelectedMusicCover(
										(coverRef.current.files[0] &&
											coverRef.current.files[0].name) ||
											""
									);
								}}
							/>
							<label htmlFor="upload-cover">
								<CoverButton
									fullWidth
									component="span"
									startIcon={<PublishRoundedIcon />}
								>
									Choisir une cover
								</CoverButton>
							</label>
							{errors.imageFile && (
								<p style={{ fontSize: "xx-small", color: "red" }}>
									↑ {errors.imageFile}
								</p>
							)}
							{selectedMusicCover && (
								<p style={{ fontSize: "x-small" }}>
									Le fichier <strong>{selectedMusicCover}</strong> a été
									sélectionné
								</p>
							)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<input
								accept="audio/*"
								className={classes.input}
								id="upload-song"
								type="file"
								ref={songRef}
								onChange={() => {
									setState({ ...state, songFile: songRef.current.files[0] });
									setSelectedSong(
										(songRef.current.files[0] &&
											songRef.current.files[0].name) ||
											""
									);
								}}
							/>
							<label htmlFor="upload-song">
								<SongButton
									fullWidth
									startIcon={<PublishRoundedIcon />}
									component="span"
								>
									Choisir un son
								</SongButton>
							</label>
							{errors.songFile && (
								<p style={{ fontSize: "xx-small", color: "red" }}>
									↑ {errors.songFile}
								</p>
							)}
							{selectedSong && (
								<p style={{ fontSize: "x-small" }}>
									Le fichier <strong>{selectedSong}</strong> a été sélectionné
								</p>
							)}
						</Grid>
						<Grid item xs={12} sm={4}>
							<SelectField
								name="Choisir une catégorie"
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);

									setState({
										...state,
										category:
											(e.target.value.length !== 0 &&
												`/apip/categories/${categories[e.target.value].id}`) ||
											"",
									});
								}}
								datas={categories}
								required={true}
								error={{
									status: errors.category ? true : false,
									message: errors.category,
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<SelectField
								name="Choisir un album"
								value={album}
								onChange={(e) => {
									setAlbum(e.target.value);
									setState({
										...state,
										album:
											(e.target.value.length !== 0 &&
												`/apip/albums/${albums[e.target.value].id}`) ||
											"",
									});
								}}
								datas={albums}
								required={false}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<SelectField
								name="Sélectionner l'artiste"
								value={artist}
								onChange={(e) => {
									setArtist(e.target.value);
									setState({
										...state,
										author:
											(e.target.value.length !== 0 &&
												`/apip/users/${artists[e.target.value].id}`) ||
											"",
									});
								}}
								datas={artists}
								required={true}
								error={{
									status: errors.author ? true : false,
									message: errors.author,
								}}
							/>
						</Grid>
						<Grid item>
							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={loading}
							>
								{(loading && <CircularProgress />) || "Valider"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</>
	);
};

export default AddMusicForm;
