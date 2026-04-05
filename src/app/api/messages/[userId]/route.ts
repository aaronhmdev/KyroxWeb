import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const userId = params.userId;

    // Check if users are friends
    const friendship = await prisma.follow.findFirst({
      where: {
        AND: [
          { followerId: session.user.id },
          { followingId: userId },
        ],
      },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: 'Debes ser amigo de este usuario para ver los mensajes' },
        { status: 403 }
      );
    }

    // Get messages from specific user
    const messages = await prisma.privateMessage.findMany({
      where: {
        OR: [
          {
            senderId: session.user.id,
            receiverId: userId,
          },
          {
            senderId: userId,
            receiverId: session.user.id,
          },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: limit,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Mark as read
    await prisma.privateMessage.updateMany({
      where: {
        senderId: userId,
        receiverId: session.user.id,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
