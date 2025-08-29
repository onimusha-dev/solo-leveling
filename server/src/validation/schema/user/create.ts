import * as z from "zod"


const signUpSchema = z
    .object({
        fullName: z.string().trim(),
        username: z.string()
            .trim()
            .toLowerCase()
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        email: z.string().email(),
        password: z.string().min(8).max(16),
        confirmPassword: z.string().min(8).max(16),

        termsAccept: z.coerce.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
            path: ["termsAccept"],
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });


export type SignUpInput = z.infer<typeof signUpSchema>;
export default signUpSchema;