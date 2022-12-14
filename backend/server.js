const express = require("express");
const morgan = require("morgan");

const {
    getissues,
    getIssueById,
    addIssue,
    updateIssue,
    deleteIssue,
    addComment,
} = require("./handlers");


require("dotenv").config();
const PORT = process.env.PORT;

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(require("cors")())

  // endpoints here
    // all issues
    .get("/api/allissues", getissues)
    // specific issue
    .get("/api/issues/:id", getIssueById)
    // patch comment to issue
    .patch("/api/specific-issues/:issueId", addComment)
    .post("/api/issues", addIssue)
    .patch("/api/issues/", updateIssue)
    .delete("/api/issues/:id", deleteIssue)

  // error endpoints here
  .get("*", (req, res) => {
    res.status(404).send("Page not found");
    })

  .listen(PORT, () => {
    console.log(`Server is running on port port ${PORT}`);
  })

