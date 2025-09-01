import * as z from "zod"

const otpVerifySchema = z.object({
    sessionId: z.string().uuid(),
    otp: z.string().length(6)
})

export type OtpInput = z.infer<typeof otpVerifySchema>
export default otpVerifySchema;