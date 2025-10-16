import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Stack,
  Container,
  Paper,
  Title,
  Text,
  Badge,
  Group,
  Divider,
  Accordion,
  Code,
  Grid,
  Loader,
  Center,
  Alert,
  Card,
  Box,
  ScrollArea,
  Tooltip,
  ActionIcon,
  CopyButton,
  rem
} from "@mantine/core";
import { useParams } from "react-router-dom";
import {
  IconCalendar,
  IconCode,
  IconUsers,
  IconFileCode,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconCopy
} from "@tabler/icons-react";
import { callApi } from "../context/api";

const CodingChallengeDetails = () => {
  const [challengeData, setChallengeData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { challengeid } = useParams();

  useEffect(() => {
    const fetchCodingData = async () => {
      try {
        const res = await callApi("GET",
          `/coding/admin/${challengeid}`
        );
        setChallengeData(res.data);
      } catch (err) {
        console.error("Error fetching coding data:", err);
        setError("Failed to fetch challenge data.");
      }
    };

    const fetchAllSubmissions = async () => {
      try {
        const res1 = await callApi("GET",
          `/submission/submission/${challengeid}`
        );
        setSubmissions(res1.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError("Failed to fetch submissions.");
      }
    };

    if (challengeid) {
      Promise.all([fetchCodingData(), fetchAllSubmissions()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [challengeid]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "green",
      Medium: "yellow",
      Hard: "red"
    };
    return colors[difficulty] || "gray";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          variant="filled"
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Challenge Header */}
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <div>
                <Title order={1} mb="xs">
                  {challengeData?.title}
                </Title>
                <Group gap="xs">
                  <Badge
                    size="lg"
                    color={getDifficultyColor(challengeData?.difficulty)}
                    variant="filled"
                  >
                    {challengeData?.difficulty}
                  </Badge>
                  <Badge size="lg" variant="light" color="blue">
                    Challenge ID: {challengeData?.id}
                  </Badge>
                </Group>
              </div>
              <Badge size="xl" color="cyan" variant="light" leftSection={<IconUsers size={16} />}>
                {submissions.length} Submissions
              </Badge>
            </Group>

            <Divider my="sm" />

            <Text size="md" c="dimmed" style={{ lineHeight: 1.6 }}>
              {challengeData?.description}
            </Text>

            <Grid gutter="md" mt="md">
              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card withBorder radius="md" p="md">
                  <Group gap="xs">
                    <IconCalendar size={20} color="var(--mantine-color-blue-6)" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        Start Date
                      </Text>
                      <Text size="sm" fw={600}>
                        {formatDate(challengeData?.start_date)}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card withBorder radius="md" p="md">
                  <Group gap="xs">
                    <IconClock size={20} color="var(--mantine-color-orange-6)" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        End Date
                      </Text>
                      <Text size="sm" fw={600}>
                        {formatDate(challengeData?.end_date)}
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card withBorder radius="md" p="md">
                  <Group gap="xs">
                    <IconCode size={20} color="var(--mantine-color-green-6)" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        Languages
                      </Text>
                      <Group gap={4}>
                        {challengeData?.language_options?.map((lang) => (
                          <Badge key={lang} size="sm" variant="dot">
                            {lang}
                          </Badge>
                        ))}
                      </Group>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                <Card withBorder radius="md" p="md">
                  <Group gap="xs">
                    <IconFileCode size={20} color="var(--mantine-color-grape-6)" />
                    <div>
                      <Text size="xs" c="dimmed" fw={500}>
                        Departments
                      </Text>
                      <Text size="sm" fw={600}>
                        {challengeData?.department_ids?.length || 0} Selected
                      </Text>
                    </div>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        {/* Submissions Section */}
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Title order={2} mb="lg">
            Student Submissions
          </Title>

          {submissions.length === 0 ? (
            <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light">
              No submissions yet for this challenge.
            </Alert>
          ) : (
            <Accordion variant="separated" radius="md">
              {submissions.map((submission) => (
                <Accordion.Item key={submission.id} value={`submission-${submission.id}`}>
                  <Accordion.Control>
                    <Group justify="space-between" wrap="wrap">
                      <Group>
                        <Text fw={600}>Submission #{submission.id}</Text>
                        <Badge variant="light" color="violet">
                          Student ID: {submission.student_id}
                        </Badge>
                        <Badge variant="outline" color="blue">
                          {submission.language}
                        </Badge>
                      </Group>
                      <Group gap="xs">
                        {submission.ai_score && (
                          <Badge color="teal" variant="filled" leftSection={<IconCheck size={12} />}>
                            Score: {submission.ai_score}
                          </Badge>
                        )}
                        <Text size="sm" c="dimmed">
                          {formatDate(submission.submitted_at)}
                        </Text>
                      </Group>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="md">
                      {submission.feedback && (
                        <Box>
                          <Text size="sm" fw={600} mb="xs">
                            AI Feedback:
                          </Text>
                          <Alert color="blue" variant="light">
                            {submission.feedback}
                          </Alert>
                        </Box>
                      )}

                      <Box>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm" fw={600}>
                            Submitted Code:
                          </Text>
                          <CopyButton value={submission.code} timeout={2000}>
                            {({ copied, copy }) => (
                              <Tooltip label={copied ? "Copied" : "Copy code"} withArrow position="right">
                                <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                                  {copied ? (
                                    <IconCheck style={{ width: rem(16) }} />
                                  ) : (
                                    <IconCopy style={{ width: rem(16) }} />
                                  )}
                                </ActionIcon>
                              </Tooltip>
                            )}
                          </CopyButton>
                        </Group>
                        <ScrollArea>
                          <Code block style={{ whiteSpace: "pre" }}>
                            {submission.code}
                          </Code>
                        </ScrollArea>
                      </Box>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Paper>
      </Stack>
    </Container>
  );
};

export default CodingChallengeDetails;