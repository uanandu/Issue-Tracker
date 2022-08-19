import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // from react-router-dom
import { HStack, Text, Flex, IconButton, useColorMode,VStack } from "@chakra-ui/react";

import { NavBar } from './components/NavBar';
import { HomePage } from "./pages/HomePage";
import { Registration } from "./pages/Registration";
import { IssuesPage } from "./pages/IssuesPage";
import { IssueSet } from "./pages/IssueSet";
import { IndividualIssues } from "./pages/IndividualIssues";


function App() {

  const {toggleColorMode, colorMode} = useColorMode();

  const isDark = colorMode === "dark"

  return (
    <VStack>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/issues-main" element={<IssueSet />} />
          <Route path="/issues/:issueId" element={<IndividualIssues/>} />
        </Routes>
    </VStack>
  );
}

export default App;
