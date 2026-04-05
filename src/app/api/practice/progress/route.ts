import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface ProgressRequest {
  challengeId: string;
  score: number;
  xpEarned: number;
  status: 'completed' | 'attempted';
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body: ProgressRequest = await request.json();
    const { challengeId, score, xpEarned, status } = body;

    // Obtener usuario
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Actualizar XP y nivel
    const newXP = user.xp + xpEarned;
    const xpPerLevel = 500;
    const newLevel = Math.floor(newXP / xpPerLevel) + 1;

    // Actualizar usuario y registrar challenge progress
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXP,
        level: newLevel,
      },
    });

    // Registrar o actualizar ChallengeProgress
    await prisma.challengeProgress.upsert({
      where: {
        userId_challengeId: {
          userId: user.id,
          challengeId,
        },
      },
      update: {
        score,
        completed: status === 'completed',
      },
      create: {
        userId: user.id,
        challengeId,
        score,
        completed: status === 'completed',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Progreso registrado exitosamente',
      data: {
        newXP,
        newLevel,
        xpEarned,
        totalXPNeeded: (newLevel) * xpPerLevel,
        xpInCurrentLevel: newXP - (newLevel - 1) * xpPerLevel,
        leveledUp: newLevel > user.level,
      },
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Error al registrar progreso' },
      { status: 500 }
    );
  }
}

