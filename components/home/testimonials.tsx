"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { testimonials, partnerWordmarks } from "@/data/testimonials"

// Social proof grid plus partner wordmarks — all content is static demo data.
export function Testimonials() {
  return (
    <section className="space-y-10 px-4">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Trusted by teams shipping with agents
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="flex h-full flex-col p-6">
              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 font-heading text-sm font-semibold text-gold">
                  {testimonial.name
                    .split(" ")
                    .map(part => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
          Backed by builders from
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {partnerWordmarks.map(name => (
            <span
              key={name}
              className="font-heading text-lg font-semibold text-muted-foreground/50"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
