const db = require("../config/db");

const Task = {
  getByUserId: (userId, callback) => {
    db.query(
      "SELECT * FROM tasks WHERE user_id = ?",
      [userId],
      callback
    );
  },

  create: (task, callback) => {
    db.query(
      "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
      [task.title, task.user_id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(
      "DELETE FROM tasks WHERE id = ?",
      [id],
      callback
    );
  }
};

module.exports = Task;
