const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

// handlers here

// /api/issues
// We use GET to get all the issues
const getissues = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    console.log("Connected to MongoDB");

    await client.connect();

    const db = client.db("issues");

    const issues = await db.collection("issueList").find().toArray();

    res.status(200).json({
      status: "success",
      issue_list: issues,
    });

    client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// /api/issues/:id
// We use GET to get a single issue by ID

const getIssueById = async (req, res) => {
  console.log("id", req.params.id);

  try {
    const client = new MongoClient(MONGO_URI, options);
    console.log("Connected to MongoDB");

    await client.connect();

    const db = client.db("issues");

    const issue = await db
      .collection("issueList")
      .findOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      issue: issue,
    });

    client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// /api/issues
// We use POST to add a new issue
const addIssue = async (req, res) => {
  const { title, description, severity, created, due } = req.body;
  try {
    const client = new MongoClient(MONGO_URI, options);
    console.log("Connected to MongoDB");

    await client.connect();

    const db = client.db("issues");

    const issue = await db.collection("issueList").insertOne({
      _id: uuidv4(),
      title: title,
      description: description,
      severity: severity,
      created: created,
      due: due,
    });

    res.status(200).json({
      status: "success",
      issue: issue,
      your_id: issue.insertedId,
    });

    client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// /api/issues/
// We use PATCH to update an issue

const updateIssue = async (req, res) => {
  const { id, title, created, due } = req.body;

  try {
    const client = new MongoClient(MONGO_URI, options);
    console.log("Connected to MongoDB");

    await client.connect();

    const db = client.db("issues");

    const issue = await db.collection("issueList").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          created: created,
          due: due,
        },
      }
    );

    res.status(200).json({
      status: "success",
      issue: issue,
    });

    client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// /api/issues/
// We use DELETE to delete an issue

const deleteIssue = async (req, res) => {
  const issueId = req.params.id;

  console.log("id", issueId);

  try {
    const client = new MongoClient(MONGO_URI, options);
    console.log("Connected to MongoDB");

    await client.connect();

    const db = client.db("issues");

    const issue = await db.collection("issueList").deleteOne({
      _id: issueId,
    });
    if (issue.deletedCount === 0) {
      res.status(404).json({
        status: "error",
        message: "No issue found with that ID",
      });
    } else {
      res.status(200).json({
        status: "success",
        issue: issue,
      });
    }

    client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getissues,
  getIssueById,
  addIssue,
  updateIssue,
  deleteIssue,
}; // export the handlers
