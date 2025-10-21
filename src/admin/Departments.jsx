import React, { useEffect, useState } from 'react';
import { 
  Avatar, Box, Button, Card, Grid, Group, Stack, Text, Title, Flex,
  UnstyledButton, Modal, TextInput, Select,
  SimpleGrid,
  ThemeIcon,
  NumberInput,
  Container
} from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconBook, IconChevronRight, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CreateCodingChallengeModal from '../components/CreateCodingChallengeModal';
import CodingChallengeComponent from '../components/CodingChallengeComponent';
import { callApi } from '../context/api';

const Departments = () => {
 // States for test creation
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [maxQuestions, setMaxQuestions] = useState("");
const [totalTime, setTotalTime] = useState("");
const [TEstdata , settestdata] = useState([])
  const [loading, setLoading] = useState(true);
   const [open, setOpen] = useState(false);


  const { collegeId } = useParams();
  const [opened, setOpened] = useState(false);
  const navigation = useNavigate();
  const [testopened , settestopened] = useState(false)

  const [departmentName, setDepartmentName] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [challenges, setchallenges] = useState([]);
  const [collegename, setcollegename] = useState()

useEffect(() => {
  callApi("GET",`/departments/college/${collegeId}`)
    .then((res) => {
      setDepartments(res.data); 
    })
    .catch((err) => console.error(err));
}, [collegeId]);

useEffect(()=>{
  callApi("GET",`/colleges/${collegeId}`).then((res)=>{
    setcollegename(res.data.name)
  })
},[collegeId])

useEffect(()=>{
  const fetchchallengefordepartment  = async ()=>{
    const res = await callApi("GET",`/coding/admin/college/${collegeId}`)
    setchallenges(res.data)
  }
  fetchchallengefordepartment();
},[])


  // ✅ Fetch tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await callApi(
          "GET",
          `/test/college/${collegeId}`
        );
        settestdata(res.data || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
        alert("Failed to fetch tests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [collegeId]);

  const handleSubmit = async(e) => {
      const res = await callApi("POST","/departments/", {
      name: departmentName,
      college_id: collegeId,
    });

    console.log("Department created:", res.data);
    setOpened(false)
    setDepartmentName('')
  };

  const handleCancel = () => {
    setDepartmentName("");
    setSelectedCollege(null);
    setOpened(false);
  };
  const handletestcancel = ()=>{
    settestopened(false)
  }
const testcreate = async () => {
  try {
    // ✅ validation
    if (!title.trim() || !description.trim() || !startDate || !endDate || !maxQuestions || !totalTime) {
      alert("Please fill all fields!");
      return;
    }

    // ✅ API call
    const res = await callApi("POST","/test", {
      title,
      description,
      college_id: collegeId,
      start_date: startDate,
      end_date: endDate,
      max_questions: maxQuestions,
      total_time: totalTime,
    });

    // ✅ Success handling
    if (res.status === 200 || res.status === 201) {
      alert("Test created successfully!");
      // clear fields
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setMaxQuestions("");
      setTotalTime("");
      // optionally close modal
      settestopened(false);
    }
  } catch (error) {
    console.error("Error creating test:", error);
    alert("Failed to create test. Please try again later.");
  }
};






  return (
    <>
      <Stack p="1rem" >
                  <UnstyledButton onClick={()=>navigation('/admin/create')} >
                  <Flex gap={2} align="center"  >
                    <IconArrowLeft size={16} />
                    <Text>Back</Text>
                  </Flex>
                  </UnstyledButton>
        <Box
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 30%, #f0abfc 50%, #fb923c 80%, #fbbf24 100%)',
                  padding: '48px 32px',
                  marginBottom: '32px',
                  borderRadius: '12px',
                  position: 'relative',
                }}
              >
                <Container size="xl">
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Title
                        order={1}
                        style={{
                          color: 'white',
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          marginBottom: '8px',
                          letterSpacing: '-0.5px',
                          textAlign: 'left'
                        }}
                      >
                        {collegename}
                      </Title>
                      <Text
                        size="md"
                        style={{
                          color: 'white',
                          opacity: 0.95,
                          fontSize: '1rem',
                          textAlign:'left'
                        }}
                      >
                       Start exploring the college Details.Lets dive in create and manage Assessments
                      </Text>
                    </Box>
                  </Flex>
                </Container>
              </Box>
        
        
        <Flex align="center" wrap="wrap" gap="1rem" >
           <UnstyledButton 
          bg="blue" 
          w="40px" 
          h="40px" 
          style={{ borderRadius: '50%' }} 
          p="5px"
          onClick={() => setOpened(true)}
        >
          <IconPlus size={30} color='#fff'/>  
        </UnstyledButton>
        <Text fw="600" >Add Department</Text>
           <UnstyledButton 
          bg="blue" 
          w="40px" 
          h="40px" 
          style={{ borderRadius: '50%' }} 
          p="5px"
          onClick={()=>settestopened(true)}
        
        >
          <IconPlus size={30} color='#fff'/>  
        </UnstyledButton>
        <Text fw="600" >Create Test</Text>
        <UnstyledButton 
          bg="blue" 
          w="40px" 
          h="40px" 
          style={{ borderRadius: '50%' }} 
          p="5px"
          onClick={()=>setOpen(true)}
        
        >
          <IconPlus size={30} color='#fff'/>  
        </UnstyledButton>
        <Text fw="600" >Create Code Challenge</Text>
        </Flex>
       

        <Grid>
         {Array.isArray(departments) && departments.map((dept, index) => (
            <Grid.Col key={dept.id} span={{ base: 12, sm: 6, xl: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group gap="md" wrap="nowrap">
                  <Avatar
                    size={60}
                    radius="md"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                      flexShrink: 0,
                    }}
                  >
                    <IconBook size={28} color="white" />
                  </Avatar>

                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text size="sm" c="dimmed" fw={500}>
                      Department {index + 1}
                    </Text>
                    
                    <Title order={4} size="lg" fw={600} mb="xs">
                      {dept.name}
                    </Title>
                    <Text size="sm" c="dimmed">
                      {dept.college || dept.college_name}
                    </Text>
                  </Box>

                  <UnstyledButton 
                    onClick={()=>navigation(`/admin/students/${collegeId}/${dept.id}`)}
                    w="30px" 
                    h="30px" 
                    style={{ borderRadius: '50%', border: '1px solid grey' }}
                  >
                    <IconChevronRight size={25} />
                  </UnstyledButton>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
<Title style={{textAlign:'left'}} order={3} mb="xl" color="dark">
Tests          </Title>       
  <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="lg">
      {TEstdata.map((test) => (
        <Card
          key={test.id}
          w="100%"
          shadow="sm"
          padding="md"
          radius="md"
          withBorder
          sx={{ backgroundColor: "#f9f9f9", border: "none" }}
        >
          {/* Header Row */}
          <Flex align="center" justify="space-between">
            <ThemeIcon size={40} radius="md" color="blue" variant="light">
              <IconBook size={20} />
            </ThemeIcon>

            <Text size="md" fw="700" c="black">
              {test.title}
            </Text>

            <UnstyledButton
              onClick={() => handleDelete(test.id)}
              style={{ color: "red", cursor: "pointer" }}
            >
              <IconTrash size={18} />
            </UnstyledButton>
          </Flex>

          {/* Description */}
          <Text pl="xl" mt="sm" size="sm" fw="500" c="dimmed">
            {test.description}
          </Text>

          {/* Created At */}
          <Text pl="xl" mt="xs" size="xs" fw="400" c="gray">
            Created At:{" "}
            {test.created_at
              ? new Date(test.created_at).toLocaleDateString()
              : "N/A"}
          </Text>

          {/* Open Button */}
          <Button
            variant="filled"
            color="green"
            rightSection={<IconArrowRight size={14} />}
            fullWidth
            radius="md"
            size="sm"
            mt="md"
            onClick={() => navigation(`/admin/admintest/${test.id}`)}
          >
            Open
          </Button>
        </Card>
      ))}
    </SimpleGrid>
      </Stack>

      {/* Modal */}
      <Modal 
        opened={opened}
        onClose={handleCancel}
        title="Add New Department"
        centered
      >
        <Stack gap="lg">
          <TextInput
            label="Department Name"
            placeholder="Enter department name"
            value={departmentName}
            onChange={(event) => setDepartmentName(event.currentTarget.value)}
            required
            size="md"
            radius="md"
          />

          <Group justify="flex-end" gap="sm" mt="md">
            <Button variant="subtle" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="blue">
              Submit
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Modal 
  opened={testopened}
  onClose={handletestcancel}
  title="Create New Test"
  centered
>
  <Stack gap="lg">
    {/* Title Input */}
    <TextInput
      label="Title"
      placeholder="Enter test title"
      value={title}
      onChange={(event) => setTitle(event.currentTarget.value)}
      required
      size="md"
      radius="md"
    />

    {/* Description Input */}
    <TextInput
      label="Description"
      placeholder="Enter description"
      value={description}
      onChange={(event) => setDescription(event.currentTarget.value)}
      required
      size="md"
      radius="md"
    />

    {/* Start Date */}
    <TextInput
      type="datetime-local"
      label="Start Date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      required
    />

    {/* End Date */}
    <TextInput
      type="datetime-local"
      label="End Date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      required
    />

    {/* Max Questions */}
    <NumberInput
      label="Max Questions"
      placeholder="Enter number of questions"
      value={maxQuestions}
      onChange={setMaxQuestions}
      required
      min={1}
    />

    {/* Total Time */}
    <NumberInput
      label="Total Time (minutes)"
      placeholder="Enter duration"
      value={totalTime}
      onChange={setTotalTime}
      required
      min={1}
    />

    {/* Buttons */}
    <Group justify="flex-end" gap="sm" mt="md">
      <Button variant="subtle" color="gray" onClick={handletestcancel}>
        Cancel
      </Button>
      <Button onClick={testcreate} color="blue">
        Submit
      </Button>
    </Group>
  </Stack>
</Modal>
<CreateCodingChallengeModal
        opened={open}
        onClose={() => setOpen(false)}
        onCreated={() => alert("Challenge created successfully!")}
        college_id={collegeId}
      />
<Title px="1rem" style={{textAlign:'left'}} order={3} mb="xl" mt="xl" color="dark">
Coding challenges          </Title>  
 <Box p="1rem" style={{ 
      maxWidth: '1400px',
    }} mt="2rem" >
      <SimpleGrid
        
        spacing="lg"
        cols={{ base: 1, sm: 2, md: 2, lg: 3 }} 
      >
        {challenges.map((challenge) => (
          <UnstyledButton onClick={()=>navigation(`/admin/codingdetails/${challenge.id}`)} >
          <CodingChallengeComponent key={challenge.id} challenge={challenge} />
          </UnstyledButton>
        ))}
      </SimpleGrid>
    </Box>  
    </>
  );
};

export default Departments;
 