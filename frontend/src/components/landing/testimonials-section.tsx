"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Radiologist, Mayo Clinic",
    content: "BoneFracture AI has become an essential tool in our workflow. It catches subtle fractures that are easy to miss, especially in emergency settings.",
    avatar: "SC",
  },
  {
    name: "Dr. James Rodriguez",
    role: "Orthopedic Surgeon",
    content: "The speed and accuracy are remarkable. What used to take hours of manual review now happens in seconds. A game-changer for triage.",
    avatar: "JR",
  },
  {
    name: "Dr. Emily Watson",
    role: "Emergency Medicine",
    content: "We've reduced our average diagnosis time by 60%. The confidence scores help us prioritize critical cases. Highly recommend.",
    avatar: "EW",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              healthcare professionals
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what medical professionals say about BoneFracture AI.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/50 bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/avatars/${index + 1}.jpg`} />
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
