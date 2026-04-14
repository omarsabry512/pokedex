import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count >= 3 else {
  fputs("usage: export-pdf-pages.swift <input.pdf> <outdir>\n", stderr)
  exit(1)
}
let pdfURL = URL(fileURLWithPath: args[1])
let outDir = URL(fileURLWithPath: args[2], isDirectory: true)
try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

guard let doc = PDFDocument(url: pdfURL) else {
  fputs("failed to open pdf\n", stderr)
  exit(1)
}

for i in 0 ..< doc.pageCount {
  guard let page = doc.page(at: i) else { continue }
  let bounds = page.bounds(for: .mediaBox)
  let scale: CGFloat = 2
  let size = NSSize(width: bounds.width * scale, height: bounds.height * scale)
  let img = page.thumbnail(of: size, for: .mediaBox)
  guard let data = img.tiffRepresentation,
 let rep = NSBitmapImageRep(data: data),
    let png = rep.representation(using: .png, properties: [:])
  else { continue }
  let out = outDir.appendingPathComponent(String(format: "page-%02d.png", i + 1))
  try png.write(to: out)
}
print("exported \(doc.pageCount) pages to \(outDir.path)")
