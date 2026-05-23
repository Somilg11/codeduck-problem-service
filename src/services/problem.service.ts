import { ICreateProblemDto, IUpdateProblemDto } from "../validators/problem.validator";
import { IProblem } from "../models/problem.model";
import { IProblemRepository } from "../repositories/problem.repository";
import { sanitizeMarkdown } from "../utils/markdown.sanitize";

export interface IProblemService {
    createProblem(problem: ICreateProblemDto): Promise<IProblem>;
    getProblemById(id: string): Promise<IProblem | null>;
    getProblems(): Promise<{problems: IProblem[], total: number}>;
    updateProblem(id: string, updateData: IUpdateProblemDto): Promise<IProblem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<{problems: IProblem[], total: number}>;
    searchProblems(query: string): Promise<{problems: IProblem[], total: number}>;
}

export class ProblemService implements IProblemService {
    private problemRepository: IProblemRepository;
    constructor(problemRepository: IProblemRepository) { // Dependency Injection
        this.problemRepository = problemRepository;
    }
    async createProblem(problem: ICreateProblemDto): Promise<IProblem> {
        // sanitize the markdown content
        const sanitizedPayload = {
            ...problem,
            description: await sanitizeMarkdown(problem.description),
            editorial: problem.editorial && await sanitizeMarkdown(problem.editorial)
        }
        return await this.problemRepository.createProblem(sanitizedPayload);
    }
    async getProblemById(id: string): Promise<IProblem | null> {
        const problem = await this.problemRepository.getProblemById(id);
        if (!problem) {
            throw new Error("Problem not found");
        }
        return problem;
    }
    async getProblems(): Promise<{problems: IProblem[], total: number}> {
        return await this.problemRepository.getProblems();
    }
    async updateProblem(id: string, updateData: IUpdateProblemDto): Promise<IProblem | null> {
        const problem = await this.problemRepository.getProblemById(id);
        if (!problem) {
            throw new Error("Problem not found");
        }
        const sanitizedPayload: Partial<IProblem> = {
            ...updateData,
        }
        if(updateData.description) {
            sanitizedPayload.description = await sanitizeMarkdown(updateData.description);
        }
        if(updateData.editorial) {
            sanitizedPayload.editorial = await sanitizeMarkdown(updateData.editorial);
        }
        return await this.problemRepository.updateProblem(id, sanitizedPayload);
    }
    async deleteProblem(id: string): Promise<boolean> {
        const result = await this.problemRepository.deleteProblem(id);
        if (!result) {
            throw new Error("Problem not found");
        }
        return result;
    }
    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<{problems: IProblem[], total: number}> {
        return await this.problemRepository.findByDifficulty(difficulty);
    }
    async searchProblems(query: string): Promise<{problems: IProblem[], total: number}> {
        if(!query || query.trim() === "") {
            throw new Error("Query is required");
        }
        return await this.problemRepository.searchProblems(query);
    }
}