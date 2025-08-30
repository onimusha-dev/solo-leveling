import { model, Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
    userId: Types.ObjectId;
    otp: {
        type: String
        required: true
        expired: Date
    }
}

const otpSchema = new Schema<IUser>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    otp: {
        type: String,
        required: true
    },
})



export const Otp = model<IUser>('Otp', otpSchema)