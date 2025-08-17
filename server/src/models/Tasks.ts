import { model, Schema, InferSchemaType } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        body: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true } 
)

export type TaskSchemaType = InferSchemaType<typeof taskSchema>

export const Task = model<TaskSchemaType>("Task", taskSchema)

