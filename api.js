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
   image_url: '',
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
    return Promise.resolve({
       userId: 2,
       totalPoints: 50
    })
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
   status: { description: 'up for grabs' },
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
   status: { description: 'up for grabs' },
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
   status: { description: 'up for grabs' },
   task_desirability_level: { level: 'Low', points: 25 }
 }]
});
}


