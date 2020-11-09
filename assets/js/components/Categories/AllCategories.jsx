/* eslint-disable react/prop-types */
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const AllCategories = ({ history }) => {
	const [state, setState] = useState({ categories: [], loading: true });

	const { categories, loading } = state;

	const getCategories = () => {
		Axios.get("/apip/categories")
			.then((response) => {
				setState({ categories: response.data["hydra:member"], loading: false });
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<>
			<Grid container spacing={3}>
				{(!loading &&
					categories.map((category, index) => (
						<Grid item key={index}>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => {
									history.push(`/categories/${category.id}`);
								}}
							>
								{category.title}
							</Button>
						</Grid>
					))) || (
					<div style={{ margin: "auto", textAlign: "center" }}>
						<CircularProgress color="secondary" />
						<p>Chargement...</p>
					</div>
				)}
			</Grid>
		</>
	);
};

export default withRouter(AllCategories);
