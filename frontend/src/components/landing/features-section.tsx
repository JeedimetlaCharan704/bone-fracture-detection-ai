"use client"

import { motion } from "framer-motion"
import { Brain, Upload, FileText, BarChart3, Lock, Clock } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced deep learning models analyze X-rays with 99.2% accuracy, identifying fractures across all major bone groups.",
  },
  {
    icon: Upload,
    title: "Easy Upload",
    description: "Drag and drop X-ray images in JPG, JPEG, or PNG format. Support for files up to 10MB with instant preview.",
  },
  {
    icon: Clock,
    title: "Lightning Fast Results",
    description: "Get detection results in under 30 seconds. Our optimized inference pipeline ensures rapid turnaround.",
  },
  {
    icon: FileText,
    title: "PDF Reports",
    description: "Generate comprehensive PDF reports for each scan. Download and share with patients or colleagues.",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "View confidence scores, fracture regions, and historical trends. Track your scan history over time.",
  },
  {
    icon: Lock,
    title: "HIPAA Compliant",
    description: "Your data is encrypted at rest and in transit. All images are stored securely with enterprise-grade protection.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border/40 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              fracture detection
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform combines cutting-edge AI with a seamless user experience.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
