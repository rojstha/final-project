const router = require('express').Router();
const { Task } = require('../../models');

// Create Task
router.post('/', async (req, res) => {
  try {
    if (!req.session.user_id) return res.status(401).json({ message: 'Login required' });

    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      due_date: req.body.due_date,
      user_id: req.session.user_id
    });

    res.status(200).json(newTask);
  } catch (err) {
    console.error('❌ Error creating task:', err);
    res.status(500).json(err);
  }
});

// Update Task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!task[0]) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task updated' });
  } catch (err) {
    console.error('❌ Error updating task:', err);
    res.status(500).json(err);
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('❌ Error deleting task:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
