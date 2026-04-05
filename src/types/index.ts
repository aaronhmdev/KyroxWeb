export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  github: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  level: number;
  xp: number;
  nextLevelXp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'BASICO' | 'INTERMEDIO' | 'AVANZADO';
  content: string;
  videoUrl?: string;
  pdfUrl?: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  criteria: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
