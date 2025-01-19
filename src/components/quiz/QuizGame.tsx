import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  VStack,
  Text,
  SimpleGrid,
  Heading,
  Progress,
  useColorModeValue,
  useToast,
  CircularProgress,
  Flex,
} from "@chakra-ui/react";
import { useQuiz } from "../../context/QuizContext";

interface QuizGameProps {
  questionContent: ReactNode;
}

export function QuizGame({ questionContent }: QuizGameProps) {
  const { t } = useTranslation("quiz");
  const toast = useToast();
  const {
    currentQuestion,
    score,
    totalQuestions,
    answers,
    isGameOver,
    resetQuiz,
    submitAnswer,
  } = useQuiz();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const buttonBgColor = useColorModeValue("white", "gray.600");

  const handleAnswerClick = async (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const isCorrect = answer === currentQuestion?.correctAnswer;

    // Show toast
    toast({
      title: isCorrect ? t("correct") : t("incorrect"),
      status: isCorrect ? "success" : "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    for (let i = 1; i <= 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setProgress((i + 1) * 10);
    }

    submitAnswer(answer);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setProgress(0);
  };

  const getButtonStyle = (option: string) => {
    if (!showFeedback || !selectedAnswer) return {};

    if (option === currentQuestion?.correctAnswer) {
      return {
        bg: "green.500",
        color: "white",
        _hover: { bg: "green.600" },
      };
    }

    if (
      option === selectedAnswer &&
      option !== currentQuestion?.correctAnswer
    ) {
      return {
        bg: "red.500",
        color: "white",
        _hover: { bg: "red.600" },
      };
    }

    return {};
  };

  if (isGameOver) {
    return (
      <VStack spacing={6} p={8} align="center">
        <Heading>{t("gameOver")}</Heading>
        <Text fontSize="xl">
          {t("finalScore", { score, total: totalQuestions })}
        </Text>
        <Button onClick={resetQuiz}>{t("playAgain")}</Button>
      </VStack>
    );
  }

  return (
    <Box 
      w="100%" 
      maxW="100vw" 
      overflowX="hidden"
      mt="60px"
    >
      <VStack
        spacing={4}
        p={4}
        align="stretch"
        w={{ base: "95%", md: "90%", lg: "1000px" }}
        maxW="100%"
        mx="auto"
      >
        <Flex justify="space-between" align="center" w="100%">
          <Box flex="1">
            <Progress
              value={((answers.length + 1) / totalQuestions) * 100}
              size="sm"
              colorScheme="green"
            />
            <Text fontSize="sm" mt={1}>
              {t("progress", {
                current: answers.length + 1,
                total: totalQuestions,
              })}
            </Text>
          </Box>
          <Text fontSize="sm" ml={4}>
            {t("score", { score, total: answers.length })}
          </Text>
        </Flex>

        <Box bg={bgColor} p={6} borderRadius="lg" shadow="sm" w="100%">
          <VStack spacing={8} align="stretch" w="100%">
            <Box>
              {questionContent}
              {currentQuestion?.imageUrl && (
                <Box mt={4} maxW="300px" mx="auto">
                  <img 
                    src={currentQuestion.imageUrl} 
                    alt={t("flagAlt")} 
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Box>
              )}
            </Box>
            {currentQuestion && (
              <Box w="100%" position="relative">
                {showFeedback && (
                  <Flex position="absolute" top="-8" right="0" align="center" zIndex={1}>
                    <CircularProgress value={progress} size="20px" color="blue.500" />
                  </Flex>
                )}
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} width="100%">
                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => !showFeedback && handleAnswerClick(option)}
                      size="md"
                      variant="outline"
                      bg={buttonBgColor}
                      minH="50px"
                      height="auto"
                      py={2}
                      px={3}
                      fontSize="sm"
                      whiteSpace="normal"
                      wordBreak="break-word"
                      textOverflow="ellipsis"
                      overflow="hidden"
                      disabled={showFeedback}
                      {...getButtonStyle(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
