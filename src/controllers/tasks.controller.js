import Task from "../models/task.model.js";

// Metodos HTTP desde controller y se exporta a routes

// GET ALL /tasks
export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({
			user: req.user.id,
		}).populate("user");

		res.json(tasks);
	} catch (error) {
		return res.status(404).json({ message: "User not found" });
	}
};

// GET /tasks/:id
export const getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id).populate("user");

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json(task);
	} catch (error) {
		return res.status(404).json({ message: "Task not found" });
	}
};

// POST /tasks
export const createTask = async (req, res) => {
	try {
		const { title, description, date } = req.body;

		//console.log(req.user);

		const newTask = new Task({
			title,
			description,
			date,
			user: req.user.id,
		});

		const saveTask = await newTask.save();
		res.json(saveTask);
	} catch (error) {
		return res.status(404).json({ message: "Task not found" });
	}
};

// PUT /tasks/:id
export const updateTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.json(task);
	} catch (error) {
		return res.status(404).json({ message: "Error updating task" });
	}
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		return res.sendStatus(204);
	} catch (error) {
		return res.status(404).json({ message: "Error deleting task" });
	}
};
