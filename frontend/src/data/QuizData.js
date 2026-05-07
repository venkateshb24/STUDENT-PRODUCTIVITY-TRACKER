// ── QUIZ DATA ─────────────────────────────────────────────
// Hardcoded questions for 4 core subjects
// Each question has: id, question, options (4), correct (index 0-3)
// To add more questions: just add objects to the array
// To add a new subject: add a new key to this object

export const quizData = {
  os: {
    name: "Operating Systems",
    icon: "🖥️",
    questions: [
      {
        id: "os_1",
        question: "What is a process in an operating system?",
        options: [
          "A program stored on disk",
          "A program in execution",
          "A file in memory",
          "A hardware component",
        ],
        correct: 1,
      },
      {
        id: "os_2",
        question: "Which scheduling algorithm gives the shortest average waiting time?",
        options: ["FCFS", "Round Robin", "SJF", "Priority Scheduling"],
        correct: 2,
      },
      {
        id: "os_3",
        question: "What is a deadlock?",
        options: [
          "A process that runs too long",
          "A situation where processes wait forever for each other",
          "A memory overflow error",
          "A CPU scheduling conflict",
        ],
        correct: 1,
      },
      {
        id: "os_4",
        question: "Which of these is NOT a necessary condition for deadlock?",
        options: [
          "Mutual Exclusion",
          "Hold and Wait",
          "Preemption",
          "Circular Wait",
        ],
        correct: 2,
      },
      {
        id: "os_5",
        question: "What does virtual memory allow?",
        options: [
          "Faster CPU processing",
          "Programs to use more memory than physically available",
          "Multiple CPUs to work together",
          "Direct hardware access",
        ],
        correct: 1,
      },
      {
        id: "os_6",
        question: "What is thrashing in OS?",
        options: [
          "CPU running at full speed",
          "Excessive page swapping causing low CPU utilization",
          "Memory corruption",
          "Process starvation",
        ],
        correct: 1,
      },
      {
        id: "os_7",
        question: "Which page replacement algorithm suffers from Belady's anomaly?",
        options: ["LRU", "Optimal", "FIFO", "LFU"],
        correct: 2,
      },
      {
        id: "os_8",
        question: "What is the main purpose of a semaphore?",
        options: [
          "Memory management",
          "Process synchronization",
          "CPU scheduling",
          "File management",
        ],
        correct: 1,
      },
      {
        id: "os_9",
        question: "A thread is different from a process because:",
        options: [
          "Threads have their own memory space",
          "Threads share memory space of their process",
          "Threads cannot run concurrently",
          "Threads are slower than processes",
        ],
        correct: 1,
      },
      {
        id: "os_10",
        question: "Which of these is a real-time operating system?",
        options: ["Windows 10", "Ubuntu", "VxWorks", "macOS"],
        correct: 2,
      },
    ],
  },

  dbms: {
    name: "DBMS",
    icon: "🗄️",
    questions: [
      {
        id: "db_1",
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Index, Data",
          "Atomic, Complete, Isolated, Durable",
          "Accuracy, Consistency, Integrity, Data",
        ],
        correct: 0,
      },
      {
        id: "db_2",
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correct: 2,
      },
      {
        id: "db_3",
        question: "What is a foreign key?",
        options: [
          "A key used for encryption",
          "A key that references the primary key of another table",
          "A key that is unique in the table",
          "A key used for indexing",
        ],
        correct: 1,
      },
      {
        id: "db_4",
        question: "Which SQL command is used to remove a table completely?",
        options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"],
        correct: 2,
      },
      {
        id: "db_5",
        question: "What is an index in a database?",
        options: [
          "A backup of the table",
          "A data structure to speed up queries",
          "A constraint on a column",
          "A view of the table",
        ],
        correct: 1,
      },
      {
        id: "db_6",
        question: "Which join returns all rows from both tables including unmatched rows?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
        correct: 3,
      },
      {
        id: "db_7",
        question: "What is normalization?",
        options: [
          "Making all column names lowercase",
          "Organizing data to reduce redundancy",
          "Encrypting data in a database",
          "Backing up a database",
        ],
        correct: 1,
      },
      {
        id: "db_8",
        question: "Which of these is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correct: 2,
      },
      {
        id: "db_9",
        question: "What does the GROUP BY clause do?",
        options: [
          "Sorts the results",
          "Filters individual rows",
          "Groups rows with same values for aggregate functions",
          "Joins two tables",
        ],
        correct: 2,
      },
      {
        id: "db_10",
        question: "A view in SQL is:",
        options: [
          "A stored procedure",
          "A physical copy of a table",
          "A virtual table based on a query",
          "An index on a table",
        ],
        correct: 2,
      },
    ],
  },

  cn: {
    name: "Computer Networks",
    icon: "🌐",
    questions: [
      {
        id: "cn_1",
        question: "What does HTTP stand for?",
        options: [
          "HyperText Transfer Protocol",
          "High Transfer Text Protocol",
          "Hyperlink Text Transport Protocol",
          "HyperText Transport Procedure",
        ],
        correct: 0,
      },
      {
        id: "cn_2",
        question: "Which layer of the OSI model is responsible for routing?",
        options: ["Data Link", "Transport", "Network", "Session"],
        correct: 2,
      },
      {
        id: "cn_3",
        question: "What is the purpose of DNS?",
        options: [
          "Encrypt internet traffic",
          "Translate domain names to IP addresses",
          "Assign IP addresses dynamically",
          "Monitor network traffic",
        ],
        correct: 1,
      },
      {
        id: "cn_4",
        question: "TCP is different from UDP because TCP:",
        options: [
          "Is faster",
          "Uses less bandwidth",
          "Guarantees reliable delivery",
          "Works without IP",
        ],
        correct: 2,
      },
      {
        id: "cn_5",
        question: "What is the default port for HTTPS?",
        options: ["80", "21", "443", "8080"],
        correct: 2,
      },
      {
        id: "cn_6",
        question: "What does ARP do?",
        options: [
          "Assigns IP addresses",
          "Resolves IP addresses to MAC addresses",
          "Encrypts data packets",
          "Routes packets between networks",
        ],
        correct: 1,
      },
      {
        id: "cn_7",
        question: "Which topology has a single point of failure at the central node?",
        options: ["Bus", "Ring", "Star", "Mesh"],
        correct: 2,
      },
      {
        id: "cn_8",
        question: "What is a subnet mask used for?",
        options: [
          "Encrypting network traffic",
          "Identifying which part of an IP is network vs host",
          "Blocking malicious traffic",
          "Assigning MAC addresses",
        ],
        correct: 1,
      },
      {
        id: "cn_9",
        question: "Which protocol is used to send emails?",
        options: ["FTP", "SMTP", "HTTP", "SNMP"],
        correct: 1,
      },
      {
        id: "cn_10",
        question: "What is a firewall?",
        options: [
          "A physical barrier in a data center",
          "A network security system that monitors and controls traffic",
          "A type of router",
          "A protocol for secure communication",
        ],
        correct: 1,
      },
    ],
  },

  oop: {
    name: "OOP Concepts",
    icon: "🧱",
    questions: [
      {
        id: "oop_1",
        question: "What is encapsulation in OOP?",
        options: [
          "Inheriting from a parent class",
          "Bundling data and methods that operate on that data",
          "Creating multiple objects from one class",
          "Overriding a method in a subclass",
        ],
        correct: 1,
      },
      {
        id: "oop_2",
        question: "What is polymorphism?",
        options: [
          "Having multiple constructors",
          "A class inheriting from multiple classes",
          "The ability of different objects to respond to the same interface",
          "Hiding data from outside the class",
        ],
        correct: 2,
      },
      {
        id: "oop_3",
        question: "Which keyword is used to inherit a class in Java?",
        options: ["implements", "extends", "inherits", "super"],
        correct: 1,
      },
      {
        id: "oop_4",
        question: "What is an abstract class?",
        options: [
          "A class with no methods",
          "A class that cannot be instantiated and may have abstract methods",
          "A class with only static methods",
          "A class that is private",
        ],
        correct: 1,
      },
      {
        id: "oop_5",
        question: "What is method overloading?",
        options: [
          "Redefining a method in a subclass",
          "Multiple methods with the same name but different parameters",
          "Calling a method multiple times",
          "A method that calls itself",
        ],
        correct: 1,
      },
      {
        id: "oop_6",
        question: "What is a constructor?",
        options: [
          "A method that destroys an object",
          "A method called automatically when an object is created",
          "A static method of a class",
          "A method that returns the class type",
        ],
        correct: 1,
      },
      {
        id: "oop_7",
        question: "What does the 'super' keyword do in Java?",
        options: [
          "Creates a new object",
          "Refers to the current class",
          "Refers to the parent class",
          "Makes a method static",
        ],
        correct: 2,
      },
      {
        id: "oop_8",
        question: "What is an interface in OOP?",
        options: [
          "A class with some implemented methods",
          "A contract that classes must follow, with only method signatures",
          "A private class",
          "A class that cannot be extended",
        ],
        correct: 1,
      },
      {
        id: "oop_9",
        question: "What is the difference between == and .equals() in Java?",
        options: [
          "No difference",
          "== compares references, .equals() compares values",
          "== compares values, .equals() compares references",
          ".equals() only works on strings",
        ],
        correct: 1,
      },
      {
        id: "oop_10",
        question: "What is a static method?",
        options: [
          "A method that cannot be overridden",
          "A method that belongs to the class, not instances",
          "A method that runs automatically",
          "A method that returns void",
        ],
        correct: 1,
      },
    ],
  },
};