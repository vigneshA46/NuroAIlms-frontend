import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Radio,
  Stack,
  UnstyledButton,
  Text,
  Modal,
} from '@mantine/core';
import { IconBookmark, IconChevronRight, IconX } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { useStudent } from '../context/StudentContext';

const TestPage = () => {

  const [warningModal, setWarningModal] = useState(false);
const [violationCount, setViolationCount] = useState(0);
  const { testid } = useParams(); 
  const navigate = useNavigate();
  const { student } = useStudent();
  const studentId = student.id;

  const [modalOpened, setModalOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem(`test_answers_${testid}`)) || {}
  );
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
  // Force Fullscreen
  const goFullScreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };
  goFullScreen();

  // Detect if user switches tab / minimizes
  const handleVisibilityChange = () => {
    if (document.hidden) {
      setViolationCount((prev) => prev + 1);
      setWarningModal(true);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
}, []);


  // Fetch question by index
  const fetchQuestion = async (index) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/question/${testid}/question/${index}`
      );
      setQuestionData(data.question);
      setTotalQuestions(data.total);
      // restore previously selected answer if exists
      setSelectedAnswer(answers[data.question.id] || '');
    } catch (err) {
      console.error(err);
    }
  };

  // Save answer
  const handleSaveNext = () => {
    if (!questionData) return;

    const updatedAnswers = {
      ...answers,
      [questionData.id]: selectedAnswer,
    };
    setAnswers(updatedAnswers);
    localStorage.setItem(`test_answers_${testid}`, JSON.stringify(updatedAnswers));

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setModalOpened(true); // last question → ask finish
    }
  };

  // Compute score at finish
  const calculateScore = async () => {
    let finalScore = 0;
    for (let i = 0; i < totalQuestions; i++) {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/question/${testid}/question/${i}`
        );
        const q = data.question;
        if (answers[q.id] === q.correct_option) {
          finalScore++;
        }
      } catch (err) {
        console.error(err);
      }
    }
    return finalScore;
  };

  // Finish Test
  const handleFinishTest = async () => {
    try {
      const finalScore = await calculateScore();

      await axios.post('http://localhost:3000/submission/test', {
        student_id: studentId,
        test_id: testid,
        score: finalScore,
      });

      localStorage.removeItem(`test_answers_${testid}`);
      alert(`Test submitted! Your score: ${finalScore}`);
      navigate('/home/assessments');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestion(currentIndex);
  }, [currentIndex]);

  if (!questionData) return <Text>Loading...</Text>;

  return (
    <Box style={{ display: 'flex', height: 'calc(100vh - 70px)' }} mt={50}>
      {/* Left Panel - Question */}
      <Box style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <Paper p="xl" shadow="sm" radius="md" style={{ minHeight: '100%' }}>
          <Stack gap="xl">
            <Group justify="space-between" align="flex-start">
              <Group align="flex-start">
                <Text size="lg" fw={600}>
                  Question {currentIndex + 1}
                </Text>
                <Badge color="gray" variant="light" size="sm">
                  1 Mark
                </Badge>
              </Group>
              <Button
                variant="subtle"
                color="blue"
                leftSection={<IconBookmark size={16} />}
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? 'Bookmarked' : 'Revisit Later'}
              </Button>
            </Group>

            <Text style={{ textAlign: 'left' }} size="md">
              {questionData.question_text}
            </Text>

            <Stack gap="md" mt="xl">
              <Text style={{ textAlign: 'left' }} fw={500} mb="sm">
                Choose the best option
              </Text>
              <Radio.Group value={selectedAnswer} onChange={setSelectedAnswer}>
                <Stack gap="md">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <Paper
                      key={opt}
                      p="md"
                      withBorder
                      style={{
                        cursor: 'pointer',
                        border:
                          selectedAnswer === opt
                            ? '2px solid #228be6'
                            : '1px solid #dee2e6',
                        background:
                          selectedAnswer === opt ? '#f0f7ff' : 'white',
                      }}
                      onClick={() => setSelectedAnswer(opt)}
                    >
                      <Radio
                        value={opt}
                        label={questionData[`option_${opt.toLowerCase()}`]}
                        styles={{
                          label: { cursor: 'pointer', width: '100%' },
                        }}
                      />
                    </Paper>
                  ))}
                </Stack>
              </Radio.Group>
            </Stack>

            <Group justify="flex-end" mt="xl">
              <Button
                variant="outline"
                color="red"
                leftSection={<IconX size={16} />}
                onClick={() => setSelectedAnswer('')}
              >
                Clear Response
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Box>

      {/* Right Panel - Navigation */}
      <Box
        style={{
          width: 320,
          background: 'white',
          borderLeft: '1px solid #e9ecef',
          padding: '24px',
          overflowY: 'auto',
        }}
      >
        <Stack gap="lg">
          <Flex justify="space-between" align="center">
            <Text size="sm" c="dimmed">
              Answered {Object.keys(answers).length}/{totalQuestions}
            </Text>
            <ActionIcon variant="subtle" size="sm">
              <IconChevronRight size={16} />
            </ActionIcon>
          </Flex>

          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '12px',
            }}
          >
            {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
              (num) => (
                <UnstyledButton
                  key={num}
                  onClick={() => setCurrentIndex(num - 1)}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border:
                      currentIndex + 1 === num
                        ? '2px solid #228be6'
                        : '1px solid #dee2e6',
                    borderRadius: '8px',
                    background:
                      currentIndex + 1 === num ? '#228be6' : 'white',
                    color:
                      currentIndex + 1 === num ? 'white' : '#495057',
                    fontWeight: 600,
                    fontSize: rem(14),
                    transition: 'all 0.2s',
                  }}
                >
                  {num}
                </UnstyledButton>
              )
            )}
          </Box>

          <Button
            fullWidth
            size="lg"
            variant="filled"
            color="green"
            mt="auto"
            onClick={handleSaveNext}
          >
            {currentIndex + 1 === totalQuestions
              ? 'Finish Test'
              : 'Save & Next'}
          </Button>
        </Stack>
      </Box>

      {/* Finish Test Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Confirm Submission"
        centered
      >
        <Text>Are you sure you want to finish this test?</Text>
        <Group position="right" mt="md">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setModalOpened(false)}
          >
            No
          </Button>
          <Button
            color="red"
            onClick={() => {
              handleFinishTest();
              setModalOpened(false);
            }}
          >
            Yes
          </Button>
        </Group>
      </Modal>
      {/* Warning Modal */}
<Modal
  opened={warningModal}
  onClose={() => setWarningModal(false)}
  title="Warning"
  centered
>
  <Text>You switched tabs or minimized the test. Please stay on this screen!</Text>
  <Text mt="sm" c="red">
    Warning Count: {violationCount}
  </Text>
  <Group position="right" mt="md">
    <Button color="blue" onClick={() => setWarningModal(false)}>
      Ok
    </Button>
  </Group>
</Modal>
    </Box>
  );
};

export default TestPage;
