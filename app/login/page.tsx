import Link from "next/link";
import { loginAction } from "@/app/login/actions";
import { isSupabaseConfigured } from "@/lib/env";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getErrorMessage(error: string | undefined) {
  if (error === "config") {
    return "Supabase environment variables are missing.";
  }

  if (error === "missing") {
    return "Email and password are required.";
  }

  if (error === "invalid") {
    return "Invalid admin login.";
  }

  return null;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const error = getErrorMessage(
    typeof params.error === "string" ? params.error : undefined,
  );

  return (
    <main className="auth-page">
      <form action={loginAction} className="auth-card">
        <Link href="/">Eureka Residential Secondary School</Link>
        <h1>Admin login</h1>
        {!isSupabaseConfigured() ? (
          <p className="form-error">
            Add Supabase environment variables before signing in.
          </p>
        ) : null}
        {error ? <p className="form-error">{error}</p> : null}
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
