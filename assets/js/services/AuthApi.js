import Axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
	// On supprime le token du localStorage
	window.localStorage.removeItem("authToken");
	// On unset notre header par défaut d'Axios
	delete Axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
	return Axios.post("/api/login_check", credentials)
		.then((response) => response.data.token)
		.then((token) => {
			// On stocke le token dans le localStorage du navigateur
			window.localStorage.setItem("authToken", token);
			// On set un header par défaut à Axios pour les futures réquêtes
			Axios.defaults.headers["Authorization"] = `Bearer ${token}`;

			return true;
		});
}

function setup() {
	// Voir si on a un token
	const token = window.localStorage.getItem("authToken");
	// Voir si le token est valide
	if (token) {
		const jwtData = jwtDecode(token);
		if (jwtData.exp * 1000 > new Date().getTime())
			Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
		else logout();
	}
}

function isAuthenticated() {
	// Voir si on a un token
	const token = window.localStorage.getItem("authToken");
	// Voir si le token est valide
	if (token) {
		if (jwtDecode(token).exp * 1000 > new Date().getTime()) return true;
		return false;
	}
	return false;
}

export default {
	authenticate,
	logout,
	setup,
	isAuthenticated,
};
