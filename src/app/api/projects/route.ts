import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { addXP, unlockAchievement, XP_REWARDS_CONST } from '@/lib/gamification';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, imageUrl, demoUrl, githubUrl } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        demoUrl,
        githubUrl,
        userId: session.user.id,
      },
    });

    // Add XP for uploading project
    await addXP(session.user.id, XP_REWARDS_CONST.UPLOAD_PROJECT);

    // Check for achievement
    const projectCount = await prisma.project.count({
      where: { userId: session.user.id },
    });

    if (projectCount === 1) {
      const achievement = await prisma.achievement.findFirst({
        where: { criteria: 'upload_first_project' },
      });
      if (achievement) {
        await unlockAchievement(session.user.id, achievement.id);
      }
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            level: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
