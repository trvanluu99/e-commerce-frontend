import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import type { AppThunk } from "../store";
import userApis from "../../apis/userApis";
import { toast } from "react-toastify";
import { SignInData } from "../../interfaces/user";
import { ApiResStatus } from "../../interfaces/api";

export interface UserSliceState extends ApiResStatus {
	user: string;
}

const initialState: UserSliceState = {
	user: "",
	apiResStatus: "idle"
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
	name: "user",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: (create) => ({
		signIn: create.asyncThunk(
			async (signInData: SignInData) => {
				const response = await userApis.signIn(signInData);
				// The value we return becomes the `fulfilled` action payload
				console.log(response.data);
				toast.success("Success full!");

				return response.data.title;
			},
			{
				pending: (state) => {
					state.apiResStatus = "loading";
				},
				fulfilled: (state, action) => {
					state.apiResStatus = "idle";
					state.user = action.payload;
				},
				rejected: (state) => {
					state.apiResStatus = "failed";
				}
			}
		)
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectUser: (state) => state.user,
		selectApiResStatus: (state) => state.apiResStatus
	}
});

// Action creators are generated for each case reducer function.
export const { signIn } = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUser, selectApiResStatus } = userSlice.selectors;
