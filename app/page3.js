// File: app/page.jsx
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  // // Async function to fetch tasks
  // async function fetchTasks() {
  //   try {
  //     const res = await fetch("/api/tasks");
  //     const data = await res.json();
  //     setTasks(data);
  //   } catch (err) {
  //     console.error("Error fetching tasks:", err);
  //   }
  // }

  // Load tasks from localStorage or API on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      fetchTasks();
    }
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task using async/await
  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim() || !description.trim()) return;
    const newTask = { id: Date.now(), text: task, description: description, completed: false };

    // Update state immediately
    setTasks([...tasks, newTask]);
    setTask("");
    setDescription('')

    // Send the new task to the API
    // try {
    //   await fetch("/api/tasks", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(newTask),
    //   });
    // } catch (err) {
    //   console.error("Error adding task:", err);
    // }
  };

  // Delete a task by id using async/await
  const deleteTask =  (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);

    // try {  
    //   await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    // } catch (err) {
    //   console.error("Error deleting task:", err);
    // }
  };

  // Toggle the completed status of a task using async/await
  const toggleTask =  (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);

    const toggledTask = updatedTasks.find((t) => t.id === id);
    // try {
    //   await fetch("/api/tasks", {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(toggledTask),
    //   });
    // } catch (err) {
    //   console.error("Error toggling task:", err);
    // }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
      <form onSubmit={addTask} className="flex mb-6">
        <div className="gap-10">

        <input
          type="text"
          placeholder="Title"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 border focus border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <input
          type="text"
          placeholder="Descripti"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
          Add Task
        </button>
          </div>
      </form>
      <ul className="space-y-4">
        {tasks.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between p-4 border rounded hover:shadow-md"
          >
           <div className="box">
           <span
              className={`flex-1 cursor-pointer ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >

              {t.text}
            </span>
          

            <span
              className={`flex-1 block cursor-pointer ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >

              {t.description}
            </span>
           </div>
              <button className= {`ml-auto border rounded-2xl px-4 py-2 ${t.completed ? 'bg-red-500' : 'bg-blue-500'}`}
              onClick={()=>toggleTask(t.id)}>{}
                Mark as {t.completed ? "Incomplete" : "Complete"} 
              </button>

            <button
              onClick={() => deleteTask(t.id)}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
             Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
