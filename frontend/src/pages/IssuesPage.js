import {
  VStack,
  Text,
  Stack,
  Flex,
  Button,
  useColorMode,
  Link,
  Image,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { IssueContext } from "../context/IssueContext";

export const IssuesPage = () => {
  const { issueList, deleteIssue } = useContext(IssueContext);

  console.log("issueList", issueList);


  const { toggleColorMode, colorMode } = useColorMode();

  const isDark = colorMode === "dark";

  const navigate = useNavigate();

  const handleRedirect = (id) => {
    navigate(`/issues/${id}`);
  }

  return (
    <VStack>
      <Text>Remaining Issues:</Text>
      {!issueList ? (
        <Flex
          position="absolute"
          display="flex"
          justify="center"
          align="center"
          spacing={8}
        >
          <Text>Loading...</Text>
        </Flex>
      ) : (
        <Stack
          position="absolute"
          top="15vh"
          display="grid"
          gridRowGap="10px"
          gridColumnGap="10px"
          gridTemplateColumns="auto auto auto"
          alignItems="center"
        >
          {issueList.map((issue) => (
            <Flex
              key={issue.id}
              display="flex"
              direction="column"
              justify="space-evenly"
              border={isDark ? "1px solid white" : "1px solid lightgray"}
              borderRadius={10}
              mt={10}
              w="25vw"
              h="30vh"
              p={5}
            >
              <Text>
                <strong>Issue Title:</strong> {issue.title}
              </Text>
              <Text>
                <strong>Issue Id:</strong> {issue._id}
              </Text>
              <Text>
                <strong>Description:</strong> {issue.description}
              </Text>
              <Text>
                <strong>Severity:</strong>
                {issue.severity}
              </Text>
              <Text>
                <strong>Due:</strong> {issue.due}
              </Text>
              <Image src={issue.imageSrc} alt="issue image" />
              <Flex position="relative" w="100%" justify="space-around" mt={2}>
                <Button
                  onClick={() =>
                    handleRedirect(issue._id)
                  }
                  variant="solid"
                  bg="green"
                  transition={0.3}
                  _hover={{ bg: "teal" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => deleteIssue(e, issue._id)}
                  variant="solid"
                  bg="red"
                  transition={0.3}
                  _hover={{ bg: "teal" }}
                >
                  Delete
                </Button>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
      <Button border="1px solid white" position="absolute" top="80vh">
        <Link textDecoration="none" href="/issues-main">
          Create an Issue
        </Link>
      </Button>
    </VStack>
  );
};
