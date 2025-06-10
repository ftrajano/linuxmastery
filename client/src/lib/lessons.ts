export interface LessonContent {
  scenario: string;
  mockOutput?: string;
  expectedAnswer?: string;
  expectedCommand?: string;
  hint: string;
}

export interface LessonData {
  id: number;
  title: string;
  description: string;
  command: "top" | "grep" | "journalctl" | "systemctl";
  chapter: number;
  order: number;
  content: LessonContent;
}

export const sampleLessons: LessonData[] = [
  {
    id: 1,
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
      hint: "Look for the process with the highest %CPU value. The answer should be the PID of that process."
    }
  },
  {
    id: 2,
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
    }
  }
];
