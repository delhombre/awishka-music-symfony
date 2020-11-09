/* eslint-disable no-unused-vars */
import React from "react";

export default React.createContext({
	anchorOrigin: {},
	open: false,
	setOpen: (value) => {},
	autoHideDuration: 6000,
	onClose: (e, r) => {},
	severity: "success",
	message: "",
});
