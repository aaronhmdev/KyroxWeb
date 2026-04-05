import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    const contact = await prisma.message.create({
      data: {
        name,
        email,
        message,
        userId: session?.user?.id || undefined,
      },
    });

    return NextResponse.json({
      message: 'Message sent successfully',
      contact,
    });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
