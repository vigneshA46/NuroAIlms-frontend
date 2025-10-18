import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  Badge,
  Button,
  SimpleGrid,
  Box,
  ThemeIcon,
  Alert,
  Divider,
  Flex,
  Anchor,
  UnstyledButton
} from '@mantine/core';
import {
  IconClock,
  IconCheck,
  IconClipboardText,
  IconX,
  IconChartBar,
  IconArrowLeft,
  IconCalendar
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InstructionsBlock from './InstructionsBlock';
import { useStudent } from '../context/StudentContext';
import { callApi } from '../context/api';

const AssessmentDetails = () => {
  const navigation = useNavigate();
  const {testid} = useParams();
  const [testdata , settestdata] = useState([]);
  const [testend , settestend] = useState();
  const [istestended , setistestended] = useState(false);
  const [isattempted , setisattempted]= useState(true);
  const {student} = useStudent();
  const studentid = student.id;
  const [rresult , setresult] = useState([])
 
  useEffect(()=>{
    const fetchsingletestdata =async ()=>{
      const res = await callApi("GET",`/test/${testid}`);
      settestdata(res.data);
      settestend(res.data.end_date);
       const now = new Date();
       const expired= new Date(testend) < now;
       setistestended(expired);
    }
    fetchsingletestdata();
  },[]);

    const instructions = [
    "Read all questions carefully before answering.",
    "Do not refresh or close the window during the test.",
    "You have 60 minutes to complete the test.",
    "Click submit once done, you cannot reattempt.",
  ];
const handleStart = () => {
    navigation(`/testpage/${testid}`)
    // here you can toggle UI to show questions instead
  };

 useEffect(() => {
  const getisattempted = async () => {
    try {
      const res = await callApi("GET",
        `/submission/${testid}/student/${studentid}/attempted`
      );

      setisattempted(res.data.attempted);

      // ✅ use res.data.attempted, not state
      if (res.data.attempted) {
        const res1 = await callApi("GET",
          `/submission/${testid}/student/${studentid}/result`
        );
        setresult(res1.data);
      }
    } catch (err) {
      console.error("Error fetching attempt/result:", err);
    }
  };

  getisattempted();
}, [testid, studentid]); // ✅ add dependencies

 

  return (
    <Container size="xl" p={0}>
      <Flex justify="flex-start">
  <UnstyledButton onClick={() => navigation('/home/assessments')}>
    <Flex align="center" gap="sm" mb={10}>
      <IconArrowLeft size={20} color="#000" />
      <Text size="md" fw={600}>
        Back
      </Text>
    </Flex>
  </UnstyledButton>
</Flex>
      <Stack spacing="xl">
        {/* Header Section */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Background Elements */}
          <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '400px',
              height: '300px',
              opacity: 0.1,
              pointerEvents: 'none',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '20px',
                right: '100px',
                width: '60px',
                height: '60px',
                backgroundColor: '#fbbf24',
                borderRadius: '50%'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '80px',
                right: '20px',
                width: '120px',
                height: '80px',
                backgroundColor: '#10b981',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }
            }}
          />
          
          <Group position="apart" align="flex-start" mb="xl">
            <Box sx={{ flex: 1, maxWidth: '600px' }}>
              <Title style={{textAlign:'left'}} order={1} size="h1" weight={700} mb="lg" color="dark">
                {testdata.title}
              </Title>
              
              <SimpleGrid cols={{ base: 1, sm: 5 }} spacing="lg" mb="xl">
  {/* Duration */}
  <Group spacing="sm">
    <ThemeIcon size={32} radius="md" color="blue" variant="light">
      <IconClock size={16} />
    </ThemeIcon>
    <Box>
      <Text size="xs" color="dimmed" style={{ textAlign: "left" }} weight={500} transform="uppercase">
        Duration
      </Text>
      <Text weight={600} color="dark">
        {testdata.total_time || "N/A"} minutes
      </Text>
    </Box>
  </Group>

  {/* Total Marks */}
  <Group spacing="sm">
    <ThemeIcon size={32} radius="md" color="green" variant="light">
      <IconCheck size={16} />
    </ThemeIcon>
    <Box>
      <Text size="xs" color="dimmed" style={{ textAlign: "left" }} weight={500} transform="uppercase">
        Total Marks
      </Text>
      <Text weight={600} color="dark">
        {testdata.max_questions || "N/A"} marks
      </Text>
    </Box>
  </Group>

  {/* Questions */}
  <Group spacing="sm">
    <ThemeIcon size={32} radius="md" color="violet" variant="light">
      <IconClipboardText size={16} />
    </ThemeIcon>
    <Box>
      <Text size="xs" color="dimmed" style={{ textAlign: "left" }} weight={500} transform="uppercase">
        Questions
      </Text>
      <Text weight={600} color="dark">
        {testdata.max_questions || "N/A"} total
      </Text>
    </Box>
  </Group>

  {/* Start Date */}
  <Group spacing="sm">
    <ThemeIcon size={32} radius="md" color="orange" variant="light">
      <IconCalendar size={16} />
    </ThemeIcon>
    <Box>
      <Text size="xs" color="dimmed" style={{ textAlign: "left" }} weight={500} transform="uppercase">
        Start Date
      </Text>
      <Text weight={600} color="dark">
        {testdata.start_date ? new Date(testdata.start_date).toLocaleDateString() : "Not set"}
      </Text>
    </Box>
  </Group>

  {/* End Date */}
  <Group spacing="sm">
    <ThemeIcon size={32} radius="md" color="red" variant="light">
      <IconCalendar size={16} />
    </ThemeIcon>
    <Box>
      <Text size="xs" color="dimmed" style={{ textAlign: "left" }} weight={500} transform="uppercase">
        End Date
      </Text>
      <Text weight={600} color="dark">
        {testdata.end_date ? new Date(testdata.end_date).toLocaleDateString() : "Not set"}
      </Text>
    </Box>
  </Group>
