import {
	fetchHydra,
	FieldGuesser,
	HydraAdmin,
	hydraDataProvider,
	ListGuesser,
	ResourceGuesser,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import React from "react";

const dataProvider = hydraDataProvider(
	"https://localhost:8000/apip",
	fetchHydra,
	parseHydraDocumentation,
	true // useEmbedded parameter
);

const AlbumList = (props) => (
	<ListGuesser {...props}>
		<FieldGuesser source={"title"} />
		<FieldGuesser source={"coverUrl"} />
		<FieldGuesser source={"author"} label="Artiste" />
		{/* <ReferenceField label="Artiste" source="author" reference="users">
			<TextField source="author.username" />
		</ReferenceField> */}
		{/* <FieldGuesser source={"musics"} />
		<FieldGuesser source={"createdAt"} />
		<FieldGuesser source={"updatedAt"} />
		<FieldGuesser source={"countOfDownloads"} /> */}
	</ListGuesser>
);

const APIAdmin = () => {
	return (
		<>
			<HydraAdmin
				dataProvider={dataProvider}
				entrypoint="https://localhost:8000/apip"
			>
				<ResourceGuesser name={"albums"} list={AlbumList} />
				<ResourceGuesser name={"categories"} />
				<ResourceGuesser name={"music"} />
				{/* <ResourceGuesser name={"music_likes"} />
				<ResourceGuesser name={"profiles"} /> */}
				<ResourceGuesser name={"users"} />
			</HydraAdmin>
		</>
	);
};

export default APIAdmin;
