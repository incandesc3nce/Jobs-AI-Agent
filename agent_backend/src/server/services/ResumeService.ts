import { prisma } from "@/lib/prisma/prisma";
import { Resume } from "../../../prisma/generated";

class ResumeService {
  private static instance: ResumeService;

  private constructor() {}

  public static getInstance(): ResumeService {
    if (!ResumeService.instance) {
      ResumeService.instance = new ResumeService();
    }
    return ResumeService.instance;
  }

  public async getResumes(): Promise<Resume[]> {
    const resumes = await prisma.resume.findMany();

    return resumes;
  }

  public async getResumeById(id: string): Promise<Resume | null> {
    const resume = await prisma.resume.findUnique({
      where: {
        id,
      },
    });

    if (!resume) {
      return null;
    }

    return resume;
  }

  public async updateResume(resume: any): Promise<any> {
    // Implement the logic to update the resume
    return {};
  }

  public async createResume(resume: any): Promise<any> {
    // Implement the logic to create the resume
    return {};
  }

  public async deleteResume(id: string): Promise<any> {
    // Implement the logic to delete the resume
    return {};
  }
}

export const resumeService = ResumeService.getInstance();
