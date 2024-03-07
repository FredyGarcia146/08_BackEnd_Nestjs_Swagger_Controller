"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  console.log({ session, status });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="flex items-center">
        <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full ml-6"></span>
        <a
          type="button"
          href={`/interfaces/tasks`}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 mr-1"
        >
          {session.user?.email} <br />
        </a>

        <a
          type="button"
          href={`/interfaces/tasks`}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 mr-1"
        >
          {session.user?.role} <br />
        </a>

        <div>
          <button
            onClick={() => signOut()}
            className=" text-white bg-gradient-to-br from-zinc-600 to-cyan-800 hover:bg-gradient-to-bl  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center m-2">
        <div>
          <a
            type="button"
            href="/register"
            className=" text-white bg-gradient-to-br from-zinc-600 to-cyan-800 hover:bg-gradient-to-bl  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2"
          >
            Register
          </a>
        </div>

        <button
          className=" text-white bg-gradient-to-br from-zinc-600 to-cyan-800 hover:bg-gradient-to-bl  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 ml-2"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
