"use client";

import { motion } from "framer-motion";

const audience = [
  {
    title: "Estudiantes",
    text: "Que buscan desarrollar habilidades digitales con aplicación real, más allá de la teoría tradicional.",
  },
  {
    title: "Profesionales",
    text: "Que necesitan optimizar procesos, ordenar su trabajo y aumentar su productividad con herramientas actuales.",
  },
  {
    title: "Emprendedores",
    text: "Que quieren construir sistemas escalables, automatizar tareas y liberar tiempo sin perder control.",
  },
];

export default function Audience() {
  return (
    <section className="bg-[#061b13] px-5 py-28 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">
            A quién le hablamos
          </p>

          <h2 className="text-5xl font-medium tracking-[-0.06em] md:text-7xl">
            No vendemos información. Vendemos dirección.
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-white/65">
            AETERNA está pensada para personas de habla hispana que quieren
            construir habilidades, procesos y oportunidades reales en la
            economía digital.
          </p>
        </div>

        <div className="space-y-5">
          {audience.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-white/15 bg-white/[0.06] p-7 backdrop-blur-xl"
            >
              <span className="serif text-5xl text-emerald-300">
                0{index + 1}
              </span>

              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>

              <p className="mt-3 leading-7 text-white/65">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}