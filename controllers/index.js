const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const homeRoutes = require('./homeRoutes');
const taskRoutes = require('./api/taskRoutes');
router.use('/api/tasks', taskRoutes);


router.use('/', homeRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
