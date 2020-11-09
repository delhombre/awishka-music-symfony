import Container from "@material-ui/core/Container";
import React from "react";
import TopAlbumDownload from "./Rankings/TopAlbumDownload";
import TopDownload from "./Rankings/TopDownload";
import TopLike from "./Rankings/TopLike";

const Rankings = () => {
	return (
		<>
			<Container>
				<TopDownload />
				<TopLike />
				<TopAlbumDownload />
			</Container>
		</>
	);
};

export default Rankings;
