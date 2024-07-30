const express = require('express');
const router = express.Router();

const boards = [];
let boardId = 1;

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create a New Board
router.post('/', authenticateToken, (req, res) => {
  const { name, description } = req.body;
  const newBoard = { id: boardId++, name, description };
  boards.push(newBoard);
  res.status(201).json(newBoard);
});

// Retrieve All Boards
router.get('/', authenticateToken, (req, res) => {
  res.status(200).json(boards);
});

// Retrieve Board Details
router.get('/:id', authenticateToken, (req, res) => {
  const board = boards.find(b => b.id === parseInt(req.params.id));
  if (!board) return res.sendStatus(404);
  res.status(200).json(board);
});

// Update Board Details
router.put('/:id', authenticateToken, (req, res) => {
  const board = boards.find(b => b.id === parseInt(req.params.id));
  if (!board) return res.sendStatus(404);

  const { name, description } = req.body;
  board.name = name;
  board.description = description;
  res.status(200).json(board);
});

// Delete Board
router.delete('/:id', authenticateToken, (req, res) => {
  const boardIndex = boards.findIndex(b => b.id === parseInt(req.params.id));
  if (boardIndex === -1) return res.sendStatus(404);

  boards.splice(boardIndex, 1);
  res.sendStatus(204);
});

module.exports = router;
