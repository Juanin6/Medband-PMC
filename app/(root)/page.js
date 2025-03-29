import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Heart,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Lock,
  Brain,
  Star,
  Check,
  Sparkles,
  BadgeCheck,
  Clock,
  Smartphone,
} from "lucide-react";
export default function MedicalLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50/50 via-white to-blue-50/50">
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-blue-200 mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300 mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          <div className="flex justify-center items-center min-h-screen">
            <div className="container px-4 md:px-6 relative text-center">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10">
                    <Sparkles className="h-4 w-4" />
                    <span>Tecnología Médica Avanzada</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text leading-tight">
                    Solución Revolucionaria para tu Seguridad
                  </h1>
                  <div className="flex  md:flex-row gap-8 items-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                    <div>
                      <Image
                        src="/medband.png"
                        width={600}
                        height={600}
                        alt="MedBand - Pulsera Inteligente para Guía en Emergencias"
                        className="mx-auto md:mx-0 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 relative z-10"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-slate-600 md:text-xl leading-relaxed">
                        Nuestra pulsera inteligente toma datos clave de tu
                        historial médico y conecta con una IA que proporciona
                        orientación inmediata para tus emergencias médicas e
                        informa a tus contactos de emergencia.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full group"
                    >
                      ¿Cómo funciona MedBand?
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Link href="#precios">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-full"
                      >
                        Ver Precio
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 pt-4 justify-center">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="inline-block h-10 w-10 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 ring-2 ring-white shadow-md"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">
                        4,000+
                      </span>{" "}
                      profesionales de la salud confían en nosotros
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="caracteristicas"
          className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/50 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-30"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10">
                  <BadgeCheck className="h-4 w-4" />
                  <span>Características Principales</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  Tecnología Avanzada para Mayor Libertad
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Nuestra pulsera médica combina tecnología de vanguardia con un
                  diseño fácil de usar para proporcionar una guía fácil de
                  seguir por cualquier persona en caso de emergencia.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Certificación Médica",
                  description:
                    "Nuestro producto cumple con los más altos estándares de seguridad y está completamente aprobado por las autoridades reguladoras.",
                },
                {
                  icon: <Brain className="h-10 w-10 text-primary" />,
                  title: "IA Integrada",
                  description:
                    "Inteligencia artificial avanzada que analiza tu historial médico relevante y proporciona orientación personalizada en tiempo real.",
                },
                {
                  icon: <Heart className="h-10 w-10 text-primary" />,
                  title: "Diseño Ergonómico",
                  description:
                    "Diseñado para ser cómodo durante el uso diario, con materiales hipoalergénicos y resistentes al agua.",
                },
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Respuesta Inmediata",
                  description:
                    "Actúa en segundos para proporcionar la información crítica necesaria en situaciones de emergencia.",
                },
                {
                  icon: <Smartphone className="h-10 w-10 text-primary" />,
                  title: "Conectividad Total",
                  description:
                    "Se sincroniza perfectamente con tu smartphone para mantener a tus contactos informados en todo momento.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 rounded-3xl border border-blue-100 p-8 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="rounded-full bg-primary/10 p-4 shadow-inner border border-primary/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-center text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonios"
          className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10">
                  <Star className="h-4 w-4 fill-primary" />
                  <span>Testimonios</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  Lo que Dicen Nuestros Usuarios
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Descubre cómo MedBand ha transformado la vida de pacientes y
                  profesionales médicos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-2 lg:gap-12">
              {[
                {
                  quote:
                    "Gracias a MedBand, pude recibir atención inmediata durante una crisis cardíaca. La pulsera ayudó a las personas a mi al redor a saber como reaccionó y alertó a mi familia para informar rápidamente a emergencias. Literalmente me salvó la vida.",
                  name: "Carlos Rodríguez",
                  title: "Paciente con condición cardíaca",
                  image: "/images/persona1.jpeg",
                  stars: 5,
                },
                {
                  quote:
                    "Como médico, recomiendo MedBand a todos mis pacientes propensos a emergencias. La disponibilidad constante de ayuda los ha ayudado a retomar autonomía en su vida y poder hacer actividades que antes temían hacer por su cuenta.",
                  name: "Dra. María González",
                  title: "Cardióloga, Hospital Central",
                  image: "/placeholder.svg?height=100&width=100",
                  stars: 5,
                },
                {
                  quote:
                    "Sufro de diabetes tipo 1 y MedBand me ha dado una tranquilidad que nunca pensé posible. Pude retormar el deporte al saber que mis compañeros de equipo van a tener una guía de como reaccionar si ocurre una emergencia",
                  name: "Ana Martínez",
                  title: "Paciente con diabetes",
                  image: "/images/persona2.jpeg",
                  stars: 5,
                },
                {
                  quote:
                    "La integración de datos médicos con IA es impresionante. Como especialista en tecnología médica, puedo decir que MedBand está años adelante de cualquier dispositivo similar en el mercado.",
                  name: "Dr. Javier López",
                  title: "Director de Innovación Médica",
                  image: "/images/persona3.jpeg",
                  stars: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-3xl border border-blue-100 p-8 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="mb-6 flex">
                    {Array(testimonial.stars)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                  </div>
                  <div>
                    <p className="mb-6 italic text-slate-600 text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-blue-100">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-blue-400 blur-sm opacity-20"></div>
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        width={70}
                        height={70}
                        alt={testimonial.name}
                        className="rounded-full object-cover h-[70px] w-[70px] ring-4 ring-white shadow-md relative"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="precios"
          className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50/80 pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10">
                  <BadgeCheck className="h-4 w-4" />
                  <span>Precio Único</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  Una Solución Completa a un Precio Accesible
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Ofrecemos un único plan completo que incluye todas las
                  funcionalidades sin costos adicionales.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-2xl py-12">
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-blue-400 to-blue-300 blur-md opacity-50"></div>
                <div className="flex flex-col rounded-3xl border-2 border-primary/20 p-8 shadow-2xl bg-white/95 backdrop-blur-sm transform hover:scale-105 transition-all duration-500 relative">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-blue-400 text-white px-6 py-2 rounded-bl-2xl rounded-tr-3xl font-medium shadow-lg">
                    Recomendado
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                      MedBand Complete
                    </h3>
                    <p className="text-slate-600 mt-2">
                      Todo lo que necesitas en un solo paquete
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                      <span className="text-6xl font-bold text-slate-900">
                        $80
                      </span>
                      <span className="ml-2 text-slate-600">USD</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Pago único, sin suscripciones
                    </p>
                  </div>

                  <div className="space-y-4 flex-1 mb-8">
                    {[
                      "Pulsera MedBand de última generación",
                      "Acceso completo a la aplicación móvil",
                      "Análisis de IA personalizado",
                      "Alertas a contactos de emergencia",
                      "Monitoreo avanzado de salud",
                      "Soporte técnico prioritario",
                      "Garantía de 2 años",
                      "Actualizaciones de software gratuitas",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2 shadow-inner border border-primary/5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full text-lg font-medium"
                  >
                    Comprar Ahora
                  </Button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600">
                      ¿Tienes preguntas?{" "}
                      <Link
                        href="#"
                        className="text-primary hover:underline font-medium"
                      >
                        Contáctanos
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="privacidad"
          className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-30"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10">
                  <Lock className="h-4 w-4" />
                  <span>Privacidad y Seguridad</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  Política de Tratamiento de Datos
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Tu privacidad es nuestra prioridad. Conoce cómo protegemos tus
                  datos médicos.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8 rounded-3xl border border-blue-100 p-8 shadow-xl bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="rounded-full bg-primary/10 p-4 shadow-inner border border-primary/5">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Compromiso con tu Privacidad
                </h3>
              </div>
              <div className="space-y-6 text-slate-600">
                <p className="leading-relaxed">
                  En MedBand, entendemos la sensibilidad de tus datos médicos.
                  Nuestra política de privacidad está diseñada para garantizar
                  la máxima protección de tu información personal y médica.
                </p>
                <h4 className="font-semibold text-slate-800 text-lg mt-6 mb-3">
                  Cómo Utilizamos tus Datos:
                </h4>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Tus datos médicos son utilizados exclusivamente para
                    proporcionar servicios de guía médica. Las personas que
                    utilicen la IA no tendrán acceso a tu información pero la
                    herramienta la utilizará para guiarlos de forma
                    personalizada.
                  </li>
                  <li>
                    Implementamos encriptación de extremo a extremo para todos
                    los datos transmitidos.
                  </li>
                  <li>
                    No compartimos tu información con terceros sin tu
                    consentimiento explícito.
                  </li>
                  <li>
                    Cumplimos con todas las regulaciones de protección de datos,
                    incluyendo RGPD y normativas locales.
                  </li>
                </ul>
                <h4 className="font-semibold text-slate-800 text-lg mt-6 mb-3">
                  Tus Derechos:
                </h4>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    Acceso completo a tus datos almacenados en cualquier
                    momento.
                  </li>
                  <li>Derecho a solicitar la eliminación de tus datos.</li>
                  <li>
                    Opción de limitar el procesamiento de ciertos tipos de
                    información.
                  </li>
                  <li>Transparencia total sobre cómo se utilizan tus datos.</li>
                </ul>
                <div className="pt-6">
                  <Link
                    href="#"
                    className="text-primary hover:text-primary/80 inline-flex items-center font-medium transition-colors"
                  >
                    Leer la política de privacidad completa{" "}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100/50 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  ¿Listo para Transformar tu Vida?
                </h2>
                <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Únete a miles de pacientes y profesionales de la salud
                  satisfechos.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full text-lg font-medium"
                >
                  Comprar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-full"
                >
                  ¿Tienes dudas? Contáctate con Nosotros
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm border border-primary/10">
                  <BadgeCheck className="h-4 w-4" />
                  <span>Q&A</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  Preguntas Frecuentes
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Encuentra respuestas a las preguntas más comunes sobre nuestra
                  pulsera médica.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:gap-12">
              {[
                {
                  question: "¿Está cubierta por seguros médicos?",
                  answer:
                    "Tenemos convenio con seguros médicos que pueden cubrir el costo del dispositivo. Contáctate con tu proveedor para ver si aplica para ti.",
                },
                {
                  question: "¿Cuánto tiempo dura la batería?",
                  answer:
                    "¡Nunca se acabará la batería! MedBand funciona con tu teléfono, mientras tu teléfono tenga batería tendrás acceso a tu guía médico.",
                },
                {
                  question: "¿Es resistente al agua?",
                  answer: "Sí, aunque no recomendamos sumergirla.",
                },
                {
                  question: "¿Cómo se mantiene y limpia el dispositivo?",
                  answer:
                    "El dispositivo viene con instrucciones detalladas de limpieza. Generalmente, requiere una simple limpieza con un paño ligeramente humedecido después de cada uso.",
                },
                {
                  question:
                    "¿Se proporciona capacitación para usar el dispositivo?",
                  answer:
                    "Sí, tenemos talleres virtuales para concientizar sobre el uso correcto de MedBand. Estáte atento de nuestras redes sociales para el próximo taller.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-blue-100 p-6 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-blue-100 bg-gradient-to-b from-blue-50 to-blue-100/50 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-blue-500 blur-sm opacity-70"></div>
                  <Heart className="h-6 w-6 text-primary relative" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-blue-500 text-transparent bg-clip-text">
                  MedBand
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Proporcionando soluciones médicas innovadoras para mejorar la
                calidad de vida de nuestros pacientes.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-3">
                {["Inicio", "Características", "Testimonios", "Precio"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        href={i === 0 ? "#" : `#${item.toLowerCase()}`}
                        className="text-sm text-slate-600 hover:text-primary transition-colors inline-flex items-center"
                      >
                        <ArrowRight className="mr-1 h-3 w-3" />
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Legal</h3>
              <ul className="space-y-3">
                {[
                  "Política de Privacidad",
                  "Términos de Servicio",
                  "Política de Cookies",
                  "Aviso Legal",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={i === 0 ? "#privacidad" : "#"}
                      className="text-sm text-slate-600 hover:text-primary transition-colors inline-flex items-center"
                    >
                      <ArrowRight className="mr-1 h-3 w-3" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 shadow-inner border border-primary/5">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-slate-600">
                    +34 900 123 456
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 shadow-inner border border-primary/5">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-slate-600">
                    contacto@medband.com
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 shadow-inner border border-primary/5">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-slate-600">
                    Calle Médica 123, Bogotá, Colombia
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-blue-100 pt-8">
            <p className="text-center text-sm text-slate-600">
              © {new Date().getFullYear()} MedBand. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
