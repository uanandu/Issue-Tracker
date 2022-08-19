import {
  Button,
  Link,
  Stack,
  VStack,
  Text,
  useColorMode,
  Flex,
} from "@chakra-ui/react";

import { Suspense, lazy } from 'react';

import Spline from "@splinetool/react-spline";

export const HomePage = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const isDark = colorMode === "dark";

  return (
    <VStack
      w="80vw"
      h="60vh"
      display="flex"
      flexDirection="column"
      align="center"
      spacing={8}
      position="absolute"
      p={8}
      top="15vh"
      borderRadius={10}
    >
      <Stack
        display="flex"
        flexDirection="column"
        align="center"
        justify="space-around"
        spacing={8}
        position="relative"
        w="100%"
        h="100%"
      >
        <Spline scene="https://prod.spline.design/LhSwvM6VZpHNVGLa/scene.splinecode" />
        <Flex
          display="flex"
          direction="column"
          justify="space-evenly"
          align="center"
        >
          <Text
            style={{
              color: "black.500",
              fontFamily: "Courier",
              fontSize: "20px",
              margin: "10px 0 0 10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "30em",
            }}
          >
            Hi there! I am IssueBot. Your Website companion.{" "}
          </Text>
          <Text
            style={{
              color: "black.500",
              fontFamily: "Courier",
              fontSize: "20px",
              margin: "10px 0 0 10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "30em",
            }}
          >
            Please select one of the options to go to the page.🤠
          </Text>
        </Flex>
        <Flex w="30vw" h="auto" display="flex" justify="space-evenly">
          <Button
            size="lg"
            border={isDark ? "1px solid black" : "1px solid lightgray"}
          >
            <Link href="/issues">Issues</Link>
          </Button>
          <Button
            size="lg"
            border={isDark ? "1px solid black" : "1px solid lightgray"}
          >
            <Link href="/issues-main">Add Issues</Link>
          </Button>
        </Flex>

        {/* <Text>You may also register here</Text>
        <Button
          size="lg"
          border={isDark ? "1px solid black" : "1px solid lightgray"}
          w="100px"
          h="80px"
        >
          <Link href="/register">Register</Link>
        </Button> */}
      </Stack>
    </VStack>
  );
};
