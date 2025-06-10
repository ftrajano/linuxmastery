import { 
  users, lessons, userProgress, userStats,
  type User, type InsertUser,
  type Lesson, type InsertLesson,
  type UserProgress, type InsertUserProgress,
  type UserStats, type InsertUserStats
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Lessons
  getAllLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonsByCommand(command: string): Promise<Lesson[]>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // User Progress
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined>;
  createOrUpdateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;

  // User Stats
  getUserStats(userId: number): Promise<UserStats | undefined>;
  createOrUpdateUserStats(stats: InsertUserStats): Promise<UserStats>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lessons: Map<number, Lesson>;
  private userProgress: Map<string, UserProgress>;
  private userStats: Map<number, UserStats>;
  private currentUserId: number;
  private currentLessonId: number;
  private currentProgressId: number;
  private currentStatsId: number;

  constructor() {
    this.users = new Map();
    this.lessons = new Map();
    this.userProgress = new Map();
    this.userStats = new Map();
    this.currentUserId = 1;
    this.currentLessonId = 1;
    this.currentProgressId = 1;
    this.currentStatsId = 1;
    
    this.initializeLessons();
  }

  private initializeLessons() {
    const sampleLessons: InsertLesson[] = [
      {
        title: "Process Monitoring with top",
        description: "Learn to monitor system processes and identify resource usage",
        command: "top",
        chapter: 1,
        order: 1,
        content: {
          scenario: "Your server is running slowly. Use top to identify the process using the most CPU.",
          mockOutput: `Tasks: 147 total,   2 running, 145 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.3 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   7852.1 total,   1234.5 free,   3456.7 used,   3160.9 buff/cache

  PID USER      %CPU %MEM COMMAND
 1234 root      25.3 12.1 node
 5678 user       8.7  5.2 chrome
 9012 mysql      3.1 15.8 mysqld`,
          expectedAnswer: "1234",
          hint: "Look for the process with the highest %CPU value"
        },
        isActive: true
      },
      {
        title: "Finding Text with grep",
        description: "Search for specific patterns in files and output",
        command: "grep",
        chapter: 2,
        order: 1,
        content: {
          scenario: "Find all error messages in the log file",
          mockOutput: `2024-01-15 10:30:15 INFO: Server started
2024-01-15 10:31:20 ERROR: Database connection failed
2024-01-15 10:32:10 INFO: Retrying connection
2024-01-15 10:33:05 ERROR: Authentication failed for user admin
2024-01-15 10:34:00 INFO: User login successful`,
          expectedCommand: "grep ERROR",
          hint: "Use grep to filter lines containing 'ERROR'"
        },
        isActive: true
      },
      {
        title: "System Logs with journalctl",
        description: "Query and analyze system logs using journalctl",
        command: "journalctl",
        chapter: 3,
        order: 1,
        content: {
          scenario: "Check the system logs for the last hour",
          expectedCommand: "journalctl --since '1 hour ago'",
          hint: "Use the --since flag with a time specification"
        },
        isActive: true
      },
      {
        title: "Service Management with systemctl",
        description: "Control system services using systemctl",
        command: "systemctl",
        chapter: 4,
        order: 1,
        content: {
          scenario: "Check the status of the nginx service",
          expectedCommand: "systemctl status nginx",
          hint: "Use the status subcommand with the service name"
        },
        isActive: true
      }
    ];

    sampleLessons.forEach(lesson => {
      this.createLesson(lesson);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    
    // Initialize user stats
    await this.createOrUpdateUserStats({ userId: id });
    
    return user;
  }

  async getAllLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(lesson => lesson.isActive);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getLessonsByCommand(command: string): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(
      lesson => lesson.command === command && lesson.isActive
    );
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentLessonId++;
    const lesson: Lesson = { ...insertLesson, id };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(
      progress => progress.userId === userId
    );
  }

  async getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined> {
    const key = `${userId}-${lessonId}`;
    return this.userProgress.get(key);
  }

  async createOrUpdateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const key = `${insertProgress.userId}-${insertProgress.lessonId}`;
    const existing = this.userProgress.get(key);
    
    if (existing) {
      const updated: UserProgress = {
        ...existing,
        ...insertProgress,
        lastAttempt: new Date()
      };
      this.userProgress.set(key, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const progress: UserProgress = {
        ...insertProgress,
        id,
        lastAttempt: new Date()
      };
      this.userProgress.set(key, progress);
      return progress;
    }
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return this.userStats.get(userId);
  }

  async createOrUpdateUserStats(insertStats: InsertUserStats): Promise<UserStats> {
    const existing = this.userStats.get(insertStats.userId);
    
    if (existing) {
      const updated: UserStats = { ...existing, ...insertStats };
      this.userStats.set(insertStats.userId, updated);
      return updated;
    } else {
      const id = this.currentStatsId++;
      const stats: UserStats = { ...insertStats, id };
      this.userStats.set(insertStats.userId, stats);
      return stats;
    }
  }
}

export const storage = new MemStorage();
