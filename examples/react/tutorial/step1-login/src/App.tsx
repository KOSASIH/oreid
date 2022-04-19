import { AuthProvider, OreId, UserData } from "oreid-js";
import LoginButton from "oreid-login-button";
// ! To use hooks from oreid-react make sure you added the OreidProvider (index.tx shows how to do this)
import {
	OreidProvider,
	useActionAuth,
	useActionLogout,
	useIsLoggedIn,
	useUser,
} from "oreid-react";
import { createOreIdWebWidget, OreIdWebWidget } from "oreid-webwidget";
import React, { useEffect, useState } from "react";
import "./App.css";

const REACT_APP_OREID_APP_ID = "demo_0097ed83e0a54e679ca46d082ee0e33a";
const REACT_APP_OREID_API_KEY = "demo_k_97b33a2f8c984fb5b119567ca19e4a49";

// * Initialize OreId
const oreId = new OreId({
	appName: "ORE ID Sample App",
	appId: REACT_APP_OREID_APP_ID,
	apiKey: REACT_APP_OREID_API_KEY,
});

interface OreidReactError {
	errors?: string | undefined;
	data?: any;
}
const LoggedOutComponent: React.FC = () => {
	const onAuth = useActionAuth();
	const [errors, setErrors] = useState<OreidReactError | undefined>();

	const onError = (error: OreidReactError) => {
		console.log("Login failed");
		setErrors(error);
	};

	const onSuccess = (user: UserData) => {
		console.log("Login successfully");
		console.log("User Data: ", user);
	};

	return (
		<>
			<div>
				<LoginButton
					provider="facebook"
					onClick={() => {
						// * onError and onSuccess are optional. They're just here to show that they exist.
						// ! provider is also optional, but its use is highly recommended.
						onAuth({
							params: { provider: AuthProvider.Facebook },
							onError,
							onSuccess,
						});
					}}
				/>
				<LoginButton
					provider="google"
					onClick={() => {
						// * onError and onSuccess are optional. They're just here to show that they exist.
						// ! provider is also optional, but its use is highly recommended.
						onAuth({
							params: { provider: AuthProvider.Google },
							onError,
							onSuccess,
						});
					}}
				/>
				<LoginButton
					provider="email"
					onClick={() => {
						// * onError and onSuccess are optional. They're just here to show that they exist.
						// ! provider is also optional, but its use is highly recommended.
						onAuth({
							params: { provider: AuthProvider.Email },
							onError,
							onSuccess,
						});
					}}
				/>
			</div>
			{errors && <div className="App-error">Error: {errors.errors}</div>}
		</>
	);
};

const LoggedInComponent: React.FC = () => {
	const user = useUser();
	const logout = useActionLogout();

	if (!user) return null;

	const { accountName, email, name, picture, username } = user;
	return (
		<div style={{ marginTop: 50, marginLeft: 40 }}>
			<h4>User Info</h4>
			<img
				src={picture.toString()}
				style={{ width: 100, height: 100, paddingBottom: 30 }}
				alt={"user"}
			/>
			<br />
			OreId account: {accountName}
			<br />
			name: {name}
			<br />
			username: {username}
			<br />
			email: {email}
			<br />
			<button
				onClick={() =>
					// * onError and onSuccess are optional. They're just here to show that they exist.
					logout({ onError: console.error, onSuccess: console.log })
				}
			>
				Logout
			</button>
		</div>
	);
};

const AppWithProvider: React.FC = () => {
	const isLoggedIn = useIsLoggedIn();
	return (
		<div className="App">
			<header className="App-header">
				{isLoggedIn ? <LoggedInComponent /> : <LoggedOutComponent />}
			</header>
		</div>
	);
};

export const App: React.FC = () => {
	const [webWidget, setWebWidget] = useState<OreIdWebWidget>();

	useEffect(() => {
		createOreIdWebWidget(oreId, window).then((oreIdWebWidget) => {
			setWebWidget(oreIdWebWidget);
		});
	}, []);

	if (!webWidget) {
		return <>Loading...</>;
	}
	return (
		<OreidProvider oreId={oreId} webWidget={webWidget}>
			<AppWithProvider />
		</OreidProvider>
	);
};
