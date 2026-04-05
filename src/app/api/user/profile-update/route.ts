import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface ProfileUpdateRequest {
  name?: string;
  bio?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  image?: string;
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body: ProfileUpdateRequest = await request.json();

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

    // Actualizar perfil
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.bio !== undefined && { bio: body.bio }),
        ...(body.instagram !== undefined && { instagram: body.instagram }),
        ...(body.twitter !== undefined && { twitter: body.twitter }),
        ...(body.github !== undefined && { github: body.github }),
        ...(body.linkedin !== undefined && { linkedin: body.linkedin }),
        ...(body.image && { image: body.image }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        image: true,
        github: true,
        instagram: true,
        twitter: true,
        linkedin: true,
        level: true,
        xp: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Error al actualizar perfil' },
      { status: 500 }
    );
  }
}
