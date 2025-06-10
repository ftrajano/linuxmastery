import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  command: text("command").notNull(), // ls, cd, pwd, touch, mkdir, cp, mv, rm, find, cat, less, head, tail, grep, wc, top, ps, free, df, kill, systemctl, journalctl, ping, wget, curl, uname
  chapter: integer("chapter").notNull(),
  order: integer("order").notNull(),
  content: jsonb("content").notNull(), // lesson content, scenarios, expected answers
  isActive: boolean("is_active").default(true).notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  completed: boolean("completed").default(false).notNull(),
  attempts: integer("attempts").default(0).notNull(),
  bestTime: integer("best_time"), // in milliseconds
  bestCommands: integer("best_commands"), // fewest commands used
  totalTime: integer("total_time").default(0).notNull(),
  totalCommands: integer("total_commands").default(0).notNull(),
  lastAttempt: timestamp("last_attempt").defaultNow().notNull(),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  totalLessonsCompleted: integer("total_lessons_completed").default(0).notNull(),
  totalTime: integer("total_time").default(0).notNull(),
  totalCommands: integer("total_commands").default(0).notNull(),
  fastestTime: integer("fastest_time"),
  fewestCommands: integer("fewest_commands"),
  topProgress: integer("top_progress").default(0).notNull(), // percentage
  grepProgress: integer("grep_progress").default(0).notNull(),
  journalctlProgress: integer("journalctl_progress").default(0).notNull(),
  systemctlProgress: integer("systemctl_progress").default(0).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAttempt: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
