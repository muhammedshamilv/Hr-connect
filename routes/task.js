const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// POST /api/tasklogs
router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);
    const { title, description } = req.body;
    const currentDate = new Date();
    const taskLog = await prisma.taskLog.create({
      data: {
        userId,
        title,
        description,
        currentDate
      }
    });

    res.status(201).json(taskLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/tasklogs
router.get('/', async (req, res) => {
  try {
    const taskLogs = await prisma.taskLog.findMany();
    res.status(200).json(taskLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/tasklogs/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const taskLog = await prisma.taskLog.findUnique({
      where: { id: parseInt(id) }
    });

    if (!taskLog) {
      return res.status(404).json({ error: 'TaskLog not found.' });
    }

    res.status(200).json(taskLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT /api/tasklogs/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, description } = req.body;
    const updatedDate = new Date();
    const taskLog = await prisma.taskLog.update({
      where: { id: parseInt(id) },
      data: {
        userId,
        title,
        description,
        updatedDate
      }
    });

    res.status(200).json(taskLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// DELETE /api/tasklogs/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.taskLog.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
module.exports = router;
