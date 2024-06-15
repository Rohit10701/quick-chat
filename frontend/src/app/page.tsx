"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const currentTheme = theme === "system" ? systemTheme : theme;

  const [session, setSession] = useState<Session | null>(null)
  const supabase = createClient()
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])


    const handleSignOut = async()=>{
      await supabase.auth.signOut();
    }
    
    if (!mounted) return null;

    if (!session) {
      return <>Not logged in!</>
    }
    else {
    
  return (
    <div className="flex">
      <div>
        <h1 className="text-7xl font-bold text-center">
          {currentTheme === "dark" ? "Dark" : "Light"}{" "}
          <span className="text-purple-600">Mode</span>
        </h1>
        <p className="dark:text-purple-600 my-8 text-center">
          Click the button below to switch mode
        </p>
        <div className="flex justify-center">
          {currentTheme === "dark" ? (
            <button
              className="bg-black-700 hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4"
              onClick={() => setTheme("light")}
            >
              {" "}
              Light
            </button>
          ) : (
            <button
              className="bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300"
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          )}
        </div>
      </div>
      <button onClick={handleSignOut}>Signout</button>
    </div>
  );
}
}
