const userController = require('../controllers');

export function routes(app) {
  userController(app);
}
