"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/providers/auth.provider";

export default function LoginPage() {
  const router = useRouter();
  const { login, error } = useAuthContext();
  const [email, setEmail] = useState("rakib@example.com");
  const [password, setPassword] = useState("password123");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      router.push("/");
    } catch {
      // error handled by provider
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-center">Welcome Back</h1>
        <p className="text-xs text-neutral-500 text-center mt-1">
          Demo login is pre-filled. Just click sign in.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-black py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer"
          >
            {submitting ? "Signing in..." : "Sign In (Mock)"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          <Link href="/" className="hover:underline">
            &larr; Back to store
          </Link>
        </p>
      </div>
    </section>
  );
}
