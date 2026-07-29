import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "오늘바다 | 해양정보·안전 지원", description: "해녀와 어민을 위한 친절한 바다 정보 안내" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }
