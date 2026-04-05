import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Search users by name or email
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        github: true,
        instagram: true,
        twitter: true,
        linkedin: true,
        level: true,
        xp: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
      take: limit,
      skip: skip,
    });

    // If user is authenticated, include follow status
    if (session?.user?.id) {
      const currentUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          following: {
            select: { followingId: true },
          },
        },
      });

      const followingIds = new Set(currentUser?.following.map((f) => f.followingId) || []);

      const usersWithFollowStatus = users.map((user) => ({
        ...user,
        isFollowing: followingIds.has(user.id),
      }));

      return NextResponse.json({
        users: usersWithFollowStatus,
        total: users.length,
      });
    }

    return NextResponse.json({
      users: users.map((u) => ({
        ...u,
        isFollowing: false,
      })),
      total: users.length,
    });
  } catch (error) {
    console.error('Search users error:', error);
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    );
  }
}
