import Container from "@material-ui/core/Container";
import React from "react";
import Titles from "./Titles";
import TopDownload from "./TopDownload";
import TopLike from "./TopLike";

const Rankings = () => {
	return (
		<>
			<Titles
				title="Classements"
				subtitle="Découvrez les musiques et albums en tête de classements"
			/>
			<Container>
				<TopDownload />
				<TopLike />
			</Container>
		</>
	);
};

export default Rankings;
