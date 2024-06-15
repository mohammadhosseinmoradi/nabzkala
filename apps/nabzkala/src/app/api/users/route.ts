import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(new Date().getTime() + 500);
}

export async function POST(request: NextRequest) {
  return NextResponse.json("", {
    status: 200,
  });
}
