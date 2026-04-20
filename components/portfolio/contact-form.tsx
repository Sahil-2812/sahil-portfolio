"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

import { socialLinks } from "@/lib/portfolio-data";

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

    window.location.href = `mailto:maliksahil10996@gmail.com?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message pre-filled.");
    setForm(initialState);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="glass-panel space-y-5 rounded-[28px] p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Name
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--primary)]"
              placeholder="Your name"
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--primary)]"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm font-medium">
          Message
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className="w-full rounded-[24px] border border-[var(--border)] bg-transparent px-4 py-3 outline-none focus:border-[var(--primary)]"
            placeholder="Tell me about your project or idea."
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">{status}</p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
          >
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </div>
      </form>

      <aside className="space-y-5">
        <div className="card-panel rounded-[28px] p-6">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Contact Details
          </h3>
          <div className="mt-5 space-y-4 text-sm text-[var(--muted)]">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[var(--primary)]" />
              maliksahil10996@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[var(--primary)]" />
              Pakistan
            </p>
          </div>
        </div>

        <div className="card-panel rounded-[28px] p-6">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Social Links
          </h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
