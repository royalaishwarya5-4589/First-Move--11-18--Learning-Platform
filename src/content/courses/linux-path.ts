import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const linuxPath: Path = {
  id: 'linux-security-mastery',
  slug: 'linux-security',
  title: 'Linux Systems & Security',
  subtitle: 'Master Linux CLI administration, POSIX permissions, process control, systemd, Bash automation, and system hardening.',
  description: 'Master enterprise Linux administration: terminal commands, file system hierarchy, POSIX permissions (chmod/chown), ACLs, systemd service management, Bash automation scripts, networking CLI, iptables/ufw firewalls, journalctl logs, and SELinux/AppArmor security hardening.',
  icon: '🐧',
  category: 'cs',
  categoryLabel: 'Computer Science',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'intermediate',
  estimatedHours: 45,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['linux-security'],
  projects: [
    {
      id: 'lin-proj-1',
      slug: 'linux-system-hardening-audit-script',
      title: 'Automated Linux Server Hardening Auditor',
      subtitle: 'Build a Bash automation script auditing file permissions, SSH configurations, open ports, and system users.',
      description: 'Engineer a standalone Bash server hardening auditor checking root SSH login settings, world-writable file permissions, SUID binaries, UFW firewall rules, and active system service states.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['Bash Automation Scripting', 'POSIX Permission Auditing', 'SUID File Inspection', 'Linux Security Auditing'],
      prerequisites: ['Linux Permissions & Shell Scripting'],
      learningObjectives: ['Audit file system permissions for SUID and world-writable bits.', 'Generate structured Linux security audit logs.'],
      starterCode: `#!/bin/bash\n# Linux Server Hardening Auditor\necho "Starting Linux Security Audit..."`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an automated Linux server security hardening audit script in Bash.',
      milestones: [
        { id: 'linm1', title: 'Milestone 1: Permission & SUID Binary Inspection', description: 'Write Bash logic identifying dangerous 777 permissions and root SUID binaries.', orderIndex: 1 },
        { id: 'linm2', title: 'Milestone 2: SSH & Firewall Audit Reporting', description: 'Inspect sshd_config settings and UFW firewall rules, reporting security gaps.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify correct detection of weak permissions, SSH security gaps, and clean log reporting.',
      pathSlug: 'linux-security'
    },
    {
      id: 'lin-proj-2',
      slug: 'linux-automated-server-monitoring-tool',
      title: 'Linux Resource & Process Monitoring Suite',
      subtitle: 'Build an automated process and system health monitor tracking CPU, memory, disk I/O, and systemd service health.',
      description: 'Architect a Linux monitoring daemon script polling system metrics from /proc, sending alert notifications on high CPU/RAM usage, and auto-restarting failed systemd services.',
      difficulty: 'advanced',
      estimatedHours: 7,
      skillsLearned: ['Systemd Service Management', 'Proc Filesystem Metrics', 'Cron Job Automation', 'Resource Alerting'],
      prerequisites: ['Process Management & Services'],
      learningObjectives: ['Read and parse system metrics from /proc virtual filesystem.', 'Manage systemd service restart lifecycle hooks.'],
      starterCode: `#!/bin/bash\n# Linux Server Monitoring Daemon\nCPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')`,
      projectInstructionsMarkdown: '### Project Overview\nBuild an automated system health monitoring daemon for Linux servers.',
      milestones: [
        { id: 'linm3', title: 'Milestone 1: CPU, RAM & Disk Metric Collector', description: 'Parse memory and CPU consumption from /proc/meminfo and top.', orderIndex: 1 },
        { id: 'linm4', title: 'Milestone 2: Systemd Service Auto-Recovery', description: 'Detect failed systemd services and issue automated systemctl restart commands.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass automated metric parsing tests, alert threshold triggers, and systemctl service recovery.',
      pathSlug: 'linux-security'
    }
  ],
  modules: [
    {
      id: 'lin-mod-1',
      slug: 'linux-foundations',
      title: 'Level 1: Linux CLI & File System Security',
      description: 'Master Linux terminal navigation, Filesystem Hierarchy Standard (FHS), POSIX permission bits (chmod/chown), and user management.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'lin-les-1',
          slug: 'linux-cli-navigation-files',
          title: 'Linux Terminal CLI, FHS Navigation & File Operations',
          description: 'Navigate the FHS directory tree (/etc, /var, /home, /usr), manage files with ls, cd, cp, mv, rm, and search with grep and find.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'linc1_1',
              title: 'Learning Objectives & Filesystem Hierarchy Standard',
              contentMarkdown: `### Learning Objectives
- Understand the Linux Filesystem Hierarchy Standard (FHS).
- Search and inspect files efficiently using \`grep\`, \`find\`, and \`awk\`.
- Pipe standard output (\`stdout\`) and errors (\`stderr\`) using I/O redirection (\`>\`, \`>>\`, \`2>\`, \`|\`).

---

### Filesystem Hierarchy Standard (FHS)
Linux organizes files in a unified tree starting at the root directory (\`/\`):
- \`/etc\`: System-wide configuration files (\`sshd_config\`, \`passwd\`).
- \`/var\`: Variable state data and log files (\`/var/log/syslog\`).
- \`/home\`: Personal user home directories.
- \`/bin\` / \`/sbin\`: Essential user and system binaries (\`ls\`, \`ip\`, \`systemctl\`).`
            }
          ],
          examples: [
            {
              id: 'linex1_1',
              title: 'Example 1: Advanced Grep & Find Pipelines',
              code: `# Search all log files in /var/log for "ERROR" and print matching lines
find /var/log -type f -name "*.log" -exec grep -Hn "ERROR" {} +`,
              explanation: 'Uses find to discover file paths matching *.log and executes grep to extract error lines with file name and line number.'
            }
          ],
          quiz: [
            {
              id: 'linq1_1',
              question: 'Which directory in the Linux FHS tree contains system-wide configuration files (e.g. sshd_config, passwd)?',
              options: ['/etc', '/var', '/usr', '/bin'],
              correctOptionIndex: 0,
              explanation: '/etc stores system-wide configuration files across Linux distributions.'
            }
          ],
          exercise: {
            id: 'linex-1',
            instructions: 'Write a bash command `find /var/log -name "*.log"` and match text.',
            initialCode: '# Bash command\n',
            solutionCode: 'find /var/log -name "*.log"',
            hints: ['Use find /var/log -name "*.log"'],
            validationType: 'text_match',
            testCases: [{ id: 'lintc1', description: 'Matches find command syntax', expectedOutput: 'find /var/log -name "*.log"' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'lin-les-2',
          slug: 'linux-posix-permissions',
          title: 'POSIX File Permissions (chmod, chown) & SUID Security',
          description: 'Master Read (4), Write (2), Execute (1) octal bits, user/group ownership (chown), and identify dangerous SUID root permission bits.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['lin-les-1'],
          concepts: [
            {
              id: 'linc2_1',
              title: 'POSIX Permission Matrix & Octal Notation',
              contentMarkdown: `### POSIX Permission Representation
Permissions apply to three scope tiers: **User (u)**, **Group (g)**, and **Others (o)**.

| Permission | Symbol | Octal Value | File Effect | Directory Effect |
| :--- | :--- | :--- | :--- | :--- |
| Read | \`r\` | 4 | Read contents | List files (\`ls\`) |
| Write | \`w\` | 2 | Modify file | Create/delete files |
| Execute | \`x\` | 1 | Run binary | Traverse (\`cd\`) |

\`chmod 755 script.sh\` grants Read/Write/Execute (\`7\`) to user, and Read/Execute (\`5\`) to group and others.`
            }
          ],
          examples: [
            {
              id: 'linex2_1',
              title: 'Example 1: Setting Permissions & Ownership',
              code: `# Grant user read/write, group read, others no permissions (640)
chmod 640 /etc/secure_app.conf

# Change owner to appuser and group to appgroup
chown appuser:appgroup /etc/secure_app.conf`,
              explanation: 'Restricts sensitive configuration access exclusively to the owning user and group.'
            }
          ],
          quiz: [
            {
              id: 'linq2_1',
              question: 'Which numeric octal permission code grants read/write/execute (rwx) to user, and read/execute (r-x) to group and others?',
              options: ['755', '644', '777', '700'],
              correctOptionIndex: 0,
              explanation: '755 corresponds to rwxr-xr-x (User: 4+2+1=7, Group: 4+1=5, Others: 4+1=5).'
            }
          ],
          exercise: {
            id: 'linex-2',
            instructions: 'Write command `chmod 755 script.sh` and match text.',
            initialCode: '# Chmod command\n',
            solutionCode: 'chmod 755 script.sh',
            hints: ['Use chmod 755 script.sh'],
            validationType: 'text_match',
            testCases: [{ id: 'lintc2', description: 'Matches chmod command', expectedOutput: 'chmod 755 script.sh' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'lin-mod-2',
      slug: 'linux-services-process-control',
      title: 'Level 2: Process Control, Systemd & Bash Automation',
      description: 'Inspect running processes (ps, top, htop), manage signals (SIGTERM, SIGKILL), configure systemd services, and write Bash scripts.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'lin-les-3',
          slug: 'linux-process-management-systemd',
          title: 'Process Management, OS Signals & Systemd Unit Services',
          description: 'Inspect processes with ps/top, kill processes with SIGKILL/SIGTERM, configure systemd unit files, and view journalctl logs.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['lin-les-2'],
          concepts: [
            {
              id: 'linc3_1',
              title: 'Process Control & Systemd Service Management',
              contentMarkdown: `### Linux Process Signals & Systemd
- **SIGTERM (15)**: Graceful process termination signal allowing cleanup.
- **SIGKILL (9)**: Immediate forced process termination by kernel.
- **systemctl**: Systemd management utility controlling daemon units (\`systemctl start/stop/restart/status app.service\`).`
            }
          ],
          examples: [
            {
              id: 'linex3_1',
              title: 'Example 1: Systemd Service Unit File',
              code: `# /etc/systemd/system/myapp.service
[Unit]
Description=Node.js Application API
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/myapp/server.js
Restart=always
User=www-data
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`,
              explanation: 'Configures background daemon management with automatic service restart on failure.'
            }
          ],
          quiz: [
            {
              id: 'linq3_1',
              question: 'Which POSIX signal code forces immediate non-catchable process termination by the Linux kernel?',
              options: ['SIGKILL (9)', 'SIGTERM (15)', 'SIGINT (2)', 'SIGHUP (1)'],
              correctOptionIndex: 0,
              explanation: 'SIGKILL (signal 9) forces immediate kernel termination without allowing signal handler cleanup.'
            }
          ],
          exercise: {
            id: 'linex-3',
            instructions: 'Write command `systemctl status myapp` and match text.',
            initialCode: '# Systemctl status command\n',
            solutionCode: 'systemctl status myapp',
            hints: ['Use systemctl status myapp'],
            validationType: 'text_match',
            testCases: [{ id: 'lintc3', description: 'Matches systemctl command', expectedOutput: 'systemctl status myapp' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'lin-les-4',
          slug: 'linux-bash-scripting-automation',
          title: 'Bash Shell Scripting & Automated Cron Administration',
          description: 'Write Bash scripts featuring variables, conditional if statements, loops, arguments, and schedule recurring tasks using crontab.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['lin-les-3'],
          concepts: [
            {
              id: 'linc4_1',
              title: 'Bash Automation & Cron Syntax',
              contentMarkdown: `### Cron Schedule Expression Syntax
Cron expressions consist of 5 space-separated time fields:
\`\`\`
* * * * *  command_to_execute
│ │ │ │ │
│ │ │ │ └─── Day of Week (0 - 6) (Sunday = 0)
│ │ │ └────── Month (1 - 12)
│ │ └──────── Day of Month (1 - 31)
│ └────────── Hour (0 - 23)
└──────────── Minute (0 - 59)
\`\`\`
Example: \`0 2 * * *\` executes daily at 2:00 AM.`
            }
          ],
          examples: [
            {
              id: 'linex4_1',
              title: 'Example 1: Automated Server Backup Script',
              code: `#!/bin/bash
# Backup /var/www to /backups tar archive
BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_NAME="site_backup_\${TIMESTAMP}.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "\${BACKUP_DIR}/\${ARCHIVE_NAME}" /var/www

if [ $? -eq 0 ]; then
    echo "[SUCCESS] Backup created at \${BACKUP_DIR}/\${ARCHIVE_NAME}"
else
    echo "[ERROR] Backup failed!" >&2
    exit 1
fi`,
              explanation: 'Uses conditional exit status check ($?) to verify tar compression success.'
            }
          ],
          quiz: [
            {
              id: 'linq4_1',
              question: 'Which variable in Bash stores the exit status of the previously executed command?',
              options: ['$?', '$$', '$#', '$@'],
              correctOptionIndex: 0,
              explanation: '$? holds the integer exit code of the last executed command (0 = success).'
            }
          ],
          exercise: {
            id: 'linex-4',
            instructions: 'Write cron syntax `0 2 * * * /usr/local/bin/backup.sh` and match text.',
            initialCode: '# Crontab entry\n',
            solutionCode: '0 2 * * * /usr/local/bin/backup.sh',
            hints: ['Use 0 2 * * * /usr/local/bin/backup.sh'],
            validationType: 'text_match',
            testCases: [{ id: 'lintc4', description: 'Matches crontab entry', expectedOutput: '0 2 * * * /usr/local/bin/backup.sh' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'lin-mod-3',
      slug: 'linux-advanced-security-hardening',
      title: 'Level 3: Linux Security Hardening, Firewalls & SSH',
      description: 'Harden SSH configurations, configure UFW / iptables firewalls, manage Linux ACLs, and enforce SELinux / AppArmor security policies.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'lin-les-5',
          slug: 'linux-ssh-ufw-firewall',
          title: 'Hardened SSH Administration & UFW Firewall Configuration',
          description: 'Configure SSH key-based authentication, disable password login, change default SSH port, and configure UFW firewall rules.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['lin-les-4'],
          concepts: [
            {
              id: 'linc5_1',
              title: 'SSH Hardening & UFW Policies',
              contentMarkdown: `### Critical SSH Hardening Settings (\`/etc/ssh/sshd_config\`)
- \`PermitRootLogin no\`: Prevents direct SSH login as root.
- \`PasswordAuthentication no\`: Disables password login, forcing public key authentication (\`ssh-ed25519\`).
- \`Port 2222\`: Changes default SSH port to mitigate automated brute-force scanners.`
            }
          ],
          examples: [
            {
              id: 'linex5_1',
              title: 'Example 1: UFW Firewall Setup Commands',
              code: `# Default deny incoming, allow outgoing
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow custom SSH port and HTTPS
sudo ufw allow 2222/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable`,
              explanation: 'Configures default-deny firewall posture permitting only SSH and HTTPS traffic.'
            }
          ],
          quiz: [
            {
              id: 'linq5_1',
              question: 'Which setting in sshd_config prevents direct SSH logins using root credentials?',
              options: ['PermitRootLogin no', 'PasswordAuthentication no', 'AllowUsers none', 'X11Forwarding no'],
              correctOptionIndex: 0,
              explanation: 'PermitRootLogin no forces administrative users to log in via non-root accounts before using sudo.'
            }
          ],
          exercise: {
            id: 'linex-5',
            instructions: 'Write command `ufw allow 443/tcp` and match text.',
            initialCode: '# UFW command\n',
            solutionCode: 'ufw allow 443/tcp',
            hints: ['Use ufw allow 443/tcp'],
            validationType: 'text_match',
            testCases: [{ id: 'lintc5', description: 'Matches ufw command', expectedOutput: 'ufw allow 443/tcp' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'lin-les-6',
          slug: 'linux-selinux-apparmor-auditing',
          title: 'Mandatory Access Control (SELinux / AppArmor) & System Auditing',
          description: 'Master Mandatory Access Control (MAC) enforcement, SELinux security contexts, AppArmor profiles, and auditd log analysis.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['lin-les-5'],
          concepts: [
            {
              id: 'linc6_1',
              title: 'Discretionary vs Mandatory Access Control',
              contentMarkdown: `### DAC vs MAC Security Models
- **Discretionary Access Control (DAC)**: Traditional POSIX permissions managed by file owners.
- **Mandatory Access Control (MAC)**: System-enforced security policies (SELinux / AppArmor) restricting process capabilities regardless of root privileges.`
            }
          ],
          examples: [
            {
              id: 'linex6_1',
              title: 'Example 1: SELinux Security Context Inspection',
              code: `# View SELinux security context labels (-Z)
ls -Z /var/www/html

# Output: system_u:object_r:httpd_sys_content_t:s0 index.html

# Restore default SELinux context recursively
restorecon -Rv /var/www/html`,
              explanation: 'Inspects and restores SELinux security context tags regulating process file access.'
            }
          ],
          quiz: [
            {
              id: 'linq6_1',
              question: 'What is the main advantage of Mandatory Access Control (SELinux) over traditional POSIX DAC permissions?',
              options: [
                'MAC restricts processes based on system security policies even if the process runs as root',
                'MAC disables user passwords',
                'MAC speeds up file copy speeds',
                'MAC simplifies chmod commands'
              ],
              correctOptionIndex: 0,
              explanation: 'MAC policies constrain process access capabilities regardless of root status.'
            }
          ],
          exercise: {
            id: 'linex-6',
            instructions: 'Write command `restorecon -Rv /var/www/html` and match text.',
            initialCode: '# Restorecon command\n',
            solutionCode: 'restorecon -Rv /var/www/html',
            hints: ['Use restorecon -Rv /var/www/html'],
            validationType: 'text_match',
            testCases: [{ id: 'lintc6', description: 'Matches restorecon command', expectedOutput: 'restorecon -Rv /var/www/html' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};
