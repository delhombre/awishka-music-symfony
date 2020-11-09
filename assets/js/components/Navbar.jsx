import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setOpen(open);
	};

	return (
		<>
			<Topbar onOpen={toggleDrawer} />
			<Sidebar open={open} onOpen={toggleDrawer} />
		</>
	);
};

export default Navbar;
