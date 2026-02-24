import { useState } from "react"
import { useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import ShowErrorToast from "@/components/ShowErrorToast"
import ShowSuccessToast from "@/components/ShowSuccessToast"
import { resendApi, verifyOtpApi } from "@/api/AuthApi"

export default function VerifyOtp() {
    const params = useParams()
    const [otpValue, setOtpValue] = useState<string>("")

    const resendMutation = useMutation({
        mutationFn: () => resendApi({ email: params.email }),
        onSuccess: (response: any) => {
            ShowSuccessToast(response.data.message || "OTP resent successfully")
        },
        onError: (err: any) => {
            ShowErrorToast(err?.response?.data?.message || "Failed to resend OTP")
        },
    })
    const verifyMutation = useMutation({
        mutationFn: () => verifyOtpApi({ email: params.email, otp: otpValue }),
        onSuccess: (response: any) => {
            ShowSuccessToast(response.data.message || "OTP verified successfully")
            // You can redirect user here after verification
        },
        onError: (err: any) => {
            ShowErrorToast(err?.response?.data?.message || "OTP verification failed")
        },
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-lg border-muted">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-semibold">Verify your Email</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        We’ve sent a 6-digit verification code to your email address.
                        <br />
                        This code will expire in 5 minutes.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={otpValue}
                            onChange={(val) => setOtpValue(val)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>

                            <InputOTPSeparator />

                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    <Button
                        className="w-full"
                        onClick={() => verifyMutation.mutate()}
                        disabled={otpValue.length < 6 || verifyMutation.isPending}
                    >
                        {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Didn’t receive the code?{" "}
                        <button
                            className="text-primary font-medium hover:underline"
                            onClick={() => resendMutation.mutate()}
                            disabled={resendMutation.isPending}
                        >
                            {resendMutation.isPending ? "Resending..." : "Resend"}
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}