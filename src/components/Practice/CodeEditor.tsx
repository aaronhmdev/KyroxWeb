'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, RotateCcw, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: 'html' | 'css' | 'javascript';
  onExecute?: (code: string) => void;
  feedback?: {
    status: 'success' | 'error' | 'info';
    message: string;
    suggestions?: string[];
  } | null;
  isLoading?: boolean;
}

export default function CodeEditor({
  initialCode = '',
  language = 'javascript',
  onExecute,
  feedback,
  isLoading = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const handleExecute = () => {
    onExecute?.(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-gray-700"
      >
        <div className="bg-[#323232] px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-3 text-sm text-gray-400 font-mono">editor.{language}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-600 rounded transition-colors"
            title="Copy code"
          >
            <Copy className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-96 bg-[#1e1e1e] text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none"
          spellCheck="false"
          placeholder="Escribe tu código aquí..."
        />

        <div className="bg-[#323232] px-4 py-3 border-t border-gray-700 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExecute}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded font-semibold hover:shadow-lg disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isLoading ? 'Validando...' : 'Ejecutar'}
          </motion.button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded font-semibold hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>

          {copied && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-auto text-green-400 text-sm font-semibold flex items-center"
            >
              ✓ Copiado
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Feedback Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-4"
      >
        {/* Feedback Message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              feedback.status === 'success'
                ? 'bg-green-500/10 border-green-500/30'
                : feedback.status === 'error'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-blue-500/10 border-blue-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : feedback.status === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              ) : (
                <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">
                  {feedback.status === 'success'
                    ? '¡Excelente!'
                    : feedback.status === 'error'
                    ? 'Tiene errores'
                    : 'Sugerencias'}
                </h4>
                <p className="text-sm text-gray-300 mb-2">{feedback.message}</p>
                {feedback.suggestions && feedback.suggestions.length > 0 && (
                  <ul className="space-y-1 text-sm">
                    {feedback.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-purple-400 flex-shrink-0">→</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Output/Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden flex-1 flex flex-col"
        >
          <div className="bg-[#323232] px-4 py-3 border-b border-gray-700">
            <span className="text-sm text-gray-400 font-mono">Console Output</span>
          </div>
          <div className="p-4 text-gray-300 text-sm font-mono overflow-auto flex-1">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"
                />
                <span>Validando tu código...</span>
              </div>
            ) : feedback ? (
              <pre className="whitespace-pre-wrap break-words">{feedback.message}</pre>
            ) : (
              <div className="text-gray-500">Escribe código y presiona ejecutar...</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
