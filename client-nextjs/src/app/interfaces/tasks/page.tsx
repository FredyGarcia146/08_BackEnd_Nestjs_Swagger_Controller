"use client";
import FormTask from "@/components/FormTask";
import ShowTasksUser from "@/components/ShowTasksUser";

const URI: string = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

function userTasks() {
  return (
    <div>
      <div className="container mx-auto flex justify-between  ">
        <div className="">
          <FormTask></FormTask>
        </div>

        <div className="">
          <ShowTasksUser></ShowTasksUser>
        </div>
      </div>
    </div>
  );
}

export default userTasks;
