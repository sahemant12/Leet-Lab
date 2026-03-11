import prisma from "../libs/db.js";

export const getAllSubmission = async (req, res) => {
  try {
    // get all the submission of user's irrespect of failed, passed, same-ques, diff-ques
    const id = req.user.id;
    const submissions = await prisma.submission.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

export const getSubmissionsForProblem = async (req, res) => {
  try {
    // get all the submission of given question
    const { problemId } = req.params;
    const userId = req.user.id;

    const submissions = await prisma.submission.findMany({
      where: { problemId: problemId, userId: userId },
    });
    res.status(200).json({
      success: true,
      message: "Submission fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  // for a given problem how many submission's are there.
  try {
    const problemId = req.params.problemId;
    const submission = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions Fetched successfully",
      count: submission,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
