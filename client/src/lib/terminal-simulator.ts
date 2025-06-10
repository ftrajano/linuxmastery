export class TerminalSimulator {
  private commands: Map<string, (args: string[]) => string>;
  private history: string[] = [];
  private currentDirectory = "/home/user";

  constructor() {
    this.commands = new Map();
    this.initializeCommands();
  }

  private initializeCommands() {
    // File navigation
    this.commands.set("ls", this.simulateLs.bind(this));
    this.commands.set("cd", this.simulateCd.bind(this));
    this.commands.set("pwd", () => this.currentDirectory);
    this.commands.set("touch", this.simulateTouch.bind(this));
    this.commands.set("mkdir", this.simulateMkdir.bind(this));
    
    // File operations
    this.commands.set("cp", this.simulateCp.bind(this));
    this.commands.set("mv", this.simulateMv.bind(this));
    this.commands.set("rm", this.simulateRm.bind(this));
    this.commands.set("find", this.simulateFind.bind(this));
    
    // Text processing
    this.commands.set("cat", this.simulateCat.bind(this));
    this.commands.set("less", this.simulateLess.bind(this));
    this.commands.set("head", this.simulateHead.bind(this));
    this.commands.set("tail", this.simulateTail.bind(this));
    this.commands.set("grep", this.simulateGrep.bind(this));
    this.commands.set("wc", this.simulateWc.bind(this));
    
    // System monitoring
    this.commands.set("top", this.simulateTop.bind(this));
    this.commands.set("ps", this.simulatePs.bind(this));
    this.commands.set("free", this.simulateFree.bind(this));
    this.commands.set("df", this.simulateDf.bind(this));
    
    // Process management
    this.commands.set("kill", this.simulateKill.bind(this));
    this.commands.set("systemctl", this.simulateSystemctl.bind(this));
    
    // Log analysis
    this.commands.set("journalctl", this.simulateJournalctl.bind(this));
    
    // Network and system info
    this.commands.set("ping", this.simulatePing.bind(this));
    this.commands.set("wget", this.simulateWget.bind(this));
    this.commands.set("curl", this.simulateCurl.bind(this));
    this.commands.set("uname", this.simulateUname.bind(this));
    
    // Utility
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
    if (args.includes("-la") || args.includes("-al")) {
      return `total 24
drwxr-xr-x 3 user user 4096 Jan 15 10:30 .
drwxr-xr-x 5 user user 4096 Jan 15 09:00 ..
-rw-r--r-- 1 user user  156 Jan 15 09:45 .bashrc
-rw-r--r-- 1 user user  220 Jan 15 09:45 .profile
drwxr-xr-x 3 user user 4096 Jan 15 10:30 Documents
drwxr-xr-x 2 user user 4096 Jan 15 10:25 Downloads
-rw-r--r-- 1 user user 1024 Jan 15 10:30 notes.txt
-rw-r--r-- 1 user user  512 Jan 15 10:15 config.txt`;
    }
    if (args.includes("-l")) {
      return `total 16
drwxr-xr-x 3 user user 4096 Jan 15 10:30 Documents
drwxr-xr-x 2 user user 4096 Jan 15 10:25 Downloads
-rw-r--r-- 1 user user 1024 Jan 15 10:30 notes.txt
-rw-r--r-- 1 user user  512 Jan 15 10:15 config.txt`;
    }
    return `Documents  Downloads  notes.txt  config.txt  readme.txt  backup`;
  }

  private simulateCd(args: string[]): string {
    if (args.length === 0) {
      this.currentDirectory = "/home/user";
      return "";
    }
    const target = args[0];
    if (target === "..") {
      const parts = this.currentDirectory.split("/");
      parts.pop();
      this.currentDirectory = parts.join("/") || "/";
    } else if (target === "~") {
      this.currentDirectory = "/home/user";
    } else {
      this.currentDirectory = `${this.currentDirectory}/${target}`.replace("//", "/");
    }
    return "";
  }

  private simulateTouch(args: string[]): string {
    if (args.length === 0) {
      throw new Error("touch: missing file operand");
    }
    return `Created file: ${args[0]}`;
  }

  private simulateMkdir(args: string[]): string {
    if (args.length === 0) {
      throw new Error("mkdir: missing operand");
    }
    return `Created directory: ${args[0]}`;
  }

  private simulateCp(args: string[]): string {
    if (args.length < 2) {
      throw new Error("cp: missing destination file operand");
    }
    return `Copied '${args[0]}' to '${args[1]}'`;
  }

  private simulateMv(args: string[]): string {
    if (args.length < 2) {
      throw new Error("mv: missing destination file operand");
    }
    return `Moved '${args[0]}' to '${args[1]}'`;
  }

  private simulateRm(args: string[]): string {
    if (args.length === 0) {
      throw new Error("rm: missing operand");
    }
    if (args.includes("-i")) {
      return `Remove '${args[args.length - 1]}'? (y/n) y\nRemoved '${args[args.length - 1]}'`;
    }
    return `Removed: ${args.join(", ")}`;
  }

  private simulateFind(args: string[]): string {
    if (args.length === 0) {
      return `./notes.txt\n./config.txt\n./Documents/project.txt\n./Downloads/file.txt`;
    }
    if (args.includes("-name") && args.includes("*.txt")) {
      return `./notes.txt\n./config.txt\n./Documents/project.txt\n./Downloads/readme.txt`;
    }
    return `./notes.txt\n./config.txt\n./backup\n./Documents`;
  }

  private simulateCat(args: string[]): string {
    if (args.length === 0) {
      throw new Error("cat: missing file operand");
    }
    return `2024-01-15 10:30:15 INFO: Application started
2024-01-15 10:31:20 ERROR: Database connection failed
2024-01-15 10:32:10 INFO: Retrying connection
2024-01-15 10:33:05 INFO: Connection successful`;
  }

  private simulateLess(args: string[]): string {
    if (args.length === 0) {
      throw new Error("less: missing file operand");
    }
    return `Viewing ${args[0]} (press q to quit)
Line 1 of file content...
Line 2 of file content...
(END)`;
  }

  private simulateHead(args: string[]): string {
    if (args.includes("-n") && args.length >= 3) {
      const lines = parseInt(args[1]);
      return `Showing first ${lines} lines of ${args[2]}:
2024-01-15 10:30:15 ERROR: Connection timeout
2024-01-15 10:31:20 ERROR: Invalid credentials
2024-01-15 10:32:10 ERROR: File not found
2024-01-15 10:33:05 ERROR: Permission denied
2024-01-15 10:34:00 ERROR: Disk full`.split('\n').slice(0, lines + 1).join('\n');
    }
    return `2024-01-15 10:30:15 ERROR: Connection timeout
2024-01-15 10:31:20 ERROR: Invalid credentials
2024-01-15 10:32:10 ERROR: File not found
2024-01-15 10:33:05 ERROR: Permission denied
2024-01-15 10:34:00 ERROR: Disk full
2024-01-15 10:35:15 ERROR: Service unavailable
2024-01-15 10:36:20 ERROR: Timeout occurred
2024-01-15 10:37:10 ERROR: Authentication failed
2024-01-15 10:38:05 ERROR: Resource not found
2024-01-15 10:39:00 ERROR: Operation failed`;
  }

  private simulateTail(args: string[]): string {
    if (args.includes("-f")) {
      return `Following ${args[args.length - 1]}...
2024-01-15 10:35:15 INFO: New log entry
2024-01-15 10:36:20 INFO: System running normally
(Ctrl+C to stop)`;
    }
    return `2024-01-15 10:35:15 INFO: Service started
2024-01-15 10:36:20 INFO: Processing request
2024-01-15 10:37:10 INFO: Task completed
2024-01-15 10:38:05 INFO: System status OK
2024-01-15 10:39:00 INFO: Backup finished
2024-01-15 10:40:15 INFO: Maintenance scheduled
2024-01-15 10:41:20 INFO: User session started
2024-01-15 10:42:10 INFO: Cache cleared
2024-01-15 10:43:05 INFO: Update installed
2024-01-15 10:44:00 INFO: System ready`;
  }

  private simulateWc(args: string[]): string {
    if (args.includes("-l")) {
      return `25 ${args[args.length - 1]}`;
    }
    return `25 150 1024 ${args[args.length - 1] || "file.txt"}`;
  }

  private simulatePs(args: string[]): string {
    if (args.includes("aux")) {
      return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  23456  1234 ?        Ss   10:00   0:01 /sbin/init
user      1234  2.5  1.2  45678  5678 pts/0    R+   10:30   0:05 node app.js
user      5678  1.8  0.8  34567  3456 pts/1    S    10:25   0:02 python script.py
mysql     9012  0.5  15.2 234567 23456 ?       Sl   09:00   0:45 mysqld`;
    }
    return `  PID TTY          TIME CMD
 1234 pts/0    00:00:05 node
 5678 pts/1    00:00:02 python
 9012 ?        00:00:45 mysqld`;
  }

  private simulateFree(args: string[]): string {
    if (args.includes("-h")) {
      return `              total        used        free      shared  buff/cache   available
Mem:           7.7G        3.4G        1.2G        156M        3.2G        3.9G
Swap:          2.0G          0B        2.0G`;
    }
    return `              total        used        free      shared  buff/cache   available
Mem:        7852100     3476500     1234500      159800     3160900     3976400
Swap:       2097152           0     2097152`;
  }

  private simulateDf(args: string[]): string {
    if (args.includes("-h")) {
      return `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G   15G  4.2G  79% /
/dev/sda2       100G   45G   50G  48% /home
tmpfs           3.9G     0  3.9G   0% /dev/shm`;
    }
    return `Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda1       20971520 15728640   4194304  79% /
/dev/sda2      104857600 47185920  52428800  48% /home
tmpfs            3926400        0   3926400   0% /dev/shm`;
  }

  private simulateKill(args: string[]): string {
    if (args.length === 0) {
      throw new Error("kill: missing process ID");
    }
    return `Terminated process ${args[0]}`;
  }

  private simulatePing(args: string[]): string {
    if (args.length === 0) {
      throw new Error("ping: missing destination host");
    }
    return `PING ${args[0]} (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=119 time=15.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=119 time=14.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=119 time=15.1 ms
--- ${args[0]} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss`;
  }

  private simulateWget(args: string[]): string {
    if (args.length === 0) {
      throw new Error("wget: missing URL");
    }
    return `--2024-01-15 10:30:15--  ${args[args.length - 1]}
Resolving example.com... 93.184.216.34
Connecting to example.com|93.184.216.34|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1024 (1.0K) [text/plain]
Saving to: 'file.txt'

file.txt       100%[============>]   1.00K  --.-KB/s    in 0s

2024-01-15 10:30:15 (15.2 MB/s) - 'file.txt' saved [1024/1024]`;
  }

  private simulateCurl(args: string[]): string {
    if (args.length === 0) {
      throw new Error("curl: no URL specified!");
    }
    return `{"status": "ok", "message": "API is responding", "timestamp": "2024-01-15T10:30:15Z"}`;
  }

  private simulateUname(args: string[]): string {
    if (args.includes("-a")) {
      return `Linux server 5.4.0-74-generic #83-Ubuntu SMP Sat May 8 02:35:39 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux`;
    }
    if (args.includes("-r")) {
      return `5.4.0-74-generic`;
    }
    return `Linux`;
  }

  private showHelp(): string {
    return `Available commands:
File Navigation:
  ls           - List directory contents
  cd           - Change directory
  pwd          - Print working directory
  touch        - Create empty files
  mkdir        - Create directories

File Operations:
  cp           - Copy files/directories
  mv           - Move/rename files
  rm           - Remove files/directories
  find         - Search for files

Text Processing:
  cat          - Display file contents
  less         - View files page by page
  head         - Show file beginning
  tail         - Show file end
  grep         - Search text patterns
  wc           - Count words/lines

System Monitoring:
  top          - Display running processes
  ps           - List processes
  free         - Show memory usage
  df           - Show disk space

Process Management:
  kill         - Terminate processes
  systemctl    - Control system services

Log Analysis:
  journalctl   - Query system logs

Network & System:
  ping         - Test network connectivity
  wget         - Download files
  curl         - Transfer data
  uname        - System information

Utility:
  clear        - Clear terminal
  help         - Show this help`;
  }

  getHistory(): string[] {
    return [...this.history];
  }
}
