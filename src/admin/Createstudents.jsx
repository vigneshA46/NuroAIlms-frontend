import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Title,
  Text,
  Badge,
  Group,
  Avatar,
  Box,
  Paper,
  ScrollArea,
  ActionIcon,
  TextInput,
  Select,
  Button,
  Stack,
  Grid,
  Card,
  Progress,
  rem,
  Modal,
  PasswordInput
} from '@mantine/core';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconEye,
  IconEdit,
  IconTrash,
  IconUserPlus,
  IconClock
} from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { callApi } from '../context/api';

const Createstudents = () => {
    const { collegeId , departmentId } = useParams();



  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState(null);
  const [department, setDepartment] = useState(null);
const [opened, setOpened] = useState(false);
const [studentdata , setstudentdata] = useState([]);

const colleges = [
  { value: "college1", label: "College of Engineering" },
  { value: "college2", label: "College of Arts" },
  { value: "college3", label: "Business School" },
];

const departments = [
  { value: "cse", label: "Computer Science" },
  { value: "ece", label: "Electronics" },
  { value: "mech", label: "Mechanical" },
  { value: "civil", label: "Civil" },
];


const handleCancel = () => {
  setOpened(false);
};

const handleSubmit =async () => {
  const res = await callApi("POST",`/students/`,{
    email: email,
    password:password,
    college_id : collegeId,
    department_id : departmentId,
  })
  console.log(res.data);
  alert("student added")
  setOpened(false);
  setEmail('')
  setPassword('')
};

useEffect(() => {
  const fetchStudent = async () => {
    try {
      const res = await callApi(
        "GET",
        `/students/get-students/${collegeId}/${departmentId}`
      );
      setstudentdata(res.data)
      console.log(res.data); // log only the data, not the full response
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  fetchStudent();
}, [collegeId, departmentId]);



  // Sample student data - replace with your actual data
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      password: '********',
      totalTests: 15,
      percentage: 92.5,
      avatar: null
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      password: '********',
      totalTests: 12,
      percentage: 87.3,
      avatar: null
    },
    {
      id: 3,
      name: 'Carol Williams',
      email: 'carol.williams@email.com',
      password: '********',
      totalTests: 18,
      percentage: 94.2,
      avatar: null
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david.brown@email.com',
      password: '********',
      totalTests: 8,
      percentage: 76.8,
      avatar: null
    },
    {
      id: 5,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      password: '********',
      totalTests: 20,
      percentage: 96.1,
      avatar: null
    },
    {
      id: 6,
      name: 'Frank Wilson',
      email: 'frank.wilson@email.com',
      password: '********',
      totalTests: 14,
      percentage: 82.4,
      avatar: null
    }
  ];

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'green';
    if (percentage >= 80) return 'blue';
    if (percentage >= 70) return 'yellow';
    return 'red';
  };

  const getPerformanceBadge = (percentage) => {
    if (percentage >= 90) return { label: 'Excellent', color: 'green' };
    if (percentage >= 80) return { label: 'Good', color: 'blue' };
    if (percentage >= 70) return { label: 'Average', color: 'yellow' };
    return { label: 'Needs Improvement', color: 'red' };
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'tests':
        return b.totalTests - a.totalTests;
      case 'percentage':
        return b.percentage - a.percentage;
      default:
        return 0;
    }
  });

  return (
    <Container size="xl" py="md">
      <Paper shadow="xs" p="md" radius="md">
        {/* Header Section */}
        <Group justify="space-between" align="center" mb="lg">
          <Box>
            <Title order={2} c="dark.8" mb={4}>
              Student Management
            </Title>
            <Text c="gray.6" size="sm">
              Detailed overview of student performance and data
            </Text>
          </Box>
          <Group align="center">
            <IconClock size={20} color="#868e96" />
            <Text size="sm" c="gray.6">
              Last updated: 2 minutes ago
            </Text>
          </Group>
        </Group>

        {/* Controls Section */}
        <Grid mb="lg">
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <TextInput
              placeholder="Search students..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="Sort by"
              leftSection={<IconFilter size={16} />}
              data={[
                { value: 'name', label: 'Name' },
                { value: 'email', label: 'Email' },
                { value: 'tests', label: 'Total Tests' },
                { value: 'percentage', label: 'Percentage' }
              ]}
              value={sortBy}
              onChange={(value) => setSortBy(value || 'name')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
           <Button
  leftSection={<IconUserPlus size={16} />}
  variant="filled"
  onClick={() => setOpened(true)}
>
  Add Student
</Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
            <Button leftSection={<IconDownload size={16} />} variant="outline">
              Export
            </Button>
          </Grid.Col>
        </Grid>

        {/* Mobile Cards View */}
        <Box hiddenFrom="md" mb="md">
          <Stack gap="md">
            {sortedStudents.map((student) => {
              const badge = getPerformanceBadge(student.percentage);
              return (
                <Card key={student.id} shadow="xs" padding="md" radius="md" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Group>
                      <Avatar size="md" radius="xl" color="blue">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Text fw={600} size="sm">{student.name}</Text>
                        <Text size="xs" c="gray.6">{student.email}</Text>
                      </Box>
                    </Group>
                    <Badge color={badge.color} size="sm">{badge.label}</Badge>
                  </Group>
                  
                  <Grid>
                    <Grid.Col span={6}>
                      <Text size="xs" c="gray.6">Total Tests</Text>
                      <Text fw={600} size="sm">{student.totalTests}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="gray.6">Percentage</Text>
                      <Text fw={600} size="sm" c={getPercentageColor(student.percentage)}>
                        {student.percentage}%
                      </Text>
                    </Grid.Col>
                  </Grid>
                  
                  <Progress 
                    value={student.percentage} 
                    color={getPercentageColor(student.percentage)}
                    size="sm" 
                    mt="xs"
                  />
                  
                  <Group justify="flex-end" mt="md">
                    <ActionIcon variant="subtle" size="sm">
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="sm">
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="sm" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Card>
              );
            })}
          </Stack>
        </Box>

        {/* Desktop Table View */}
        <Box visibleFrom="md">
          <ScrollArea>
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: '#f8f9fa' }}>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Student Name</Table.Th>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Email Address</Table.Th>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Password</Table.Th>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Total Tests</Table.Th>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Percentage</Table.Th>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Performance</Table.Th>
                  <Table.Th style={{ fontWeight: 600, color: '#495057' }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
               <Table.Tbody>
  {studentdata.map((student) => {
    const badge = getPerformanceBadge(student?.percentage || 0);

    return (
      <Table.Tr key={student.id}>
        {/* Student Name */}
        <Table.Td>
          <Group gap="sm">
            <Avatar size="sm" radius="xl" color="blue">
              {student?.name 
                ? student.name.split(" ").map(n => n[0]).join("") 
                : "?"}
            </Avatar>
            <Box>
              <Text fw={500} size="sm">{student?.name || ""}</Text>
            </Box>
          </Group>
        </Table.Td>

        {/* Email */}
        <Table.Td>
          <Text size="sm" c="gray.7">{student?.email || ""}</Text>
        </Table.Td>

        {/* Password */}
        <Table.Td>
          <Text size="sm" c="gray.5">{student?.password_hash || ""}</Text>
        </Table.Td>

        {/* Total Tests */}
        <Table.Td>
          <Badge variant="light" color="blue" size="sm">
            {student?.totalTests ?? ""}
          </Badge>
        </Table.Td>

        {/* Percentage */}
        <Table.Td>
          <Group gap="xs">
            <Text fw={600} size="sm" c={getPercentageColor(student?.percentage || 0)}>
              {student?.percentage ? `${student.percentage}%` : ""}
            </Text>
            {student?.percentage ? (
              <Progress
                value={student.percentage}
                color={getPercentageColor(student.percentage)}
                size="xs"
                style={{ width: rem(60) }}
              />
            ) : (
              <></>
            )}
          </Group>
        </Table.Td>

        {/* Performance */}
        <Table.Td>
          {student?.percentage ? (
            <Badge color={badge.color} size="sm">{badge.label}</Badge>
          ) : (
            ""
          )}
        </Table.Td>

        {/* Actions */}
        <Table.Td>
          <Group gap="xs">
            <ActionIcon variant="subtle" size="sm" color="blue">
              <IconEye size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="sm" color="gray">
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="sm" color="red">
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  })}
</Table.Tbody>
            </Table>
          </ScrollArea>
        </Box>

        {/* Footer Stats */}
        <Group justify="space-between" mt="lg" pt="md" style={{ borderTop: '1px solid #e9ecef' }}>
          <Text size="sm" c="gray.6">
            Showing {sortedStudents.length} of {students.length} students
          </Text>
          <Text size="sm" c="gray.6">
            Average Performance: {(students.reduce((acc, student) => acc + student.percentage, 0) / students.length).toFixed(1)}%
          </Text>
        </Group>
      </Paper>

      {/* model for create student form */}

      <Modal
      opened={opened}
      onClose={handleCancel}
      title="Add New Student"
      size="md"
      radius="md"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        content: {
          padding: "0",
        },
        header: {
          padding: "24px 24px 0 24px",
          paddingBottom: "16px",
          borderBottom: "1px solid #e9ecef",
          marginBottom: "0",
        },
        body: {
          padding: "24px",
        },
      }}
    >
      <Stack gap="lg">
        {/* Email ID */}
        <TextInput
          label="Email ID"
          placeholder="Enter student email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          size="md"
          radius="md"
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          size="md"
          radius="md"
        />

        {/* <Select
          label="College Name"
          placeholder="Select college"
          data={colleges}
          value={college}
          onChange={setCollege}
          required
          size="md"
          radius="md"
        />

        <Select
          label="Department Name"
          placeholder="Select department"
          data={departments}
          value={department}
          onChange={setDepartment}
          required
          size="md"
          radius="md"
        /> */}

        {/* Buttons */}
        <Group justify="flex-end" gap="sm" mt="md">
          <Button
            variant="subtle"
            color="gray"
            size="md"
            radius="md"
            onClick={handleCancel}
            style={{
              fontWeight: 500,
              minWidth: "80px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            color="blue"
            size="md"
            radius="md"
            onClick={handleSubmit}
            style={{
              fontWeight: 500,
              minWidth: "120px",
              background: "linear-gradient(135deg, #339af0 0%, #1c7ed6 100%)",
            }}
          >
            Add Student
          </Button>
        </Group>
      </Stack>
    </Modal>
    </Container>
  );
};

export default Createstudents;