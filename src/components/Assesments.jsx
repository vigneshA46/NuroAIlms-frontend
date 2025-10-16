import React, { useEffect, useState } from 'react';
import {
  Box,
  Title,
  Text,
  Button,
  Card,
  Group,
  Stack,
  SimpleGrid,
  ThemeIcon,
  Badge,
  Container,
  Divider,
  Flex
} from '@mantine/core';
import {
  IconClipboardCheck,
  IconBrain,
  IconCertificate,
  IconClipboardText,
  IconCircleCheck,
  IconHelpCircle,
  IconClock
} from '@tabler/icons-react';
import SingleAssessment from '../molecules/SingleAssessment';
import AssessmentDetails from '../molecules/AssessmentDetails';
import axios from 'axios';
import { useStudent } from '../context/StudentContext';
import { callApi } from '../context/api';

const Assessments = () => {

  const [testData, setTestData] = useState([]);

  const {student} = useStudent();

  const assessmentStats = [
    {
      title: 'Tests Assigned',
      value: '14',
      icon: IconClipboardText,
      color: 'violet',
      bgColor: '#f8f9ff'
    },
    {
      title: 'Tests Completed',
      value: '2',
      icon: IconCircleCheck,
      color: 'green',
      bgColor: '#f0fdf4'
    },
    {
      title: 'Questions Attempted',
      value: '90',
      icon: IconHelpCircle,
      color: 'blue',
      bgColor: '#f0f9ff'
    },
    {
      title: 'Total Time Spent',
      value: '27 mins',
      icon: IconClock,
      color: 'orange',
      bgColor: '#fffbeb'
    }
  ];
 


useEffect(() => {
    const fetchTests = async () => {
      try {
        if (!student?.college_id || !student?.department_id) return;

        const res = await callApi("GET",
          `/test/college/${student.college_id}/department/${student.department_id}`
        );

        // API returns { count, tests: [] }
        setTestData(res.data.tests || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    };

    fetchTests();
  }, [student]);


  return (
    <Container size="xl" p={0}>
      <Stack spacing="xl">
        {/* Hero Section */}
        <Card
        pl="2.5rem"
        radius={10}
        style={{
    background: "linear-gradient(135deg, rgba(192, 36, 253, 1), rgba(184, 4, 255, 0.93))",
    color: "white",
  }}
          sx={(theme) => ({
            borderRadius: theme.radius.lg,
            padding: theme.spacing.xl,
            color: 'white'
          })}
        >
          <Flex align="center" justify="flex-start" gap="1rem" spacing="md" mb="md">
            <ThemeIcon size={40} radius="md" color="rgba(255,255,255,0.2)" variant="light">
              <IconClipboardCheck size={24} color="#fff" />
            </ThemeIcon>
            <Title order={1} color="white" weight={700}>
              Assessments
            </Title>
          </Flex>
          
          <Text size="lg" mb="xl" sx={{ maxWidth: '800px', lineHeight: 1.6 }} style={{textAlign:'left'}}>
            Take your knowledge to the next level with our comprehensive assessment tools. Track 
            your progress, identify strengths, and improve on weaknesses with personalized 
            feedback.
          </Text>

          <Group spacing="md">
            <Button
              leftIcon={<IconBrain size={16} />}
              variant="white"
              color="violet"
              size="md"
              radius="md"
            >
              Personalized Learning
            </Button>
            <Button
              leftIcon={<IconCertificate size={16} />}
              variant="outline"
              color="white"
              size="md"
              radius="md"
              styles={{
                root: {
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.5)'
                  }
                }
              }}
            >
              Skill Verification
            </Button>
          </Group>
        </Card>

        {/* Assessment Activity Section */}
        <Box>
          <Title style={{textAlign:'left'}} order={3} mb="xl" color="dark">
            Assessment Activity
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
            {assessmentStats.map((stat, index) => (
              <Card
                key={index}
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
                sx={{ backgroundColor: stat.bgColor, border: 'none' }}
              >
                <Flex align="center" gap='md' >
                <Group position="apart" align="flex-start" mb="md">
                  <ThemeIcon size={40} radius="md" color={stat.color} variant="light">
                    <stat.icon size={20} />
                  </ThemeIcon>
                </Group>
                
                <Text size="md" color="#000" fw="700" mb="xs">
                  {stat.title}
                </Text>
                </Flex>
                
                
                <Text
                style={{textAlign:'left'}}
                pl="xl"
                  size="30px" 
                  fw="600"
                  color={stat.color === 'orange' ? 'orange' : 'dark'}
                  sx={{ fontSize: '2rem' }}
                >
                  {stat.value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* My Tests Section */}
        {/* <Box>
          <Group position="apart" align="center" mb="lg">
            <Title order={3} color="dark">
              My Tests
            </Title>
            <Badge variant="light" color="gray" size="sm">
              Coming Soon
            </Badge>
          </Group>
          
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack align="center" spacing="md" py="xl">
              <ThemeIcon size={64} radius="xl" variant="light" color="gray">
                <IconClipboardText size={32} />
              </ThemeIcon>
              <div style={{ textAlign: 'center' }}>
                <Text weight={600} size="lg" mb="xs" color="dark">
                  No Tests Available
                </Text>
                <Text size="sm" color="dimmed" mb="md">
                  Your assigned tests will appear here once available.
                </Text>
              </div>
            </Stack>
          </Card>
        </Box> */}
        <Title order={3} fw="600" style={{textAlign:'left'}} >My Tests
        </Title>  
     <SimpleGrid
      cols={3}              // 3 per row by default
      spacing="lg"          // spacing between cards
      breakpoints={[
        { maxWidth: 'lg', cols: 3, spacing: 'md' }, // large screens
        { maxWidth: 'md', cols: 2, spacing: 'sm' }, // medium screens
        { maxWidth: 'sm', cols: 1, spacing: 'sm' }, // small screens (mobile)
      ]}
    >
      {testData.length > 0 ? (
        testData.map((item, index) => (
          <SingleAssessment
            key={item.id || index}
            status={
              item.start_date && item.end_date
                ? "Scheduled"
                : "Draft"
            }
            id={item.id}
            startDate={item.start_date}
            endDate={item.end_date}
            expired={item.end_date && new Date(item.end_date) < new Date()}
            title={item.title}
            questions={item.max_questions}
            duration={item.total_time}
          />
        ))
      ) : (
        <p>No tests available.</p>
      )}
    </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Assessments;