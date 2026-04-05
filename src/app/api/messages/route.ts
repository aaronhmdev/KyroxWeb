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
    const { receiverId, content } = body;

    if (!receiverId || !content) {
      return NextResponse.json(
        { error: 'receiverId and content are required' },
        { status: 400 }
      );
    }

    if (receiverId === session.user.id) {
      return NextResponse.json(
        { error: "Can't send messages to yourself" },
        { status: 400 }
      );
    }

    const message = await prisma.privateMessage.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content,
      },
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

    return NextResponse.json(message);
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!userId) {
      // Get all conversations (latest message from each)
      const messages = await prisma.privateMessage.findMany({
        where: {
          OR: [
            { senderId: session.user.id },
            { receiverId: session.user.id },
          ],
        },
        orderBy: { createdAt: 'desc' },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      // Group by conversation
      const conversations = new Map();
      const currentUserId = session.user!.id;
      messages.forEach((msg) => {
        const otherUserId = msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
        const otherUser = msg.senderId === currentUserId ? msg.receiver : msg.sender;
        
        if (!conversations.has(otherUserId)) {
          conversations.set(otherUserId, {
            userId: otherUserId,
            userName: otherUser.name,
            userImage: otherUser.image,
            lastMessage: msg.content,
            lastMessageTime: msg.createdAt,
          });
        }
      });

      return NextResponse.json(Array.from(conversations.values()));
    } else {
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
    }
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
