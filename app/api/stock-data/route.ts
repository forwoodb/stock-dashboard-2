import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:8000/get_stocks");
  const data = await res.json();
  // console.log(data);

  return NextResponse.json(data);
}
