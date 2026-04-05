const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeding de desafíos...");

  // Limpiar desafíos existentes
  await prisma.challengeProgress.deleteMany({});
  await prisma.challenge.deleteMany({});
  console.log("✓ Desafíos anteriores eliminados");

  // Crear desafíos
  const challenges = [
    {
      title: "Crear Tarjeta de Usuario",
      description: "Crea un componente de tarjeta con HTML y CSS",
      difficulty: "Básico",
      xp: 50,
      tools: "HTML, CSS",
      starterCode: `<div class="card">
  <h3>Mi Tarjeta</h3>
  <p>Completa este desafío</p>
</div>`,
      cssCode: `.card {
  border: 2px solid purple;
  padding: 20px;
  border-radius: 8px;
}`,
      hints: JSON.stringify([
        "Usa flexbox para alinear",
        "Agrega sombra a la tarjeta",
        "Haz responsive",
      ]),
      objectives: JSON.stringify([
        "La tarjeta debe tener imagen de usuario",
        "Debe mostrar nombre y descripción",
        "Debe ser responsive en mobile",
        "Agregar botón de contacto",
      ]),
    },
    {
      title: "Validador de Email",
      description: "Crea un validador de email en JavaScript",
      difficulty: "Intermedio",
      xp: 100,
      tools: "HTML, CSS, JavaScript",
      starterCode: `function validateEmail(email) {
  // Tu código aquí
  return false;
}`,
      hints: JSON.stringify([
        "Usa expresión regular",
        "Valida el formato básico",
        "Muestra mensajes al usuario",
      ]),
      objectives: JSON.stringify([
        "Validar formato de email",
        "Mostrar error/éxito en UI",
        "Prevenir inyección XSS",
        "Agregar limpieza de input",
      ]),
    },
    {
      title: "Clon de Netflix",
      description: "Crea una plataforma de streaming tipo Netflix",
      difficulty: "Avanzado",
      xp: 200,
      tools: "React, Tailwind, API",
      starterCode: `// Componente principal de Netflix
export default function Netflix() {
  return <div>Tu código aquí</div>;
}`,
      hints: JSON.stringify([
        "Usa grid/flexbox",
        "Implementa filtrado",
        "Agregar búsqueda",
      ]),
      objectives: JSON.stringify([
        "Mostrar películas en grid",
        "Implementar búsqueda",
        "Agregar filtrado por género",
        "Crear modal de detalles",
        "Guardar favoritos en localStorage",
      ]),
    },
  ];

  for (const challenge of challenges) {
    const created = await prisma.challenge.create({
      data: challenge,
    });
    console.log(`✓ Desafío creado: ${created.title}`);
  }

  console.log("✅ Seeding de desafíos completado!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
