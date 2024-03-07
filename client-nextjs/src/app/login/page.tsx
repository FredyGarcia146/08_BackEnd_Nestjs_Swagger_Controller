"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import { getProviders, signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { headers } from "next/headers";
import { log } from "console";
import Script from "next/script";
import Google from "next-auth/providers/google";

import jwt from "jsonwebtoken"



//import {sign, verify} from "@/badmodules/jsonwebtoken";

const URI: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

function LoginForm() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<number | string | undefined>();
  const [errors, setErrors] = useState<string[]>([]);

  const [remenber, setremenber] = useState<boolean | undefined>();

  const router = useRouter();
  //const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/interfaces/tasks");
  };


  const handleSubmitGoogleFrontEnd = async () => {
    //event.preventDefault();
    setErrors([]);

    const responseNextAuth =  await signIn("google");
    
    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    
    
    router.push("/interfaces/tasks");
  };




  return (
    <div>
      <div className="m-4 text-center">
        <h3 className="text-xl font-medium  text-neutral-800 dark:text-neutral-50">
          Login User
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto ">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@tasks.com"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remenber Me
          </label>
        </div>
        <div className="justify-items-center">
          <button
            type="submit"
            className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Login
          </button>
        </div>
      </form>
      <div className="justify-items-center max-w-sm mx-auto ">

        <button
          className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => handleSubmitGoogleFrontEnd()}
        >
          Google FrontEnd
        </button>

        
    
      </div>
    </div>
  );
}

export default LoginForm;
