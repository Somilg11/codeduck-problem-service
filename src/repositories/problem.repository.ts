import { IProblem, Problem } from "../models/problem.model";

export interface IProblemRepository {
    createProblem(problem: Partial<IProblem>): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getProblems(): Promise<{problems: IProblem[], total: number}>;
    updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<{problems: IProblem[], total: number}>;
    searchProblems(query: string): Promise<{problems: IProblem[], total: number}>;
}

export class ProblemRepository implements IProblemRepository {
    async createProblem(problem: Partial<IProblem>): Promise<IProblem>{
        const newProblem = new Problem(problem);
        return await newProblem.save().then(problem => problem.toObject());
    }
    async getProblemById(id: string): Promise<IProblem | null>{
        return await Problem.findById(id).then(problem => problem ? problem.toObject() : null);
    }
    async getProblems(): Promise<{problems: IProblem[], total: number}> {
        const problems = await Problem.find();
        return { problems: problems.map(problem => problem.toObject()), total: problems.length };
    }
    async updateProblem(id: string, updateData: Partial<IProblem>): Promise<IProblem | null> {
        const result = await Problem.findByIdAndUpdate(id, updateData, { new: true });
        return result ? result.toObject() : null;
    }
    async deleteProblem(id: string): Promise<boolean> {
        const result = await Problem.findByIdAndDelete(id);
        return result !== null;
    }
    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<{problems: IProblem[], total: number}> {
        const problems = await Problem.find({ difficulty });
        return { problems: problems.map(problem => problem.toObject()), total: problems.length };
    }
    async searchProblems(query: string): Promise<{problems: IProblem[], total: number}> {
        const regex = new RegExp(query, "i");
        return await Problem.find({ $or: [{ title: regex }, { description: regex }] }).then(problems => ({ problems: problems.map(problem => problem.toObject()), total: problems.length }));
    }
};

export default ProblemRepository;