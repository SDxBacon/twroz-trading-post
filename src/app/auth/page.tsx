"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle, FaDiscord } from "react-icons/fa";

export default function AuthPage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const authError = searchParams.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  useEffect(() => {
    if (authError) {
      setError("登入失敗，請重試");
    }
  }, [authError]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">檢查登入狀態...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return null; // 將會被重定向
  }

  const handleSignIn = async (provider: string) => {
    setIsLoading(provider);
    setError("");

    try {
      await signIn(provider, {
        callbackUrl: callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("登入錯誤:", error);
      setError("登入過程中發生錯誤，請重試");
      setIsLoading("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            歡迎來到 Trading Post
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            使用您的社交帳號登入或註冊
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {/* Google OAuth 按鈕 */}
          <button
            onClick={() => handleSignIn("google")}
            disabled={isLoading !== ""}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {isLoading === "google" ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-300"></div>
              ) : (
                <FaGoogle className="h-5 w-5 text-red-300 group-hover:text-red-200" />
              )}
            </span>
            {isLoading === "google" ? "登入中..." : "使用 Google 帳號登入"}
          </button>

          {/* Discord OAuth 按鈕 */}
          <button
            onClick={() => handleSignIn("discord")}
            disabled={isLoading !== ""}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {isLoading === "discord" ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-300"></div>
              ) : (
                <FaDiscord className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200" />
              )}
            </span>
            {isLoading === "discord" ? "登入中..." : "使用 Discord 帳號登入"}
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                首次登入將自動為您建立帳號
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            登入即表示您同意我們的
            <a
              href="/terms"
              className="text-primary hover:text-primary/80 mx-1"
            >
              服務條款
            </a>
            和
            <a
              href="/privacy"
              className="text-primary hover:text-primary/80 mx-1"
            >
              隱私政策
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
