const router = require('express').Router();
const { Task } = require('../models');

// Login Page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('register');
});

// Dashboard (Requires Login)
router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect('/login');
  }

  try {
    const taskData = await Task.findAll({
      where: { user_id: req.session.user_id },
      order: [['due_date', 'ASC']],
      raw: true
    });

    res.render('dashboard', {
      tasks: taskData,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Redirect Root to Dashboard or Login
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

module.exports = router;
