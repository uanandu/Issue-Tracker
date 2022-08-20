import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Button,
  VStack,
  useColorMode,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { IssueContext } from "../context/IssueContext";

export const IndividualIssues = () => {

  const {addComment, userComment, handleCommentChange} = useContext(IssueContext);

  const { toggleColorMode, colorMode } = useColorMode();

  const isDark = colorMode === "dark";

  const issueId = useParams();
  const [individualIssue, setIndividualIssue] = useState({});
  const [commentIsSet, setCommentIsSet] = useState(false);

  // here we fetch the individual issues by issueID

const [comment, setComment] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/issues/${issueId.issueId}`)
      .then((res) => {
        setIndividualIssue(res.data.issue)
        setCommentIsSet(true)
        if (res.data.issue.comments.length > 0) {
          setCommentIsSet(!commentIsSet);
          setComment(res.data.issue.comments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <VStack
      boxShadow={isDark ? "2px 2px 4px 2px white" : "2px 2px 4px 2px lightgray"}
      borderRadius={10}
      position="absolute"
      top="15vh"
      w="60vw"
      h="70vh"
      display="flex"
      flexDirection="column"
      justify="space-evenly"
    >
      <Stack
        position="relative"
        w="90%"
        h="60%"
        p={10}
        display="flex"
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Text position="relative" w="100%" fontSize="2xl">
          <strong>Issue ID: </strong>
          {issueId.issueId} 🤖
        </Text>
        {individualIssue && (
          <>
            <Flex
              position="inherit"
              w="80%"
              h="60%"
              display="flex"
              flexDirection="column"
              justify="space-evenly"
            >
              <Text>
                <strong>Title: </strong>
                {individualIssue.title}
              </Text>
              <Text>
                <strong>Description: </strong>
                {individualIssue.description}
              </Text>
              <Text>
                <strong>severity: </strong>
                {individualIssue.severity}
              </Text>
              <Text>
                <strong>created: </strong>
                {individualIssue.created}
              </Text>
              <Text>
                <strong>Due: </strong>
                {individualIssue.due}
              </Text>
              <Image src={individualIssue.imageSrc} />
              <Button>Edit</Button>
            </Flex>
            <Text><strong>comment: </strong></Text>
            {comment ? (
              <>
                {comment.map((comment) => {
                  return (
                    <Text>
                      {comment}
                    </Text>
                  );
                })}
              </>
            ) : (
              <Text>No comments yet</Text>
            )}
          </>
        )}
      </Stack>
      <Stack>
        <form onSubmit={addComment}>
          <FormControl>
            <FormLabel>Comment section:</FormLabel>
            <Textarea
              name="comment"
              type="text"
              placeholder="comments here"
              onChange={(e)=>handleCommentChange(e, issueId)}
            />
            <Button type="submit" mt={5}>
              Comment
            </Button>
          </FormControl>
        </form>
      </Stack>
    </VStack>
  );
};
