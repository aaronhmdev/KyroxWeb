import { NextRequest, NextResponse } from 'next/server';

interface ValidationRequest {
  code: string;
  language: 'html' | 'css' | 'javascript';
  challengeId: string;
}

interface ValidationResponse {
  status: 'success' | 'error' | 'info';
  message: string;
  suggestions: string[];
  score: number;
  xpEarned: number;
}

// Validadores específicos por lenguaje
function validateJavaScript(code: string): ValidationResponse {
  const issues: string[] = [];
  let score = 100;

  // Verificar sintaxis básica
  try {
    new Function(code);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return {
        status: 'error',
        message: `Error de sintaxis: ${e.message}`,
        suggestions: [
          'Verifica los paréntesis, llaves y puntos y comas',
          'Usa console.log() para depurar',
          'Revisa la indentación del código',
        ],
        score: 0,
        xpEarned: 0,
      };
    }
  }

  // Verificar buenas prácticas
  if (!code.includes('function') && !code.includes('=>')) {
    issues.push('Usa funciones para organizar mejor tu código');
    score -= 10;
  }

  if (!code.includes(';')) {
    issues.push('Considera usar punto y coma al final de las líneas');
    score -= 5;
  }

  if (code.includes('var ')) {
    issues.push('Usa `let` o `const` en lugar de `var` (mejor práctica moderna)');
    score -= 15;
  }

  if (!code.includes('const') && !code.includes('let')) {
    issues.push('Usa variables con `const` y `let` para mejor manejo de scope');
    score -= 10;
  }

  if (code.split('\n').length < 3) {
    issues.push('Tu código es muy corto. ¿Mejoraste la lógica?');
    score -= 20;
  }

  const xpEarned = Math.max(Math.round((score / 100) * 100), 10);

  return {
    status: score >= 80 ? 'success' : score >= 60 ? 'info' : 'error',
    message:
      score >= 80
        ? '¡Excelente código! Está bien estructurado y sigue buenas prácticas.'
        : score >= 60
        ? 'Buen esfuerzo, pero hay mejoras por hacer.'
        : 'Necesita revisión. Considera los siguientes puntos:',
    suggestions: issues.length > 0 ? issues : ['¡Tu código se ve perfecto!'],
    score,
    xpEarned,
  };
}

function validateHTML(code: string): ValidationResponse {
  const issues: string[] = [];
  let score = 100;

  // Verificar doctype
  if (!code.includes('<!DOCTYPE')) {
    issues.push('Agrega `<!DOCTYPE html>` al inicio');
    score -= 20;
  }

  // Verificar estructura básica
  if (!code.includes('<html')) {
    issues.push('Usa etiqueta `<html>` como contenedor principal');
    score -= 20;
  }

  if (!code.includes('<head')) {
    issues.push('Incluye una sección `<head>` con metainformación');
    score -= 15;
  }

  if (!code.includes('<body')) {
    issues.push('El contenido debe ir dentro de etiqueta `<body>`');
    score -= 15;
  }

  if (!code.includes('<meta charset')) {
    issues.push('Especifica `<meta charset="UTF-8">` en el head');
    score -= 10;
  }

  if (!code.includes('<title>')) {
    issues.push('Todo documento HTML debe tener un `<title>`');
    score -= 15;
  }

  // Verificar etiquetas cerradas
  const openTags = (code.match(/<[^/][^>]*>/g) || []).length;
  const closeTags = (code.match(/<\/[^>]+>/g) || []).length;

  if (openTags !== closeTags) {
    issues.push(`Asegúrate de cerrar todas las etiquetas (${openTags} abiertas, ${closeTags} cerradas)`);
    score -= 20;
  }

  const xpEarned = Math.max(Math.round((score / 100) * 100), 10);

  return {
    status: score >= 80 ? 'success' : score >= 60 ? 'info' : 'error',
    message:
      score >= 80
        ? '¡HTML bien estructurado! Sigue los estándares correctamente.'
        : score >= 60
        ? 'Buena estructura HTML, pero hay detalles por mejorar.'
        : 'El HTML necesita correcciones en su estructura.',
    suggestions: issues.length > 0 ? issues : ['¡Tu HTML está perfecto!'],
    score,
    xpEarned,
  };
}

function validateCSS(code: string): ValidationResponse {
  const issues: string[] = [];
  let score = 100;

  // Verificar selectores
  if (!code.includes('{') || !code.includes('}')) {
    issues.push('El CSS debe tener selectores con propiedades entre llaves');
    score -= 30;
  }

  // Verificar propiedades
  if (!code.includes(':')) {
    issues.push('Verifica que tengas propiedades CSS (propiedad: valor;)');
    score -= 25;
  }

  // Verificar punto y coma
  if (!code.includes(';')) {
    issues.push('Todas las propiedades CSS deben terminar con punto y coma');
    score -= 20;
  }

  // Verificar nombres de clase
  if (code.includes('class') && !code.includes('.')) {
    issues.push('Los selectores de clase deben empezar con un punto (.)');
    score -= 15;
  }

  // Verificar convenciones
  if (code.includes('Color') || code.includes('color')) {
    // OK
  } else if (code.includes('background') || code.includes('border') || code.includes('padding')) {
    // OK
  } else {
    issues.push('Considera usar más propiedades CSS para mejor estilos');
    score -= 10;
  }

  const xpEarned = Math.max(Math.round((score / 100) * 100), 10);

  return {
    status: score >= 80 ? 'success' : score >= 60 ? 'info' : 'error',
    message:
      score >= 80
        ? '¡CSS bien escrito! Los estilos están correctamente estructurados.'
        : score >= 60
        ? 'Buen CSS, pero hay mejoras por hacer.'
        : 'El CSS necesita correcciones en su sintaxis.',
    suggestions: issues.length > 0 ? issues : ['¡Tu CSS se ve excelente!'],
    score,
    xpEarned,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ValidationRequest = await request.json();
    const { code, language } = body;

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Código y lenguaje son requeridos' },
        { status: 400 }
      );
    }

    let validation: ValidationResponse;

    switch (language) {
      case 'javascript':
        validation = validateJavaScript(code);
        break;
      case 'html':
        validation = validateHTML(code);
        break;
      case 'css':
        validation = validateCSS(code);
        break;
      default:
        return NextResponse.json(
          { error: 'Lenguaje no soportado' },
          { status: 400 }
        );
    }

    return NextResponse.json(validation);
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Error durante la validación' },
      { status: 500 }
    );
  }
}
