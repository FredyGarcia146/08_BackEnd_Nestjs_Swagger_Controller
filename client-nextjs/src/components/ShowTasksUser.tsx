"use client";

import dtoTask from "@/interfaz/dto.task";
import axios from "axios";
import { useState, useEffect } from "react";
//import { useRouter, useParams } from "next/navigation";

//auth
import { useSession } from "next-auth/react";
import CardTaskUser from "@/components/CardTaskUser";
//axios
import useAxiosAuth from "@/axios/hooks/useAxiosAuth";


const URI: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

function ShowTasksUser() {
  const [tasks, setTask] = useState([]);

  // session connection
  const { data: session, status } = useSession();

  // axios
  const axiosAuth = useAxiosAuth();

  //const router = useRouter();

  /*
  useEffect(() => {
    if(session){
      getTasks();
    }
    
  }, [session]);
  */

  const getTasks = async () => {
    const role = session?.user.role
      if (role==='user'){

        try{

          const config = {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          //const res =await axios.get(`${URI}/tasks/user`, config);
          console.log(`Bearer ${session?.user.accessToken}`)
          const res = await axiosAuth.get(`/tasks/user`,config)
          console.log(`Bearer ${session?.user.accessToken}`)
          
          setTask(res.data)

        }catch(error){
          //console.log(error)
        }

      }else if (role==='admin'){
        const res = await axiosAuth.get(`/tasks`)
        setTask (res.data)
      }

      return{}
    //const res = await axios.get(`${URI}/tasks/user`, config);
    
    //setTask(res);

    //console.log(res.data.length);
  };

  /*
  const deleteTask = async (id: number) => {
    await axios.delete(`${URI}/tasks/${id}/delete`);
    //router.push('/')
    await getTasks();
  };

  const editDoneTask = async (id: number) => {
    await axios.patch(`${URI}/tasks/${id}/toggleDone`);
    await getTasks();
  };
  */

  return (
    <div className="m-2 bg-gray-300 dark:bg-gray-700  shadow-2xl rounded-lg border-solidring-2 ring-blue-500/50 dark:ring-gray-800/50 border-2">
      <a 
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={getTasks}
        >

        </a>
      <div>
        {tasks?.length ? (
          <div>
            <div className="m-6 text-center">
              <h3 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                TASKS
              </h3>
            </div>
            <div className="container mx-auto flex flex-wrap justify-around  ">
              {tasks.map((tasks: dtoTask, index) => (
                <CardTaskUser tasks={tasks} key={index}  />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="w-80 m-8 text-center">
              <h3 className="text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                No tasks
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowTasksUser;
