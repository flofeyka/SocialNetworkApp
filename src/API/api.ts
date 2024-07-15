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
    async getUsers(currentPage: number = 1, pageSize: number = 10, term: string = "", friend: boolean | null = null) {
        const Response = await instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`);
        return Response.data;
    },
};

export const ProfileAPI = {
    async getUserProfile(userId : number) {
        const {data} = await instance.get(`profile/${userId}`);
        return data;
    }, async getProfileStatus(userId : number) {
        const {data} = await instance.get(`profile/status/${userId}`);
        return data;
    }, async setProfileStatus(status : string | null) {
        const {data} = await instance.put("profile/status", {status});
        return data;
    }, async getFollowingData(userId : number) {
        const {data} = await instance.get(`follow/${userId}`);
        return data;
    }, async editProfileData(profileData : profileDataType) {
        const {data} = await instance.put("profile", profileData);
        return data;
    }
};

export const AuthAPI = {
    async getUsersData() {
        const {data} = await instance.get("auth/me");
        return data;
    }, 
    async Login(email : string, password : string , rememberMe : boolean = false, captcha : string | null = null) {
        const {data} = await instance.post("auth/login", {email, password, rememberMe, captcha});
        return data;
    }, 
    async LogOut() {
        const {data} = await instance.delete("auth/login");
        return data;
    }, async setCurrentPhoto(photo: File) {
        let formData = new FormData();
        formData.append("image", photo);
        
        const {data} = await instance.put("profile/photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return data;
    }
};

export const SecurityAPI = {
    async getCaptcha() {
        const {data} = await instance.get("security/get-captcha-url");
        return data;
    }
}
