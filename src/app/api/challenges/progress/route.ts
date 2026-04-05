import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { challengeId, score, xpEarned, status } = await req.json();

    // Get challenge info
    const challenge = await prisma.challenge.findUnique({
      where: { id: String(challengeId) },
    });

    if (!challenge) {
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      );
    }

    // Update user XP
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const newXP = user.xp + xpEarned;
    const xpPerLevel = 500;
    const newLevel = Math.floor(newXP / xpPerLevel) + 1;

    // Update user with new XP and level
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        xp: newXP,
        level: newLevel,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Progress saved successfully',
      data: {
        newXP,
        newLevel,
        xpEarned,
        totalXPRequired: newLevel * xpPerLevel,
        xpInCurrentLevel: newXP - (newLevel - 1) * xpPerLevel,
        leveledUp: newLevel > user.level,
      },
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

