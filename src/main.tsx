import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./configs/routes";
// The CssBaseline component helps to kickstart an elegant, consistent, and simple baseline to build upon (familiar with normalize.css).
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");

if (container) {
	const root = createRoot(container);

	root.render(
		<React.StrictMode>
			<CssBaseline />
			<Provider store={store}>
				<RouterProvider router={router} />
				<ToastContainer />
			</Provider>
		</React.StrictMode>
	);
} else {
	throw new Error(
		"Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
	);
}
