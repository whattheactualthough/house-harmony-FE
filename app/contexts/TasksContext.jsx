import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasksForGroup } from "../../api";

const TasksContext = createContext();

export const useTasks=()=>{
    const context = useContext(TasksContext)
    return context
};

export const TasksProvider=({children})=>{
    const [tasks, setTasks] = useState([]);
    const [userTasks, setUserTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    setIsLoading(true);
    fetchTasksForGroup()
      .then((tasks) => {
        setTasks(tasks.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

const updateTaskStatusContext = (taskId, newStatusId) => {
  setTasks((prev) => {
    if (Array.isArray(prev)) {
        console.log(prev, "updateTaskStatusContext called")
      return prev.map((task) =>
        task.id === taskId  ? {
              ...task,
              status: {
                ...task.status,
                description: newStatusId,
              },
            }
          : task
      );
    } else {
      console.error('Expected prev to be an array, but got:', typeof prev);
      return prev; 
    }
  });
};


//   const claimTask = (taskId, userId) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === taskId
//           ? { ...task, assignedUser: userId, status: 'claimed' }
//           : task
//       )
//     );
//   };

const claimTask = (taskId, userId) => {
  setTasks((prevTasks) => {
    const taskToClaim = prevTasks.find((task) => task.id === taskId);
    if (!taskToClaim) return prevTasks;
    taskToClaim.assignedUser = userId;
    taskToClaim.status.description = 'claimed';
    const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
    const updatedUserTasks = [...userTasks, taskToClaim];
    setTasks(updatedTasks);
    setUserTasks(updatedUserTasks);
  });
};

return (
    <TasksContext.Provider value={{isLoading, tasks, setTasks, updateTaskStatusContext, claimTask, userTasks}}>
        {children}
    </TasksContext.Provider>
)
}