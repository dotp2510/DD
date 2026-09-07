const mongoose = require("mongoose");

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intension: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required for question"],
    },
  },
  { _id: false }
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    intension: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required for question"],
    },
  },
  { _id: false }
);

const skillsGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false }  // ✅ Fixed: was missing before
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: {
      type: [String],  // ✅ Fixed: was { type: {String} } which is wrong
      required: [true, "Tasks are required"],
    },
  },
  { _id: false }  // ✅ Fixed: was missing before
);

// ── Main Interview Report Schema ───────────────────────────────────────────────

const interviewReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User reference is required"],
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {              // ✅ Fixed: was matchcScore (typo)
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],  // ✅ Fixed: was behavioralQuestion (singular)
    skillsGap: [skillsGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  {
    timestamps: true,
  }
);

const InterviewReport = mongoose.model("interviewReport", interviewReportSchema);

module.exports = InterviewReport;