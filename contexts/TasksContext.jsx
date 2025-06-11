import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchTasksForGroup } from "../api";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksForGroup()
      .then((data) => setTasks(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      fetchTasksForGroup()
        .then((data) => setTasks(data))
        .catch((e) => console.error(e));
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  const updateTaskStatus = (taskId, status_id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status_id } : t)),
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, updateTaskStatus }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
