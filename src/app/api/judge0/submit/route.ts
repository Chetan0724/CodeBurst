import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { language_id, source_code } = await req.json();

    const url = `${process.env.RAPIDAPI_BASE_URL}/submissions?base64_encoded=false&wait=false&fields=*`;
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language_id, source_code }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return NextResponse.json({ token: data.token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
