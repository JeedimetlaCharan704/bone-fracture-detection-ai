let idCounter = 1

function generateId() {
  return `local_${Date.now()}_${idCounter++}`
}

interface StoredScan {
  _id: string
  userId?: string
  imageUrl: string
  fractureDetected: boolean
  confidenceScore: number
  aiResult?: { summary: string; regions?: string[]; heatmapUrl?: string }
  reportUrl?: string
  createdAt: Date
}

interface StoredReport {
  _id: string
  userId?: string
  scanId: string
  pdfUrl: string
  notes?: string
  createdAt: Date
}

const scans = new Map<string, StoredScan>()
const reports = new Map<string, StoredReport>()

export const localStore = {
  scans: {
    findAll(query: { fractureDetected?: boolean; search?: string; sortField?: string; sortOrder?: string; page?: number; limit?: number }) {
      let list = Array.from(scans.values())
      if (query.fractureDetected !== undefined) {
        list = list.filter(s => s.fractureDetected === query.fractureDetected)
      }
      if (query.search) {
        list = list.filter(s => s.aiResult?.summary?.toLowerCase().includes(query.search!.toLowerCase()))
      }
      const sortField = query.sortField || "createdAt"
      const sortOrder = query.sortOrder || "desc"
      list.sort((a, b) => {
        const aVal = (a as any)[sortField]
        const bVal = (b as any)[sortField]
        return sortOrder === "desc" ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1)
      })
      const page = query.page || 1
      const limit = query.limit || 10
      const total = list.length
      const paged = list.slice((page - 1) * limit, page * limit)
      return { scans: paged, total }
    },
    findById(id: string) {
      return scans.get(id) || null
    },
    create(data: Omit<StoredScan, "_id" | "createdAt">) {
      const scan: StoredScan = { _id: generateId(), ...data, createdAt: new Date() }
      scans.set(scan._id, scan)
      return scan
    },
  },
  reports: {
    findAll(query: { page?: number; limit?: number }) {
      let list = Array.from(reports.values())
      list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      const page = query.page || 1
      const limit = query.limit || 10
      const total = list.length
      const paged = list.slice((page - 1) * limit, page * limit)
      return { reports: paged, total }
    },
    create(data: Omit<StoredReport, "_id" | "createdAt">) {
      const report: StoredReport = { _id: generateId(), ...data, createdAt: new Date() }
      reports.set(report._id, report)
      return report
    },
  },
}
