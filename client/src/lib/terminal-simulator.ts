export class TerminalSimulator {
  private commands: Map<string, (args: string[]) => string>;
  private history: string[] = [];
  private currentDirectory = "/home/user";

  constructor() {
    this.commands = new Map();
    this.initializeCommands();
  }

  private initializeCommands() {
    this.commands.set("top", this.simulateTop.bind(this));
    this.commands.set("grep", this.simulateGrep.bind(this));
    this.commands.set("journalctl", this.simulateJournalctl.bind(this));
    this.commands.set("systemctl", this.simulateSystemctl.bind(this));
    this.commands.set("ls", this.simulateLs.bind(this));
    this.commands.set("pwd", () => this.currentDirectory);
    this.commands.set("clear", () => "");
    this.commands.set("help", this.showHelp.bind(this));
  }

  executeCommand(commandLine: string): { output: string; isValid: boolean } {
    const parts = commandLine.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    this.history.push(commandLine);

    if (this.commands.has(command)) {
      try {
        const output = this.commands.get(command)!(args);
        return { output, isValid: true };
      } catch (error) {
        return { output: `Error: ${error}`, isValid: false };
      }
    } else {
      return { 
        output: `Command '${command}' not found. Type 'help' for available commands.`, 
        isValid: false 
      };
    }
  }

  private simulateTop(args: string[]): string {
    return `Tasks: 147 total,   2 running, 145 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.3 id,  0.2 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   7852.1 total,   1234.5 free,   3456.7 used,   3160.9 buff/cache

  PID USER      %CPU %MEM COMMAND
 1234 root      25.3 12.1 node
 5678 user       8.7  5.2 chrome
 9012 mysql      3.1 15.8 mysqld
 3456 www       2.1  3.4 nginx
 7890 user       1.8  2.1 firefox`;
  }

  private simulateGrep(args: string[]): string {
    if (args.length === 0) {
      throw new Error("grep: missing search pattern");
    }

    const pattern = args[0];
    const sampleLog = `2024-01-15 10:30:15 INFO: Server started
2024-01-15 10:31:20 ERROR: Database connection failed
2024-01-15 10:32:10 INFO: Retrying connection
2024-01-15 10:33:05 ERROR: Authentication failed for user admin
2024-01-15 10:34:00 INFO: User login successful
2024-01-15 10:35:12 DEBUG: Processing user request
2024-01-15 10:36:45 ERROR: File not found: /tmp/data.txt`;

    return sampleLog
      .split('\n')
      .filter(line => line.includes(pattern))
      .join('\n');
  }

  private simulateJournalctl(args: string[]): string {
    const baseLog = `Jan 15 10:30:15 server systemd[1]: Started User Login Management.
Jan 15 10:31:20 server nginx[1234]: Server started on port 80
Jan 15 10:32:10 server mysql[5678]: Database connection established
Jan 15 10:33:05 server sshd[9012]: Failed password for user from 192.168.1.100
Jan 15 10:34:00 server systemd[1]: Started Network Time Synchronization.`;

    if (args.includes("--since")) {
      return `Jan 15 10:33:05 server sshd[9012]: Failed password for user from 192.168.1.100
Jan 15 10:34:00 server systemd[1]: Started Network Time Synchronization.`;
    }

    return baseLog;
  }

  private simulateSystemctl(args: string[]): string {
    if (args.length === 0) {
      throw new Error("systemctl: missing command");
    }

    const subcommand = args[0];
    const service = args[1] || "unknown";

    switch (subcommand) {
      case "status":
        return `● ${service}.service - ${service} service
   Loaded: loaded (/etc/systemd/system/${service}.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2024-01-15 10:30:15 UTC; 2h 15min ago
     Docs: man:${service}(8)
 Main PID: 1234 (${service})
    Tasks: 3 (limit: 4915)
   Memory: 15.2M
   CGroup: /system.slice/${service}.service
           └─1234 /usr/sbin/${service}`;
      
      case "start":
        return `Started ${service}.service.`;
      
      case "stop":
        return `Stopped ${service}.service.`;
      
      case "restart":
        return `Restarted ${service}.service.`;
      
      default:
        throw new Error(`Unknown systemctl command: ${subcommand}`);
    }
  }

  private simulateLs(args: string[]): string {
    return `Desktop    Documents  Downloads  Music  Pictures  Public  Templates  Videos
app.log    config.txt server.py  data.json  backup.tar.gz`;
  }

  private showHelp(): string {
    return `Available commands:
  top          - Display running processes
  grep         - Search text patterns
  journalctl   - Query system logs  
  systemctl    - Control system services
  ls           - List directory contents
  pwd          - Print working directory
  clear        - Clear terminal
  help         - Show this help`;
  }

  getHistory(): string[] {
    return [...this.history];
  }
}
