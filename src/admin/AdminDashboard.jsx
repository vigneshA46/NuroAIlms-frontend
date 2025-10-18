import { Box, Button, Card, Grid, Group, Stack, Text, Title, UnstyledButton, SimpleGrid, Paper, ThemeIcon } from '@mantine/core'
import { IconEdit, IconPlus, IconUsers, IconSchool, IconBuildingBank, IconFileText, IconTrophy, IconRobot, IconChartBar, IconActivity } from '@tabler/icons-react'
import React from 'react'
import { useEffect } from 'react'
import { callApi } from '../context/api'
import { useState } from 'react'

const AdminDashboard = () => {

  const [admindata, setadmindata] = useState({
    total_students: 0,
    total_colleges: 0,
    total_departments: 0,
    total_tests: 0,
    total_challenges: 0,
    ai_reviewed_submissions: 0,
    avg_ai_score: 0,
    active_tests: 0
  });

  useEffect(() => {
    callApi("GET", `/admin/dashboard`).then((res) => setadmindata(res.data))
  }, [])

  const statsData = [
    {
      title: 'Total Students',
      value: admindata.total_students,
      icon: IconUsers,
      color: '#228be6'
    },
    {
      title: 'Total Colleges',
      value: admindata.total_colleges,
      icon: IconSchool,
      color: '#228be6'
    },
    {
      title: 'Total Departments',
      value: admindata.total_departments,
      icon: IconBuildingBank,
      color: '#228be6'
    },
    {
      title: 'Total Tests',
      value: admindata.total_tests,
      icon: IconFileText,
      color: '#228be6'
    },
    {
      title: 'Total Challenges',
      value: admindata.total_challenges,
      icon: IconTrophy,
      color: '#228be6'
    },
    {
      title: 'AI Reviewed Submissions',
      value: admindata.ai_reviewed_submissions,
      icon: IconRobot,
      color: '#228be6'
    },
    {
      title: 'Average AI Score',
      value: admindata.avg_ai_score,
      icon: IconChartBar,
      color: '#228be6'
    },
    {
      title: 'Active Tests',
      value: admindata.active_tests,
      icon: IconActivity,
      color: '#228be6'
    }
  ];

  return (
    <Stack gap="xl">
      <Card
        p="xl" radius="md"
        style={{
          background: "linear-gradient(135deg, rgba(227, 236, 241, 0.9), rgba(255, 255, 255, 0.6))",
          color: "white",
        }}>
        <Title style={{ textAlign: 'left' }} order={1} mb="sm" c="#000">
          Welcome Back, <Text size='30px' fw="700" component="span" c="blue">VIGNESH A!</Text>
        </Title>
        <Text style={{ textAlign: 'left' }} c="dimmed" size="lg" mb="md">
          Ready to continue your admin journey? You're making great progress!
        </Text>
      </Card>

      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}
        spacing="md"
      >
        {statsData.map((stat, index) => (
          <Card
            key={index}
            padding="xl"
            radius="md"
            withBorder
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e9ecef',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#228be6';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 139, 230, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e9ecef';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Stack gap="lg">
              <Group justify="space-between" align="flex-start">
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: '#f1f3f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <stat.icon size={24} color={stat.color} stroke={1.5} />
                </Box>
              </Group>

              <Box>
                <Text
                  size="sm"
                  fw={500}
                  c="dimmed"
                  mb={4}
                  style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                  {stat.title}
                </Text>
                <Text
                  size="32px"
                  fw={700}
                  c="#212529"
                  style={{ lineHeight: 1 }}
                >
                  {stat.value}
                </Text>
              </Box>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default AdminDashboard