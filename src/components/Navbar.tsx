"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CartButton from "./CartButton";

const links = [
  { label: "Inicio", href: "#inicio", id: "inicio" },
  { label: "Filosofía", href: "#filosofia", id: "filosofia" },
  { label: "Guías", href: "#guias", id: "guias" },
  { label: "Método", href: "#metodo", id: "metodo" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const sections = links.map((link) => document.getElementById(link.id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed left-0 top-0 z-40 w-full px-5 py-5 md:px-12"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#inicio" className="text-lg font-semibold tracking-[0.38em]">
          AETERNA
        </a>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`transparent-btn rounded-full px-6 py-2 text-sm font-medium transition ${
                activeSection === item.id
                  ? "border-white bg-white/20 text-white"
                  : "text-white/75"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <CartButton />
      </nav>
    </motion.header>
  );
}