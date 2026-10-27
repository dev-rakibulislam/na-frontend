"use client";
import Link from "next/link";
import {
  Headset,
  Store,
  MapPin,
  Mail,

  Download,

  MessageCircle,
  SofaIcon,
} from "lucide-react";

const contactItems = [
  {
    icon: Headset,
    title: "Customer Care",
    details: ["Hotline: 16297 (9:00 AM – 11:00 PM)", "care@example.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["2/1/E, Eden Center, Arambag, Motijheel, Dhaka-1000"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["admin@example.com"],
  },
];
const navigationGroups = [
  {
    title: "Home",
    links: [
      ["Books", "/books"],
      ["Electronics", "/electronics"],
      ["Accessories", "/accessories"],
      ["Stationery", "/stationery"],
    ],
  },
  {
    title: "Products",
    links: [
      ["Authors", "/authors"],
      ["Publishers", "/publishers"],
      ["Products", "/products"],
    ],
  },
  {
    title: "About Us",
    links: [
      ["About", "/about"],
      ["Sitemap", "/sitemap"],
      ["Careers", "/careers"],
    ],
  },
  {
    title: "Shop By",
    links: [
      ["Categories", "/categories"],
      ["Book Fair", "/book-fair"],
      ["Pre-order", "/pre-order"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Track Order", "/track-order"],
      ["Contact Us", "/contact"],
      ["Help Desk", "/help"],
    ],
  },
  {
    title: "Policies",
    links: [
      ["Terms & Conditions", "/terms"],
      ["Privacy Policy", "/privacy"],
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: SofaIcon,
    color: "bg-[#1877F2]",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: SofaIcon,
    color: "bg-[#111827]",
  },
  {
    label: "Telegram",
    href: "https://telegram.org",
    icon: MessageCircle,
    color: "bg-[#229ED9]",
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com",
    icon: MessageCircle,
    color: "bg-[#25D366]",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: SofaIcon,
    color: "bg-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: SofaIcon,
    color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: SofaIcon,
    color: "bg-[#FF0000]",
  },
];

function StoreBadge({
  store,
  subtitle,
  title,
}: {
  store: string;
  subtitle: string;
  title: string;
}) {
  return (
    <Link
      href="#"
      aria-label={`Download on ${store}`}
      className="flex min-h-14 flex-1 items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-white transition hover:bg-neutral-800"
    >
      <Download size={23} aria-hidden="true" />
      <span className="flex flex-col">
        <span className="text-[10px] leading-4 text-neutral-300">
          {subtitle}
        </span>
        <span className="text-sm font-semibold leading-5">{title}</span>
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-700">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Contact information */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="Brand home"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#92003A] text-white">
                <Store size={23} />
              </span>
              <span className="text-xl font-bold tracking-tight text-neutral-950">
                Logo / Brand Name
              </span>
            </Link>

            <div className="mt-8 space-y-6">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-3">
                    <Icon
                      size={19}
                      className="mt-0.5 shrink-0 text-[#92003A]"
                      aria-hidden="true"
                    />

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-neutral-950">
                        {item.title}
                      </h3>

                      <div className="mt-1 space-y-1">
                        {item.details.map((detail) => (
                          <p
                            key={detail}
                            className="break-words text-xs leading-5 text-neutral-500"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation links */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 sm:gap-x-8">
              {navigationGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-bold text-neutral-950">
                    {group.title}
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-4 marker:text-[#92003A]">
                    {group.links.map(([label, href]) => (
                      <li
                        key={href}
                        className="text-xs leading-5 text-neutral-500"
                      >
                        <Link
                          href={href}
                          className="transition-colors hover:text-[#92003A]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Social and app downloads */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-neutral-950">
              Stay Connected
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex size-9 items-center justify-center rounded-lg text-white transition hover:-translate-y-0.5 hover:opacity-85 ${social.color}`}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 bg-neutral-100">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left lg:px-10">
          <p className="text-xs text-neutral-500">
            © 2012-2026 <span className="font-semibold text-[#92003A]">Na</span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
              D
            </span>
            <span className="text-[11px] font-semibold tracking-wide text-neutral-600">
              DMCA PROTECTED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
