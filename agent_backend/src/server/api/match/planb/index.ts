import { prisma } from "@/lib/prisma/prisma";
import { agentService } from "@/server/services/AgentService";
import { Request, Response } from "express";

export const matchPlanBRoute =  async (_: Request, res: Response) => {
  const resume = await prisma.resume.findUnique({
    where: {
      id: 'cmamkbfan0001uvqgx0rkj7ja',
    },
  });

  const summaries = await prisma.summary.findMany();

  summaries.forEach(async (summary) => {
    await agentService.processMatch(resume!, summary);
  });

  res.status(200).json({
    message: 'Match processing started',
    success: true,
  });
}