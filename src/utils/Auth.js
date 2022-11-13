import randomToken from "random-token";
import Cookies from "js-cookie";

export const Auth = {
	isAuthorization() {
		const token = Cookies.get("token")
		//const refreshToken = Cookies.get("rt")
		const role = Cookies.get("role")

		if (token) {
			return {role, token};
		} 
		return {role: '', token: ''};
	},
	signOut(navigate) {
		Cookies.remove("token");
		Cookies.remove("rt");
    	Cookies.remove("role");
		Cookies.remove("id");
		navigate("/");
	},
	storeUserInfoToCookie(data) {
		Cookies.set("token", randomToken(16), { expires: 2 });
		Cookies.set("rt", randomToken(16), { expires: 2 });
		Cookies.set("role", data.role, { expires: 2 });
		Cookies.set("id", data.id, { expires: 2 });
		return data;
	},
	getUserID() {
		return Cookies.get("id")
	}
};