import axiosClient from "../configs/axiosClient";

const userApis = {
	async signIn() {
		return await axiosClient.post(`/auth/signin`, {
			username: "trvanluu99@gmail.com",
			password: "123456"
		});
	}
};

export default userApis;
