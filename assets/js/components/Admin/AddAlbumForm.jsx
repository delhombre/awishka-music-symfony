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
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { UsePagination } from "../../hooks/UsePagination";

const useStyles = makeStyles(() => ({
	input: {
		display: "none",
	},
}));

const AddAlbumForm = () => {
	const classes = useStyles();

	const [user, setUser] = React.useState("");
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const { items: users, loading, load, hasMore } = UsePagination(
		"/apip/users?itemsPerPage=15"
	);

	useEffect(() => {
		load();
	}, []);

	const coverRef = useRef();
	const [selectedCover, setSelectedCover] = useState(null);

	const [state, setState] = useState({
		title: "",
		author: "",
		coverFile: {},
	});

	const [errors, setErrors] = useState({
		title: "",
		author: "",
		coverFile: "",
	});

	const [chargement, setChargement] = useState(false);

	const formData = new FormData();
	formData.append("title", state.title);
	formData.append("author", state.author);
	formData.append("coverFile", state.coverFile);

	const handleSubmit = (e) => {
		e.preventDefault();

		setChargement(true);

		Axios.post("/apip/albums", formData)
			// eslint-disable-next-line no-unused-vars
			.then((response) => {
				setChargement(false);
				setState({
					title: "",
					coverFile: "",
					author: "",
				});
				setSelectedCover(null);
				setErrors({
					title: "",
					coverFile: "",
					author: "",
				});
				setUser("");
			})
			.catch((error) => {
				if (error.response.data.violations) {
					const apiErrors = {};
					error.response.data.violations.forEach((violation) => {
						apiErrors[violation.propertyPath] = violation.message;
					});
					setErrors(apiErrors);
					setChargement(false);
				} else {
					setChargement(false);
					alert("Une erreur s'est produite. L'album n'a pas pu être crée !");
				}
			});
	};

	return (
		<>
			<Container>
				<Typography style={{ fontSize: "1.3rem" }} paragraph>
					Ajouter un nouvel album
				</Typography>
				<form
					method="post"
					encType="multipart/form-data"
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2} justify="space-between">
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								label="Titre de l'album"
								id="album-title"
								name="album-title"
								variant="filled"
								fullWidth
								required
								value={state.title}
								onChange={(e) => {
									setState({ ...state, title: e.target.value });
								}}
								error={errors.title ? true : false}
								helperText={errors.title}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<FormControl
								variant="filled"
								fullWidth
								error={errors.author ? true : false}
							>
								<InputLabel id="album-select-label">
									{"Choisir l'artiste"}
								</InputLabel>
								<Select
									labelId="album-select-label"
									id="album-open-select"
									open={open}
									onClose={handleClose}
									onOpen={handleOpen}
									value={user}
									onChange={(e) => {
										setUser(e.target.value);
										setState({
											...state,
											author:
												(e.target.value.length !== 0 &&
													`/apip/users/${users[e.target.value].id}`) ||
												"",
										});
									}}
									required
								>
									<IconButton
										value=""
										style={{ marginLeft: "auto", display: "block" }}
									>
										<CancelRoundedIcon />
									</IconButton>
									{(!loading &&
										users.map((item, index) => (
											<MenuItem key={item.id} value={index}>
												{item.username}
											</MenuItem>
										))) || (
										<CircularProgress
											value=""
											style={{ margin: "auto", display: "block" }}
										/>
									)}
									{hasMore && (
										<IconButton
											aria-label="load-more"
											onClick={load}
											disabled={loading}
											value=""
											style={{ margin: "auto", display: "block" }}
										>
											<ArrowDownwardRoundedIcon />
										</IconButton>
									)}
								</Select>
								{errors.author && (
									<FormHelperText>{errors.author}</FormHelperText>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<input
								accept="image/*"
								className={classes.input}
								id="upload-album-cover"
								multiple
								type="file"
								ref={coverRef}
								onChange={() => {
									setState({ ...state, coverFile: coverRef.current.files[0] });

									setSelectedCover(
										(coverRef.current.files[0] &&
											coverRef.current.files[0].name) ||
											""
									);
								}}
							/>
							<label htmlFor="upload-album-cover">
								<Button
									variant="outlined"
									color="secondary"
									fullWidth
									startIcon={<PublishRoundedIcon />}
									component="span"
								>
									{"cover de l'album"}
								</Button>
							</label>
							{errors.coverFile && (
								<p style={{ fontSize: "xx-small", color: "red" }}>
									↑ {errors.coverFile}
								</p>
							)}
							{selectedCover && (
								<p style={{ fontSize: "x-small" }}>
									Le fichier <strong>{selectedCover}</strong> a été sélectionné
								</p>
							)}
						</Grid>
						<Grid item>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={chargement}
							>
								{chargement ? <CircularProgress /> : "Créer un nouvel album"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</>
	);
};

export default AddAlbumForm;
