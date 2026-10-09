import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate= useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ title, description })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    navigate('/tasks');
    
    const responseData = await response.json();
    console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded border p-2"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="mb-1 block">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded border p-2"
            rows="4"
            placeholder="Enter task description"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default NewTask;