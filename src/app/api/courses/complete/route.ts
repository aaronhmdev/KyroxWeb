import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { addXP, unlockAchievement, XP_REWARDS_CONST } from '@/lib/gamification';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 });
    }

    // Mark course as complete
    const progress = await prisma.progress.upsert({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
      create: {
        userId: session.user.id,
        courseId,
        completed: true,
        progress: 100,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        progress: 100,
        completedAt: new Date(),
      },
    });

    // Add XP
    const xpResult = await addXP(session.user.id, XP_REWARDS_CONST.COMPLETE_COURSE);

    // Check for achievement
    const completedCount = await prisma.progress.count({
      where: {
        userId: session.user.id,
        completed: true,
      },
    });

    if (completedCount === 1) {
      const achievement = await prisma.achievement.findFirst({
        where: { criteria: 'complete_first_course' },
      });
      if (achievement) {
        await unlockAchievement(session.user.id, achievement.id);
      }
    }

    return NextResponse.json({
      message: 'Course completed',
      progress,
      xp: xpResult,
    });
  } catch (error) {
    console.error('Complete course error:', error);
    return NextResponse.json(
      { error: 'Failed to complete course' },
      { status: 500 }
    );
  }
}
