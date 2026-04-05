'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  language: 'html' | 'css' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: string;
}

export default function CodeEditor({
  language,
  value,
  onChange,
  onReset,
  placeholder = 'Escribe tu código aquí...',
  readOnly = false,
  height = 'h-40',
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const languageColors = {
    html: 'text-orange-400',
    css: 'text-blue-400',
    javascript: 'text-yellow-400',
  };

  const languageNames = {
    html: 'index.html',
    css: 'styles.css',
    javascript: 'script.js',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-0 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <span className={`font-mono text-sm ${languageColors[language]}`}>
          {languageNames[language]}
        </span>
        <div className="flex items-center gap-2">
          {value && (
            <button
              onClick={handleCopy}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800"
              title="Copiar código"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copiar
                </>
              )}
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-800"
              title="Reiniciar código"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className={`w-full ${height} bg-gray-900 text-white font-mono text-sm p-4 focus:outline-none resize-none ${
          readOnly ? 'cursor-not-allowed opacity-75' : ''
        } overflow-auto`}
        placeholder={placeholder}
        spellCheck="false"
      />

      {/* Line numbers and syntax highlighting would go here */}
      <style jsx>{`
        textarea {
          background-color: #111827;
          color: #e5e7eb;
          scrollbar-width: thin;
          scrollbar-color: rgba(168, 85, 247, 0.5) rgba(0, 0, 0, 0.1);
        }
        textarea::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        textarea::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        textarea::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 4px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}
