import { redirect } from "next/navigation";
import { setAdminSession } from "@/lib/admin";

async function loginAction(formData: FormData) {
  "use server";

  const password = formData.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }

  await setAdminSession();
  redirect("/admin");
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#03170f] px-5">
      <form
        action={loginAction}
        className="glass w-full max-w-md rounded-[2rem] p-8"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">
          AETERNA
        </p>

        <h1 className="mt-5 text-4xl font-semibold">Admin</h1>

        <p className="mt-3 text-white/60">
          Ingresá tu clave para ver las ventas.
        </p>

        {error && (
          <p className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
            Contraseña incorrecta.
          </p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="mt-8 w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 outline-none placeholder:text-white/40"
        />

        <button
          type="submit"
          className="transparent-btn mt-5 w-full rounded-full px-6 py-3 font-semibold text-white"
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}