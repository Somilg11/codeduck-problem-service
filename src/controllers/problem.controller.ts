import { Request, Response } from "express";
import logger from "../config/logger.config";
import { ProblemService } from "../services/problem.service";
import { createProblemSchema } from "../validators/problem.validator";
import ProblemRepository from "../repositories/problem.repository";

// export interface IProblemController {
//   getProblems: (req: Request, res: Response) => Promise<void>;
//   getProblemById: (req: Request, res: Response) => Promise<void>;
//   createProblem: (req: Request, res: Response) => Promise<void>;
//   updateProblem: (req: Request, res: Response) => Promise<void>;
//   deleteProblem: (req: Request, res: Response) => Promise<void>;
//   findByDifficulty: (req: Request, res: Response) => Promise<void>;
//   searchProblems: (req: Request, res: Response) => Promise<void>;
// }

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);

export const ProblemController = {
//   private problemService: IProblemService;
  
//   constructor(problemService: IProblemService) { // constructor injection
//     this.problemService = problemService;
//   }

  async createProblem(req: Request, res: Response): Promise<void> {
    try {
      const validateProblemDto = await problemService.createProblem(createProblemSchema.parse(req.body));
      res.status(201).json({
        message: "Problem created successfully",
        data: validateProblemDto,
        success: true,
      });
    } catch (error) {
      logger.error("Error creating problem", error);
    }
  },

  async getProblemById(req: Request, res: Response): Promise<void> {
    try {
      const problem = await problemService.getProblemById(req.params.id);
      res.status(200).json({
        message: "Problem fetched successfully",
        data: problem,
        success: true,
      });
    } catch (error) {
      logger.error("Error fetching problem by ID", error);
    }
  },

  async getProblems(req: Request, res: Response): Promise<void> {
    try {
      const { problems, total } = await problemService.getProblems();
      res.status(200).json({
        message: "Problems fetched successfully",
        data: problems,
        total,
        success: true,
      });
    } catch (error) {
      logger.error("Error fetching problems", error);
    }
  },

  async updateProblem(req: Request, res: Response): Promise<void> {
    try {
      const updatedProblem = await problemService.updateProblem(req.params.id, req.body);
      res.status(200).json({
        message: "Problem updated successfully",
        data: updatedProblem,
        success: true,
      });
    } catch (error) {
      logger.error("Error updating problem", error);
    }
  },

  async deleteProblem(req: Request, res: Response): Promise<void> {
    try {
      await problemService.deleteProblem(req.params.id);
      res.status(200).json({
        message: "Problem deleted successfully",
        success: true,
      });
    } catch (error) {
      logger.error("Error deleting problem", error);
    }
  },

  async findByDifficulty(req: Request, res: Response): Promise<void> {
    try {
        
      const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
      const { problems, total } = await problemService.findByDifficulty(difficulty);
      res.status(200).json({
        message: "Problems fetched successfully",
        data: problems,
        total,
        success: true,
      });
    } catch (error) {
      logger.error("Error fetching problems by difficulty", error);
    }
  },

  async searchProblems(req: Request, res: Response): Promise<void> {
    try {
      const { problems, total } = await problemService.searchProblems(req.query.q as string);
      res.status(200).json({
        message: "Problems fetched successfully",
        data: problems,
        total,
        success: true,
      });
    } catch (error) {
      logger.error("Error searching problems", error);
    }
  }
}