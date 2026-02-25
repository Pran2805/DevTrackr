import z from 'zod'

export const signupSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full Name should be atleast 3 characters long")
        .max(32, "Full Name should not exceed the 32 characters")
        .trim(),
    email: z.
        string()
        .email("Invalid email address")
        .min(6, "Email should be atleast 6 characters long"),
    password: z
        .string()
        .min(6, "Password should be atleast 6 characters long"),
})
export const loginSchema = z.object({
       email: z.
        string()
        .email("Invalid email address")
        .min(6, "Email should be atleast 6 characters long"),
    password: z
        .string()
        .min(6, "Password should be atleast 6 characters long"),
})