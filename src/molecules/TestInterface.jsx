import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  Button,
  Radio,
  Badge,
  Box,
  SimpleGrid,
  Progress,
  ActionIcon,
  Alert,
  List,
  ThemeIcon,
  Modal,
  ScrollArea,
  Divider
} from '@mantine/core';
import {
  IconClock,
  IconCheck,
  IconClipboardText,
  IconArrowRight,
  IconArrowLeft,
  IconFlag,
  IconArrowsMaximize,
  IconX,
  IconAlertCircle,
  IconClipboardList,
  IconLogout
} from '@tabler/icons-react';

const TestInterface = () => {
  const [currentStep, setCurrentStep] = useState('rules'); // 'rules', 'test'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(55 * 60); // 55 minutes in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Sample questions data
  const questions = [
    {
      id: 1,
      topic: "Data Structures",
      question: "What is the time complexity of inserting an element at the beginning of an array?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n²)"
      ]
    },
    {
      id: 2,
      topic: "Algorithms",
      question: "Which sorting algorithm has the best average case time complexity?",
      options: [
        "Bubble Sort",
        "Selection Sort",
        "Merge Sort",
        "Insertion Sort"
      ]
    },
    {
      id: 3,
      topic: "Programming",
      question: "What does OOP stand for in programming?",
      options: [
        "Object Oriented Programming",
        "Only One Program",
        "Open Object Protocol",
        "Operating Object Procedure"
      ]
    },
    {
      id: 4,
      topic: "Database",
      question: "Which of the following is a NoSQL database?",
      options: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Oracle"
      ]
    },
    {
      id: 5,
      topic: "Networks",
      question: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Tech Transfer Process",
        "Home Tool Transfer Protocol",
        "Host Text Transfer Protocol"
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    if (currentStep === 'test' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, timeLeft]);

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigation functions
  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Start test function
  const startTest = () => {
    setCurrentStep('test');
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  // Get question status
  const getQuestionStatus = (index) => {
    const questionId = questions[index].id;
    if (answers[questionId]) return 'answered';
    return 'unanswered';
  };

  // Rules Page
  if (currentStep === 'rules') {
    return (
      <Container size="md" py="xl">
        <Stack spacing="xl">
          {/* Header */}
          <Box ta="center">
            <Title order={1} mb="md" color="dark">
              Baseline Assessment - Dhanalakshmi College
            </Title>
            <Group position="center" spacing="xl" mb="xl">
              <Group spacing="xs">
                <ThemeIcon size="sm" color="blue" variant="light">
                  <IconClock size={14} />
                </ThemeIcon>
                <Text size="sm" color="dimmed">55 minutes</Text>
              </Group>
              <Group spacing="xs">
                <ThemeIcon size="sm" color="violet" variant="light">
                  <IconClipboardText size={14} />
                </ThemeIcon>
                <Text size="sm" color="dimmed">60 questions</Text>
              </Group>
              <Group spacing="xs">
                <ThemeIcon size="sm" color="green" variant="light">
                  <IconCheck size={14} />
                </ThemeIcon>
                <Text size="sm" color="dimmed">60 marks</Text>
              </Group>
            </Group>
          </Box>

          {/* Rules Card */}
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Title order={2} mb="lg" color="dark">
              <Group spacing="sm">
                <IconClipboardList size={24} />
                Test Instructions
              </Group>
            </Title>

            <List spacing="md" size="sm">
              <List.Item>
                <Text weight={500}>Duration:</Text> You have exactly 55 minutes to complete this assessment.
              </List.Item>
              <List.Item>
                <Text weight={500}>Questions:</Text> This test contains 60 multiple-choice questions across various topics.
              </List.Item>
              <List.Item>
                <Text weight={500}>Navigation:</Text> You can navigate between questions using the question panel on the left side.
              </List.Item>
              <List.Item>
                <Text weight={500}>Saving Answers:</Text> Click "Save & Next" to save your answer and move to the next question.
              </List.Item>
              <List.Item>
                <Text weight={500}>Fullscreen Mode:</Text> The test will automatically switch to fullscreen mode when you start.
              </List.Item>
              <List.Item>
                <Text weight={500}>Auto-Submit:</Text> The test will be automatically submitted when time runs out.
              </List.Item>
              <List.Item>
                <Text weight={500}>Review:</Text> You can review and change your answers anytime before submitting.
              </List.Item>
            </List>

            <Alert icon={<IconAlertCircle size={16} />} color="orange" mt="lg" variant="light">
              <Text size="sm">
                <Text component="span" weight={600}>Important:</Text> Once you start the test, you cannot pause or exit. 
                Make sure you have a stable internet connection and uninterrupted time to complete the assessment.
              </Text>
            </Alert>

            <Group position="center" mt="xl">
              <Button 
                size="lg" 
                leftIcon={<IconArrowsMaximize size={18} />}
                onClick={startTest}
                sx={{ minWidth: 200 }}
              >
                Start Test
              </Button>
            </Group>
          </Card>
        </Stack>
      </Container>
    );
  }

  // Test Interface
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <Box
        sx={(theme) => ({
          backgroundColor: 'white',
          borderBottom: `1px solid ${theme.colors.gray[3]}`,
          padding: theme.spacing.md,
          flexShrink: 0
        })}
      >
        <Group position="apart">
          <Group spacing="md">
            <Text weight={600} size="lg">Baseline Assessment</Text>
            <Badge color="blue" variant="light">Question {currentQuestion + 1} of {questions.length}</Badge>
          </Group>
          
          <Group spacing="md">
            <Group spacing="xs">
              <IconClock size={18} color="#666" />
              <Text weight={600} color={timeLeft < 600 ? 'red' : 'dark'}>
                {formatTime(timeLeft)}
              </Text>
            </Group>
            <Button 
              variant="outline" 
              color="red" 
              size="sm"
              leftIcon={<IconLogout size={16} />}
              onClick={() => setShowSubmitModal(true)}
            >
              Submit Test
            </Button>
          </Group>
        </Group>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Question Navigation Sidebar */}
        <Box
          sx={(theme) => ({
            width: 280,
            backgroundColor: theme.colors.gray[0],
            borderRight: `1px solid ${theme.colors.gray[3]}`,
            padding: theme.spacing.md,
            flexShrink: 0,
            '@media (max-width: 768px)': {
              width: 200,
              padding: theme.spacing.xs
            }
          })}
        >
          <Title order={4} mb="md" size="h5">Questions</Title>
          <ScrollArea style={{ height: 'calc(100vh - 140px)' }}>
            <SimpleGrid cols={5} spacing="xs">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={currentQuestion === index ? 'filled' : getQuestionStatus(index) === 'answered' ? 'light' : 'outline'}
                  color={getQuestionStatus(index) === 'answered' ? 'green' : 'blue'}
                  onClick={() => jumpToQuestion(index)}
                  sx={{ aspectRatio: 1, minWidth: 40 }}
                >
                  {index + 1}
                </Button>
              ))}
            </SimpleGrid>
            
            <Divider my="md" />
            
            <Stack spacing="xs">
              <Group spacing="xs">
                <Box sx={{ width: 16, height: 16, backgroundColor: '#228be6', borderRadius: 4 }} />
                <Text size="xs" color="dimmed">Current</Text>
              </Group>
              <Group spacing="xs">
                <Box sx={{ width: 16, height: 16, backgroundColor: '#51cf66', borderRadius: 4 }} />
                <Text size="xs" color="dimmed">Answered</Text>
              </Group>
              <Group spacing="xs">
                <Box sx={{ width: 16, height: 16, border: '1px solid #228be6', borderRadius: 4 }} />
                <Text size="xs" color="dimmed">Unanswered</Text>
              </Group>
            </Stack>
          </ScrollArea>
        </Box>

        {/* Main Question Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ScrollArea style={{ flex: 1 }}>
            <Container size="md" py="xl">
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Stack spacing="lg">
                  {/* Question Header */}
                  <Group position="apart" align="flex-start">
                    <Badge color="violet" variant="light" size="lg">
                      {questions[currentQuestion].topic}
                    </Badge>
                    <Text size="sm" color="dimmed">
                      Question {currentQuestion + 1} of {questions.length}
                    </Text>
                  </Group>

                  {/* Question */}
                  <Box>
                    <Title order={3} mb="xl" color="dark" sx={{ lineHeight: 1.4 }}>
                      {questions[currentQuestion].question}
                    </Title>

                    {/* Options */}
                    <Radio.Group
                      value={answers[questions[currentQuestion].id] || ''}
                      onChange={(value) => handleAnswerSelect(questions[currentQuestion].id, value)}
                      size="md"
                    >
                      <Stack spacing="md">
                        {questions[currentQuestion].options.map((option, index) => (
                          <Radio
                            key={index}
                            value={option}
                            label={
                              <Text size="md" sx={{ marginLeft: 8 }}>
                                {option}
                              </Text>
                            }
                            styles={{
                              root: {
                                padding: '12px',
                                border: '1px solid #e9ecef',
                                borderRadius: 8,
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#f8f9fa'
                                }
                              }
                            }}
                          />
                        ))}
                      </Stack>
                    </Radio.Group>
                  </Box>
                </Stack>
              </Card>
            </Container>
          </ScrollArea>

          {/* Navigation Footer */}
          <Box
            sx={(theme) => ({
              backgroundColor: 'white',
              borderTop: `1px solid ${theme.colors.gray[3]}`,
              padding: theme.spacing.md,
              flexShrink: 0
            })}
          >
            <Group position="apart">
              <Button
                variant="outline"
                leftIcon={<IconArrowLeft size={16} />}
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <Group spacing="md">
                <Button
                  leftIcon={<IconFlag size={16} />}
                  variant="light"
                  color="orange"
                >
                  Mark for Review
                </Button>
                <Button
                  rightIcon={<IconArrowRight size={16} />}
                  onClick={goToNext}
                  disabled={!answers[questions[currentQuestion].id]}
                >
                  Save & Next
                </Button>
              </Group>
            </Group>
          </Box>
        </Box>
      </Box>

      {/* Submit Confirmation Modal */}
      <Modal
        opened={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Test"
        centered
      >
        <Stack spacing="md">
          <Text>Are you sure you want to submit your test? You cannot change your answers after submission.</Text>
          <Text size="sm" color="dimmed">
            Answered: {Object.keys(answers).length} / {questions.length} questions
          </Text>
          <Group position="right" spacing="md">
            <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button color="red">
              Submit Test
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
};

export default TestInterface;