import { mockGetTasks } from "@/api";
import React, { createContext, useContext, useEffect, useState } from "react";
const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    mockGetTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

   useEffect(() => {
    const interval = setInterval(() => {
      mockGetTasks()
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.error("Polling fetch failed:", error);
        });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const updateTaskStatus = (taskId, newStatusId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status_id: newStatusId } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, updateTaskStatus }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
