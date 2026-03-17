"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

type FormData = {
    name: string;
    email: string;
    password: string;
};

export function SignUpCard() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log(data);
    };

    return (
        <Card className="w-full max-w-md border border-border/60 shadow-xl backdrop-blur bg-card/90">
            <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                    Create an account
                </CardTitle>

                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="/policy" className="link">
                        Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="link">
                        Terms & Conditions
                    </Link>
                </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 size-4.5 text-muted-foreground" />

                            <Input
                                type="text"
                                placeholder="Full Name"
                                className="pl-12 h-10"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                        </div>

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 size-4.5 text-muted-foreground" />

                            <Input
                                type="email"
                                placeholder="Email"
                                className="pl-12 h-10"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                        </div>

                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 size-4.5 text-muted-foreground" />

                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="pl-12 pr-10 h-10"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters",
                                    },
                                })}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full font-medium tracking-wide h-11"
                    >
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                    </Button>

                    {/* DIVIDER */}
                    <div className="relative my-4">
                        <Separator />
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground bg-card px-2 w-fit mx-auto -mt-2">
                            OR CONTINUE WITH
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center justify-center gap-2 h-10"
                            onClick={() => {
                                console.log("Google Auth");
                            }}
                        >
                            <FcGoogle />
                            Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center justify-center gap-2 h-10"
                            onClick={() => {
                                console.log("GitHub Auth");
                            }}
                        >
                            <FaGithub />
                            GitHub
                        </Button>

                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            className="text-primary hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                </form>
            </CardContent>
        </Card>
    );
}