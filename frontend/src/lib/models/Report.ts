import mongoose, { Schema, Document } from "mongoose"

export interface IReportDocument extends Document {
  userId?: mongoose.Types.ObjectId
  scanId: mongoose.Types.ObjectId
  pdfUrl: string
  notes?: string
  createdAt: Date
}

const ReportSchema = new Schema<IReportDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    scanId: { type: Schema.Types.ObjectId, ref: "Scan", required: true, index: true },
    pdfUrl: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
)

ReportSchema.index({ userId: 1, createdAt: -1 })

export const Report = mongoose.models.Report ?? mongoose.model<IReportDocument>("Report", ReportSchema)
