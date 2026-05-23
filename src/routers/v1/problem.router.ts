import express from 'express';
import { validateRequestBody, validateRequestParams } from '../../validators';
import { createProblemSchema, findByDifficultySchema, updateProblemSchema } from '../../validators/problem.validator';
import { ProblemController } from '../../controllers/problem.controller';
// import { ProblemService } from '../../services/problem.service';
// import ProblemRepository from '../../repositories/problem.repository';

const problemRouter = express.Router();

// const problemRepository = new ProblemRepository();
// const problemService = new ProblemService(problemRepository); // You would typically inject a repository here
// const problemController = new ProblemController(problemService);

problemRouter.post('/', validateRequestBody(createProblemSchema), ProblemController.createProblem);
problemRouter.get('/:id', ProblemController.getProblemById);
problemRouter.get('/', ProblemController.getProblems);
problemRouter.put('/:id', validateRequestBody(updateProblemSchema), ProblemController.updateProblem);
problemRouter.delete('/:id', ProblemController.deleteProblem);
problemRouter.get('/difficulty/:difficulty', validateRequestParams(findByDifficultySchema), ProblemController.findByDifficulty);
problemRouter.get('/search', ProblemController.searchProblems);

export default problemRouter;