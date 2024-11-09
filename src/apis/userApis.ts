import axiosClient from "../configs/axiosClient";
import { SignInData } from "../interfaces/user";

const userApis = {
	async signIn(signInData: SignInData) {
		return await axiosClient.post(`/auth/signin`, {
			username: signInData.username,
			password: signInData.password
		});
	}
};

export default userApis;
