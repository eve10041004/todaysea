import { NextResponse } from "next/server";
import { normalizeKmaForecast } from "../../lib/ocean-data";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? new Date().toISOString().slice(0, 10);
  const key = process.env.KMA_API_KEY;
  if (!key) return NextResponse.json({ date, source: "기상청 단기예보", available: false, error: "KMA_API_KEY가 설정되지 않았습니다." }, { status: 503 });
  const url = new URL("https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst");
  url.searchParams.set("serviceKey", key); url.searchParams.set("pageNo", "1"); url.searchParams.set("numOfRows", "1000"); url.searchParams.set("dataType", "JSON"); url.searchParams.set("base_date", date.replaceAll("-", "")); url.searchParams.set("base_time", "0500"); url.searchParams.set("nx", "98"); url.searchParams.set("ny", "76");
  try { const response = await fetch(url, { next: { revalidate: 600 } }); if (!response.ok) throw new Error(`KMA ${response.status}`); const json = await response.json(); const items = json?.response?.body?.items?.item ?? []; return NextResponse.json(normalizeKmaForecast(date, items)); } catch { return NextResponse.json({ date, source: "기상청 단기예보", available: false, error: "기상청 데이터를 불러오지 못했습니다." }, { status: 502 }); }
}
