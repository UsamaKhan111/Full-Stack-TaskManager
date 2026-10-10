
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${id}`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Task not found."
              : "Could not load this task."
          );
        }

        const data = await response.json();

        setTitle(data.title);
        setDescription(data.description ?? "");
        setCompleted(data.completed);
      } catch (error) {
        console.error("Error loading task:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTask();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            completed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Task not found."
            : "Could not save your changes. Please try again."
        );
      }

      await response.json();
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 sm:px-8">
        <p className="text-sm text-gray-500">Loading task...</p>
      </main>
    );
  }

  if (error && !title && !description) {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 sm:px-8">
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
        <Link
          to="/tasks"
          className="mt-4 inline-block text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900"
        >
          Back to tasks
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 sm:px-8">
      <Link
        to="/tasks"
        className="text-sm text-gray-500 transition hover:text-gray-900"
      >
        ← Back to tasks
      </Link>

      <div className="mt-8 border-b border-gray-200 pb-6">
        <p className="mb-2 text-sm text-gray-500">Your workspace</p>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Edit task
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Update the details below and save your changes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Task title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={255}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-800"
          >
            Description
            <span className="ml-2 font-normal text-gray-400">
              (optional)
            </span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            className="w-full resize-y rounded-md border border-gray-300 px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            placeholder="Add details about this task..."
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-gray-900"
          />
          <label htmlFor="completed" className="text-sm text-gray-700">
            Mark this task as completed
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save changes"}
          </button>

          <Link
            to="/tasks"
            className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}

export default EditTask;

