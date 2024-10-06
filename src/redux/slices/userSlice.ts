import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import type { AppThunk } from "../store";
import userApis from "../../apis/userApis";
import { toast } from "react-toastify";

export interface UserSliceState {
	user: string;
	status: "idle" | "loading" | "failed";
}

const initialState: UserSliceState = {
	user: "",
	status: "idle"
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
	name: "user",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: (create) => ({
		signIn: create.asyncThunk(
			async (username, password) => {
				const response = await userApis.signIn();
				// The value we return becomes the `fulfilled` action payload
				console.log(response.data);
				toast.success("Success full!")
				
				return response.data.title;
			},
			{
				pending: (state) => {
					state.status = "loading";
				},
				fulfilled: (state, action) => {
					state.status = "idle";
					state.user = action.payload;
				},
				rejected: (state) => {
					state.status = "failed";
				}
			}
		)
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectUser: (state) => state.user,
		selectStatus: (state) => state.status
	}
});

// Action creators are generated for each case reducer function.
export const { signIn } = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUser, selectStatus } = userSlice.selectors;
