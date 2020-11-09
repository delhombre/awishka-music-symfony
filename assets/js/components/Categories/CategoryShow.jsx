/* eslint-disable react/prop-types */
import {
	Avatar,
	CircularProgress,
	Container,
	Divider,
	IconButton,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";
import { blue, cyan, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import WhatshotRoundedIcon from "@material-ui/icons/WhatshotRounded";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import musicAPI from "../../services/musicAPI";

const useStyles = makeStyles((theme) => ({
	image: {
		width: 100,
		height: 100,
	},
	title: {
		fontSize: "1.2rem",
		// fontWeight: 700,
		lineHeight: "normal",
		color: "#122740",
		margin: theme.spacing(1, 0, 2),
		[theme.breakpoints.up("sm")]: {
			fontSize: "1.5rem",
		},
	},
}));

const CategoryShow = (props) => {
	const { match, history } = props;
	const { params } = match;
	const { categoryId } = params;

	const classes = useStyles();

	const [category, setCategory] = useState(null);

	const [error, setError] = useState(false);

	useEffect(() => {
		Axios.get(`/apip/categories/${categoryId}`)
			.then((response) => {
				setCategory(response.data);
				setError(false);
			})

			.catch((error) => {
				setError(true);
				if (error.response.status === 404)
					alert(
						"Ressource introuvable, cette adresse est invalide ou la ressource a été supprimée."
					);
				else alert("Une erreur s'est produite, réessayez plus tard.");
			});
	}, []);

	const { download } = musicAPI;

	return (
		<>
			<Container>
				<IconButton
					aria-label="step back"
					onClick={() => {
						history.goBack();
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>{" "}
				Retour
			</Container>
			<Divider />
			{category && (
				<Container>
					{category.musics.length > 0 && (
						<Typography className={classes.title}>
							Les musiques de la catégorie <strong>{category.title}</strong>
						</Typography>
					)}
					{category.musics.length === 0 && (
						<Typography>🙂 Aucune chanson pour cette catégorie</Typography>
					)}
					{category.musics.length > 0 && (
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Titre</TableCell>
										<TableCell>Auteur</TableCell>
										<TableCell>Nb. de flammes</TableCell>
										<TableCell>Nb. de téléchargements</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{category.musics.map((music, index) => (
										<TableRow key={index}>
											<TableCell
												component="th"
												scope="row"
												style={{ color: blue[500] }}
												onClick={() => {
													history.push(`/musiques/${music.id}`);
												}}
											>
												{music.title}
											</TableCell>
											<TableCell align="right">
												{music.author.username}
											</TableCell>
											<TableCell align="center">
												<Avatar
													style={{
														backgroundColor: red[100],
														color: red[600],
														height: 30,
														width: 30,
														margin: "auto",
													}}
												>
													<WhatshotRoundedIcon style={{ fontSize: "1rem" }} />
												</Avatar>
												{music.likesCount ? music.likesCount : 0}
											</TableCell>
											<TableCell align="center">
												<Avatar
													style={{
														backgroundColor: cyan[100],
														color: cyan[600],
														height: 30,
														width: 30,
														margin: "auto",
													}}
												>
													<GetAppRoundedIcon style={{ fontSize: "1rem" }} />
												</Avatar>
												{music.downloadCount ? music.downloadCount : 0}
											</TableCell>
											<TableCell>
												<IconButton
													aria-label="download button"
													onClick={() => download(music.id)}
												>
													<GetAppRoundedIcon fontSize="small" />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Container>
			)}
			{error && (
				<>
					<Typography align="center" style={{ marginTop: "3rem" }}>
						{"Oupss...! Une erreur s'est produite."}
					</Typography>
				</>
			)}
			{!category && !error && (
				<>
					<CircularProgress
						color="secondary"
						style={{ display: "block", margin: "auto", marginTop: "2rem" }}
					/>
					<Typography align="center" style={{ marginTop: "2rem" }}>
						Chargement de la page, patientez un instant...
					</Typography>
				</>
			)}
		</>
	);
};

export default CategoryShow;
