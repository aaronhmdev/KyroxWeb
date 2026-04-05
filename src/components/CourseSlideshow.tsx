'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, CheckCircle, RotateCcw } from 'lucide-react';

interface CourseSlideShowProps {
  courseTitle: string;
  content: string;
  onComplete: () => void;
  onClose: () => void;
}

interface Slide {
  title: string;
  content: string;
  type: 'lecture' | 'exercise';
}

const parseContentToSlides = (content: string): Slide[] => {
  const sections = content.split('\n## ').filter(s => s.trim());
  
  return sections.map((section, idx) => {
    const lines = section.split('\n');
    const title = lines[0].replace('# ', '').trim();
    const contentText = lines.slice(1).join('\n').trim();
    
    return {
      title,
      content: contentText,
      type: idx === 0 ? 'lecture' : idx % 3 === 0 ? 'exercise' : 'lecture',
    };
  });
};

export default function CourseSlideshow({
  courseTitle,
  content,
  onComplete,
  onClose,
}: CourseSlideShowProps) {
  const slides = useMemo(() => parseContentToSlides(content), [content]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [viewingSlides, setViewingSlides] = useState(true);
  const [finalReviewMode, setFinalReviewMode] = useState(false);

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const exerciseCount = slides.filter(s => s.type === 'exercise').length;
  const completedExerciseCount = completedExercises.size;
  const allExercicesCompleted = completedExerciseCount === exerciseCount;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
    } else if (!finalReviewMode || allExercicesCompleted) {
      if (allExercicesCompleted) {
        onComplete();
      } else {
        setFinalReviewMode(true);
        setCurrentSlide(0);
        setViewingSlides(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleExerciseComplete = (exerciseIndex: number) => {
    setCompletedExercises(prev => new Set([...prev, exerciseIndex]));
  };

  const handleReviewMode = () => {
    setViewingSlides(true);
    setFinalReviewMode(true);
    setCurrentSlide(0);
  };

  const handleRestartFromBeginning = () => {
    setCurrentSlide(0);
    setViewingSlides(true);
    setFinalReviewMode(false);
    setCompletedExercises(new Set());
    setExerciseAnswers({});
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[80vh] overflow-hidden border border-purple-500/20 flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{courseTitle}</h2>
            <p className="text-purple-100 text-sm">
              {viewingSlides ? `Lección ${currentSlide + 1} de ${slides.length}` : 'Ejercicios Finales'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>

        {/* Content Area */}
        <div className="p-8 flex-1 flex flex-col justify-between overflow-hidden">
          <AnimatePresence mode="wait">
            {slide && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <h3 className="text-3xl font-bold text-white mb-6">{slide.title}</h3>

                {slide.type === 'lecture' ? (
                  <div className="text-gray-300 space-y-4 flex-1 overflow-y-auto pr-4">
                    {slide.content.split('\n').map((line, idx) => {
                      if (line.startsWith('- ')) {
                        return (
                          <div key={idx} className="flex gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            <p>{line.replace('- ', '')}</p>
                          </div>
                        );
                      }
                      if (line.startsWith('`')) {
                        return (
                          <pre key={idx} className="bg-slate-950/50 p-3 rounded border border-purple-500/20 text-purple-300 text-xs overflow-x-auto">
                            {line.replace(/`/g, '')}
                          </pre>
                        );
                      }
                      return line.trim() ? (
                        <p key={idx} className="leading-relaxed">
                          {line}
                        </p>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="bg-slate-950/50 p-6 rounded-lg border-2 border-green-500/30">
                    <p className="text-yellow-300 font-semibold mb-3">🎯 Ejercicio:</p>
                    <p className="text-gray-300 mb-4">{slide.content}</p>
                    <input
                      type="text"
                      placeholder="Ingresa tu respuesta aquí..."
                      value={exerciseAnswers[currentSlide] || ''}
                      onChange={(e) => {
                        setExerciseAnswers(prev => ({
                          ...prev,
                          [currentSlide]: e.target.value,
                        }));
                      }}
                      className="w-full px-4 py-2 bg-slate-900 border border-purple-500/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                    />
                    {exerciseAnswers[currentSlide] && (
                      <button
                        onClick={() => handleExerciseComplete(currentSlide)}
                        className="mt-3 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Completar Ejercicio
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Exercise Progress */}
          {!viewingSlides && exerciseCount > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-2">
                Ejercicios completados: {completedExerciseCount}/{exerciseCount}
              </p>
              <div className="flex gap-1">
                {Array.from({ length: exerciseCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 flex-1 rounded-full ${
                      completedExercises.has(idx) ? 'bg-green-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-950/50 border-t border-white/10 px-8 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          <div className="flex gap-2">
            {!viewingSlides && exerciseCount > 0 && !allExercicesCompleted && (
              <button
                onClick={handleReviewMode}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-500/50"
              >
                <RotateCcw className="w-4 h-4" />
                Ver Diapositivas
              </button>
            )}
            {currentSlide === slides.length - 1 && !allExercicesCompleted && (
              <div className="text-sm text-yellow-400 flex items-center gap-1">
                ⭐ Completa los ejercicios para terminar
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={
              (isLastSlide && !allExercicesCompleted && exerciseCount > 0) ||
              (finalReviewMode && !allExercicesCompleted)
            }
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
              !isLastSlide || allExercicesCompleted
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white opacity-50 cursor-not-allowed'
            }`}
          >
            {allExercicesCompleted && isLastSlide ? (
              <>
                Finalizar <CheckCircle className="w-4 h-4" />
              </>
            ) : (
              <>
                Siguiente <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
