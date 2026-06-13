import mongoose, { Schema, Document } from "mongoose"

export interface IScanDocument extends Document {
  userId?: mongoose.Types.ObjectId
  imageUrl: string
  fractureDetected: boolean
  confidenceScore: number
  aiResult?: {
    summary: string
    regions?: string[]
    heatmapUrl?: string
  }
  reportUrl?: string
  createdAt: Date
}

const ScanSchema = new Schema<IScanDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    imageUrl: { type: String, required: true },
    fractureDetected: { type: Boolean, required: true },
    confidenceScore: { type: Number, required: true },
    aiResult: {
      summary: { type: String },
      regions: [{ type: String }],
      heatmapUrl: { type: String },
    },
    reportUrl: { type: String },
  },
  { timestamps: true }
)

ScanSchema.index({ userId: 1, createdAt: -1 })

export const Scan = mongoose.models.Scan ?? mongoose.model<IScanDocument>("Scan", ScanSchema)
