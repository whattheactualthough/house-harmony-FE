import axios from "axios";

const houseHarmonyAPI = axios.create({
  baseURL: "https://house-harmony-hnxr.onrender.com/api/",
});

export const fetchTasksForGroup = () =>
  houseHarmonyAPI.get("/tasks").then((res) => res.data);

export const addNewTask = (task) =>
  houseHarmonyAPI.post("/tasks", task).then((res) => res.data);

export const deleteTask = (id) =>
  houseHarmonyAPI.delete(`/tasks/${id}`).then((res) => res.data);

export const fetchTasksByRoom = (id) =>
  houseHarmonyAPI.get(`/tasks/room/${id}`).then((res) => res.data);

export const fetchUsers = () =>
  houseHarmonyAPI.get("/users").then((res) => res.data);

export const fetchStatus = () =>
  houseHarmonyAPI.get("/status").then((res) => res.data);

export const fetchRooms = () =>
  houseHarmonyAPI.get("/rooms").then((res) => res.data);

/**
 * Fetch tasks for a specific user.
 * Returns { data: [] } if no tasks exist (404), so the UI gets an empty array instead of an error.
 */
export const fetchTasksByUser = async (id) => {
  try {
    const res = await houseHarmonyAPI.get(`/tasks/${id}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return { data: [] };
    }
    throw err;
  }
};

export const fetchUserPoints = (id) =>
  houseHarmonyAPI.get(`/points/${id}`).then((res) => res.data);

export const updateTaskStatus = (taskId, status_id) =>
  houseHarmonyAPI
    .patch(`/tasks/${taskId}/status`, { status_id })
    .then((res) => res.data);

export const updateTask = (taskId, assigned_to_user_id) =>
  houseHarmonyAPI
    .patch(`/tasks/${taskId}`, { assigned_to_user_id })
    .then((res) => res.data);

export const fetchImages = () =>
  houseHarmonyAPI.get("/images").then((res) => res.data);

// -------------------
// Mock data preserved
// -------------------

const mockPointsData = {
  1: { userId: 1, totalPoints: 150 },
  3: { userId: 3, totalPoints: 225 },
  6: { userId: 6, totalPoints: 89 },
  7: { userId: 7, totalPoints: 178 },
  8: { userId: 8, totalPoints: 93 },
};

export const mockGetTasks = () =>
  Promise.resolve({
    data: [
      {
        id: 2,
        task_name: "take the bins out ",
        description: "",
        is_urgent: false,
        due_date: null,
        task_specific_date: "2025-06-04",
        is_recurring: true,
        recurring_frequency: 7,
        created_at: "2025-06-02T11:03:42.639656+00:00",
        updated_at: "2025-06-02T11:03:42.639656",
        users: { user_name: "Kiran" },
        rooms: { room_name: "kitchen" },
        status: { description: "up for grabs" },
        task_desirability_level: { level: "Low", points: 25 },
      },
      {
        id: 3,
        task_name: "take the bins out ",
        description: "",
        is_urgent: false,
        due_date: null,
        task_specific_date: "2025-06-04",
        is_recurring: true,
        recurring_frequency: 7,
        created_at: "2025-06-02T11:03:42.639656+00:00",
        updated_at: "2025-06-02T11:03:42.639656",
        users: { user_name: "Kiran" },
        rooms: { room_name: "kitchen" },
        status: { description: "up for grabs" },
        task_desirability_level: { level: "Low", points: 25 },
      },
      {
        id: 4,
        task_name: "take the bins out ",
        description: "",
        is_urgent: false,
        due_date: null,
        task_specific_date: "2025-06-04",
        is_recurring: true,
        recurring_frequency: 7,
        created_at: "2025-06-02T11:03:42.639656+00:00",
        updated_at: "2025-06-02T11:03:42.639656",
        users: { user_name: "Kiran" },
        rooms: { room_name: "kitchen" },
        status: { description: "up for grabs" },
        task_desirability_level: { level: "Low", points: 25 },
      },
    ],
  });

export const mockGetTasksByRoom = (id) =>
  Promise.resolve({
    data: [
      {
        id: 2,
        task_name: "take the bins out ",
        /* … */
      },
    ],
  });

export const mockGetUsers = () =>
  Promise.resolve({
    data: [
      { id: 1, user_name: "Kiran" /* … */ },
      { id: 3, user_name: "Lucy" /* … */ },
      { id: 6, user_name: "Gustavo" /* … */ },
      { id: 7, user_name: "Yasin" /* … */ },
      { id: 8, user_name: "Louie" /* … */ },
    ],
  });

export const mockGetUserById = (id) =>
  Promise.resolve({
    data: {
      id: 1,
      user_name: "Kiran",
      /* … */
    },
  });

export const mockGetRooms = () => Promise.resolve({ data: {} });
export const mockGetBadges = () => Promise.resolve({ data: {} });
export const mockGetImages = () => Promise.resolve({ data: {} });
export const mockGetStatus = () => Promise.resolve({ data: {} });

export const mockGetPointsById = (id) =>
  Promise.resolve(mockPointsData[id] || { userId: id, totalPoints: 0 });

export const mockGetTasksById = (id) =>
  Promise.resolve({
    data: [
      { id: 2, task_name: "…" /* … */ },
      { id: 3, task_name: "…" /* … */ },
      { id: 4, task_name: "…" /* … */ },
    ],
  });
