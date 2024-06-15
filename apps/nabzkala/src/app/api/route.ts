import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json("Hi api.");
}

export async function POST(request: NextRequest) {
  return NextResponse.json("", {
    status: 400,
  });
}
