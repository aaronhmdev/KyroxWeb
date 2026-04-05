'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronDown, Sparkles, Code2, Users, BookOpen, Zap, 
  Rocket, CheckCircle, Star, Target, Flame, TrendingUp,
  ArrowRight, Github, Lightbulb, Award, UserCheck, Compass, Clock
} from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Cursos Completos',
      description: 'Desde HTML básico hasta Full Stack avanzado',
      gradient: 'from-blue-500 to-cyan-500',
      number: '1'
    },
    {
      icon: Code2,
      title: 'Retos Prácticos',
      description: 'Proyectos reales para practicar habilidades',
      gradient: 'from-purple-500 to-pink-500',
      number: '2'
    },
    {
      icon: Target,
      title: 'Sistema de Niveles',
      description: 'Gana XP y sube de nivel mientras aprendes',
      gradient: 'from-yellow-500 to-orange-500',
      number: '3'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Conecta con otros desarrolladores Kyroxers',
      gradient: 'from-green-500 to-emerald-500',
      number: '4'
    },
  ];

  const steps = [
    {
      icon: UserCheck,
      title: 'Regístrate',
      description: 'Crea tu cuenta en Kyrox en menos de 2 minutos'
    },
    {
      icon: BookOpen,
      title: 'Aprende',
      description: 'Accede a cursos estructurados y bien explicados'
    },
    {
      icon: Code2,
      title: 'Practica',
      description: 'Resuelve retos y construye proyectos reales'
    },
    {
      icon: TrendingUp,
      title: 'Progresa',
      description: 'Gana XP, sube de nivel y demuéstrale al mundo'
    },
  ];

  const stats = [
    { label: 'Estudiantes Activos', value: '5,000+', icon: Users },
    { label: 'Cursos Disponibles', value: '25+', icon: BookOpen },
    { label: 'Retos Completados', value: '50,000+', icon: Target },
    { label: 'Horas de Contenido', value: '200+', icon: Clock },
  ];

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <section className="min-h-[110vh] flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 z-10 text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-medium">✨ La nueva era del aprendizaje</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            Construimos soluciones web<br />
            mientras formamos a los{' '}
            <span className="gradient-text">desarrolladores del futuro</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            En Kyrox, aprendes desarrollando. Cursos estructurados, retos prácticos, una comunidad vibrante y un sistema de gamificación que te mantendrá motivado cada día.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-center mb-16 flex-wrap">
            <Link href="/courses" className="btn btn-primary group">
              <Rocket className="w-5 h-5" />
              Empieza a Aprender
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/projects" className="btn btn-secondary group">
              <Code2 className="w-5 h-5" />
              Ver Proyectos
            </Link>
            <Link href="/community" className="btn btn-outline group">
              <Users className="w-5 h-5" />
              Únite a la Comunidad
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ translateY: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <ChevronDown className="w-8 h-8 text-purple-400 opacity-60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Todo lo que necesitas para{' '}
              <span className="gradient-text">aprender a programar</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Kyrox tiene todo integrado en una plataforma poderosa
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  className="feature-card group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          #{feature.number}
                        </span>
                      </div>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl mx-4 md:mx-0">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { label: 'Estudiantes', value: '5,000+', icon: Users },
              { label: 'Cursos', value: '25+', icon: BookOpen },
              { label: 'Retos', value: '50,000+', icon: Target },
              { label: 'Contenido', value: '200+ h', icon: Flame },
            ].map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-lg">
                      <StatIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold mb-2 gradient-text">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Cómo Funciona Kyrox
            </h2>
            <p className="text-gray-400 text-lg">Cuatro simples pasos para comenzar tu viaje</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  className="relative"
                >
                  <div className="card text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg">
                          <StepIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/3 -right-3 transform translate-x-full">
                      <ArrowRight className="w-6 h-6 text-purple-500/30" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para comenzar tu viaje?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están aprendiendo a programar con Kyrox
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/auth/register" className="btn btn-primary group">
                <Rocket className="w-5 h-5" />
                Registrarse Gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                <span>✉️</span>
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Elements Background */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
}
