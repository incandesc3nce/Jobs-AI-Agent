import { prisma } from '@/lib/prisma/prisma';
import { Resume, WorkFormat } from '../../../prisma/generated';

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

  public async createResume(resume: {
    username: string;
    title: string;
    skills: string[];
    experience: string;
    location: string;
    workFormat: WorkFormat;
  }) {
    const { username, title, skills, experience, location, workFormat } =
      resume;

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    const newResume = await prisma.resume.create({
      data: {
        userId: user.id,
        title,
        skills,
        experience,
        location,
        workFormat,
      },
    });

    return {
      resume: newResume,
      message: 'Successfully created resume',
      success: true,
    };
  }

  public async updateResume(resume: {
    username: string;
    resumeId: string;
    title: string;
    skills: string[];
    experience: string;
    location: string;
    workFormat: WorkFormat;
  }) {
    const {
      username,
      resumeId,
      title,
      skills,
      experience,
      location,
      workFormat,
    } = resume;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    const updatedResume = await prisma.resume.update({
      where: {
        id: resumeId,
        userId: user.id,
      },
      data: {
        title,
        skills,
        experience,
        location,
        workFormat,
      },
    });

    return {
      resume: updatedResume,
      message: 'Successfully updated resume',
      success: true,
    };
  }

  public async deleteResume(id: string, username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        success: false,
      };
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id,
      },
    });
    if (!resume) {
      return {
        message: 'Resume not found',
        success: false,
      };
    }

    if (resume.userId !== user.id) {
      return {
        message: 'You are not authorized to delete this resume',
        success: false,
      };
    }

    await prisma.resume.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Successfully deleted resume',
      success: true,
    };
  }
}

export const resumeService = ResumeService.getInstance();
