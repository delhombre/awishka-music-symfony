import { CircularProgress } from "@material-ui/core";
/* eslint-disable react/prop-types */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import AddAlbumForm from "../Admin/AddAlbumForm";
import AddMusicForm from "../Admin/AddMusicForm";
import MyAccordion from "./MyAccordion";
import UserMusicsAndAlbums from "./UserMusicsAndAlbums";

const useStyles = makeStyles((theme) => ({
	avatarContainer: {
		textAlign: "center",
		margin: theme.spacing(1, 0, 4, 0),
	},
	avatar: {
		margin: "auto",
		width: 150,
		height: 150,
	},
	name: {
		color: "#122740",
		fontSize: "1.5rem",
		fontWeight: 400,
	},
	input: {
		display: "none",
	},
}));

const Profile = ({ history }) => {
	const classes = useStyles();

	const decodedToken = jwtDecode(window.localStorage.getItem("authToken"));

	const [profileFile, setProfileFile] = useState({});
	const profileRef = useRef();

	const formData = new FormData();
	formData.append("profileFile", profileFile);

	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		Axios.post("/apip/profiles", formData)
			.then(() => {
				setLoading(false);
				toast.success("Le profil a bien été mis à jour");
			})
			.catch((error) => {
				setLoading(false);
				if (error.response.status === 400)
					toast.error(error.response.data["hydra:description"]);
				else toast.error("Une erreur s'est produite");
			});
	};

	const [user, setUser] = useState(null);

	useEffect(() => {
		Axios.get(`/apip/users/${decodedToken.id}`)
			.then((response) => {
				console.log(response.data);
				setUser(response.data);
			})
			.catch(() => {
				toast.error("Une erreur est survenue.");
			});
	}, []);

	return (
		<>
			<Container>
				<IconButton
					aria-label="back to the last page"
					onClick={() => {
						history.goBack();
					}}
				>
					<ArrowBackRoundedIcon />
				</IconButton>{" "}
				Retour
			</Container>
			<Divider />
			<div className={classes.avatarContainer}>
				{/* {user ? (
					user.profile && (
						<Avatar className={classes.avatar} src={user.profile.profileUrl} />
					)
				) : ( */}
				<Avatar className={classes.avatar} />
				{/* )} */}

				<form onSubmit={handleSubmit}>
					<input
						accept="image/*"
						className={classes.input}
						id="profile-upload"
						type="file"
						ref={profileRef}
						onChange={() => {
							setProfileFile(profileRef.current.files[0]);
						}}
					/>
					<label htmlFor="profile-upload">
						<IconButton
							color="primary"
							aria-label="upload profile"
							component="span"
						>
							<PhotoCameraRoundedIcon fontSize="small" />
						</IconButton>
					</label>
					<IconButton
						aria-label="send-profile"
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<CircularProgress size={20} thickness={2} />
						) : (
							<SendRoundedIcon fontSize="small" />
						)}
					</IconButton>
				</form>
				<Typography variant="h1" className={classes.name}>
					{decodedToken.username}
				</Typography>
			</div>

			<MyAccordion userId={decodedToken.id} />

			{(decodedToken.roles.includes("ROLE_SUPER_ADMIN") && (
				<>
					<AddMusicForm />
					<AddAlbumForm />
					<Container>
						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push("/awishka/music/secret/admin")}
							style={{ marginTop: "24px" }}
							size="small"
						>
							Administration
						</Button>
					</Container>
				</>
			)) || <UserMusicsAndAlbums user={user} />}
		</>
	);
};

export default Profile;
