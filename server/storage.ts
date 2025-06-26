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
    this.initializeUsers();
  }

  private initializeLessons() {
    const sampleLessons: InsertLesson[] = [
      // Chapter 1: File Navigation Essentials (Beginner)
      {
        title: "List Directory Contents with ls",
        description: "Learn to view files and directories using ls command",
        command: "ls",
        chapter: 1,
        order: 1,
        content: {
          scenario: "You need to see what files are in the current directory. List all files including hidden ones.",
          mockOutput: `total 24
drwxr-xr-x 3 user user 4096 Jan 15 10:30 Documents
drwxr-xr-x 2 user user 4096 Jan 15 10:25 Downloads
-rw-r--r-- 1 user user  156 Jan 15 09:45 .bashrc
-rw-r--r-- 1 user user  220 Jan 15 09:45 .profile
-rw-r--r-- 1 user user 1024 Jan 15 10:30 notes.txt`,
          expectedCommand: "ls -la",
          hint: "Use ls with the -a flag to show all files (including hidden) and -l for detailed format"
        },
        isActive: true
      },
      {
        title: "Navigate Directories with cd",
        description: "Change directories and navigate the filesystem",
        command: "cd",
        chapter: 1,
        order: 2,
        content: {
          scenario: "Navigate to the Documents directory from your current location.",
          expectedCommand: "cd Documents",
          hint: "Use cd followed by the directory name"
        },
        isActive: true
      },
      {
        title: "Show Current Directory with pwd",
        description: "Display the full path of your current directory",
        command: "pwd",
        chapter: 1,
        order: 3,
        content: {
          scenario: "You're lost in the filesystem. Show your current location.",
          mockOutput: `/home/user/Documents/projects`,
          expectedCommand: "pwd",
          hint: "Use pwd to print the working directory path"
        },
        isActive: true
      },
      {
        title: "Create Files with touch",
        description: "Create new empty files quickly",
        command: "touch",
        chapter: 1,
        order: 4,
        content: {
          scenario: "Create a new empty file called 'readme.txt' in the current directory.",
          expectedCommand: "touch readme.txt",
          hint: "Use touch followed by the filename you want to create"
        },
        isActive: true
      },
      {
        title: "Create Directories with mkdir",
        description: "Make new directories in the filesystem",
        command: "mkdir",
        chapter: 1,
        order: 5,
        content: {
          scenario: "Create a new directory called 'backup' to store your files.",
          expectedCommand: "mkdir backup",
          hint: "Use mkdir followed by the directory name"
        },
        isActive: true
      },

      // Chapter 2: File Operations (Beginner-Intermediate)
      {
        title: "Copy Files with cp",
        description: "Duplicate files and directories",
        command: "cp",
        chapter: 2,
        order: 1,
        content: {
          scenario: "Copy the file 'config.txt' to 'config_backup.txt' for safekeeping.",
          expectedCommand: "cp config.txt config_backup.txt",
          hint: "Use cp source_file destination_file"
        },
        isActive: true
      },
      {
        title: "Move and Rename with mv",
        description: "Move files between directories or rename them",
        command: "mv",
        chapter: 2,
        order: 2,
        content: {
          scenario: "Rename the file 'old_name.txt' to 'new_name.txt'.",
          expectedCommand: "mv old_name.txt new_name.txt",
          hint: "Use mv old_filename new_filename to rename"
        },
        isActive: true
      },
      {
        title: "Remove Files with rm",
        description: "Delete files and directories safely",
        command: "rm",
        chapter: 2,
        order: 3,
        content: {
          scenario: "Delete the temporary file 'temp.txt' but ask for confirmation first.",
          expectedCommand: "rm -i temp.txt",
          hint: "Use rm -i to prompt for confirmation before deletion"
        },
        isActive: true
      },
      {
        title: "Find Files with find",
        description: "Search for files and directories by various criteria",
        command: "find",
        chapter: 2,
        order: 4,
        content: {
          scenario: "Find all .txt files in the current directory and subdirectories.",
          expectedCommand: "find . -name '*.txt'",
          hint: "Use find . -name with a pattern in quotes"
        },
        isActive: true
      },

      // Chapter 3: Text Processing (Intermediate)  
      {
        title: "View File Contents with cat",
        description: "Display the entire contents of text files",
        command: "cat",
        chapter: 3,
        order: 1,
        content: {
          scenario: "View the contents of the log file to see what happened.",
          mockOutput: `2024-01-15 10:30:15 INFO: Application started
2024-01-15 10:31:20 ERROR: Database connection failed
2024-01-15 10:32:10 INFO: Retrying connection
2024-01-15 10:33:05 INFO: Connection successful`,
          expectedCommand: "cat application.log",
          hint: "Use cat followed by the filename to display its contents"
        },
        isActive: true
      },
      {
        title: "Page Through Files with less",
        description: "View large files one page at a time",
        command: "less",
        chapter: 3,
        order: 2,
        content: {
          scenario: "The log file is very large. View it page by page.",
          expectedCommand: "less large_log.txt",
          hint: "Use less to view files page by page (press q to quit)"
        },
        isActive: true
      },
      {
        title: "Show File Beginning with head",
        description: "Display the first lines of a file",
        command: "head",
        chapter: 3,
        order: 3,
        content: {
          scenario: "Show only the first 5 lines of the error log to see recent entries.",
          mockOutput: `2024-01-15 10:30:15 ERROR: Connection timeout
2024-01-15 10:31:20 ERROR: Invalid credentials  
2024-01-15 10:32:10 ERROR: File not found
2024-01-15 10:33:05 ERROR: Permission denied
2024-01-15 10:34:00 ERROR: Disk full`,
          expectedCommand: "head -n 5 error.log",
          hint: "Use head -n followed by the number of lines"
        },
        isActive: true
      },
      {
        title: "Show File End with tail",
        description: "Display the last lines of a file",
        command: "tail",
        chapter: 3,
        order: 4,
        content: {
          scenario: "Monitor the last 10 lines of the system log in real-time.",
          expectedCommand: "tail -f system.log",
          hint: "Use tail -f to follow the file as it grows"
        },
        isActive: true
      },
      {
        title: "Search Text with grep",
        description: "Find specific patterns in files and output",
        command: "grep",
        chapter: 3,
        order: 5,
        content: {
          scenario: "Find all lines containing 'ERROR' in the application log.",
          mockOutput: `2024-01-15 10:30:15 INFO: Server started
2024-01-15 10:31:20 ERROR: Database connection failed
2024-01-15 10:32:10 INFO: Retrying connection
2024-01-15 10:33:05 ERROR: Authentication failed for user admin
2024-01-15 10:34:00 INFO: User login successful`,
          expectedCommand: "grep ERROR application.log",
          hint: "Use grep followed by the search pattern and filename"
        },
        isActive: true
      },
      {
        title: "Count Words with wc",
        description: "Count lines, words, and characters in files",
        command: "wc",
        chapter: 3,
        order: 6,
        content: {
          scenario: "Count how many lines are in the configuration file.",
          mockOutput: `25 150 1024 config.txt`,
          expectedCommand: "wc -l config.txt",
          hint: "Use wc -l to count only lines"
        },
        isActive: true
      },

      // Chapter 4: System Monitoring (Intermediate-Advanced)
      {
        title: "Monitor Processes with top",
        description: "View running processes and system resource usage",
        command: "top",
        chapter: 4,
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
          hint: "Look for the process with the highest %CPU value - enter just the PID number"
        },
        isActive: true
      },
      {
        title: "List Processes with ps",
        description: "Show detailed information about running processes",
        command: "ps",
        chapter: 4,
        order: 2,
        content: {
          scenario: "Show all processes running on the system with detailed information.",
          expectedCommand: "ps aux",
          hint: "Use ps aux to show all processes with detailed information"
        },
        isActive: true
      },
      {
        title: "Check Memory Usage with free",
        description: "Display memory usage information",
        command: "free",
        chapter: 4,
        order: 3,
        content: {
          scenario: "Check how much memory is available in human-readable format.",
          mockOutput: `              total        used        free      shared  buff/cache   available
Mem:           7.7G        3.4G        1.2G        156M        3.2G        3.9G
Swap:          2.0G          0B        2.0G`,
          expectedCommand: "free -h",
          hint: "Use free -h for human-readable output"
        },
        isActive: true
      },
      {
        title: "Check Disk Space with df",
        description: "Display filesystem disk space usage",
        command: "df",
        chapter: 4,
        order: 4,
        content: {
          scenario: "Check disk space usage for all mounted filesystems in readable format.",
          mockOutput: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   15G  4.2G  79% /
/dev/sda2       100G   45G   50G  48% /home`,
          expectedCommand: "df -h",
          hint: "Use df -h to show disk usage in human-readable format"
        },
        isActive: true
      },

      // Chapter 5: Process and Service Management (Advanced)
      {
        title: "Terminate Processes with kill",
        description: "Stop processes by their process ID",
        command: "kill",
        chapter: 5,
        order: 1,
        content: {
          scenario: "A process with PID 1234 is consuming too much CPU. Terminate it gracefully.",
          expectedCommand: "kill 1234",
          hint: "Use kill followed by the process ID number"
        },
        isActive: true
      },
      {
        title: "Service Status with systemctl",
        description: "Check and control system services",
        command: "systemctl",
        chapter: 5,
        order: 2,
        content: {
          scenario: "Check the current status of the nginx web server service.",
          mockOutput: `● nginx.service - A high performance web server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2024-01-15 10:30:15 UTC; 2h 15min ago
     Docs: man:nginx(8)
 Main PID: 1234 (nginx)
    Tasks: 3 (limit: 4915)
   Memory: 15.2M`,
          expectedCommand: "systemctl status nginx",
          hint: "Use systemctl status followed by the service name"
        },
        isActive: true
      },
      {
        title: "Restart Services with systemctl",
        description: "Restart system services",
        command: "systemctl",
        chapter: 5,
        order: 3,
        content: {
          scenario: "The apache2 service needs to be restarted to apply configuration changes.",
          expectedCommand: "systemctl restart apache2",
          hint: "Use systemctl restart followed by the service name"
        },
        isActive: true
      },

      // Chapter 6: Log Analysis (Advanced)
      {
        title: "View System Logs with journalctl",
        description: "Query and analyze system logs using journalctl",
        command: "journalctl",
        chapter: 6,
        order: 1,
        content: {
          scenario: "Check the system logs for the last hour to troubleshoot recent issues.",
          expectedCommand: "journalctl --since '1 hour ago'",
          hint: "Use journalctl --since with a time specification"
        },
        isActive: true
      },
      {
        title: "Filter Service Logs with journalctl",
        description: "View logs for specific services",
        command: "journalctl",
        chapter: 6,
        order: 2,
        content: {
          scenario: "View only the logs for the nginx service to debug web server issues.",
          expectedCommand: "journalctl -u nginx",
          hint: "Use journalctl -u followed by the service name"
        },
        isActive: true
      },
      {
        title: "Follow Live Logs with journalctl",
        description: "Monitor logs in real-time",
        command: "journalctl",
        chapter: 6,
        order: 3,
        content: {
          scenario: "Monitor the system logs in real-time to watch for new events.",
          expectedCommand: "journalctl -f",
          hint: "Use journalctl -f to follow logs in real-time"
        },
        isActive: true
      },

      // Chapter 7: Network and System Information (Advanced)
      {
        title: "Test Network Connectivity with ping",
        description: "Check if a remote host is reachable",
        command: "ping",
        chapter: 7,
        order: 1,
        content: {
          scenario: "Test if you can reach Google's DNS server to check internet connectivity.",
          expectedCommand: "ping 8.8.8.8",
          hint: "Use ping followed by an IP address or hostname"
        },
        isActive: true
      },
      {
        title: "Download Files with wget",
        description: "Download files from the internet",
        command: "wget",
        chapter: 7,
        order: 2,
        content: {
          scenario: "Download a file from a web server and save it locally.",
          expectedCommand: "wget https://example.com/file.txt",
          hint: "Use wget followed by the URL"
        },
        isActive: true
      },
      {
        title: "Transfer Data with curl",
        description: "Make HTTP requests and transfer data",
        command: "curl",
        chapter: 7,
        order: 3,
        content: {
          scenario: "Make a GET request to check if a web API is responding.",
          expectedCommand: "curl https://api.example.com/status",
          hint: "Use curl followed by the URL to make a GET request"
        },
        isActive: true
      },
      {
        title: "Show System Information with uname",
        description: "Display system and kernel information",
        command: "uname",
        chapter: 7,
        order: 4,
        content: {
          scenario: "Show all available system information including kernel version.",
          mockOutput: `Linux server 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux`,
          expectedCommand: "uname -a",
          hint: "Use uname -a to show all system information"
        },
        isActive: true
      }
    ];

    sampleLessons.forEach(lesson => {
      this.createLesson(lesson);
    });
  }

  private initializeUsers() {
    // Create default users that persist in memory
    const defaultUsers = [
      { username: "admin", email: "admin@test.com", password: "123456" },
      { username: "demo", email: "demo@test.com", password: "demo123" },
      { username: "user", email: "user@test.com", password: "password" }
    ];

    defaultUsers.forEach(userData => {
      this.createUser(userData);
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
    const lesson: Lesson = { 
      ...insertLesson, 
      id,
      isActive: insertLesson.isActive ?? true
    };
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
        completed: insertProgress.completed ?? existing.completed,
        attempts: insertProgress.attempts ?? existing.attempts,
        bestTime: insertProgress.bestTime ?? existing.bestTime,
        bestCommands: insertProgress.bestCommands ?? existing.bestCommands,
        totalTime: insertProgress.totalTime ?? existing.totalTime,
        totalCommands: insertProgress.totalCommands ?? existing.totalCommands,
        lastAttempt: new Date()
      };
      this.userProgress.set(key, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const progress: UserProgress = {
        ...insertProgress,
        id,
        completed: insertProgress.completed ?? false,
        attempts: insertProgress.attempts ?? 0,
        bestTime: insertProgress.bestTime ?? null,
        bestCommands: insertProgress.bestCommands ?? null,
        totalTime: insertProgress.totalTime ?? 0,
        totalCommands: insertProgress.totalCommands ?? 0,
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
      const stats: UserStats = { 
        ...insertStats, 
        id,
        totalLessonsCompleted: insertStats.totalLessonsCompleted ?? 0,
        totalTime: insertStats.totalTime ?? 0,
        totalCommands: insertStats.totalCommands ?? 0,
        fastestTime: insertStats.fastestTime ?? null,
        fewestCommands: insertStats.fewestCommands ?? null,
        topProgress: insertStats.topProgress ?? 0,
        grepProgress: insertStats.grepProgress ?? 0,
        journalctlProgress: insertStats.journalctlProgress ?? 0,
        systemctlProgress: insertStats.systemctlProgress ?? 0
      };
      this.userStats.set(insertStats.userId, stats);
      return stats;
    }
  }
}

export const storage = new MemStorage();
