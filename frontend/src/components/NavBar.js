import {
  HStack,
  Text,
  Flex,
  IconButton,
  useColorMode,
  Link,
  Image,
} from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <>
      <HStack
        align="center"
        justify="space-between"
        w="100%"
        h={10}
        p={4}
        mt={2}
      >
        <Link href="/">
          <Image
            boxShadow={
              isDark ? "2px 2px 4px 2px white" : "2px 2px 4px 2px lightgray"
            }
            bg={isDark ? "white" : "none"}
            border={isDark ? "none" : "1px solid lightgray"}
            borderRadius={10}
            w="150px"
            src="https://cdn.discordapp.com/attachments/978673047772991548/1010225482651938846/logo.png"
          />
        </Link>
        <Flex>
          <IconButton
            ml="4"
            mr="2"
            icon={isDark ? <FaSun /> : <FaMoon />}
            onClick={toggleColorMode}
            isRound="true"
            border={isDark ? "1px solid white" : "1px solid black"}
          />
        </Flex>
      </HStack>
    </>
  );
};
