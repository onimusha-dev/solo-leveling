import * as z from "zod"

const emailSchema = z.string().email()

const usernameSchema = z.string()
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");

const passwordSchema = z.string().min(8).max(16)



const loginSchema = z.object({
    anotherField: z.union([emailSchema, usernameSchema]),
    password: passwordSchema
})


export type LoginInput = z.infer<typeof loginSchema>
export default loginSchema;

