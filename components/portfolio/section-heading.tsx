"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  inverted?: boolean;
};

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      variants={reveal}
      className={`flex max-w-2xl flex-col gap-4 ${alignment}`}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -12 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={`inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${
          inverted
            ? "border-white/15 bg-white/8 text-white/70"
            : "border-white/10 bg-white/5 text-[var(--muted)]"
        }`}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className={`font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl ${
          inverted ? "text-white" : ""
        }`}
      >
        {title}
      </motion.h2>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.16 }}
        className={`text-base leading-7 sm:text-lg ${
          inverted ? "text-white/70" : "text-[var(--muted)]"
        }`}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
