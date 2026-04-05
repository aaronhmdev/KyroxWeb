import { prisma } from './prisma';

export const XP_REWARDS_CONST = {
  COMPLETE_COURSE: 100,
  COMPLETE_CHALLENGE: 50,
  UPLOAD_PROJECT: 150,
};

const XP_PER_LEVEL = 500;
const BASE_XP_FOR_LEVEL = 100;
const LEVEL_XP_MULTIPLIER = 1.1;

export async function addXP(userId: string, amount: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');

  const newTotalXP = user.xp + amount;
  const newLevel = Math.floor(newTotalXP / XP_PER_LEVEL) + 1;
  const leveledUp = newLevel > user.level;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newTotalXP,
      level: newLevel,
      nextLevelXp: (newLevel + 1) * XP_PER_LEVEL,
    },
  });

  return {
    leveledUp,
    previousLevel: user.level,
    newLevel,
    newTotalXP,
    xpEarned: amount,
    user: updatedUser,
  };
}

export async function unlockAchievement(userId: string, achievementId: string) {
  try {
    const existing = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId,
        },
      },
    });

    if (existing) {
      return { message: 'Achievement already unlocked' };
    }

    const achievement = await prisma.userAchievement.create({
      data: {
        userId,
        achievementId,
      },
      include: {
        achievement: true,
      },
    });

    return {
      message: 'Achievement unlocked!',
      achievement,
    };
  } catch (error) {
    throw new Error('Failed to unlock achievement');
  }
}

export function calculateNextLevelXp(level: number): number {
  return Math.floor(BASE_XP_FOR_LEVEL * Math.pow(LEVEL_XP_MULTIPLIER, level - 1));
}
