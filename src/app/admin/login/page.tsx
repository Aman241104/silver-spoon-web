"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <div className="bg-white border border-gray-100 p-10 w-full max-w-sm shadow-sm">
        <div className="text-center mb-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">Silver Spoon</p>
          <h1 className="text-2xl font-serif text-[#2c2c2c] tracking-tight">Admin Panel</h1>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#2F3131] transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#2F3131] transition-colors"
            />
          </div>

          {state?.error && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#2F3131] text-white py-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-colors disabled:opacity-50 mt-2"
          >
            {pending ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
