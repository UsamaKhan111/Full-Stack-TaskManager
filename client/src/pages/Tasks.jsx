import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load tasks.");
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Could not delete task.");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error.message);
    }
  }

  async function handleToggleComplete(task) {
    const updatedCompleted = !task.completed;

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: updatedCompleted,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not update task.");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-12 sm:px-8">
      <div className="flex flex-col justify-between gap-5 border-b border-gray-200 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm text-gray-500">Your workspace</p>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            My Tasks
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Keep track of what needs to get done.
          </p>
        </div>

        <Link
          to="/tasks/new"
          className="inline-flex w-fit items-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          + New task
        </Link>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <p>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </p>
        <p>
          {tasks.filter((task) => task.completed).length} completed
        </p>
      </div>

      {error && (
        <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-16 text-center text-sm text-gray-500">
          Loading tasks...
        </p>
      ) : tasks.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 px-6 py-16 text-center">
          <h2 className="font-medium text-gray-900">No tasks yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            Add your first task whenever you're ready.
          </p>
          <Link
            to="/tasks/new"
            className="mt-5 inline-block text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            Create a task
          </Link>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex min-w-0 gap-3">
                <button
                  type="button"
                  aria-label={
                    task.completed
                      ? "Mark task as pending"
                      : "Mark task as completed"
                  }
                  onClick={() => handleToggleComplete(task)}
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs transition ${
                    task.completed
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-gray-300 text-transparent hover:border-gray-500"
                  }`}
                >
                  ✓
                </button>

                <div className="min-w-0">
                  <h2
                    className={`wrap-break-word font-medium ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h2>

                  {task.description && (
                    <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-500">
                      {task.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-gray-400">
                    {task.completed ? "Completed" : "In progress"}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4 pl-8 text-sm">
                <Link
                  to={`/tasks/${task.id}/edit`}
                  className="text-gray-600 transition hover:text-gray-950"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  className="text-gray-500 transition hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Tasks;
