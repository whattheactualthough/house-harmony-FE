import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasksForGroup } from "../../api";

const TasksContext = createContext();

export const useTasks=()=>{
    const context = useContext(TasksContext)
    return context
};

export const TasksProvider=({children})=>{
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    setIsLoading(true);
    fetchTasksForGroup()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

      const updateTaskStatusContext = (taskId, newStatusId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status_id: newStatusId } : task
      )
    );
    // add updateTaskStatus here for db update?
    // add points to user here if new status change is complete
    // conditional feedback to user 
  };

  const claimTask = (taskId, userId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, assignedUser: userId, status: 'claimed' }
          : task
      )
    );
  };

return (
    <TasksContext.Provider value={{isLoading, tasks, setTasks, updateTaskStatusContext, claimTask}}>
        {children}
    </TasksContext.Provider>
)
}