import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Retornar desafíos de demostración (los reales vendrían de la BD)
    const challenges = [
      {
        id: '1',
        title: 'Tu Primer Hola Mundo',
        description: 'Crea un programa que muestre "Hola Mundo" en la consola',
        difficulty: 'BEGINNER' as const,
        language: 'javascript',
        xpReward: 50,
        completed: false,
        initialCode: `// Escribe tu código aquí
console.log('Hola Mundo');`,
        hint: 'Usa console.log() para mostrar texto en la consola',
      },
      {
        id: '2',
        title: 'Suma de Dos Números',
        description: 'Crea una función que sume dos números y retorne el resultado',
        difficulty: 'BEGINNER' as const,
        language: 'javascript',
        xpReward: 75,
        completed: false,
        initialCode: `// Crea una función que sume dos números
function suma(a, b) {
  // Tu código aquí
}

console.log(suma(5, 3)); // Debería mostrar 8`,
        hint: 'Usa la operación + dentro de la función',
      },
      {
        id: '3',
        title: 'Estructura HTML Básica',
        description: 'Crea una página HTML con estructura correcta',
        difficulty: 'BEGINNER' as const,
        language: 'html',
        xpReward: 60,
        completed: false,
        initialCode: `<!-- Estructura HTML básica -->
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
        hint: 'Asegúrate de tener DOCTYPE, html, head y body',
      },
      {
        id: '4',
        title: 'Estilos CSS Básicos',
        description: 'Estiliza un elemento HTML usando CSS',
        difficulty: 'BEGINNER' as const,
        language: 'css',
        xpReward: 65,
        completed: false,
        initialCode: `/* Estiliza el elemento */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}`,
        hint: 'Usa propiedades como color, background-color, font-size',
      },
      {
        id: '5',
        title: 'Array y Bucle For',
        description: 'Crea un programa que recorra un array con un bucle',
        difficulty: 'INTERMEDIATE' as const,
        language: 'javascript',
        xpReward: 100,
        completed: false,
        initialCode: `// Recorre el array y suma todos los números
const numeros = [1, 2, 3, 4, 5];
let suma = 0;

// Tu código aquí

console.log(suma); // Debería mostrar 15`,
        hint: 'Usa un bucle for para iterar sobre el array',
      },
      {
        id: '6',
        title: 'Validar Email',
        description: 'Crea una función que valide si un email es válido',
        difficulty: 'INTERMEDIATE' as const,
        language: 'javascript',
        xpReward: 150,
        completed: false,
        initialCode: `// Valida si un email es válido
function esEmailValido(email) {
  // Tu código aquí
  // Pista: usa una expresión regular
}

console.log(esEmailValido('user@example.com')); // true
console.log(esEmailValido('usuario')); // false`,
        hint: 'Usa una expresión regular o el método includes()',
      },
      {
        id: '7',
        title: 'Crear Componente React',
        description: 'Crea un componente funcional React simple',
        difficulty: 'ADVANCED' as const,
        language: 'javascript',
        xpReward: 200,
        completed: false,
        initialCode: `// Crea un componente funcional React
function MiComponente() {
  return (
    <div>
      <h1>Hola desde React</h1>
      <p>Este es mi primer componente</p>
    </div>
  );
}

export default MiComponente;`,
        hint: 'Un componente React es una función que retorna JSX',
      },
      {
        id: '8',
        title: 'Algoritmo Fibonacci',
        description: 'Implementa la serie Fibonacci de forma eficiente',
        difficulty: 'ADVANCED' as const,
        language: 'javascript',
        xpReward: 250,
        completed: false,
        initialCode: `// Retorna el n-ésimo número de Fibonacci
function fibonacci(n) {
  // Tu código aquí
  // Usa recursión o iteración
}

console.log(fibonacci(10)); // Debería mostrar 55`,
        hint: 'Cada número es la suma de los dos anteriores',
      },
    ];

    return NextResponse.json({
      success: true,
      data: challenges,
      count: challenges.length,
    });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json(
      { error: 'Error al obtener desafíos' },
      { status: 500 }
    );
  }
}
