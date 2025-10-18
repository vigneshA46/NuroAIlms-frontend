import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  Text, 
  Select, 
  Button, 
  Group, 
  Stack,
  Badge,
  Box,
  ScrollArea,
  Loader,
  Grid,
  Paper,
  Divider,
  ThemeIcon,
  Alert,
  UnstyledButton
} from '@mantine/core';
import { Editor } from '@monaco-editor/react';
import { Calendar, Clock, Code2, Play, TestTube, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useStudent } from '../context/StudentContext';
import { callApi } from '../context/api';
import { IconArrowNarrowLeft, IconX } from '@tabler/icons-react';
import { useNotifications } from '@mantine/notifications';
import toast from 'react-hot-toast';



const CodeEditor = () => {
  const {student} = useStudent();
  const notifications = useNotifications();

  const navigation = useNavigate();
 const { challengeid } = useParams();
const [challengeData, setChallengeData] = useState({}); // <-- should be object, not array
const [language, setLanguage] = useState('python'); // initialize safely
const [code, setCode] = useState('');
const [result, setResult] = useState(null);
const [output, setOutput] = useState('');
const [loading, setLoading] = useState(false);
const [isExpired, setIsExpired] = useState(false);



useEffect(() => {
  const fetchChallengeData = async () => {
    try {
      const res = await callApi("GET",`/coding/admin/${challengeid}`);
      const data = res.data;
      setChallengeData(data);
      setLanguage(data?.language_options?.[0]?.toLowerCase() || 'python'); // set after fetch
       if (data?.end_date) {
    const endDate = new Date(data.end_date); // assuming end_date is a valid date string
    const now = new Date();

    setIsExpired(now > endDate); // true if current date is after end date
  }
    } catch (error) {
      console.error('Error fetching challenge:', error);
    }
  };
  fetchChallengeData();
}, [challengeid]);

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'gray';
    }
  };

   // Convert language options to select data
const languageOptions = (challengeData?.language_options || []).map((lang) => ({
  value: lang.toLowerCase(),
  label: lang,
}));



