import { decorateError } from "@/utils/decorateError";
import { Request, Response } from "express";

export const vacanciesSummarizeRoute = async (req: Request, res: Response) => {
  const { vacancies } = req.body;

  try {
    
  } catch (error) {
    decorateError(error);
    res.status(500).json({
      message: "Something went wrong during summarization",
      success: false,
    });
  }
}