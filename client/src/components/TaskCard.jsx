import { useTasks } from "../context/TaskContext";

import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
	const { deleteTask } = useTasks();

	return (
		<div className="flex justify-center my-3">
			<div className="bg-zinc-800 max-w-md w-full  p-10 rounded-md text-center ">
				<header className="flex justify-between ">
					<h1 className="text-2xl font-bold">{task.title}</h1>
					<div className="flex gap-x-2 items-center">
						<button
							className="bg-[#dc143c] hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
							onClick={() => {
								deleteTask(task._id);
							}}
						>
							Delete
						</button>
						<Link
							to={`/tasks/${task._id}`}
							className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer"
						>
							Edit{" "}
						</Link>
					</div>
				</header>
				<p className="text-slate-300">{task.description}</p>
				<p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
			</div>
		</div>
	);
}

export default TaskCard;
