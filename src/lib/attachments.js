import { Archive, File, FileSpreadsheet, FileText, Presentation } from 'lucide-react'

const ICON_BY_EXTENSION = {
  pdf: FileText,
  doc: File,
  docx: File,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  ppt: Presentation,
  pptx: Presentation,
  zip: Archive,
}

export function getAttachmentInfo(href = '') {
  const clean = href.split(/[?#]/)[0]
  const ext = clean.split('.').pop()?.toLowerCase()
  const icon = ICON_BY_EXTENSION[ext]
  if (!icon) return null

  const filename = clean.split('/').pop()
  return { icon, ext, filename }
}
