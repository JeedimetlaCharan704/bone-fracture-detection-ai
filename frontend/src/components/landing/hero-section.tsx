"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Brain } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="animate-gradient absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          background: "linear-gradient(-45deg, #3b82f6, #1a56db, #06b6d4, #6366f1)",
          backgroundSize: "400% 400%",
        }}
      />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
          >
            <Brain className="mr-2 h-4 w-4" />
            AI-Powered Fracture Detection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Detect Bone Fractures
            <br />
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Instantly with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Upload X-ray images and get accurate fracture detection results in seconds.
            Powered by advanced deep learning models for rapid, reliable diagnosis assistance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Link href="/dashboard/upload">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="glass animate-float rounded-2xl p-2">
            <div className="rounded-xl bg-gradient-to-b from-primary/10 to-background p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { icon: Zap, title: "Real-time Analysis", desc: "Results in under 30 seconds" },
                  { icon: Shield, title: "99.2% Accuracy", desc: "Validated on 50,000+ X-rays" },
                  { icon: Brain, title: "Deep Learning", desc: "Powered by YOLOv11 architecture" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center rounded-xl bg-background/50 p-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
