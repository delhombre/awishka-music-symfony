/* eslint-disable react/prop-types */
import React from "react";
import Navbar from "./Navbar";
import RouteContext from "./RouteContext";
import TabsNavigation from "./TabsNavigation";

const AppWithNavigation = ({ match, history }) => {
	const { params } = match;
	const { page } = params;

	const tabNameToIndex = {
		0: "",
		1: "playlist",
		2: "artistes",
		3: "classements",
		4: "albums",
		// 5: "evenements",
		5: "categories",
	};
	const indexToTabName = {
		accueil: 0,
		playlist: 1,
		artistes: 2,
		classements: 3,
		albums: 4,
		// evenements: 5,
		categories: 5,
	};

	console.log(page, "page");

	let tabIndex = page === undefined ? "accueil" : page;

	// let isValidUrl = true;

	// for (const property in tabNameToIndex) {
	// 	if (tabNameToIndex[property] !== tabIndex) isValidUrl = false;
	// }

	const [selectedTab, setSelectedTab] = React.useState(
		/* isValidUrl ? */ indexToTabName[
			tabIndex
		] /* : indexToTabName["accueil"] */
	);

	const handleChange = (item, index) => {
		history.push(`/${tabNameToIndex[index]}`);
		setSelectedTab(index);
	};

	const contextValue = {
		tab: selectedTab,
		updateTab: handleChange,
	};

	return (
		<RouteContext.Provider value={contextValue}>
			<Navbar />
			<TabsNavigation />
		</RouteContext.Provider>
	);
};

export default AppWithNavigation;
