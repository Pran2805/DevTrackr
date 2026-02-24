import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
            <Card className="shadow-2xl min-w-md">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Enter your details to sign up your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="text-xs w-full flex justify-center text-gray-800">
                        Create an account - <span>
                            <Link to="/signup" className="text-blue-700 hover:underline  font-semibold"> &nbsp;Signup</Link>
                        </span>
                </CardFooter>
            </Card>
        </div>
  )
}
