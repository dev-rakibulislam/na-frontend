
"use client";

import { useState } from "react";
import {
  Store,
  Globe,
  Clock,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Settings2,
} from "lucide-react";

const primary = "#92003A";

type Settings = {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  storeDescription: string;
  currency: string;
  currencyPosition: "left" | "right";
  timezone: string;
  dateFormat: string;
  language: string;
  maintenanceMode: boolean;
  guestCheckout: boolean;
  orderNotifications: boolean;
};

const defaultSettings: Settings = {
  storeName: "My Store",
  storeEmail: "support@example.com",
  storePhone: "+880 1XXXXXXXXX",
  storeAddress: "Tongi, Gazipur, Bangladesh",
  storeDescription: "Your trusted online shopping destination.",
  currency: "BDT",
  currencyPosition: "left",
  timezone: "Asia/Dhaka",
  dateFormat: "DD MMM YYYY",
  language: "en",
  maintenanceMode: false,
  guestCheckout: true,
  orderNotifications: true,
};

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "" : "bg-gray-300"
        }`}
        style={checked ? { backgroundColor: primary } : undefined}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [storeLogo, setStoreLogo] = useState<string | null>(null);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function handleReset() {
    setSettings(defaultSettings);
    setStoreLogo(null);
    setSaved(false);
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Demo only: connect this to your settings API.
    setSaved(true);
  }

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Logo must be smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setStoreLogo(reader.result as string);
    reader.readAsDataURL(file);
    setSaved(false);
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <main className="min-h-screen bg-gray-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Settings2 size={16} />
              <span>Settings</span>
              <span>/</span>
              <span className="text-gray-800">General</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              General Settings
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your store information and general preferences.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="submit"
              form="general-settings-form"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: primary }}
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            <CheckCircle2 size={18} />
            Settings saved in this demo. Connect your API to persist them.
          </div>
        )}

        <form
          id="general-settings-form"
          onSubmit={handleSave}
          className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"
        >
          <div className="space-y-6">
            {/* Store information */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${primary}10`, color: primary }}
                >
                  <Store size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Store Information
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Basic details customers see about your store.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                <label className={labelClass}>
                  Store Name
                  <input
                    required
                    value={settings.storeName}
                    onChange={(e) => update("storeName", e.target.value)}
                    className={inputClass}
                    placeholder="Enter store name"
                  />
                </label>

                <label className={labelClass}>
                  Support Email
                  <input
                    required
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => update("storeEmail", e.target.value)}
                    className={inputClass}
                    placeholder="support@example.com"
                  />
                </label>

                <label className={labelClass}>
                  Contact Phone
                  <input
                    value={settings.storePhone}
                    onChange={(e) => update("storePhone", e.target.value)}
                    className={inputClass}
                    placeholder="+880 1XXXXXXXXX"
                  />
                </label>

                <label className={labelClass}>
                  Store Address
                  <input
                    value={settings.storeAddress}
                    onChange={(e) => update("storeAddress", e.target.value)}
                    className={inputClass}
                    placeholder="Enter business address"
                  />
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Store Description
                  <textarea
                    rows={3}
                    maxLength={300}
                    value={settings.storeDescription}
                    onChange={(e) => update("storeDescription", e.target.value)}
                    className={`${inputClass} resize-y`}
                    placeholder="Briefly describe your store"
                  />
                  <span className="mt-1 block text-right text-xs font-normal text-gray-400">
                    {settings.storeDescription.length}/300
                  </span>
                </label>
              </div>
            </section>

            {/* Regional preferences */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${primary}10`, color: primary }}
                >
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Regional Preferences
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Configure currency, language and date display.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                <label className={labelClass}>
                  Currency
                  <select
                    value={settings.currency}
                    onChange={(e) => update("currency", e.target.value)}
                    className={inputClass}
                  >
                    <option value="BDT">BDT — Bangladeshi Taka (৳)</option>
                    <option value="USD">USD — US Dollar ($)</option>
                    <option value="EUR">EUR — Euro (€)</option>
                    <option value="INR">INR — Indian Rupee (₹)</option>
                    <option value="GBP">GBP — British Pound (£)</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Currency Position
                  <select
                    value={settings.currencyPosition}
                    onChange={(e) =>
                      update(
                        "currencyPosition",
                        e.target.value as Settings["currencyPosition"],
                      )
                    }
                    className={inputClass}
                  >
                    <option value="left">Before amount — ৳ 1,000</option>
                    <option value="right">After amount — 1,000 ৳</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Timezone
                  <select
                    value={settings.timezone}
                    onChange={(e) => update("timezone", e.target.value)}
                    className={inputClass}
                  >
                    <option value="Asia/Dhaka">Asia/Dhaka (UTC+06:00)</option>
                    <option value="Asia/Kolkata">
                      Asia/Kolkata (UTC+05:30)
                    </option>
                    <option value="UTC">UTC (UTC+00:00)</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Date Format
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => update("dateFormat", e.target.value)}
                    className={inputClass}
                  >
                    <option value="DD MMM YYYY">28 Oct 2026</option>
                    <option value="YYYY-MM-DD">2026-10-28</option>
                    <option value="DD/MM/YYYY">28/10/2026</option>
                    <option value="MM/DD/YYYY">10/28/2026</option>
                  </select>
                </label>

                <label className={labelClass}>
                  Dashboard Language
                  <select
                    value={settings.language}
                    onChange={(e) => update("language", e.target.value)}
                    className={inputClass}
                  >
                    <option value="en">English</option>
                    <option value="bn">বাংলা</option>
                  </select>
                </label>
              </div>
            </section>

            {/* Store behavior */}
            <section className="rounded-xl border border-gray-200 bg-white px-5 sm:px-6">
              <div className="flex items-center gap-3 border-b border-gray-100 py-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${primary}10`, color: primary }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Store Behavior
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Control checkout and store availability preferences.
                  </p>
                </div>
              </div>

              <Toggle
                label="Guest Checkout"
                description="Allow customers to place orders without an account."
                checked={settings.guestCheckout}
                onChange={(value) => update("guestCheckout", value)}
              />

              <div className="border-t border-gray-100">
                <Toggle
                  label="Order Notifications"
                  description="Enable order notification preferences for the store."
                  checked={settings.orderNotifications}
                  onChange={(value) => update("orderNotifications", value)}
                />
              </div>

              <div className="border-t border-gray-100">
                <Toggle
                  label="Maintenance Mode"
                  description="Preference only in this demo; storefront access is not blocked."
                  checked={settings.maintenanceMode}
                  onChange={(value) => update("maintenanceMode", value)}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-900">Store Logo</h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload your store logo. Maximum size: 2 MB.
              </p>

              <div className="mt-5 flex min-h-40 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                {storeLogo ? (
                  <img
                    src={storeLogo}
                    alt="Store logo preview"
                    className="max-h-32 max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="mx-auto text-gray-400" size={32} />
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      No logo uploaded
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG or SVG
                    </p>
                  </div>
                )}
              </div>

              <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                <Upload size={16} />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Logo preview only. Upload the image to your storage service when
                connecting the backend.
              </p>
            </section>

            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-700"
                />
                <div>
                  <h3 className="text-sm font-semibold text-amber-900">
                    Before going live
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Connect these settings to your backend and database.
                    Maintenance mode must also be enforced by your storefront or
                    middleware, not just this switch.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Configuration
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-900">
                General Settings
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Store-wide preferences and business information.
              </p>
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Default currency</span>
                  <span className="font-semibold text-gray-800">
                    {settings.currency}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Timezone</span>
                  <span className="font-semibold text-gray-800">
                    {settings.timezone}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </form>

        <div className="mt-6 flex justify-end border-t border-gray-200 pt-5">
          <button
            type="submit"
            form="general-settings-form"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: primary }}
          >
            <Save size={16} />
            Save Settings
          </button>
        </div>
      </div>
    </main>
  );
}
