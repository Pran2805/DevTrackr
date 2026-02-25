import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ShowErrorToast from "../ShowErrorToast";
import { LoginApi } from "@/api/AuthApi";

interface Data {
    email: string
    password: string
}
export default function LoginForm() {
    const [eye, setEye] = useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({
        mutationFn: (data: Data) => LoginApi(data),
        onSuccess: (response: any) => {
            console.log(response)
            navigate("/dashboard")
        },
        onError: (err: any) => {
            return ShowErrorToast(err?.response.data)

        },
    });

    const handleEye = () => {
        setEye(prev => !prev)
    }

    const onSubmit = (formData: Data) => {
        mutate(formData);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={eye ? "password" : "text"}
                            placeholder="********"
                            required
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}

                        {!eye ?
                            <Eye
                                className="absolute right-2 top-2  text-gray-700"
                                onClick={handleEye}
                            />
                            :
                            <EyeOff
                                className="absolute right-2 top-2  text-gray-700"
                                onClick={handleEye}
                            />
                        }
                    </div>
                </div>

                <div>
                    <Button size="lg" className="w-full" disabled={isPending}>
                        {isPending ? "Loading..." : "Login"}
                    </Button>
                </div>
            </div>
        </form>
    )
}
