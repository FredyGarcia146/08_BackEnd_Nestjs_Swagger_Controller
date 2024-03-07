
import axios from "axios";
import { useState, useEffect } from "react";
import dtoTypeTask from "@/interfaz/dto.taskType";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

//axios
import useAxiosAuth from "@/axios/hooks/useAxiosAuth";

const URI: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;


function FormTask() {
  const [title, setTitle] = useState<string | undefined>();
  const [typeTask, setTypeTask] = useState<number | string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [done, setDone] = useState<boolean | undefined>();
  //const router = useRouter();

  // Sesion Connection
  const { data: session, status } = useSession();
 
  // axios
  const axiosAuth = useAxiosAuth();

  // [{id:1,name:"gatos"},{id:2,name:"perros"}]
  // <Array<dtoTypeTask>>
  const [typeTasks, setTypeTasks] = useState([])

  /*
  <Array<dtoTypeTask>|any>(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const res = (await axiosAuth.get(`/type-tasks`, config)).data;
    alert(JSON.stringify(res));
    console.log(JSON.stringify(res));
    //const data= res.data

    const ga = [{id:1,name:"gatos"},{id:2,name:"perros"}]

    return res;
  });
  */

  /*
  useEffect(() => {
    if(session){
    getTypeTasks();
    }
  }, [session]);
  */  
  
  const getTypeTasks = async () => {
    
  
    const config = {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    console.log(`Bearer ${session?.user.accessToken}`)
    //const res = await axios.get(`${URI}/type-tasks`,config);
    
    const res = await axiosAuth.get(`/type-tasks`,config);

    console.log(`Bearer ${session?.user.accessToken}`)

    setTypeTasks(res.data);
  };
  

  const postAddTasks = async (e: any) => {
    e.preventDefault();
    console.log(e);

    const config = {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    await axiosAuth.post(`${URI}/tasks/add`, {
      title: title,
      type_task_id: typeTask,
      done: done,
      description: description,
    });

    location.reload();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="w-60 m-2 bg-gray-300 dark:bg-gray-700 shadow-2xl rounded-lg border-solidring-2 ring-blue-500/50 border-2">
        <a 
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={getTypeTasks}
        >

        </a>
        <div className="m-4">
          <div className="m-4 text-center">
            <h3 className="text-xl font-medium  text-neutral-800 dark:text-neutral-50">
              Add Task
            </h3>
          </div>
          <form onSubmit={postAddTasks}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Type Task
              </label>
              <select
                id="type_task_id"
                value={typeTask}
                onChange={(e) => setTypeTask(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Open this select menu
                </option>
                {typeTasks.map((item :dtoTypeTask)=> (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description Task
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description ..."
                required
              ></textarea>
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="done"
                  type="checkbox"
                  checked={done || false}
                  onChange={(e) => setDone(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Done Task
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default FormTask;
