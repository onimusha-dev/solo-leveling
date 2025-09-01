import { model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IOtp extends Document {
    userId: Types.ObjectId
    sessionId: string
    otp: string
    expiresAt: Date
}

const otpSchema = new Schema<IOtp>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sessionId: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 5 * 60 * 1000,
        expires: 0
    }
})

otpSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
})

export const Otp = model<IOtp>('Otp', otpSchema)