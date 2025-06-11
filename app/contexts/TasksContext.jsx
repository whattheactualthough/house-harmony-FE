import { assignPoints } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchTasksForGroup } from "../../api";
import { UserContext } from './UserContext';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(UserContext);
  console.log(user, "user")
  const userId = 3;

  useEffect(() => {
    setIsLoading(true);
    fetchTasksForGroup()
      .then((response) => {
        const fetchedTasks = response.data;
        setTasks(fetchedTasks);
        const updatedTasks = fetchedTasks.map((task) => {
          if ([1, 3, 4, 5, 6, 7, 8].includes(task.id)) {
            return {
              ...task,
              users: { ...task.users, user_name: "Kiran" },
              status: { ...task.status, description: "2" },
            };
          }
          return task;
        });
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredUserTasks = tasks.filter(
      (task) => task.users.user_name === "Kiran"
    );
    setUserTasks(filteredUserTasks);
  }, [tasks]);

  const updateTaskStatusContext = (taskId, newStatusId) => {
    setTasks((prev) => {
      if (Array.isArray(prev)) {
        console.log(prev, "updateTaskStatusContext");
        const task = prev.find((task) => task.id === taskId);
        if (task.users.user_name==="Kiran") // I know this is hardcoded, but to change later 
        {
          const points = assignPoints(task.task_name);
          task.status.description = newStatusId;
          // task.points += points; why?
          setUser((prevUser) => ({
            ...prevUser,
            points: user.points + points,
          }));

          // showToast(
          //   `Task marked as ${newStatusId}. You earned ${points} points!`
          // );
        }

        
        return [...prev];
      } else {
        console.error("Expected an array but got:", typeof prev);
        return prev;
      }
    });
  };

  // const updateTaskStatusContext = (taskId, newStatusId) => {
  //   setTasks((prev) => {
  //     if (Array.isArray(prev)) {
  //       console.log(prev, "updateTaskStatusContext called");
  //       return prev.map((task) =>
  //         task.id === taskId
  //           ? {
  //               ...task,
  //               status: {
  //                 ...task.status,
  //                 description: newStatusId,
  //               },
  //             }
  //           : task
  //       );
  //     } else {
  //       console.error("Expected prev to be an array, but got:", typeof prev);
  //       return prev;
  //     }
  //   });
  // };

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
      taskToClaim.status.description = "claimed";
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      const updatedUserTasks = [...userTasks, taskToClaim];
      setTasks(updatedTasks);
      setUserTasks(updatedUserTasks);
    });
  };

  return (
    <TasksContext.Provider
      value={{
        isLoading,
        tasks,
        setTasks,
        updateTaskStatusContext,
        claimTask,
        userTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
