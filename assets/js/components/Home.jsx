import Container from "@material-ui/core/Container";
import React from "react";
import Albums from "./Home/Albums";
import Musics from "./Home/Musics";
import Rankings from "./Home/Rankings";

const Home = () => {
	return (
		<>
			<Container>
				<Albums />
				<Musics />
				<Rankings />
				{/* <Events /> */}
			</Container>
		</>
	);
};

export default Home;
