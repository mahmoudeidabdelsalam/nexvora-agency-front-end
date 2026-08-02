"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/wordpress";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index]?.testimonialFields;

  if (!current) return null;

  return (
    <section className="bg-panel px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-xl leading-relaxed text-ink md:text-2xl">
          &ldquo;{current.quote}&rdquo;
        </p>
        <p className="mt-6 font-body text-sm text-ink/60">
          {current.authorName} &mdash; {current.authorRole}, {current.authorCompany}
        </p>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-signal" : "bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
