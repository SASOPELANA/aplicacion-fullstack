import { createContext, useState, useContext } from "react";
import {
	createTaskRequest,
	getTasksRequest,
	deleteTaskRequest,
} from "../api/task.js";

const TaskContext = createContext();

export const useTasks = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTask must be used within a TaskProvider");
	}
	return context;
};

const createTask = async (task) => {
	const res = await createTaskRequest(task);
	console.log(res);
};

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState([]);

	const getTasks = async () => {
		try {
			const res = await getTasksRequest();
			setTasks(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (id) => {
		try {
			const res = await deleteTaskRequest(id);

			if (res.status === 204) {
				setTasks(tasks.filter((task) => task._id !== id));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				createTask,
				getTasks,
				deleteTask,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}
