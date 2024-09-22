import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Error from "../pages/Error";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Error />,
	},
	{
		path: "/sign-in",
		element: <SignIn />,
		errorElement: <Error />,
	},
	{
		path: "/test",
		element: <Test />,
		errorElement: <Error />,
	},
]);

export default router;
