export const products = [
  {
    id: "kit_escape",
    name: "Kit de Escape",
    price: 29,
    priceLabel: "USD 29",
    tag: "Nivel 01",
    title: "Para transformar confusión en dirección.",
    description:
      "Un plan de acción concreto y ejecutable para quien quiere empezar a construir oportunidades digitales con claridad.",
    pain: "Tiene motivación, pero no tiene claridad ni estructura para avanzar.",
    desire: "Independencia, dirección y una primera ruta de acción digital.",
    downloads: ["kit_escape"],
  },
  {
    id: "admin_digital",
    name: "Método Admin.digital",
    price: 59,
    priceLabel: "USD 59",
    tag: "Nivel 02",
    title: "Administración aplicada + IA para monetizar conocimiento.",
    description:
      "Pensado para estudiantes, profesionales y emprendedores que quieren convertir teoría, experiencia o ideas en procesos accionables.",
    pain: "Tiene conocimiento, pero no sabe cómo aplicarlo, ordenarlo o convertirlo en resultados.",
    desire: "Traducir conocimiento en sistemas, procesos y oportunidades reales.",
    downloads: ["admin_digital"],
  },
  {
    id: "programa_hibrido",
    name: "Programa Híbrido",
    price: 99,
    priceLabel: "USD 99",
    tag: "Nivel 03",
    title: "Un sistema completo para ordenar, automatizar y escalar.",
    description:
      "Para personas con negocios, proyectos o servicios que necesitan estructura, procesos y automatización sin perder el control.",
    pain: "Todo depende de la persona, hay desorden operativo y falta de sistemas.",
    desire: "Liberar tiempo, ordenar procesos y construir una estructura sostenible.",
    downloads: ["programa_hibrido"],
  },
  {
    id: "bundle_completo",
    name: "Colección Completa AETERNA",
    price: 149,
    priceLabel: "USD 149",
    tag: "Bundle",
    title: "Las 3 guías en una ruta completa.",
    description:
      "Incluye Kit de Escape, Método Admin.digital y Programa Híbrido en una sola compra.",
    pain: "Quiere avanzar con una ruta completa sin comprar cada guía por separado.",
    desire: "Claridad, procesos, IA aplicada y estructura completa.",
    downloads: ["kit_escape", "admin_digital", "programa_hibrido"],
  },
];

export type Product = (typeof products)[number];

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};