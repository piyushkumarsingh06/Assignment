const db = require("../config/db");

// ================= GET TASKS =================
exports.getTasks = (req, res) => {
  const userId = req.user.id; // 🔥 YAHI MAIN FIX

  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("GET TASK ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.status(200).json(result);
    }
  );
};

// ================= CREATE TASK =================
exports.createTask = (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  db.query(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [title, userId],
    (err, result) => {
      if (err) {
        console.error("CREATE TASK ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.status(201).json({ message: "Task created" });
    }
  );
};

// ================= DELETE TASK =================
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId],
    (err, result) => {
      if (err) {
        console.error("DELETE TASK ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.json({ message: "Task deleted" });
    }
  );
};


// ================= UPDATE TASK =================
exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  db.query(
    "UPDATE tasks SET title = ? WHERE id = ? AND user_id = ?",
    [title, taskId, userId],
    (err, result) => {
      if (err) {
        console.error("UPDATE TASK ERROR:", err);
        return res.status(500).json({ message: "DB error" });
      }
      res.json({ message: "Task updated" });
    }
  );
};