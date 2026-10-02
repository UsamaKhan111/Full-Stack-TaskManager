import { Link } from "react-router-dom";

function Tasks() {
  const tasks = [
    {
      id: 1,
      title: "Learn React",
      description: "Review React fundamentals",
      completed: true,
    },
    {
      id: 2,
      title: "Build Task Manager",
      description: "Create the frontend",
      completed: false,
    },
    {
      id: 3,
      title: "Learn PostgreSQL",
      description: "Practice SQL queries",
      completed: false,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tasks</h1>

        <Link
          to="/tasks/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          New Task
        </Link>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {task.title}
              </h2>

              <span>
                {task.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <p className="mt-2 text-gray-600">
              {task.description}
            </p>

            <div className="mt-4 flex gap-2">
              <button className="rounded border px-3 py-1">
                {task.completed ? "Undo" : "Complete"}
              </button>

              <Link
                to={`/tasks/${task.id}/edit`}
                className="rounded border px-3 py-1"
              >
                Edit
              </Link>

              <button className="rounded border px-3 py-1">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;