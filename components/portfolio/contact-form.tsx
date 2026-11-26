"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { socialLinks } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<string>("Send a message and I will get back to you.");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message pre-filled.");
    setForm(initialState);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
      <form onSubmit={onSubmit} className="glass-panel space-y-4 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-white/90">
            Name
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/30"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-white/90">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/30"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm font-medium text-white/90">
          Message
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className="w-full rounded-[24px] border border-white/12 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-white/30"
            placeholder="Tell me about your project or idea."
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-white/60">{status}</p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </div>
      </form>

      <aside className="space-y-4">
        <div className="glass-panel p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            Contact Details
          </h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[var(--primary)]" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[var(--primary)]" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-[var(--primary)]" />
              {siteConfig.location.label}
            </p>
          </div>
        </div>

        <div className="glass-panel p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            Social Links
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/75 hover:border-white/25 hover:text-white sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}