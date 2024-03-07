import dtoTask from "@/interfaz/dto.task";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
const URI: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

function CardTask({ tasks }: dtoTask | any) {
  //const [taskss, setTasks] = useState([]);

  //const router = useRouter();

  /*
    useEffect(() => {
        getTaskss();
    }, []);
    */

  /*
    const getTaskss = async () => {
        const res = await axios.get(`${URI}/tasks`);
        setTasks(res.data);
    };
    */

  return (
    <div
      key={tasks.id}
      className="block m-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
    >
      <div className=" flex justify-between">
        <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {tasks.title}
        </h5>
        <h5 className="mb-1 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {tasks.user_id}
        </h5>
      </div>
      <p className="mb-1 text-base text-neutral-600 dark:text-neutral-200">
        Id Task: {tasks.type_task_id}
      </p>
      <p className="mb-1 text-base text-neutral-600 dark:text-neutral-200">
        {tasks.description}
      </p>
      <div>
        {tasks.done === 0 ? (
          <div className="mb-1 text-base  text-red-800 dark:text-red-500 ">
            UnDone {tasks.done}
          </div>
        ) : (
          <div className="mb-1 text-base text-green-800 dark:text-green-400">
            Done {tasks.done}
          </div>
        )}
      </div>
      
    </div>
  );
}

export default CardTask;
