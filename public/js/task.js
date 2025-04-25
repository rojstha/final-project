// Add new task (already handled earlier)
document.getElementById('task-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = e.target.title.value.trim();
    const description = e.target.description.value.trim();
    const due_date = e.target.due_date.value;
    const priority = e.target.priority.value;
  
    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description, due_date, priority }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (res.ok) {
      location.reload();
    } else {
      alert('Failed to add task');
    }
  });
  
  // Edit/update task
  document.querySelectorAll('.edit-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const taskId = form.closest('li').getAttribute('data-id');
      const title = form.title.value.trim();
      const description = form.description.value.trim();
      const due_date = form.due_date.value;
      const priority = form.priority.value;
      const status = form.status.checked ? 'completed' : 'pending';
  
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, due_date, priority, status }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (res.ok) {
        location.reload();
      } else {
        alert('Failed to update task');
      }
    });
  });
  
  // Delete task
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const taskEl = e.target.closest('li');
      const taskId = taskEl.getAttribute('data-id');
  
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        taskEl.remove();
      } else {
        alert('Failed to delete task');
      }
    });
  });
  