const router = require('express').Router();

const userRoutes = require('./user-routes');
const congressRoutes = require('./congress-routes');

router.use('/users', userRoutes);
router.use('/congress', congressRoutes);

module.exports = router;
