// import { useEffect, useState, type PropsWithChildren } from "react";
// import type { Task } from "./Tasks.d";
// import { LOCAL_STORAGE_KEYS } from "../../constants/app";
// import { storeTasks } from "../../utils/localStorage";
// import { TasksContext } from "./TaskContext";

// export const TaskProvider = ({ children }: PropsWithChildren) => {
//   const [taskList, setTaskList] = useState<Task[]>(() => {
//     const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
//     return storedTasks ? JSON.parse(storedTasks) : [];
//   });

//   useEffect(() => {
//     storeTasks(taskList);
//   }, [taskList]);

//   const addTask = (task: string) => {
//     const newTask: Task = {
//       id: crypto.randomUUID(),
//       completed: false,
//       task,
//     };

//     const updatedTasks = [...taskList];
//     updatedTasks.unshift(newTask);

//     storeTasks(updatedTasks);

//     setTaskList(updatedTasks);
//   };

//   const deleteTask = (taskId: string) => {
//     let updatedTasks = [...taskList];
//     updatedTasks = updatedTasks.filter((task) => taskId !== task.id);

//     setTaskList(updatedTasks);
//   };

//   const editTask = (taskId: string, task: string) => {
//     let updatedTasks = [...taskList];
//     updatedTasks = updatedTasks.map((taskItem) =>
//       taskId !== taskItem.id ? { ...taskItem, task } : taskItem
//     );
//     setTaskList(updatedTasks);
//   };

//   const toggleTaskCompletion = (taskId: string) => {
//     let updatedTasks = [...taskList];
//     updatedTasks = updatedTasks.map((task) =>
//       taskId === task.id ? { ...task, completed: !task.completed } : task
//     );

//     setTaskList(updatedTasks);
//   };

//   const clearCompleted = () => {
//     setTaskList((prev) => prev.filter((task) => !task.completed));
//   };

//   return (
//     <TasksContext.Provider
//       value={{
//         tasks: taskList,
//         addTask,
//         deleteTask,
//         editTask,
//         toggleTaskCompletion,
//         clearCompleted,
//       }}
//     >
//       {children}
//     </TasksContext.Provider>
//   );
// };
