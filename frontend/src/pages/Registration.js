import { Button, FormControl, FormLabel, Text, VStack, useColorMode, Stack, Input } from "@chakra-ui/react";


export const Registration = () => {

  const {toggleColorMode, colorMode} = useColorMode();

  const isDark = colorMode === "dark"
  return (
    <VStack 
      boxShadow={isDark ? "2px 2px 2px 2px white" : "2px 4px 4px 6px lightgray"}
      borderRadius={10}
      position="absolute"
      top="15vh"
      w="40vw"
      h="60vh"
      display="flex"
      justify="space-evenly"
    >
      <Text fontSize="2xl" mt={5}>Registration page</Text>
      <form>
        <FormControl
          display="flex"
          flexDirection="column"
          justify="space-around"
          w="30vw"
          h="auto"
          mt={5}
          isRequired
>
          <Stack>
            <FormLabel>Username</FormLabel>
            <Input name="username" type="text" placeholder="@username" />
            <FormLabel>Name</FormLabel>
            <Input name="fullname" type="text" placeholder="full-name" /> 
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" placeholder="email" />
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" placeholder="password" />
            <FormLabel>Confirm Password</FormLabel>
            <Input name="confirm-password" type="password" placeholder="confirm your password" />
          </Stack>
          <Button bg={isDark ? "gray.200" : "gray.200"} color={isDark ? "black" : "black.200"} mt={5} mb={5} _hover={{
            transform: "scale(1.05)"
          }}>Submit</Button>
        </FormControl>
      </form>
    </VStack>
  );
};
