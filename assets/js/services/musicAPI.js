/* eslint-disable react/prop-types */
import { IconButton } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import WhatshotRoundedIcon from "@material-ui/icons/WhatshotRounded";
import Axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

const likeMessage = (music) => {
	if (isLikedByUser(music) && +music.likesCount - 1 > 1)
		return `Vous et ${
			+music.likesCount - 1
		} autres personnes ont laissé une flamme`;
	if (isLikedByUser(music) && +music.likesCount - 1 === 1)
		return `Vous et une autre personne avez laissé une flamme`;
	if (isLikedByUser(music) && +music.likesCount === 1)
		return `Vous seuls avez laissé une flamme`;
	if (!isLikedByUser(music) && +music.likesCount > 1)
		return `${+music.likesCount} personnes ont laissé une flamme`;
	if (!isLikedByUser(music) && +music.likesCount === 1)
		return `Une seule personne a laissé une flamme`;
	if (+music.likesCount === 0 || !music.likesCount)
		return `Personne n'a laissé de flamme`;
};

const download = (id) => (window.location.href = `/api/music/download/${id}`);

const isLikedByUser = (music) => {
	const token = window.localStorage.getItem("authToken");

	if (token) {
		const decodedToken = jwtDecode(token);
		const id = decodedToken.id;

		let liked = false;

		music.likes.forEach((like) => {
			if (like.author.id == +id) liked = true;
		});

		return liked;
	}

	return false;
};

const LikeButton = ({ music }) => {
	const [isLiked, setIsLiked] = useState(isLikedByUser(music));

	return (
		<>
			<IconButton
				aria-label="like button"
				onClick={() => {
					Axios.get(`/api/like/index/${music.id}`)
						.then((response) => {
							setIsLiked(response.data.isLikedByUser);
						})
						.catch((error) => {
							if (error.response.status === 403)
								alert("Désole, il faut être connecté pour liker 😅!");
							else "Une erreur s'est produite, réessayez plus tard 🙂.";
						});
				}}
				style={
					(isLiked && { backgroundColor: red[100] }) || {
						backgroundColor: "initial",
					}
				}
			>
				{(isLiked && (
					<WhatshotRoundedIcon fontSize="small" style={{ color: red[600] }} />
				)) || <WhatshotRoundedIcon fontSize="small" />}
			</IconButton>
		</>
	);
};

const MusicPlayer = ({ music }) => {
	let audio;

	const [playing, setPlaying] = useState(false);

	const player = () => {
		setPlaying(!playing);
		if (playing) audio.audioEl.current.pause();
		else audio.audioEl.current.play();
	};

	return (
		<>
			<ReactAudioPlayer
				src={music.songUrl}
				ref={(element) => {
					audio = element;
				}}
			/>
			<IconButton aria-label="play/pause" onClick={player}>
				{playing ? (
					<PauseRoundedIcon fontSize="small" />
				) : (
					<PlayArrowRoundedIcon fontSize="small" />
				)}
			</IconButton>
		</>
	);
};

export default {
	download,
	isLikedByUser,
	LikeButton,
	MusicPlayer,
	likeMessage,
};
