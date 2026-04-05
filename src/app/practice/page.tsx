'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Zap, TrendingUp, LogIn, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import PracticeChallenge from '@/components/PracticeChallenge';
import ProgressBar from '@/components/ProgressBar';
import ChallengesList from '@/components/Practice/ChallengesList';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language: 'html' | 'css' | 'javascript';
  xpReward: number;
  initialCode: string;
  hint: string;
  completed: boolean;
}

interface ChallengeListItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  xpReward: number;
  completed: boolean;
  tools: string[];
}

interface UserProgress {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  streak: number;
  completedChallenges: number;
  totalXP: number;
}

export default function PracticePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLevel: 1,
    currentXP: 0,
    xpToNextLevel: 500,
    streak: 0,
    completedChallenges: 0,
    totalXP: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'list' | 'challenge'>('list');

  // Cargar desafíos
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/api/practice/challenges');
        const data = await response.json();
        if (data.success) {
          setChallenges(data.data);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  // Cargar progreso del usuario
  useEffect(() => {
    const loadUserProgress = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        try {
          const response = await fetch('/api/user/profile');
          const data = await response.json();
          if (data.user) {
            const xpPerLevel = 500;
            const level = data.user.level || 1;
            const totalXp = data.user.xp || 0;
            
            // Calcular XP en el nivel actual (0-500)
            const xpInCurrentLevel = totalXp % xpPerLevel;
            // XP necesario para el siguiente nivel
            const xpNeededForNext = xpPerLevel - xpInCurrentLevel;

            setUserProgress({
              currentLevel: level,
              currentXP: xpInCurrentLevel,
              xpToNextLevel: xpNeededForNext,
              streak: data.user.streak || 0,
              completedChallenges: data.user.completedChallenges || 0,
              totalXP: totalXp,
            });
          }
        } catch (error) {
          console.error('Error loading user progress:', error);
        }
      }
    };

    loadUserProgress();
  }, [status, session]);

  // Sistema de XP pasivo: +1 XP cada 5 minutos
  useEffect(() => {
    if (status !== 'authenticated') return;

    const passiveXpInterval = setInterval(async () => {
      // Sumar 1 XP local
      setUserProgress(prev => {
        const newTotalXP = prev.totalXP + 1;
        const xpPerLevel = 500;
        
        // Calcular nuevo nivel
        const newLevel = Math.floor(newTotalXP / xpPerLevel) + 1;
        
        // Calcular XP en el nivel actual
        const newCurrentXP = newTotalXP % xpPerLevel;
        const newXPToNextLevel = xpPerLevel - newCurrentXP;
        
        // Guardar en BD (fire and forget)
        fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            xp: newTotalXP,
            level: newLevel,
          }),
        }).catch(e => console.error('Error saving passive XP:', e));
        
        return {
          ...prev,
          currentLevel: newLevel,
          currentXP: newCurrentXP,
          xpToNextLevel: newXPToNextLevel,
          totalXP: newTotalXP,
        };
      });
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(passiveXpInterval);
  }, [status]);

  const handleSelectChallenge = (challengeId: string) => {
    // Requiere autenticación para resolver
    if (status !== 'authenticated') {
      setShowLoginModal(true);
      return;
    }
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setSelectedChallenge(challenge);
      setView('challenge');
    }
  };

  const handleAttemptChallenge = (challengeId: string) => {
    // Requiere autenticación para resolver
    if (status !== 'authenticated') {
      setShowLoginModal(true);
      return;
    }
    handleSelectChallenge(challengeId);
  };

  const handleChallengeComplete = async (xpEarned: number) => {
    // Mostrar mensaje de éxito
    setCompletionMessage(`¡Desafío completado! +${xpEarned} XP`);
    setShowSuccessMessage(true);

    // Calcular nuevo XP total (acumulativo de todos los niveles)
    const newTotalXP = userProgress.totalXP + xpEarned;
    const xpPerLevel = 500;
    
    // Calcular nuevo nivel
    const newLevel = Math.floor(newTotalXP / xpPerLevel) + 1;
    
    // Calcular XP en el nivel actual (0-500)
    const newCurrentXP = newTotalXP % xpPerLevel;
    
    // XP necesario para el siguiente nivel
    const newXPToNextLevel = xpPerLevel - newCurrentXP;
    
    const leveledUp = newLevel > userProgress.currentLevel;

    const updatedProgress = {
      ...userProgress,
      currentXP: newCurrentXP,
      currentLevel: newLevel,
      xpToNextLevel: newXPToNextLevel,
      streak: userProgress.streak + 1,
      completedChallenges: userProgress.completedChallenges + 1,
      totalXP: newTotalXP,
    };

    setUserProgress(updatedProgress);

    // Marcar desafío como completado
    setChallenges(challenges.map(c =>
      c.id === selectedChallenge?.id ? { ...c, completed: true } : c
    ));

    // Mostrar notificación adicional si sube de nivel
    if (leveledUp) {
      setCompletionMessage(
        `¡Desafío completado! +${xpEarned} XP\n¡SUBISTE AL NIVEL ${newLevel}!`
      );
    }

    // Guardar progreso en BD (sin bloquear)
    try {
      await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: newLevel,
          xp: newTotalXP,
          nextLevelXp: (newLevel + 1) * xpPerLevel,
        }),
      });
    } catch (error) {
      console.error('Error saving user progress:', error);
    }

    // Regresar a la lista después de 3 segundos
    setTimeout(() => {
      setShowSuccessMessage(false);
      setView('list');
      setSelectedChallenge(null);
    }, 3000);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedChallenge(null);
  };

  // Convert challenges to the format expected by ChallengesList
  const challengesListItems: ChallengeListItem[] = challenges.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    difficulty: c.difficulty,
    xpReward: c.xpReward,
    completed: c.completed,
    tools: [c.language.toUpperCase()],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24">
      {/* Success Notification */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-lg shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-bold">{completionMessage.split('\n')[0]}</p>
              {completionMessage.includes('NIVEL') && (
                <p className="text-sm text-green-100">{completionMessage.split('\n')[1]}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {view === 'list' ? (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto px-6 py-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Zona de Práctica</h1>
                  <p className="text-gray-400 text-lg">Mejora tus habilidades de programación</p>
                </div>
              </div>
              
              {status === 'authenticated' && (
                <div className="hidden lg:flex items-center gap-8">
                  <div className="text-center bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Nivel</p>
                    <p className="text-3xl font-bold text-white">{userProgress.currentLevel}</p>
                  </div>
                  <div className="text-center bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Racha</p>
                    <p className="text-3xl font-bold text-orange-400">{userProgress.streak}</p>
                  </div>
                  <div className="text-center bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-400 text-sm">Completados</p>
                    <p className="text-3xl font-bold text-green-400">{userProgress.completedChallenges}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {status === 'authenticated' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-7xl mx-auto px-6 py-4"
            >
              <ProgressBar
                currentXP={userProgress.currentXP}
                currentLevel={userProgress.currentLevel}
                xpToNextLevel={userProgress.xpToNextLevel}
                streak={userProgress.streak}
                completedChallenges={userProgress.completedChallenges}
              />
            </motion.div>
          )}

          <div className="max-w-7xl mx-auto px-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6 border-l-4 border-blue-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-gray-400">Principiante</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {challenges.filter(c => c.difficulty === 'BEGINNER').length} Desafíos
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6 border-l-4 border-yellow-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Code2 className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-gray-400">Intermedio</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {challenges.filter(c => c.difficulty === 'INTERMEDIATE').length} Desafíos
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6 border-l-4 border-red-500"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-400" />
                  <span className="font-semibold text-gray-400">Avanzado</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {challenges.filter(c => c.difficulty === 'ADVANCED').length} Desafíos
                </p>
              </motion.div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 pb-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Cargando desafíos...</p>
                </div>
              </div>
            ) : (
              <ChallengesList
                challenges={challengesListItems}
                onSelect={handleSelectChallenge}
                onAttempt={handleAttemptChallenge}
              />
            )}
          </div>
        </>
      ) : selectedChallenge ? (
        <>
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <button
              onClick={handleBackToList}
              className="mb-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              ← Volver a desafíos
            </button>
          </div>
          <PracticeChallenge
            challenge={selectedChallenge}
            onComplete={handleChallengeComplete}
          />
        </>
      ) : null}

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-8 text-center max-w-md mx-4"
          >
            <LogIn className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Acceso Requerido</h2>
            <p className="text-gray-400 mb-6">Necesitas iniciar sesión para resolver desafíos</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <Link
                href="/auth/login"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Iniciar Sesión
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
