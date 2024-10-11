import { NextResponse } from "next/server";

export function GET() {
  // return a MextResponse,json

  return NextResponse.json({ hello: "world" });
}
