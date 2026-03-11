[
    {
  "title": "Add Two Numbers",
  "description": "Given two integers a and b, return their sum.",
  "difficulty": "EASY",
  "tags": ["math", "operators", "addition"],
  "examples": {
    "input": "3 7",
    "output": "10",
    "explanation": "3 + 7 = 10"
  },
  "constraints": "-10^9 <= a, b <= 10^9",
  "testcases": [
    { "input": "1 2", "output": "3" },
    { "input": "-5 6", "output": "1" },
    { "input": "0 0", "output": "0" }
  ],
  "codeSnippets": {
    "JAVASCRIPT": "const fs = require('fs');\n\nfunction solve(a, b) {\n    // Write your code here\n    return 0;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(solve(a, b));",
    "PYTHON": "def solve(a, b):\n    # Write your code here\n    return 0\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(solve(a, b))",
    "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static int solve(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(solve(a, b));\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a + b);",
    "PYTHON": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(a + b)",
    "JAVA": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}"
  }
},


{
  "title": "Check Even or Odd",
  "description": "Given an integer n, print EVEN if it is even, otherwise print ODD.",
  "difficulty": "EASY",
  "tags": ["math", "modulo"],
  "examples": {
    "input": "4",
    "output": "EVEN",
    "explanation": "4 is divisible by 2."
  },
  "constraints": "-10^9 <= n <= 10^9",
  "testcases": [
    { "input": "3", "output": "ODD" },
    { "input": "10", "output": "EVEN" },
    { "input": "-5", "output": "ODD" }
  ],
  "codeSnippets": {
    "JAVASCRIPT": "const fs = require('fs');\n\nfunction solve(n) {\n    // Write your code here\n    return \"\";\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst n = Number(input);\nconsole.log(solve(n));",
    "PYTHON": "def solve(n):\n    # Write your code here\n    return \"\"\n\nimport sys\nn = int(sys.stdin.read())\nprint(solve(n))",
    "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static String solve(int n) {\n        // Write your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(solve(n));\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "const fs = require('fs');\nconst n = Number(fs.readFileSync(0, 'utf-8').trim());\nconsole.log(n % 2 === 0 ? \"EVEN\" : \"ODD\");",
    "PYTHON": "import sys\nn = int(sys.stdin.read())\nprint(\"EVEN\" if n % 2 == 0 else \"ODD\")",
    "JAVA": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(n % 2 == 0 ? \"EVEN\" : \"ODD\");\n    }\n}"
  }
},

{
  "title": "Find Maximum",
  "description": "Given two integers a and b, print the larger number.",
  "difficulty": "EASY",
  "tags": ["math", "comparison"],
  "examples": {
    "input": "10 5",
    "output": "10",
    "explanation": "10 is greater than 5."
  },
  "constraints": "-10^9 <= a, b <= 10^9",
  "testcases": [
    { "input": "3 7", "output": "7" },
    { "input": "-5 -2", "output": "-2" },
    { "input": "100 100", "output": "100" }
  ],
  "codeSnippets": {
    "JAVASCRIPT": "const fs = require('fs');\n\nfunction solve(a, b) {\n    // Write your code here\n    return 0;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(solve(a, b));",
    "PYTHON": "def solve(a, b):\n    # Write your code here\n    return 0\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(solve(a, b))",
    "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static int solve(int a, int b) {\n        // Write your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(solve(a, b));\n    }\n}"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(Math.max(a, b));",
    "PYTHON": "import sys\na, b = map(int, sys.stdin.read().split())\nprint(max(a, b))",
    "JAVA": "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(Math.max(a, b));\n    }\n}"
  }
}



]