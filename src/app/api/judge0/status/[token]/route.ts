import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const url = `${process.env.RAPIDAPI_BASE_URL}/submissions/${token}?base64_encoded=true&fields=*`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();

    const decode = (val?: string | null) =>
      val ? Buffer.from(val, "base64").toString("utf-8") : val;

    const decodedData = {
      ...data,
      source_code: decode(data.source_code),
      stdout: decode(data.stdout),
      stderr: decode(data.stderr),
      compile_output: decode(data.compile_output),
      message: decode(data.message),
    };

    return NextResponse.json({ data: decodedData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
