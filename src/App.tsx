import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Center, Flex } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { QuizProvider } from "./context/QuizContext";
import theme from "./theme";

function App() {
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Center>
        <ChakraProvider theme={theme}>
          <Router>
            <QuizProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz/:mode" element={<Quiz />} />
                </Routes>
              </Layout>
            </QuizProvider>
          </Router>
        </ChakraProvider>
      </Center>
    </Flex>
  );
}

export default App;
