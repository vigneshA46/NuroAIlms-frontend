import React, { useEffect, useState } from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Card, 
  Grid, 
  Group, 
  Stack, 
  Text, 
  Title, 
  UnstyledButton, 
  Modal, 
  TextInput, 
  Container,
  Flex
} from '@mantine/core';
import { IconBook, IconChevronRight, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { callApi } from '../context/api';

const Create = () => {
  const [opened, setOpened] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  const [colleges, setColleges] = useState([
    { id: 1, name: 'Dhanalakshmi Srinivasan Engineering College' },
    { id: 2, name: 'Nehru Memorial College' },
    { id: 3, name: 'Srinivasan College of Arts and Science' }
  ]);

   useEffect(() => {
    callApi("GET","/colleges")
      .then((res) => {
        setColleges(res.data); // ✅ set state with response data
      })
      .catch((err) => {
        console.error("Error fetching colleges:", err);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (collegeName.trim()) {
      const newCollege = {
        id: colleges.length + 1,
        name: collegeName.trim()
      };
      setColleges([...colleges, newCollege]);
      setCollegeName('');
      setOpened(false);
    }
  };

  const handleCancel = () => {
    setCollegeName('');
    setOpened(false);
  };

const Createcollege = async () => {
  try {
    const response = await callApi(
      "POST",
      "/colleges",
      {
        name: collegeName, // example payload
      }
    );

    alert("college created")
    setOpened(false);
    setCollegeName('')
    return response.data; // { message: "College created", collegeId: 1 }
  } catch (error) {
    console.error("Error creating college:", error.response?.data || error.message);
  }
};

  return (
    <>
      <Stack>
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
                                Colleges
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
                               Start exploring Available colleges .Lets dive in create and manage Colleges and institutions
                              </Text>
                            </Box>
                          </Flex>
                        </Container>
                      </Box>
                      <Flex align="center" justify="left" gap={15} >
        <UnstyledButton 
          bg="blue" 
          w="40px" 
          h="40px" 
          style={{borderRadius:'50%'}} 
          p="5px"
          onClick={() => setOpened(true)}
        >
          <IconPlus size={30} color='#fff'/> 

        </UnstyledButton>
        <Title order={4} >Create College</Title>
        </Flex>

        <Grid>
      {colleges.map((college, index) => (
        <Grid.Col key={college.id} span={{ base: 12, sm: 6, xl: 4 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            styles={{
              root: {
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                },
              },
            }}
          >
            <Group gap="md" wrap="nowrap">
              {/* College Icon/Avatar */}
              <Avatar
                size={60}
                radius="md"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  flexShrink: 0,
                }}
              >
                <IconBook size={28} color="white" />
              </Avatar>

              {/* College Content */}
              <Box style={{ flex: 1, minWidth: 0 }}>
                <Group gap="sm" mb="xs" wrap="wrap">
                  <Text size="sm" c="dimmed" fw={500}>
                    {"College "+college.id}

                  </Text>
                </Group>

                <Title
                  order={3}
                  size="lg"
                  fw={600}
                  mb="xs"
                  style={{
                    lineHeight: 1.3,
                    wordBreak: "break-word",
                    textAlign: "left",
                  }}
                >
                  {college.name}
                </Title>
              </Box>

              <UnstyledButton
                onClick={() => navigate(`/admin/department/${college.id}`)}
                w="30px"
                h="30px"
                style={{ borderRadius: "50%", border: "1px solid grey" }}
              >
                <Text style={{ textAlign: "center" }}>
                  <IconChevronRight size={25} />
                </Text>
              </UnstyledButton>
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
      </Stack>

      {/* Modal Form */}
      <Modal 
        opened={opened} 
        onClose={handleCancel}
        title={
          <Title order={3} size="lg" fw={600} c="dark.7">
            Add New College
          </Title>
        }
        size="md"
        radius="md"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        styles={{
          content: {
            padding: '0',
          },
          header: {
            padding: '24px 24px 0 24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #e9ecef',
            marginBottom: '0',
          },
          body: {
            padding: '24px',
          },
        }}
      >
        <Stack gap="lg">
          <TextInput
            label="College Name"
            placeholder="Enter college name"
            value={collegeName}
            onChange={(event) => setCollegeName(event.currentTarget.value)}
            required
            size="md"
            radius="md"
            styles={{
              label: {
                fontSize: '14px',
                fontWeight: 500,
                color: '#495057',
                marginBottom: '8px',
              },
              input: {
                fontSize: '14px',
                padding: '12px 16px',
                border: '1px solid #ced4da',
                '&:focus': {
                  borderColor: '#339af0',
                  boxShadow: '0 0 0 2px rgba(51, 154, 240, 0.2)',
                },
              },
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(event);
              }
            }}
          />

          <Group justify="flex-end" gap="sm" mt="md">
            <Button
              variant="subtle"
              color="gray"
              size="md"
              radius="md"
              onClick={handleCancel}
              style={{
                fontWeight: 500,
                minWidth: '80px',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              color="blue"
              size="md"
              radius="md"
              onClick={Createcollege}
              style={{
                fontWeight: 500,
                minWidth: '80px',
                background: 'linear-gradient(135deg, #339af0 0%, #1c7ed6 100%)',
              }}
            >
              Add College
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default Create;