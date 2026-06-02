"use client";

type Props = {
  productId: string;
};

export default function BuyButton({
  productId,
}: Props) {
  async function handleCheckout() {
    const response = await fetch(
      "/api/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      }
    );

    const data = await response.json();

    window.location.href = data.url;
  }

  return (
    <button
      onClick={handleCheckout}
      className="transparent-btn mt-7 flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white"
    >
      Comprar ahora
    </button>
  );
}