const handleEvaluate = async () => {
  try {
    // 1️⃣ Submit student code first
    const submitRes = await callApi("POST", "/coding/student/submit", {
      challenge_id: challengeid,
      student_id: student.id,
      language: language,
      code: code,
    });

    // 2️⃣ Call AI review API
    const reviewRes = await callApi("POST", "/coding/admin/review", {
      title: challengeData.title,          // make sure you have the title in your state
      description: challengeData.description, // make sure you have description in state
      studentCode: code,
      student_id: student.id,
      challenge_id: challengeid,
    });

    console.log("AI Review Response:", reviewRes);

    // 3️⃣ Navigate after everything is done
    navigation("/home/studentcoding");

    // Optional: show a notification
    notifications.show({
      title: "Submission Reviewed",
      message: `AI Score: ${reviewRes.score}, Feedback: ${reviewRes.feedback}`,
      color: "green",
    });

  } catch (error) {
    console.error("Error submitting or reviewing code:", error);

   toast.success(
      `AI Score: ${reviewRes.score}\nFeedback: ${reviewRes.feedback}`
    );

  }
};


  return (
    <Container size="xl" py="xl">
      <Stack spacing="lg">
            <UnstyledButton style={{display:'flex'}}  onClick={()=>navigation('/home/studentcoding')} >
                  <IconArrowNarrowLeft />
                  <Text>Back</Text>
                </UnstyledButton>
        {/* Challenge Header */}
        <Paper shadow="xs" p="xl" radius="md" withBorder>
          <Stack spacing="md">
            <Group position="apart" align="flex-start">
              <Box style={{ flex: 1 }}>
                <Group spacing="sm" mb="xs">
                  <ThemeIcon size="lg" radius="md" variant="light" color="blue">
                    <Code2 size={20} />
                  </ThemeIcon>
                  <Text size="xl" weight={700}>
                    {challengeData?.title}
                  </Text>
                  <Badge 
                    color={getDifficultyColor(challengeData?.difficulty)} 
                    variant="filled"
                    size="lg"
                  >
                    {challengeData?.difficulty}
                  </Badge>
                </Group>
                <Text style={{textAlign:'left'}} size="md" color="dimmed" mt="xs">
                  {challengeData?.description}
                </Text>
              </Box>
            </Group>

            <Divider />

            {/* Challenge Meta Info */}
            <Grid gutter="md">
              <Grid.Col span={6}>
                <Group spacing="xs">
                  <ThemeIcon size="sm" variant="light" color="teal">
                    <Calendar size={16} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" weight={500} color="dimmed">Start Date</Text>
                    <Text size="sm">{formatDate(challengeData?.start_date)}</Text>
                  </Box>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group spacing="xs">
                  <ThemeIcon size="sm" variant="light" color="orange">
                    <Clock size={16} />
                  </ThemeIcon>
                  <Box>
                    <Text size="xs" weight={500} color="dimmed">End Date</Text>
                    <Text size="sm">{formatDate(challengeData?.end_date)}</Text>
                  </Box>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Code Editor Section */}

        {
          isExpired ?
          <Alert
            icon={<IconX size={16} />} 
            color="gray" 
            variant="light"
            mb="xl"
            styles={{
              root: {
                backgroundColor: '#f8f9fa',
                border: 'none',
              }
            }}
          >
          <Text  fw="500" style={{textAlign:'left'}} color="dark">
                        Challenge has expired!
                      </Text></Alert> :
                  <Paper shadow="xs" p="lg" radius="md" withBorder>
          <Stack spacing="md">
            <Group position="apart">
              <Text size="lg" weight={600}>Code Editor</Text>
              <Select
                value={language}
                onChange={setLanguage}
                data={languageOptions  || ["python","java"]}
                size="sm"
                style={{ width: 200 }}
                icon={<Code2 size={16} />}
              />
            </Group>

            <Box 
              style={{ 
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <Editor
                height="400px"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </Box>

            {/* Action Buttons */}
            <Group position="apart">
              <Button 
                leftIcon={<ArrowLeft size={18} />}
                variant="subtle"
                onClick={()=>navigation('/home/studentcoding')}
              >
                Back to Challenges
              </Button>
              <Group>
               
                <Button 
                  leftIcon={<Play size={18} />}
                  onClick={handleEvaluate}
                  color="blue"
                >
                  Submit & Evaluate
                </Button>
              </Group>
            </Group>
          </Stack>
        </Paper>
        }



        {/* Evaluation Result */}
        {result && (
          <Paper 
            shadow="sm" 
            p="lg" 
            radius="md" 
            withBorder
            style={{
              borderColor: result.status === "error" ? '#fa5252' : '#51cf66',
              borderWidth: '2px'
            }}
          >
            <Group spacing="sm">
              <ThemeIcon 
                size="lg" 
                radius="xl" 
                color={result.status === "error" ? "red" : "green"}
                variant="light"
              >
                {result.status === "error" ? <XCircle size={20} /> : <CheckCircle size={20} />}
              </ThemeIcon>
              <Box>
                <Text size="sm" weight={500} color="dimmed">
                  {result.status === "error" ? "Evaluation Failed" : "Evaluation Successful"}
                </Text>
                <Text size="md" weight={600} color={result.status === "error" ? "red" : "green"}>
                  {result.message}
                </Text>
              </Box>
            </Group>
          </Paper>
        )}

        {/* Test Code Output */}
        {output && (
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Stack spacing="sm">
              <Group spacing="xs">
                <ThemeIcon size="md" variant="light" color="grape">
                  <Code2 size={18} />
                </ThemeIcon>
                <Text size="lg" weight={600}>Terminal Output</Text>
              </Group>
              <ScrollArea style={{ height: 200 }}>
                <Box
                  component="pre"
                  style={{
                    background: '#1a1b26',
                    color: '#a9b1d6',
                    padding: '16px',
                    borderRadius: '8px',
                    margin: 0,
                    fontFamily: 'Monaco, Consolas, monospace',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    overflow: 'auto'
                  }}
                >
                  {output}
                </Box>
              </ScrollArea>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default CodeEditor