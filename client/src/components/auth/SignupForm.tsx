import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from '../ui/label'
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { signupSchema } from "@/schemas/auth";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupApi } from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import ShowErrorToast from "../ShowErrorToast";
import { useNavigate } from "react-router-dom";

interface Data {
  email: string,
  fullName: string,
  password: string
}

interface Err extends Error {
  response: {
    data: {
      message: string,
      success: boolean
    }
  }
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: Data) => SignupApi(data),
    onSuccess: (response: any) => {
      console.log(response.user.email)
      navigate(`/verify-otp/${response?.user?.email}`);
    },
    onError: (err: Err) => {
      return ShowErrorToast(err?.response.data)

    },
  });

  const onSubmit = (formData: Data) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">

        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("password")}
            />

            {showPassword ? (
              <Eye
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                size={18}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeOff
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                size={18}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Creating account..." : "Sign Up"}
        </Button>
      </div>
    </form>
  )
}
