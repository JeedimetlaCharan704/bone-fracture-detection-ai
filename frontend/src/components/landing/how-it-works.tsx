"use client"

import { motion } from "framer-motion"
import { Upload, Scan, FileText } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload X-Ray",
    description: "Drag and drop your X-ray image or click to browse. We support JPG, JPEG, and PNG formats up to 10MB.",
  },
  {
    icon: Scan,
    title: "AI Analysis",
    description: "Our deep learning model analyzes the image, identifying potential fractures and their locations with confidence scores.",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive a detailed report with fracture detection status, confidence score, region visualization, and AI summary.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">works</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to get your fracture detection results.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col items-center md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${index !== 0 ? "md:mt-24" : ""}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-center`}>
                  <div className={`inline-block rounded-xl border border-border/50 bg-card p-6 shadow-lg ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center`}>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg md:mx-8">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
