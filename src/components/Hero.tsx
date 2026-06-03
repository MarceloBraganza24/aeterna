"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="aeterna-bg relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28"
    >
      <div className="absolute inset-0 bg-black/10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(18px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-white/70">
          Guías prácticas de acción digital
        </p>

        <h1 className="text-balance text-6xl font-medium leading-[0.88] tracking-[-0.08em] md:text-8xl lg:text-[10rem]">
          Sistemas para crear{" "}
          <span className="serif block font-normal italic tracking-[-0.04em]">
            libertad.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
          AETERNA combina administración clásica, inteligencia artificial y
          eficiencia de procesos para convertir conocimiento en acción,
          estructura y autonomía real.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#guias"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-emerald-950 transition hover:scale-105"
          >
            Explorar guías
          </a>

          <a
            href="#metodo"
            className="rounded-full border border-white/35 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ver metodología
          </a>
        </div>
      </motion.div>

    </section>
  );
}