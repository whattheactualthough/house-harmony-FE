const mockPointsData = {
  1: { userId: 1, totalPoints: 150 }, // Kiran
  3: { userId: 3, totalPoints: 225 }, // Lucy 
  6: { userId: 6, totalPoints: 89 },  // Gustavo
  7: { userId: 7, totalPoints: 178 }, // Yasin
  8: { userId: 8, totalPoints: 93 },  // Louie
};


export const mockGetTasks = () => {
 return Promise.resolve({
   data: [{
   id: 2,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }, {
   id: 3,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }, {
   id: 4,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }]
});
}


export const mockGetUsers = () => {
 return Promise.resolve({
       data:[
 {
   id: 1,
   created_at: '2025-06-02T09:52:05.771079+00:00',
   user_name: 'Kiran',
   group_name: 'House Harmony Rd',
   image_url: '',
   is_admin: true,
   badges_earned: null
 },
 {
   id: 3,
   created_at: '2025-06-02T09:53:09.843409+00:00',
   user_name: 'Lucy',
   group_name: 'House Harmony Rd',
   image_url: '',
   is_admin: true,
   badges_earned: null
 },
 {
   id: 6,
   created_at: '2025-06-04T08:54:58.975739+00:00',
   user_name: 'Gustavo',
   group_name: 'House Harmony Rd',
   image_url: '',
   is_admin: true,
   badges_earned: null
 },
 {
   id: 7,
   created_at: '2025-06-04T08:54:58.975739+00:00',
   user_name: 'Yasin',
   group_name: 'House Harmony Rd',
   image_url: '',
   is_admin: true,
   badges_earned: null
 },
 {
   id: 8,
   created_at: '2025-06-04T08:54:58.975739+00:00',
   user_name: 'Louie',
   group_name: 'House Harmony Rd',
   image_url: '',
   is_admin: true,
   badges_earned: null
 }
]});
};


export const mockGetUserById = (id) => {
   return Promise.resolve({
       data:{
           id: 1,
   created_at: '2025-06-02T09:52:05.771079+00:00',
   user_name: 'Kiran',
   group_name: 'House Harmony Rd',
   image_url: 'https://ca.slack-edge.com/T01KPE0QGCD-U089C313VM4-02359cc6e721-512',
   is_admin: true,
   badges_earned: null
       }
   })
}


export const mockGetRooms = () => {
 return Promise.resolve({
   data: {},
 });
};


export const mockGetBadges = () => {
 return Promise.resolve({
   data: {},
 });
};


export const mockGetImages = () => {
 return Promise.resolve({
   data: {},
 });
};


export const mockGetStatus = () => {
 return Promise.resolve({
   data: {},
 });
};

export const mockGetTasksByRoom = (id) => {
 return Promise.resolve({
   data: [{
   id: 2,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }, {
   id: 3,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }, {
   id: 4,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }]
});
}

export const mockGetPointsById = (id) => {
  const userPoints = mockPointsData[id];
  return Promise.resolve(userPoints || { userId: id, totalPoints: 0 });
}


export const mockGetTasksById = (id) => {
 return Promise.resolve({
   data: [{
   id: 2,
   task_name: 'take the bins out ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'kitchen' },
   status: { description: 'claimed' },
   task_desirability_level: { level: 'Low', points: 25 }
 }, {
   id: 3,
   task_name: 'hoover ',
   description: 'there are new hoover bags in the coat cuboard :)',
   is_urgent: false,
   due_date: '2025-06-15',
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'living room' },
   status: { description: 'claimed' },
   task_desirability_level: { level: 'Low', points: 25 }
 }, {
   id: 4,
   task_name: 'clean bath ',
   description: '',
   is_urgent: false,
   due_date: null,
   task_specific_date: '2025-06-04',
   is_recurring: true,
   recurring_frequency: 7,
   created_at: '2025-06-02T11:03:42.639656+00:00',
   updated_at: '2025-06-02T11:03:42.639656',
   users: { user_name: 'Kiran' },
   rooms: { room_name: 'bathroom' },
   status: { description: 'claimed' },
   task_desirability_level: { level: 'Low', points: 25 }
 }]
});
}

export const mockUpdateTaskStatus = (taskId, statusId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${taskId} updated to status ${statusId}`);
      resolve({ id: taskId, status_id: statusId });
    }, 500);
  });
};




