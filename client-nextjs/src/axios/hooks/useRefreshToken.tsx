"use client";

import axios from "../axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useRefreshToken = () => {
  const { data: session,update } = useSession();
  const router = useRouter();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/auth/refresh", {
        //Authorization: `Bearer ${session?.user?.refreshToken}`,
        refresh: session?.user.refreshToken,
      });
      if (session) {
        session.user.accessToken = res.data.accessToken;
        await update({
          ...session,
          user:{
            ...session?.user,
            accessToken:res.data.accessToken
          }
        })


      } else signIn();

      
    } catch (error) {
      console.log("reinicie pagina")
      signOut({ redirect: false }).then(() => {
        router.push("/login"); // Redirect to the dashboard page after signing out
      });
      //signOut({ callbackUrl: 'http://localhost:3000/login' })
      //router.push("/"); 
      throw new Error("Unable to get a token.");
      
    }
  };
  return refreshToken;
};
