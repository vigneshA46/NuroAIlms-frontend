import React, { useState } from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Button,
  Table,
  Badge,
  Group,
  Stack,
  Select,
  ActionIcon,
  Progress,
  Avatar,
  Container,
  Paper,
  SimpleGrid,
  Divider,
  Modal,
  TextInput,
  NumberInput,
  Textarea,
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconUsers,
  IconBuilding,
  IconSchool,
  IconFileText,
  IconTrendingUp,
  IconCalendar,
  IconClock,
  IconCode,
  IconQuestionMark,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const Dashboard = () => {
  const [currentRole, setCurrentRole] = useState('company_admin');
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState('');

  // Sample data
  const roles = [
    { value: 'company_admin', label: 'Company Administrator' },
    { value: 'college_admin', label: 'College Administrator' },
    { value: 'dept_admin', label: 'Department Administrator' },
    { value: 'student', label: 'Student' },
  ];

  const colleges = [
    { id: 1, name: 'Engineering College', departments: 4, students: 1250, created: '2023-01-15' },
    { id: 2, name: 'Medical College', departments: 6, students: 850, created: '2023-03-10' },
    { id: 3, name: 'Arts & Sciences', departments: 8, students: 2100, created: '2022-09-20' },
  ];

  const departments = [
    { id: 1, name: 'Computer Science', college: 'Engineering College', students: 320, tests: 15 },
    { id: 2, name: 'Mechanical Engineering', college: 'Engineering College', students: 280, tests: 12 },
    { id: 3, name: 'Electrical Engineering', college: 'Engineering College', students: 250, tests: 10 },
    { id: 4, name: 'Civil Engineering', college: 'Engineering College', students: 400, tests: 14 },
  ];

  const tests = [
    { id: 1, title: 'Data Structures Quiz', type: 'MCQ', department: 'Computer Science', questions: 25, duration: 60, attempts: 145, score: 85 },
    { id: 2, title: 'Algorithm Challenge', type: 'Coding', department: 'Computer Science', questions: 5, duration: 120, attempts: 89, score: 78 },
    { id: 3, title: 'Database Systems', type: 'MCQ', department: 'Computer Science', questions: 30, duration: 45, attempts: 178, score: 92 },
    { id: 4, title: 'Web Development Project', type: 'Coding', department: 'Computer Science', questions: 3, duration: 180, attempts: 67, score: 88 },
  ];

  const recentActivity = [
    { action: 'New test created', user: 'Dr. Smith', department: 'Computer Science', time: '2 hours ago' },
    { action: 'College added', user: 'System Admin', college: 'Business School', time: '1 day ago' },
    { action: 'Department created', user: 'Dean Johnson', department: 'Data Science', time: '2 days ago' },
    { action: 'Bulk student import', user: 'Admin', count: 50, time: '3 days ago' },
  ];

  const openModal = (type) => {
    setModalType(type);
    open();
  };

  // Stats cards data based on role
  const getStatsData = () => {
    switch (currentRole) {
      case 'company_admin':
        return [
          { title: 'Total Colleges', value: '3', icon: IconBuilding, color: 'blue' },
          { title: 'Total Departments', value: '18', icon: IconSchool, color: 'green' },
          { title: 'Total Students', value: '4,200', icon: IconUsers, color: 'orange' },
          { title: 'Active Tests', value: '156', icon: IconFileText, color: 'red' },
        ];
      case 'college_admin':
        return [
          { title: 'Departments', value: '4', icon: IconSchool, color: 'blue' },
          { title: 'Students', value: '1,250', icon: IconUsers, color: 'green' },
          { title: 'Active Tests', value: '51', icon: IconFileText, color: 'orange' },
          { title: 'Avg Score', value: '78.5%', icon: IconTrendingUp, color: 'red' },
        ];
      case 'dept_admin':
        return [
          { title: 'Students', value: '320', icon: IconUsers, color: 'blue' },
          { title: 'Total Tests', value: '15', icon: IconFileText, color: 'green' },
          { title: 'MCQ Tests', value: '10', icon: IconQuestionMark, color: 'orange' },
          { title: 'Coding Tests', value: '5', icon: IconCode, color: 'red' },
        ];
      case 'student':
        return [
          { title: 'Available Tests', value: '8', icon: IconFileText, color: 'blue' },
          { title: 'Completed', value: '12', icon: IconTrendingUp, color: 'green' },
          { title: 'Avg Score', value: '85%', icon: IconTrendingUp, color: 'orange' },
          { title: 'Time Spent', value: '24h', icon: IconClock, color: 'red' },
        ];
      default:
        return [];
    }
  };

  const renderStatsCards = () => {
    const stats = getStatsData();
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="xl">
        {stats.map((stat, index) => (
          <Card key={index} shadow="sm" padding="lg" withBorder>
            <Group justify="apart">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </div>
              <ActionIcon variant="light" color={stat.color} size="xl" radius="md">
                <stat.icon size={20} />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    );
  };

  const renderCompanyAdminContent = () => (
    <>
      <Group justify="between" mb="md">
        <Title order={2}>College Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => openModal('college')}>
          Add College
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" mb="xl" withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>College Name</Table.Th>
              <Table.Th>Departments</Table.Th>
              <Table.Th>Students</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {colleges.map((college) => (
              <Table.Tr key={college.id}>
                <Table.Td>{college.name}</Table.Td>
                <Table.Td>{college.departments}</Table.Td>
                <Table.Td>{college.students.toLocaleString()}</Table.Td>
                <Table.Td>{college.created}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="light" color="blue" size="sm">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </>
  );

  const renderCollegeAdminContent = () => (
    <>
      <Group justify="between" mb="md">
        <Title order={2}>Department Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={() => openModal('department')}>
          Add Department
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" mb="xl" withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Department</Table.Th>
              <Table.Th>Students</Table.Th>
              <Table.Th>Active Tests</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {departments.map((dept) => (
              <Table.Tr key={dept.id}>
                <Table.Td>{dept.name}</Table.Td>
                <Table.Td>{dept.students}</Table.Td>
                <Table.Td>{dept.tests}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="light" color="blue" size="sm">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </>
  );

  const renderDeptAdminContent = () => (
    <>
      <Group justify="between" mb="md">
        <Title order={2}>Test Management</Title>
        <Group>
          <Button leftSection={<IconQuestionMark size={16} />} onClick={() => openModal('mcq')}>
            Create MCQ Test
          </Button>
          <Button leftSection={<IconCode size={16} />} onClick={() => openModal('coding')}>
            Create Coding Test
          </Button>
        </Group>
      </Group>

      <Card shadow="sm" padding="lg" mb="xl" withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Test Title</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Questions</Table.Th>
              <Table.Th>Duration</Table.Th>
              <Table.Th>Attempts</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tests.map((test) => (
              <Table.Tr key={test.id}>
                <Table.Td>{test.title}</Table.Td>
                <Table.Td>
                  <Badge color={test.type === 'MCQ' ? 'blue' : 'green'} variant="light">
                    {test.type}
                  </Badge>
                </Table.Td>
                <Table.Td>{test.questions}</Table.Td>
                <Table.Td>{test.duration} min</Table.Td>
                <Table.Td>{test.attempts}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="light" color="blue" size="sm">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" color="red" size="sm">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </>
  );

  const renderStudentContent = () => (
    <>
      <Title order={2} mb="md">Available Tests</Title>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mb="xl">
        {tests.map((test) => (
          <Card key={test.id} shadow="sm" padding="lg" withBorder>
            <Group justify="between" mb="xs">
              <Text fw={500}>{test.title}</Text>
              <Badge color={test.type === 'MCQ' ? 'blue' : 'green'} variant="light">
                {test.type}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              {test.department}
            </Text>
            <Group gap="md" mb="md">
              <Text size="sm">📝 {test.questions} questions</Text>
              <Text size="sm">⏱️ {test.duration} min</Text>
            </Group>
            {test.score && (
              <Group mb="md">
                <Text size="sm">Your Score:</Text>
                <Progress value={test.score} size="md" style={{ flex: 1 }} />
                <Text size="sm" fw={500}>{test.score}%</Text>
              </Group>
            )}
            <Button fullWidth variant={test.score ? 'light' : 'filled'}>
              {test.score ? 'Retake Test' : 'Start Test'}
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );

  const renderRecentActivity = () => (
    <Card shadow="sm" padding="lg" withBorder>
      <Title order={3} mb="md">Recent Activity</Title>
      <Stack gap="sm">
        {recentActivity.map((activity, index) => (
          <Group key={index} justify="between">
            <div>
              <Text size="sm" fw={500}>{activity.action}</Text>
              <Text size="xs" c="dimmed">
                {activity.user} • {activity.time}
              </Text>
            </div>
          </Group>
        ))}
      </Stack>
    </Card>
  );

  const renderMainContent = () => {
    switch (currentRole) {
      case 'company_admin':
        return renderCompanyAdminContent();
      case 'college_admin':
        return renderCollegeAdminContent();
      case 'dept_admin':
        return renderDeptAdminContent();
      case 'student':
        return renderStudentContent();
      default:
        return null;
    }
  };

  const renderModal = () => {
    const getModalTitle = () => {
      switch (modalType) {
        case 'college': return 'Add New College';
        case 'department': return 'Add New Department';
        case 'mcq': return 'Create MCQ Test';
        case 'coding': return 'Create Coding Test';
        default: return '';
      }
    };

    return (
      <Modal opened={opened} onClose={close} title={getModalTitle()} size="md">
        <Stack>
          {modalType === 'college' && (
            <>
              <TextInput label="College Name" placeholder="Enter college name" />
              <TextInput label="Location" placeholder="Enter location" />
              <Textarea label="Description" placeholder="Enter description" />
            </>
          )}
          {modalType === 'department' && (
            <>
              <TextInput label="Department Name" placeholder="Enter department name" />
              <Select
                label="College"
                placeholder="Select college"
                data={colleges.map(c => ({ value: c.id.toString(), label: c.name }))}
              />
              <Textarea label="Description" placeholder="Enter description" />
            </>
          )}
          {(modalType === 'mcq' || modalType === 'coding') && (
            <>
              <TextInput label="Test Title" placeholder="Enter test title" />
              <NumberInput label="Duration (minutes)" placeholder="60" />
              <NumberInput label="Number of Questions" placeholder="25" />
              <Textarea label="Instructions" placeholder="Enter test instructions" />
            </>
          )}
          <Group justify="end">
            <Button variant="light" onClick={close}>Cancel</Button>
            <Button onClick={close}>Create</Button>
          </Group>
        </Stack>
      </Modal>
    );
  };

  return (
    <Container fluid px="md">
      {/* Role Switcher */}
      <Group justify="between" mb="xl">
        <div>
          <Title order={1}>Dashboard</Title>
          <Text c="dimmed">Welcome back! Here's what's happening in your system.</Text>
        </div>
        <Select
          value={currentRole}
          onChange={setCurrentRole}
          data={roles}
          w={250}
        />
      </Group>

      {/* Stats Cards */}
      {renderStatsCards()}

      {/* Main Content Grid */}
      <Grid>
        <Grid.Col span={{ base: 12, lg: currentRole === 'student' ? 12 : 8 }}>
          {renderMainContent()}
        </Grid.Col>

        {currentRole !== 'student' && (
          <Grid.Col span={{ base: 12, lg: 4 }}>
            {renderRecentActivity()}
          </Grid.Col>
        )}
      </Grid>

      {/* Modal */}
      {renderModal()}
    </Container>
  );
};

export default Dashboard;