import {
  submitBatch,
  pollBatchResults,
  getLanguage,
} from "../libs/judge0.libs.js";

export const executeCode = async (req, res) => {
  try {
    const { problemId, language_id, source_code, stdin, expected_outputs } =
      req.body;
    const userId = req.user.id;
    //         {
    //   "source_code": "console.log('hello')",
    //   "language_id": 63,
    //   "stdin": ["1 2", "3 4"],
    //   "expected_outputs": ["3", "7"],
    //   "problemId": "abc123"
    // }

    // validate data
    if (
      !Array.isArray(stdin) ||
      !Array.isArray(expected_outputs) ||
      stdin.length === 0 ||
      stdin.length !== expected_outputs.length
    ) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }

    // prepare submissions for each test cases:
    const submissions = stdin.map((input) => ({
      source_code: source_code,
      language_id: language_id,
      stdin: input,
    }));

    // submit submissions in batch to judge0 and get token for each testcase
    const submissionResults = await submitBatch(submissions);
    const tokens = submissionResults.map((res) => res.token);

    // execute the token based on testcase submission
    const results = await pollBatchResults(tokens);
    console.log("Result-------------");
    console.log(results);
    //  [ {
    //     stdout: '300\n',
    //     time: '0.474',
    //     memory: 13228,
    //     stderr: null,
    //     token: '8b9d0cab-e5ae-450d-b6ec-d11005e6fb0b',
    //     compile_output: null,
    //     message: null,
    //     status: { id: 3, description: 'Accepted' }
    //   }, {}, {}
    //        ]

    //  Analyze test case results
    let allPassed = true;
    const detailedResults = results.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();
      const isPassed = stdout === expected_output;

      if (!isPassed) allPassed = false;

      return {
        testCase: i + 1,
        isPassed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        time: `${result.time} s` || undefined,
        memory: `${result.memory} KB` || undefined,
        status: result.status.description,
      };
    });

    // store detailedResults in 'Submission db'
    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguage(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr)
          ? JSON.stringify(detailedResults.map((r) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
      },
    });

    // If All passed = true mark problem as solved for the current user
    if (allPassed) {
      await prisma.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    // Save individual test case results using detailedResult
    const testCaseResults = detailedResults.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    await db.testCaseResult.createMany({
      data: testCaseResults,
    });

    // Send response of submission that have testcases
    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "Code Executed! Successfully!",
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.error("Error executing code:", error.message);
    res.status(500).json({ error: "Failed to execute code" });
  }
};
