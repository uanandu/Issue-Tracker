import {
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  HStack,
  Radio,
  Button,
  Select,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import { IssueContext } from "../context/IssueContext";

export const IssueSet = () => {
  const { handleSubmit, handleChange, handleImageChange, issueImage } = useContext(IssueContext);

  return (
    <VStack
      position="absolute"
      top="15vh"
      border="1px solid white"
      borderRadius={10}
      p={10}
    >
      <Text fontSize="2xl">Set your issue here</Text>
      <form onSubmit={handleSubmit}>
        <FormControl display="flex" flexDirection="column" mb={8}>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            type="text"
            placeholder="Issue title"
            onChange={handleChange}
          />
          <FormHelperText mb={8}>
            <Text fontSize="sm">Enter your issue title</Text>
          </FormHelperText>
          <FormLabel>Description</FormLabel>
          <Input
            name="description"
            type="text"
            placeholder="description"
            onChange={handleChange}
          />
          <FormHelperText mb={8}>
            <Text fontSize="sm">Enter your issue description</Text>
          </FormHelperText>
          <FormLabel>Severity</FormLabel>
          <Select placeholder="select severity" name="severity" onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
          <FormHelperText mb={8}>
            <Text fontSize="sm">Select your issue severity</Text>
          </FormHelperText>
          <FormLabel>Image</FormLabel>
          <Input
            name="imageSrc"
            type="file"
            multiple
            accept="image/*"
            p={2}
            h={12}
            onChange={handleImageChange}
            mb={8}
          />
          <Image src={issueImage} alt="issue image" />
          <FormLabel>Due date</FormLabel>
          <Input type="date" name="due" onChange={handleChange} />
        </FormControl>
        <Button type="submit">Submit Issue</Button>
      </form>
    </VStack>
  );
};
