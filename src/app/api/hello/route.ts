import { NextResponse } from "next/server";

export async function GET() {
  const envKeys = Object.keys(process.env);
  const hasGoogleClientId = !!process.env.GOOGLE_CLIENT_ID;
  const hasGoogleClientSecret = !!process.env.GOOGLE_CLIENT_SECRET;
  const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  
  return NextResponse.json({ 
    message: "Hello World", 
    envKeys,
    hasGoogleClientId,
    hasGoogleClientSecret,
    hasNextAuthSecret,
    nextAuthUrl
  });
}
