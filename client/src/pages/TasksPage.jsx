import { useEffect } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import TaskCard from "../components/TaskCard.jsx";

function TasksPage() {
	const { getTasks, tasks } = useTasks();

	useEffect(() => {
		getTasks();
	}, []);

	if (tasks.length === 0) {
		return (
			<div>
				<h1>No Tasks</h1>
			</div>
		);
	}

	return (
		<div className=" md:grid sm:grid-cols-2 md:grid-cols-3 md:gap-2">
			{tasks.map((task) => (
				<TaskCard key={task._id} task={task} />
			))}
		</div>
	);
}

export default TasksPage;
