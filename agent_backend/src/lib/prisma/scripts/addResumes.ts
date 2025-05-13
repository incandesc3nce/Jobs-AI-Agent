import { prisma } from '../prisma';
import { WorkFormat } from '../../../../prisma/generated';

(async () => {
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  const userInfo = [
    {
      title: 'Frontend Разработчик',
      skills: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Node.js'],
      experience: '3 года',
      location: 'Москва',
      workFormat: WorkFormat.Remote,
    },
    {
      title: 'Backend Разработчик',
      skills: ['JavaScript', 'Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL'],
      experience: '4 года',
      location: 'Санкт-Петербург',
      workFormat: WorkFormat.Hybrid,
    },
    {
      title: 'Fullstack Разработчик',
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
      experience: '5 года',
      location: 'Москва',
      workFormat: WorkFormat.Onsite,
    },
  ];

  userIds.forEach(async (userId, i) => {
    const resumeInfo = userInfo[i % userInfo.length]!;

    const resume = await prisma.resume.create({
      data: {
        userId,
        ...resumeInfo,
      },
    });
    console.log(`Created resume for user ${userId}:`, resume);
  });
})();
