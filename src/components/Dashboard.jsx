import { ActionIcon, Anchor, Box, Button, Card, Center, Divider, Grid, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconBell, IconCircleCheck, IconClock, IconEdit, IconHelpCircle } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TestInterface from '../molecules/TestInterface';
import LearningPath from '../molecules/LearningPath';
import { useStudent } from '../context/StudentContext';

const Dashboard = () => {
  const navigation = useNavigate();
  const {student} = useStudent();
    const assessmentStats = [
        { title: 'Tests Assigned', value: '14', icon: IconCircleCheck, color: 'blue' },
        { title: 'Tests Completed', value: '2', icon: IconCircleCheck, color: 'green' },
        { title: 'Questions Attempted', value: '90', icon: IconHelpCircle, color: 'violet' },
        { title: 'Total Time Spent', value: '28 mins', icon: IconClock, color: 'orange' },
      ];

     
  return (
   <Stack p="1rem" gap="xl">
          {/* Welcome Section */}
          <Card 
           p="xl"  radius="md"
  style={{
    background: "linear-gradient(135deg, rgba(227, 236, 241, 0.9), rgba(255, 255, 255, 0.6))",
    color: "white",
  }}>
            <Title style={{textAlign:'left'}} order={1} mb="sm" c="#000">
              Welcome Back, <Text size='30px' fw="700" component="span" c="blue">{student.full_name}!</Text>
            </Title>
            <Text style={{textAlign:'left'}} c="dimmed" size="md" mb="md">
              Ready to continue your learning journey? You're making great progress!
            </Text>
            <Button onClick={()=>navigation('/home/editprofile')} w="10rem" leftSection={<IconEdit size={16} />} size="md">
              Edit Profile
            </Button>
          </Card>

          <Grid>
            {/* Assessment Activity */}
              <Grid.Col span={{ base: 12, md: 8, xl: 8 }}>
                <Card shadow="sm" padding="xl" radius="md" withBorder>
                <Title style={{textAlign:'left'}}  order={3} mb="xl">
                  Assessment Activity
                </Title>
                <SimpleGrid cols={{ base: 2, sm: 2, md: 2, lg: 2 }} spacing="xl">
                  {assessmentStats.map((stat, index) => (
                    <Card bd="1px solid white" >
                    <Group key={index} align="flex-start" gap="md">
                      <ThemeIcon size={48} radius="25px" variant="light" color={stat.color}>
                        <stat.icon size={24} />
                      </ThemeIcon>
                      <div style={{display:"flex",flexDirection:"column",alignItems:'flex-start',justifyContent:'flex-start'}} >
                        <Text size="md" c="dimmed" fw={500}>
                          {stat.title}
                        </Text>
                        <Text size="25px" fw={700} c={stat.color === 'orange' ? 'orange' : 'dark'}>
                          {stat.value}
                        </Text>
                      </div>
                    </Group>
                    </Card>
                  ))}
                </SimpleGrid>

                <Divider my="xl" />

                <Text size="sm" c="dimmed">
                  Please visit the <Anchor onClick={()=>navigation('/home/assessments')} component="button">Assessments page</Anchor> for all the
                  active assessments/assignments
                </Text>
              </Card>
            </Grid.Col>

            {/* Announcements */}
              <Grid.Col span={{ base: 12, md: 4, xl: 4 }}>

              <Card shadow="sm" padding="xl" radius="md" withBorder h="100%">
                <Group justify="space-between" mb="xl">
                  <Title order={3}>Announcements</Title>
                  <ActionIcon variant="subtle" color="gray">
                    <IconBell size={20} />
                  </ActionIcon>
                </Group>

                <Center style={{ minHeight: 200 }}>
                  <Stack align="center" gap="md">
                    <ThemeIcon size={64} radius="xl" variant="light" color="gray">
                      <IconBell size={32} />
                    </ThemeIcon>
                    <div style={{ textAlign: 'center' }}>
                      <Text fw={600} size="lg" mb="xs">
                        No Announcements
                      </Text>
                      <Text size="sm" c="dimmed" mb="md">
                        Check back later for important updates and news!
                      </Text>
                    </div>
                  </Stack>
                </Center>
              </Card>
            </Grid.Col>
          </Grid>
          <LearningPath />
        </Stack>
  )
}

export default Dashboard