</SimpleGrid>

            </Box>
          </Group>

          {/* Test Status Alert */}
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
            {
              istestended ?  <Text  fw="500" style={{textAlign:'left'}} color="dark">
              Test has expired!
            </Text> : 
             <Text fw="500" style={{textAlign:'left'}} color="dark">
              Test is live now attend the test!
            </Text>

            }
           
          </Alert>

          
        </Card>
        </Box>

        {/* Test Attempts Section */}
        {
          isattempted ? <Box>
          <Title style={{textAlign:'left'}}fw="600" order={3} mb="xl" color="dark">
            Test Attempts
          </Title>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack spacing="lg">
             
              <Flex  align="center" justify="space-between">
                <Box>
                  <Title style={{textAlign:'left'}} order={3} size="h4" fw="600" color="dark">
                    Attempt #1
                  </Title>
                  <Text style={{textAlign:'left'}} size="sm" color="dimmed" >
                    {rresult.submitted_at}
                  </Text>
                  <Text style={{textAlign:'left'}} size="sm" color="dimmed" fs="italic">
                    The test ended with the click of the submit button
                  </Text>
                </Box>
                
                <Button 
                  leftIcon={<IconChartBar size={16} />}
                  size="sm"
                  radius="md"
                >
                  View Statistics
                </Button>
              </Flex>

              <Divider />

              
              <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
                <Box style={{borderRadius:'10px'}} bg="#ecececff" p="1rem" >
                  <Text size="sm" style={{textAlign:'left'}} c="#272727ff" fw="600" transform="uppercase" mb="xs">
                    Status
                  </Text>
                  <Text c="green" size='lg' fw="600" style={{textAlign:'left'}} >Completed</Text>
                </Box>

                <Box style={{borderRadius:'10px'}} bg="#ecececff" p="1rem" >
                  <Text size="sm" style={{textAlign:'left'}} c="#272727ff" fw="600" transform="uppercase" mb="xs">
                    Score
                  </Text>
                  <Text c="#000" size='lg' fw="600" style={{textAlign:'left'}} >{rresult.score}</Text>
                </Box>

                {/* <Box style={{borderRadius:'10px'}} bg="#ecececff" p="1rem" >
                  <Text size="sm" style={{textAlign:'left'}} c="#272727ff" fw="600" transform="uppercase" mb="xs">
                    Unanswered
                  </Text>
                  <Text c="#000" size='lg' fw="600" style={{textAlign:'left'}} >0</Text>
                </Box>

                <Box style={{borderRadius:'10px'}} bg="#ecececff" p="1rem" >
                  <Text size="sm" style={{textAlign:'left'}} c="#272727ff" fw="600" transform="uppercase" mb="xs">
                    Marked
                  </Text>
                  <Text c="#000" size='lg' fw="600" style={{textAlign:'left'}} >0</Text>
                </Box> */}
              </SimpleGrid>
            </Stack>
          </Card>
        </Box> : <InstructionsBlock instructions={instructions} onStart={handleStart} /> 
        }
        
      </Stack>
    </Container>
  );
};

export default AssessmentDetails;
 