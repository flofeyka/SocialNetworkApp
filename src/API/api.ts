import axios from "axios";
import { profileDataType } from "../types/types";

const instance = axios.create({
    withCredentials: true, baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const followAPI = {
    async unfollow(id : number) {
        const Response = await instance.delete(`follow/${id}`);
        return Response.data;
    }, 
    async follow(id : number) {
        const Response = await instance.post(`follow/${id}`, {});
        return Response.data
    }
}

export const UsersAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 10, term: string = "") {
        const Response = await instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`);
        console.log(Response.data);
        return Response.data;
    },
};

export const ProfileAPI = {
    async getUserProfile(userId : number) {
        const Response = await instance.get(`profile/${userId}`);
        return Response.data;
    }, async getProfileStatus(userId : number) {
        const Response = await instance.get(`profile/status/${userId}`);
        return Response.data;
    }, async setProfileStatus(status : string | null) {
        const Response = await instance.put("profile/status", {status});
        return Response.data;
    }, async getFollowingData(userId : number) {
        const Response = await instance.get(`follow/${userId}`);
        return Response.data;
    }, async editProfileData(data : profileDataType) {
        const Response = await instance.put("profile", data);
        return Response.data;
    }
};

export const AuthAPI = {
    async getUsersData() {
        const Response = await instance.get("auth/me");
        return Response.data;
    }, 
    async Login(email : string, password : string , rememberMe : boolean = false, captcha : string | null = null) {
        const Response = await instance.post("auth/login", {email, password, rememberMe, captcha});
        return Response.data;
    }, 
    async LogOut() {
        const Response = await instance.delete("auth/login");
        return Response.data;
    }, async setCurrentPhoto(photo: File) {
        let formData = new FormData();
        formData.append("image", photo);
        
        const Response = await instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return Response.data;
    }
};

export const SecurityAPI = {
    async getCaptcha() {
        const Response = await instance.get("security/get-captcha-url");
        return Response.data;
    }
}
