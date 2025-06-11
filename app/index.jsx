import { Redirect } from 'expo-router';

const RootRedirect = () => {
  return <Redirect href="/HomePage" />;
};

export default RootRedirect;





// // export default function Homescreen() {

// //   const [tasks, setTasks] = useState([]);
  
// //   const updateTaskStatusContext = (taskId, newStatusId) => {
// //       setTasks((prev) =>
// //         prev.map((task) =>
// //           task.id === taskId ? { ...task, status_id: newStatusId } : task
// //         )
// //       );
// //       // add updateTaskStatus here for db update?
// //       // add points to user here if new status change is complete
// //       // conditional feedback to user 
// //     };
    


// //  return (
// //   <TasksContext.Provider value={{tasks, setTasks, updateTaskStatusContext}}>
// //    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //      <Link href="/HomePage" accessibilityLabel = "sign in as Kiran">sign in as Kiran</Link>
// //    </View>
// //    </TasksContext.Provider>
// //  );

// }
