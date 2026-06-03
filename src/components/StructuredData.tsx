export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",
        name: "AETERNA",
        url: process.env.NEXT_PUBLIC_APP_URL,
        description:
          "Guías prácticas para la economía digital.",

        areaServed: [
          "Argentina",
          "México",
          "Colombia",
          "Chile",
          "Perú",
          "Uruguay",
          "España",
        ],
      },

      {
        "@type": "WebSite",
        name: "AETERNA",
        url: process.env.NEXT_PUBLIC_APP_URL,
      },

      {
        "@type": "Product",
        name: "Kit de Escape",
        description:
          "Guía práctica para transformar confusión en dirección.",
        category: "Digital Product",
        offers: {
          "@type": "Offer",
          price: "29",
          priceCurrency: "USD",
          availability:
            "https://schema.org/InStock",
        },
      },

      {
        "@type": "Product",
        name: "Método Admin.digital",
        description:
          "Administración aplicada e IA para monetizar conocimiento.",
        category: "Digital Product",
        offers: {
          "@type": "Offer",
          price: "59",
          priceCurrency: "USD",
          availability:
            "https://schema.org/InStock",
        },
      },

      {
        "@type": "Product",
        name: "Programa Híbrido",
        description:
          "Sistema completo para ordenar, automatizar y escalar.",
        category: "Digital Product",
        offers: {
          "@type": "Offer",
          price: "99",
          priceCurrency: "USD",
          availability:
            "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}