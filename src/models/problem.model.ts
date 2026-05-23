import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ITestCase {
    input: string;
    output: string;
}

export interface IProblem extends Document {
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    createdAt: Date;
    updatedAt: Date;
    editorial?: string;
    testCases: ITestCase[];
}

const testCaseSchema = new mongoose.Schema<ITestCase>({
    input: {
        type: String,
        required: [true, "Input is required"],
        trim: true
    },
    output: {
        type: String,
        required: [true, "Output is required"],
        trim: true
    }
}, {
    // _id: false, // This will not create a _id field for the test case
});

const problemSchema = new mongoose.Schema<IProblem>({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxlength: [100, "Title must be less than 100 characters"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    difficulty: {
        type: String,
        enum: {
            values: ["easy", "medium", "hard"],
            message: "Invalid difficulty level"
        },
        default: "easy",
        required: [true, "Difficulty is required"]
    },
    editorial: {
        type: String,
        trim: true
    },
    testCases: [testCaseSchema]
},{
    timestamps: true,
    toJSON: {
        transform: (_, record) => {
            delete (record as any).__v;
            (record as any).id = (record as any)._id;
            delete (record as any)._id;
            return record;
        }
    }
});

problemSchema.index({ title: 1 }, { unique: true });
// Compound index for title and difficulty
problemSchema.index({ title: 1, difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);