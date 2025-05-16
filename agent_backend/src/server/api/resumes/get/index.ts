import { resumeService } from "@/server/services/ResumeService";
import { decorateError } from "@/utils/decorateError";
import { Request, Response } from "express";

export const getAllResumesRoute = async (_: Request, res: Response) => {
  try {
    const resumes = await resumeService.getResumes();

    res.status(200).json({
      resumes,
      message: "Successfully got resumes",
      success: true,
    });
  } catch (error) {
    decorateError(error);
    res.status(500).json({
      message: "Something went wrong during getting resumes",
      success: false,
    });
  }
};
