import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import moment from "moment";

export const IssueContext = createContext();

export const IssueProvider = ({ children }) => {
  const navigate = useNavigate();

  const [issues, setIssues] = useState({
    title: "",
    description: "",
    severity: "",
    due: "",
  });
  const [issueImage, setIssueImage] = useState("");
  const [issueList, setIssueList] = useState([]);
  const [issueState, setIssueState] = useState("pending");
  const [createdOn, setCreatedOn] = useState(moment().format("MMMM Do YYYY"));

  // get issues from backend
  useEffect(() => {
    axios
      .get("/api/issues")
      .then((res) => {
        setIssueList(res.data.issue_list);
        setIssueState("success");
      })
      .catch((err) => {
        setIssueState("error");
      });
  }, []);

  // functions for changing and setting the values based on the form inputs
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIssues({
      ...issues,
      [e.target.name]: e.target.value,
    });
    console.log(issues);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIssueImage(URL.createObjectURL(e.target.files[0]));
  }

  console.log("issues here", issueImage);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("image source", issues.imageSrc);

    axios
      .post("/api/issues", {
        title: issues.title,
        description: issues.description,
        severity: issues.severity,
        created: createdOn,
        due: issues.due,
        imageSrc: issueImage,
      })
      .then((res) => {
        navigate("/issues");
        window.location.reload();
        setIssueState("success");
      })
      .catch((err) => {
        setIssueState("error");
      });
  };

  const deleteIssue = (e, id) => {
    e.preventDefault();
    axios
      .delete(`/api/issues/${id}`)
      .then((res) => {
        console.log("delete", res);
        window.location.reload();
        navigate("/issues");
        setIssueState("success");
      })
      .catch((err) => {
        setIssueState("error");
      })
      .finally(() => {
        setIssueState("pending");
      });
  };

  return (
    <IssueContext.Provider value={{ issueImage, issueList, handleChange, handleImageChange, handleSubmit, deleteIssue }}>
      {children}
    </IssueContext.Provider>
  );
};
