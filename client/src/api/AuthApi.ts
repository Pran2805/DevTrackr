import { axiosInstance } from '@/utils/axios';

interface SignupData {
    email: string,
    fullName: string,
    password: string
}

export async function SignupApi(data: SignupData) {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
}

export async function resendApi(email: { email: any }) {
    const response = await axiosInstance.post("/auth/resend", email);
    return response.data;
}
export async function verifyOtpApi(data: any) {
    const response = await axiosInstance.post("/auth/verify", data);
    return response.data;
}

export async function LoginApi(data: any) {
    const response = await axiosInstance.post("/auth/login", data)
    return response.data;
}