import axiosClient from "../configs/axiosClient";

const userApis = {
	async signIn() {
		const id = Math.round(Math.random() * 10 + 1);
		return await axiosClient.get(`/products/${id}`);
	}
};

export default userApis;
