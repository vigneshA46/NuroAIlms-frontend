import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Container,
  Group,
  Stack,
  Text,
  Button,
  Radio,
  Paper,
  Badge,
  ActionIcon,
  Select,
  Flex,
  Box,
  UnstyledButton,
  rem,
} from '@mantine/core';
import {
  IconClock,
  IconChevronRight,
  IconBookmark,
  IconX,
  IconMaximize,
} from '@tabler/icons-react';
import Testquestion from './Testquestion';
import { useParams } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [testTime, setTestTime] = useState(39 * 60 + 56); // 39:56 in seconds
  const [sectionTime, setSectionTime] = useState(19 * 60 + 56); // 19:56 in seconds
  const [bookmarked, setBookmarked] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [section, setSection] = useState('Business Communication');
  const student = useStudent();

  const {testid}= useParams();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTestTime((prev) => (prev > 0 ? prev - 1 : 0));
      setSectionTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const questions = [
    {
      id: 1,
      text: 'Which of the following is an example of nonverbal communication?',
      options: [
        'Sending an email to a colleague.',
        'Writing a report.',
        'Making eye contact during a conversation.',
        'Giving a presentation using PowerPoint slides.',
      ],
    },
    // Add more questions as needed
  ];

  const totalQuestions = 15;

  return (
    <AppShell
      header={{ height: 70 }}
      padding={0}
      styles={{
        main: {
          background: '#f8f9fa',
          minHeight: '100vh',
        },
      }}
    >
      {/* Header */}
      <AppShell.Header style={{ background: '#1e293b', borderBottom: 'none' }}>
        <Group h="100%" px="xl" justify="space-between">
          <Group>
            <Box
              style={{
                width: 40,
                height: 40,
                background: 'white',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#1e293b',
              }}
            >
              N
            </Box>
            <Text size="lg" fw={600} c="white">
              NUROAI LMS
            </Text>
          </Group>

          <Stack gap={0} style={{ flex: 1, maxWidth: 500 }}>
            <Text size="xs" c="gray.4">
              Candidate: <Text span fw={500} c="white">{student.full_name}</Text>
            </Text>
            <Text size="xs" c="gray.4">
              Test: <Text span fw={500} c="white">Dhanalakshmi Srinivasan Engineering College, Perambalur Assessment Day - 7</Text>
            </Text>
          </Stack>

          <Group gap="md">
            <Paper px="md" py="xs" style={{ background: '#0f172a' }}>
              <Group gap="xs">
                <IconClock size={16} color="white" />
                <Text size="sm" fw={600} c="white">
                  Test
                </Text>
              </Group>
              <Text size="lg" fw={700} c="white" ta="center">
                {formatTime(testTime)}
              </Text>
            </Paper>

            <Paper px="md" py="xs" style={{ background: '#0f172a' }}>
              <Group gap="xs">
                <IconClock size={16} color="white" />
                <Text size="sm" fw={600} c="white">
                  Section
                </Text>
              </Group>
              <Text size="lg" fw={700} c="white" ta="center">
                {formatTime(sectionTime)}
              </Text>
            </Paper>

            <ActionIcon size="lg" variant="subtle" color="gray">
              <IconMaximize size={20} color="white" />
            </ActionIcon>

            <Button size="md" color="blue" variant="filled">
              Finish Test
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <Testquestion />
    </AppShell>
  );
}