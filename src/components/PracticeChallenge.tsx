'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Copy, Check, AlertCircle, CheckCircle, Info, Zap } from 'lucide-react';
import CodeEditor from '@/components/CodeEditor';

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

interface ValidationResult {
  status: 'success' | 'error' | 'info';
  message: string;
  suggestions: string[];
  score: number;
  xpEarned: number;
}

interface PracticeChallengeProps {
  challenge: Challenge;
  onComplete?: (xpEarned: number) => void;
}

export default function PracticeChallenge({ challenge, onComplete }: PracticeChallengeProps) {
  const [code, setCode] = useState(challenge.initialCode);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

  const difficultyColors = {
    BEGINNER: 'bg-green-500/20 border-green-500/50 text-green-400',
    INTERMEDIATE: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
    ADVANCED: 'bg-red-500/20 border-red-500/50 text-red-400',
  };

  const statusIcons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  const statusColors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    error: 'bg-red-500/10 border-red-500/30 text-red-300',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
  };

  const handleValidate = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/code/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: challenge.language,
          challengeId: challenge.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);

        // Si no es error (success o info), registrar progreso con score >= 60
        if (data.status !== 'error' && data.score >= 60) {
          try {
            // Registrar en BD
            const progressResponse = await fetch('/api/practice/progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                challengeId: challenge.id,
                score: data.score,
                xpEarned: data.xpEarned || challenge.xpReward,
                status: 'completed',
              }),
            });

            if (!progressResponse.ok) {
              console.error('Error saving progress:', await progressResponse.json());
            }
          } catch (saveError) {
            console.error('Error saving challenge progress:', saveError);
          }

          // Siempre llamar onComplete después de intentar guardar
          if (onComplete) {
            const xp = data.xpEarned || challenge.xpReward;
            onComplete(xp);
          }
        }
      } else {
        setResult({
          status: 'error',
          message: data.error || 'Error en validación',
          suggestions: data.suggestions || [],
          score: 0,
          xpEarned: 0,
        });
      }
    } catch (error) {
      console.error('Validation error:', error);
      setResult({
        status: 'error',
        message: 'Error conectando con el servidor',
        suggestions: ['Verifica tu conexión a internet', 'Intenta de nuevo'],
        score: 0,
        xpEarned: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    setResult(null);
    setShowHint(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{challenge.title}</h1>
              <p className="text-gray-400 max-w-2xl">{challenge.description}</p>
            </div>
            <span className={`badge ${difficultyColors[challenge.difficulty]} px-4 py-2 rounded-lg whitespace-nowrap`}>
              {challenge.difficulty === 'BEGINNER' && 'Principiante'}
              {challenge.difficulty === 'INTERMEDIATE' && 'Intermedio'}
              {challenge.difficulty === 'ADVANCED' && 'Avanzado'}
            </span>
          </div>

          {/* Challenge Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4">
              <p className="text-gray-400 text-sm">Lenguaje</p>
              <p className="text-white font-semibold capitalize">{challenge.language}</p>
            </div>
            <div className="card p-4">
              <p className="text-gray-400 text-sm">XP Disponible</p>
              <div className="flex items-center gap-1 mt-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <p className="text-white font-semibold">{challenge.xpReward} XP</p>
              </div>
            </div>
            <div className="card p-4">
              <p className="text-gray-400 text-sm">Estado</p>
              <p className={`font-semibold ${result?.status === 'success' ? 'text-green-400' : 'text-gray-400'}`}>
                {result?.status === 'success' ? '✓ Completado' : 'Pendiente'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Editor de Código</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="btn-secondary text-sm flex items-center gap-1"
                  title="Copiar código"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="btn-secondary text-sm flex items-center gap-1"
                  title="Reiniciar código"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            <CodeEditor
              language={challenge.language}
              value={code}
              onChange={setCode}
              height="h-96"
            />

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleValidate}
                disabled={isLoading}
                className="btn-primary flex items-center gap-2 flex-1 justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Validando...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Ejecutar y Validar
                  </>
                )}
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="btn-secondary"
              >
                {showHint ? 'Ocultar Pista' : 'Mostrar Pista'}
              </button>
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 card bg-blue-500/10 border-blue-500/30 p-4"
                >
                  <p className="text-blue-300 text-sm">
                    <strong>💡 Pista:</strong> {challenge.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Resultados</h2>

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`card border p-6 ${statusColors[result.status]}`}
                >
                  {/* Status Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    {statusIcons[result.status]}
                    <span className="font-semibold">
                      {result.status === 'success' && '¡Excelente!'}
                      {result.status === 'error' && 'Error'}
                      {result.status === 'info' && 'Información'}
                    </span>
                  </div>

                  {/* Message */}
                  <p className="mb-4 text-sm leading-relaxed">{result.message}</p>

                  {/* Score */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">Puntuación</span>
                      <span className="text-lg font-bold">{result.score}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full ${result.status === 'success' ? 'bg-green-400' : result.status === 'error' ? 'bg-red-400' : 'bg-blue-400'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* XP Earned */}
                  {result.xpEarned > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2 mb-4 p-3 bg-yellow-500/20 rounded-lg"
                    >
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-yellow-300">+{result.xpEarned} XP</span>
                    </motion.div>
                  )}

                  {/* Suggestions */}
                  {result.suggestions.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2">Sugerencias:</p>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * (index + 1) }}
                            className="text-sm flex gap-2"
                          >
                            <span className="text-yellow-400 flex-shrink-0">→</span>
                            <span>{suggestion}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card p-6 text-center text-gray-400"
                >
                  <p className="text-sm">
                    Escribe tu código y haz clic en "Ejecutar y Validar" para ver los resultados
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
