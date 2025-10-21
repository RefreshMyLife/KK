import { NextResponse } from "next/server";
import { wpRest } from "@/lib/wordpress";

export async function GET() {
  try {
    const data = await wpRest("acf/v3/pages/117");
    const slider = data?.acf?.mainPage?.bloks?.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (b: any) => b.typeBloka?.includes("rs_slider")
    )?.slider;
    return NextResponse.json(slider || []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
