import { NextRequest, NextResponse } from "next/server";
import { Result } from "@/types/result";
import { join } from "path";
import { getFileExtension } from "@/lib/utils/get-file-extension";
import { getRandomInt } from "@/lib/utils/random";
import { unstable_noStore } from "next/cache";
import prisma from "@/lib/prisma";
import sharp from "sharp";
import { File as TFile } from "@prisma/client";
import { saveFile } from "@/lib/helpers/save-file";

const uploadFolder = "/uploads";

export async function POST(request: NextRequest) {
  unstable_noStore();

  const formData = await request.formData();

  const files = Object.fromEntries(formData);

  for (let fileKey in files) {
    const file = files[fileKey] as File;

    if (!(file instanceof File)) continue;

    const extension = getFileExtension(file.name);

    const fileName = [+new Date() + getRandomInt(10000, 99999), extension]
      .filter((item) => !!item)
      .join("");

    const filePath = join(process.cwd(), "public", uploadFolder, fileName);

    const isFileSaved = await saveFile(filePath, file);

    if (!isFileSaved) {
      const result: Result<TFile> = {
        success: false,
        error: "",
        message: "فایل شما آپلود نشد.",
      };

      return NextResponse.json(result, {
        status: 500,
      });
    }

    let width: number | null = null;
    let height: number | null = null;
    try {
      const metadata = await sharp(filePath).metadata();
      width = metadata.width || null;
      height = metadata.height || null;
    } catch (err) {}

    const url = join(uploadFolder, fileName).replaceAll("\\", "/");

    const createdFile = await prisma.file.create({
      data: {
        name: file.name,
        size: file.size,
        width,
        height,
        ext: extension,
        url,
        mime: file.type,
      },
    });

    const result: Result<TFile> = {
      success: true,
      data: createdFile,
      message: "فایل با موفقیت آپلود شد.",
    };

    return NextResponse.json(result, {
      status: 201,
    });
  }

  return NextResponse.json("hi", { status: 200 });
}

export async function GET(request: NextRequest) {
  const files = await prisma.file.findMany();

  const result: Result<TFile[]> = {
    success: true,
    data: files,
    message: "با موفقیت واکشی شد.",
  };

  return NextResponse.json(result, {
    status: 200,
  });
}

export async function DELETE() {}
