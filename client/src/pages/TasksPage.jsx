import { useAuth } from "../context/AuthContext.jsx";

function TasksPage() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <h1>Tasks Page</h1>
    </div>
  );
}

export default TasksPage;
