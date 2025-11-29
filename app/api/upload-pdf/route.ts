import { NextRequest, NextResponse } from "next/server";

import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // If the form entry is a string, bail out (only files are supported)
    if (typeof file === "string") {
      return NextResponse.json({ error: "File must be a file upload" }, { status: 400 });
    }

    // Narrow to Blob/File so TypeScript recognizes arrayBuffer()
    const blob = file as Blob;
    const fileBuffer = await blob.arrayBuffer();

    const mimetype = (file as File).type;
    const filename = (file as File).name;
    const encoding = "base64";
    const dataOfBase64 = Buffer.from(fileBuffer).toString("base64");

    const pdfUrl = "data:" + mimetype + ";" + encoding + "," + dataOfBase64;

    const result = await cloudinary.uploader.upload(pdfUrl, {
      resource_type: "raw",
      filename_override: filename,
      folder: "pdfs",
    });

    console.log(result); //you can console log this uploadResult to see what is being uploaded to cloudinary

    return NextResponse.json({
      success: true,
      message: "PDF uploaded successfully",
      pdf: result.secure_url,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
