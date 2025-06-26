import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertUserProgressSchema, insertUserStatsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all lessons
  app.get("/api/lessons", async (req, res) => {
    try {
      const lessons = await storage.getAllLessons();
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  // Get lessons by command
  app.get("/api/lessons/command/:command", async (req, res) => {
    try {
      const { command } = req.params;
      const lessons = await storage.getLessonsByCommand(command);
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lessons for command" });
    }
  });

  // Get specific lesson
  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lesson = await storage.getLesson(id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  // Create user (simple registration)
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingByUsername = await storage.getUserByUsername(userData.username);
      if (existingByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingByEmail = await storage.getUserByEmail(userData.email);
      if (existingByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create user" });
    }
  });

  // Get user progress
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Update user progress
  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId
      });
      
      const progress = await storage.createOrUpdateUserProgress(progressData);
      
      // Update user stats
      const currentStats = await storage.getUserStats(userId);
      if (currentStats) {
        const updatedStats = {
          ...currentStats,
          totalTime: currentStats.totalTime + (progressData.totalTime || 0),
          totalCommands: currentStats.totalCommands + (progressData.totalCommands || 0),
          fastestTime: currentStats.fastestTime ? 
            Math.min(currentStats.fastestTime, progressData.bestTime || Infinity) : 
            progressData.bestTime,
          fewestCommands: currentStats.fewestCommands ? 
            Math.min(currentStats.fewestCommands, progressData.bestCommands || Infinity) : 
            progressData.bestCommands,
        };
        
        if (progressData.completed) {
          updatedStats.totalLessonsCompleted += 1;
        }
        
        await storage.createOrUpdateUserStats(updatedStats);
      }
      
      res.json(progress);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to update progress" });
    }
  });

  // Get user stats
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const stats = await storage.getUserStats(userId);
      if (!stats) {
        return res.status(404).json({ message: "User stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Simple login endpoint
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        id: user.id, 
        username: user.username, 
        email: user.email 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Validate command for a lesson
  app.post("/api/lessons/:lessonId/validate", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const { command, userId } = req.body;
      
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      const content = lesson.content as any;
      let isCorrect = false;
      let feedback = "";
      
      // Simple validation logic
      if (content.expectedAnswer) {
        isCorrect = command.trim() === content.expectedAnswer;
        feedback = isCorrect ? "Correct!" : "Try again. " + (content.hint || "");
      } else if (content.expectedCommand) {
        isCorrect = command.trim().toLowerCase().includes(content.expectedCommand.toLowerCase());
        feedback = isCorrect ? "Correct!" : "Try again. " + (content.hint || "");
      }
      
      res.json({ isCorrect, feedback });
    } catch (error) {
      res.status(500).json({ message: "Failed to validate command" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
