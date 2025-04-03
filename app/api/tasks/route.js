// File: app/api/tasks/route.js

let tasks = []; // In-memory tasks array

// GET: Return all tasks
export async function GET() {
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST: Add a new task
export async function POST(request) {
  const newTask = await request.json();
  tasks.push(newTask);
  return new Response(JSON.stringify(newTask), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE: Delete a task by id (passed as query parameter)
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  tasks = tasks.filter((task) => task.id !== id);
  return new Response(
    JSON.stringify({ message: "Task deleted", id }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// PUT: Update a task (toggle completed status)
export async function PUT(request) {
  const updatedTask = await request.json();
  tasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
  return new Response(JSON.stringify(updatedTask), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
