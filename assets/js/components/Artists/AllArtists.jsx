import { CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: theme.spacing(2),
	},
	image: {
		width: 100,
		height: 100,
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
	name: {
		fontSize: "1.3rem",
		fontWeight: 400,
		color: "#122740",
		textAlign: "center",
	},
}));

const AllArtists = () => {
	const classes = useStyles();

	const [users, setUsers] = useState([]);

	useEffect(() => {
		Axios.get("/apip/users")
			.then((response) => {
				setUsers(response.data["hydra:member"]);
			})
			.catch((error) => console.error(error.response));
	}, []);

	return (
		<>
			<Grid
				container
				spacing={6}
				direction="row"
				// justify="space-between"
				alignItems="center"
				alignContent="center"
			>
				{users.length ? (
					users.map(
						(user, index) =>
							user.musics.length > 0 && (
								<Grid item xs={6} sm={4} md={3} lg={2} key={index} zeroMinWidth>
									<Avatar alt={user.username} className={classes.image} />
									<Typography className={classes.name} noWrap>
										{user.username}
									</Typography>
								</Grid>
							)
					)
				) : (
					<CircularProgress style={{ display: "block", margin: "auto" }} />
				)}
			</Grid>
		</>
	);
};

export default AllArtists;
