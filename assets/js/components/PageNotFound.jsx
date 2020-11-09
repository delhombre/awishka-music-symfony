/* eslint-disable react/prop-types */
import { Button, Container, Typography } from "@material-ui/core";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import React from "react";

const PageNotFound = ({ history }) => {
	return (
		<>
			<Container>
				<Typography variant="h2" align="center">
					<ErrorOutlineRoundedIcon fontSize="large" />
				</Typography>
				<Typography variant="h1" align="center">
					404
				</Typography>
				<Typography variant="h2" align="center">
					Page non trouvée
				</Typography>
				<Button
					variant="text"
					color="secondary"
					style={{ margin: "auto", display: "block" }}
					onClick={() => {
						history.push("/");
					}}
				>
					{"Retourner à la page d'accueil"}
				</Button>
			</Container>
		</>
	);
};

export default PageNotFound;
