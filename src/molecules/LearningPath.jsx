import React from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Button,
  Stack,
  Box,
  Grid,
  Avatar,
  rem,
  Progress,
  Anchor,
  ActionIcon,
  ThemeIcon,
} from '@mantine/core';
import { 
  IconX, 
  IconFile, 
  IconExternalLink,
  IconExclamationMark,
  IconChevronRight 
} from '@tabler/icons-react';

const LearningPath = () => {
  return (
      <Grid >
        {/* Left Column */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="xl">
            {/* Learning Paths Section */}
            <Card
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              h={300}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Title order={2} size="xl" fw={600} mb="lg" c="dark.7">
                Learning Paths
              </Title>
              
              <ThemeIcon
                size={80}
                radius="xl"
                variant="light"
                color="gray"
                mb="md"
              >
                <IconX size={40} />
              </ThemeIcon>
              
              <Text size="lg" c="dimmed" fw={500}>
                No Learning Paths
              </Text>
            </Card>

            {/* Courses in Progress Section */}
            <Box>
  <Group justify="space-between" align="center" mb="lg">
    <Title order={2} size="xl" fw={600} c="dark.7">
      Courses in Progress
    </Title>
    <Anchor size="sm" fw={500} c="blue" style={{ textDecoration: 'none' }}>
      View All
    </Anchor>
  </Group>

  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    style={{
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    }}
    styles={{
      root: {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    }}
  >
    {/* ✅ Responsive Group */}
    <Group
      gap="md"
      wrap="wrap"
      align="flex-start"
      style={{ flexDirection: 'row' }}
    >
      {/* Avatar */}
      <Avatar
        size={60}
        radius="md"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          flexShrink: 0,
        }}
      >
        <IconFile size={28} color="white" />
      </Avatar>

      {/* Course Title */}
      <Box
        style={{
          flex: 1,
          minWidth: '200px',
          textAlign: 'left',
        }}
      >
        <Text
          size="md"
          fw={600}
          c="dark.7"
          style={{ lineHeight: 1.4, wordBreak: 'break-word' }}
        >
          Career Transformation Program - Dhanalakshmi Srinivasan Engineering College | CSE | ECE
        </Text>
      </Box>

      {/* Button */}
      <Button
        variant="filled"
        color="blue"
        size="md"
        radius="md"
        rightSection={<IconChevronRight size={16} />}
        style={{
          flexShrink: 0,
          minWidth: 120,
        }}
      >
        View Course
      </Button>
    </Group>
  </Card>
</Box>

          </Stack>
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xl">
            {/* Global Platform Profiles Section */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="lg" fw={600} mb="lg" c="dark.7">
                Global Platform Profiles
              </Title>

              <Stack gap="md">
                {/* LeetCode Profile Alert */}
                <Card
                  padding="md"
                  radius="sm"
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                  }}
                >
                  <Group gap="sm" wrap="nowrap">
                    <ThemeIcon
                      size={24}
                      radius="xl"
                      color="red"
                      variant="light"
                      style={{ flexShrink: 0 }}
                    >
                      <IconExclamationMark size={14} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" c="dark.6" mb="xs">
                        You have not added your LeetCode username in your profile
                      </Text>
                      <Button
                        variant="filled"
                        color="blue"
                        size="xs"
                        radius="sm"
                        rightSection={<IconExternalLink size={12} />}
                      >
                        Add External Profile
                      </Button>
                    </Box>
                  </Group>
                </Card>

                {/* HackerRank Profile Alert */}
                <Card
                  padding="md"
                  radius="sm"
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                  }}
                >
                  <Group gap="sm" wrap="nowrap">
                    <ThemeIcon
                      size={24}
                      radius="xl"
                      color="red"
                      variant="light"
                      style={{ flexShrink: 0 }}
                    >
                      <IconExclamationMark size={14} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" c="dark.6" mb="xs">
                        You have not added your HackerRank username in your profile
                      </Text>
                      <Button
                        variant="filled"
                        color="blue"
                        size="xs"
                        radius="sm"
                        rightSection={<IconExternalLink size={12} />}
                      >
                        Add External Profile
                      </Button>
                    </Box>
                  </Group>
                </Card>
              </Stack>
            </Card>

            {/* Overall Performance Section */}
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={3} size="lg" fw={600} mb="lg" c="dark.7">
                Overall Performance
              </Title>

              <Stack gap="md">
                {/* Technical Skills Progress */}
                <Box>
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <Text size="sm" fw={500} c="blue">
                        Technical Skills
                      </Text>
                      <ActionIcon size="xs" variant="transparent">
                        <IconChevronRight size={12} />
                      </ActionIcon>
                    </Group>
                    <Text size="sm" fw={600} c="dark.7">
                      38%
                    </Text>
                  </Group>
                  <Progress 
                    value={38} 
                    size="sm" 
                    radius="xl"
                    color="teal"
                    mb="xs"
                  />
                </Box>

                {/* Java Progress */}
                <Box>
                  <Group justify="space-between" mb="xs">
                    <Group gap="xs">
                      <Text size="sm" fw={500} c="blue">
                        Java
                      </Text>
                      <ActionIcon size="xs" variant="transparent">
                        <IconChevronRight size={12} />
                      </ActionIcon>
                    </Group>
                    <Text size="sm" fw={600} c="dark.7">
                      25%
                    </Text>
                  </Group>
                  <Progress 
                    value={25} 
                    size="sm" 
                    radius="xl"
                    color="blue"
                  />
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
  );
};

export default LearningPath;