import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create the task. Please try again.");
      }

      await response.json();
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
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
          Create a task
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Add something you want to get done. You can edit the details later.
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
            className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            placeholder="e.g. Finish project documentation"
            maxLength={255}
            required
          />

          <p className="mt-2 text-xs text-gray-400">
            Keep it short and clear.
          </p>
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
            className="w-full resize-y rounded-md border border-gray-300 px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            rows={5}
            placeholder="Add any details that will help you complete this task..."
          />
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
            {submitting ? "Creating..." : "Create task"}
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

export default NewTask;
