"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How accurate is the fracture detection?",
    answer: "Our AI model achieves 99.2% accuracy on our test dataset of 50,000+ X-ray images. It has been validated against board-certified radiologists and continues to improve through ongoing training.",
  },
  {
    question: "What file formats are supported?",
    answer: "We support JPG, JPEG, and PNG formats. Files must be 10MB or smaller. For best results, use high-resolution X-ray images with proper exposure.",
  },
  {
    question: "How long does analysis take?",
    answer: "Most analyses complete in under 30 seconds. Processing time depends on image size and current server load, but we've optimized our pipeline for rapid inference.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. All images are encrypted at rest using AES-256 and in transit using TLS 1.3. We are HIPAA compliant and never share your data with third parties.",
  },
  {
    question: "Can I export the results?",
    answer: "Yes, you can download detailed PDF reports for each scan. Reports include the uploaded image, fracture status, confidence score, and AI analysis summary.",
  },
  {
    question: "Does it replace a radiologist?",
    answer: "No. BoneFracture AI is designed as an assistive tool to help healthcare professionals make faster, more informed decisions. It should not replace clinical judgment.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about BoneFracture AI.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border/50 bg-card transition-all hover:border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
