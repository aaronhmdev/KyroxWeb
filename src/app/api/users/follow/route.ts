import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Can't follow yourself" },
        { status: 400 }
      );
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: userId,
          },
        },
      });

      return NextResponse.json({
        message: 'Unfollowed successfully',
        isFollowing: false,
      });
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: session.user.id,
          followingId: userId,
        },
      });

      return NextResponse.json({
        message: 'Followed successfully',
        isFollowing: true,
      });
    }
  } catch (error) {
    console.error('Follow/Unfollow error:', error);
    return NextResponse.json(
      { error: 'Failed to follow/unfollow user' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get followers
    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      select: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            level: true,
            xp: true,
          },
        },
      },
    });

    // Get following
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            level: true,
            xp: true,
          },
        },
      },
    });

    const followersList = followers.map((f) => f.follower);
    const followingList = following.map((f) => f.following);

    return NextResponse.json({
      followers: followersList,
      following: followingList,
      followerCount: followersList.length,
      followingCount: followingList.length,
    });
  } catch (error) {
    console.error('Get followers error:', error);
    return NextResponse.json(
      { error: 'Failed to get followers' },
      { status: 500 }
    );
  }
}
