import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";


export default function LoginForm() {
    const [eye, setEye] = useState(true)

    const handleEye = () => {
        setEye(prev => !prev)
    }
    return (
        <form>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
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
              required />

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
                    <Button size="lg" className="w-full">
                        Login
                    </Button>
                </div>
            </div>
        </form>
    )
}
