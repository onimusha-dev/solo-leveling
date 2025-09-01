import * as z from "zod"

const resetPasswordSchema = z.object(
    {
        oldPassword: z.string().min(8).max(16),
        newPassword: z.string().min(8).max(16),
        confirmPassword: z.string().min(8).max(16)
    }
)
    .refine((data) => data.newPassword !== data.oldPassword, {
        message: "New password cannot be the same as the old password",
        path: ["newPassword"],
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export default resetPasswordSchema;