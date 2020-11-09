import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/app.css";
import APIAdmin from "./components/Admin/APIAdmin";
import AlbumShow from "./components/Albums/AlbumShow";
import AppWithNavigation from "./components/AppWithNavigation";
import ArtistShow from "./components/Artists/ArtistShow";
import CategoryShow from "./components/Categories/CategoryShow";
import Connexion from "./components/Connexion";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";
import PageNotFound from "./components/PageNotFound";
import MusicShow from "./components/Playlist/MusicShow";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import Profile from "./components/User/Profile";
import AuthContext from "./contexts/AuthContext";
import AuthApi from "./services/AuthApi";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Work Sans" /* "Maven Pro" */,
		htmlFontSize: 14,
	},
});

AuthApi.setup();

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		AuthApi.isAuthenticated()
	);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Switch>
						<PrivateRoute path="/profil" component={Profile} />
						<Route path="/awishka/music/secret/admin" component={APIAdmin} />
						<Route
							exact
							path="/search"
							render={(props) => <Search {...props} />}
						/>
						<Route
							exact
							path="/artist/show"
							render={(props) => <ArtistShow {...props} />}
						/>
						<Route
							exact
							path="/categories/:categoryId"
							render={(props) => <CategoryShow {...props} />}
						/>
						<Route
							exact
							path="/albums/:albumId"
							render={(props) => <AlbumShow {...props} />}
						/>
						<Route
							exact
							path="/musiques/:musicId"
							render={(props) => <MusicShow {...props} />}
						/>
						<Route
							exact
							path="/connexion"
							render={(props) => <Connexion {...props} />}
						/>
						<Route
							exact
							path="/inscription"
							render={(props) => <SignUp {...props} />}
						/>
						<Route
							exact
							path="/mot-de-passe-oublie"
							render={(props) => <ForgotPassword {...props} />}
						/>
						<Route
							exact
							path="/:page?"
							render={(props) => <AppWithNavigation {...props} />}
						/>
						<Route component={PageNotFound} />
					</Switch>
					<Footer />
				</ThemeProvider>
			</BrowserRouter>
			<ToastContainer />
		</AuthContext.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
