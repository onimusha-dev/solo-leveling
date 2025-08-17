import { model, Schema, InferSchemaType } from "mongoose";

const statSchema: Schema = new Schema(
    {
        grade: {
            type: String,
            enum: ['S', 'A', 'B', 'C', 'D', 'E'],
            default: 'E'
        },
        xp: {
            type: Number,
            default: 0
        },
        totalMission: {
            type: Number,
            default: 0
        },
        totalMissionComplete: {
            type: Number,
            default: 0
        },

    },
    {
        timestamps: false
    }
)

export type StatSchemaType = InferSchemaType<typeof statSchema>

export const Stats = model<StatSchemaType>('Stats', statSchema)