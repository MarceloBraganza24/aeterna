import Link from "next/link";

export default function Cancel() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#03170f] px-5">
      <div className="glass max-w-xl rounded-[2rem] p-10 text-center">
        <h1 className="text-4xl font-semibold">
          Pago cancelado
        </h1>

        <p className="mt-4 text-white/70">
          No se realizó ningún cargo.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-black"
        >
          Volver
        </Link>
      </div>
    </main>
  );
}