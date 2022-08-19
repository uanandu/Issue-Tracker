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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const IndividualIssues = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const isDark = colorMode === "dark";

  const issueId = useParams();
  const [individualIssue, setIndividualIssue] = useState({});

  console.log("issueId", issueId.issueId);

  // here we fetch the individual issues by issueID

  useEffect(() => {
    axios
      .get(`/api/issues/${issueId.issueId}`)
      .then((res) => {
        setIndividualIssue(res.data.issue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [issueId.id]);

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
          <strong>Issue ID:{" "}</strong>{issueId.issueId} 🤖
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
          </>
        )}
      </Stack>
      <Stack>
        <form>
          <FormControl>
            <FormLabel>Comment section:</FormLabel>
            <Textarea name="comment" type="text" placeholder="comments here" />
            <Button type="submit" mt={5}>
              Comment
            </Button>
          </FormControl>
        </form>
      </Stack>
    </VStack>
  );
};
