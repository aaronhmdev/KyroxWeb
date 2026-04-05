const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.progress.deleteMany();
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.streak.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.course.deleteMany();
  await prisma.project.deleteMany();
  await prisma.post.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  // Create achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      title: 'Primer Paso',
      description: 'Completa tu primer curso',
      icon: '🎓',
      criteria: 'complete_first_course',
    },
  });

  const achievement2 = await prisma.achievement.create({
    data: {
      title: 'Proyectista',
      description: 'Sube tu primer proyecto',
      icon: '🚀',
      criteria: 'upload_first_project',
    },
  });

  const achievement3 = await prisma.achievement.create({
    data: {
      title: 'Nivel 5',
      description: 'Alcanza el nivel 5',
      icon: '⭐',
      criteria: 'reach_level_5',
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      title: 'HTML Básico',
      description: 'Aprende las bases de HTML para crear páginas web',
      category: 'Frontend',
      level: 'BASICO',
      content: 'Contenido del curso de HTML...',
      videoUrl: 'https://www.youtube.com/embed/MJkdaVFHrjE',
      order: 1,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'CSS Intermedio',
      description: 'Domina CSS para crear diseños profesionales',
      category: 'Frontend',
      level: 'INTERMEDIO',
      content: 'Contenido del curso de CSS...',
      videoUrl: 'https://www.youtube.com/embed/yfoY53QXEnI',
      order: 2,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'JavaScript Avanzado',
      description: 'Conviértete en un experto en JavaScript',
      category: 'Frontend',
      level: 'AVANZADO',
      content: 'Contenido del curso de JavaScript...',
      videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
      order: 3,
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
