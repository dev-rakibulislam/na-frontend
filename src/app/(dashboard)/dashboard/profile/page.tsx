
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
};

const initialProfile: Profile = {
  firstName: "Rakibul",
  lastName: "Islam",
  email: "rakibul@example.com",
  phone: "01712345678",
  gender: "male",
  birthDate: "2007-05-15",
};

const inputClass =
  "mt-2 h-11 w-full rounded-lg border border-neutral-200 bg-white px-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10 disabled:bg-neutral-50 disabled:text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:disabled:bg-neutral-900";

export default function MyProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [form, setForm] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const updateField = (field: keyof Profile, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleEdit = () => {
    setForm(profile);
    setEditing(true);
    setNotice("");
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
    setNotice("");
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Send the updated profile to your backend API.
    setProfile(form);
    setEditing(false);
    setNotice("Profile updated successfully.");
  };

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim() || "Your name";

  return (
    <main className="min-w-0 space-y-7 pb-10">
      {/* Breadcrumb and heading */}
      <section>
        <div className="mb-3 flex items-center gap-2 text-sm text-neutral-500">
          <Link
            href="/dashboard"
            className="transition-colors hover:text-[#92003A]"
          >
            My Account
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-neutral-900 dark:text-neutral-100">
            My Profile
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-neutral-500">
          Manage your personal information and account settings.
        </p>
      </section>

      {notice && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400"
        >
          <Check className="size-4 shrink-0" />
          {notice}
        </div>
      )}

      {/* Profile overview */}
      <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="h-24 bg-gradient-to-r from-[#92003A] via-[#B51D58] to-[#E3A0BA] sm:h-32" />

        <div className="px-5 pb-5 sm:px-7 sm:pb-7">
          <div className="-mt-11 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-[#92003A]/10 text-2xl font-semibold text-[#92003A] dark:border-neutral-950 sm:size-24">
                {profile.firstName.charAt(0).toUpperCase()}
                {profile.lastName.charAt(0).toUpperCase()}

                <button
                  type="button"
                  aria-label="Change profile picture"
                  onClick={() =>
                    setNotice(
                      "Connect your image upload endpoint to change your profile picture.",
                    )
                  }
                  className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#92003A] text-white transition hover:bg-[#76002F] dark:border-neutral-950"
                >
                  <Camera className="size-3.5" />
                </button>
              </div>

              <div className="min-w-0 pb-1">
                <h2 className="truncate text-lg font-semibold text-neutral-950 dark:text-white sm:text-xl">
                  {fullName}
                </h2>
                <p className="mt-1 truncate text-sm text-neutral-500">
                  {profile.email}
                </p>
              </div>
            </div>

            {!editing && (
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#92003A] px-4 text-sm font-semibold text-white transition hover:bg-[#76002F]"
              >
                Edit profile
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Personal information */}
        <section className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950 sm:p-7">
          <div className="flex items-start gap-3 border-b border-neutral-100 pb-5 dark:border-neutral-800">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#92003A]/10 text-[#92003A]">
              <UserRound className="size-5" />
            </div>
            <div>
              <h2 className="font-semibold text-neutral-950 dark:text-white">
                Personal information
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Your basic personal details.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                First name
                <input
                  required
                  maxLength={80}
                  autoComplete="given-name"
                  className={inputClass}
                  value={form.firstName}
                  disabled={!editing}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                  placeholder="Enter first name"
                />
              </label>

              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Last name
                <input
                  required
                  maxLength={80}
                  autoComplete="family-name"
                  className={inputClass}
                  value={form.lastName}
                  disabled={!editing}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                  placeholder="Enter last name"
                />
              </label>

              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Email address
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    className={`${inputClass} pl-10`}
                    value={form.email}
                    disabled={!editing}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                  />
                </span>
              </label>

              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Phone number
                <span className="relative block">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    className={`${inputClass} pl-10`}
                    value={form.phone}
                    disabled={!editing}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="01XXXXXXXXX"
                  />
                </span>
              </label>

              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Gender
                <select
                  className={inputClass}
                  value={form.gender}
                  disabled={!editing}
                  onChange={(event) =>
                    updateField("gender", event.target.value)
                  }
                >
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Date of birth
                <input
                  type="date"
                  autoComplete="bday"
                  className={inputClass}
                  value={form.birthDate}
                  disabled={!editing}
                  onChange={(event) =>
                    updateField("birthDate", event.target.value)
                  }
                />
              </label>
            </div>

            {editing && (
              <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 dark:border-neutral-800 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-10 rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#92003A] px-5 text-sm font-semibold text-white transition hover:bg-[#76002F]"
                >
                  <Check className="size-4" />
                  Save changes
                </button>
              </div>
            )}
          </form>
        </section>

        {/* Account settings */}
        <aside className="space-y-5">
          <section className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 className="font-semibold text-neutral-950 dark:text-white">
              Account settings
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Manage your account security.
            </p>

            <div className="mt-5 space-y-2">
              <Link
                href="/dashboard/addresses"
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Saved addresses
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Manage delivery addresses
                  </p>
                </div>
                <ChevronRight className="size-4 text-neutral-400" />
              </Link>

              <Link
                href="/dashboard/change-password"
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                  <KeyRound className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    Password & security
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Update your password
                  </p>
                </div>
                <ChevronRight className="size-4 text-neutral-400" />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-neutral-950 dark:text-white">
                  Account protection
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  Keep your details up to date.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-500">
              Use a strong password and keep your contact information current to
              help secure your account.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
