import axios from "axios";

// Sesion Connection
//const { data: session, status } = useSession();

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create(
  {
  baseURL: BASE_URL,
  headers: {
    //Authorization: `Bearer ${session?.user?.accessToken}`,
    "Content-Type": "application/json",
  },
});
