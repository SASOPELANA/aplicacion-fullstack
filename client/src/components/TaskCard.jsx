import { useTasks } from "../context/TaskContext";

import { Link } from "react-router-dom";

function TaskCard({ task }) {
	const { deleteTask } = useTasks();

	return (
		<div className="flex justify-center my-3">
			<div className="bg-zinc-800 max-w-md w-full  p-10 rounded-md text-center ">
				<header className="flex justify-between ">
					<h1 className="text-2xl font-bold">{task.title}</h1>
					<div className="flex gap-x-2 items-center">
						<button
							onClick={() => {
								deleteTask(task._id);
							}}
						>
							Delete
						</button>
						<Link to={`/tasks/${task._id}`}>Edit </Link>
					</div>
				</header>
				<p className="text-slate-300">{task.description}</p>
				<p>{new Date(task.date).toLocaleDateString()}</p>
			</div>
		</div>
	);
}

export default TaskCard;
