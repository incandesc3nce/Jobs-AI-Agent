import { resumeService } from "@/server/services/ResumeService";
import { decorateError } from "@/utils/decorateError";
import { Request, Response } from "express";

export const getResumeByIdRoute = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const resume = await resumeService.getResumeById(id as string);

    if (!resume) {
      res.status(404).json({
        message: "Resume not found",
        success: false,
      });
      return;
    }

    res.status(200).json({
      resume,
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
