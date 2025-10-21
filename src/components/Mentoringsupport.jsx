import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  TextInput,
  Button,
  Card,
  Group,
  Avatar,
  Badge,
  Select,
  Stack,
  Box,
  Flex,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const MentoringSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('All Skills');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Sample mentor data
  const mentors = [
    {
      id: 1,
      name: 'DEEPAN. S',
      initials: 'DS',
      bio: "Myself I'm Deepan.s I finished my schooling in Bhagavan higher secondary school Thiruvannamalai. With 75 percentage Mark's.i excited to cube because that was my hobby",
      skills: ['cuper'],
    },
    // Add more mentors as needed
  ];

  return (
    <Box p="1rem" style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
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
                Find Your Mentor
              </Title>
              <Text
                size="md"
                style={{
                  color: 'white',
                  opacity: 0.95,
                  fontSize: '1rem',
                }}
              >
                Connect with experienced professionals to accelerate your growth
              </Text>
            </Box>
            <Button
              size="md"
              style={{
                backgroundColor: '#000',
                color: 'white',
                fontWeight: 600,
                padding: '10px 24px',
                fontSize: '0.95rem',
                borderRadius: '8px',
                border: 'none',
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: '#1a1a1a',
                  },
                },
              }}
            >
              Become a Mentor
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Search and Filter Section */}
      <Container size="xl" style={{ marginBottom: '32px' }}>
        <Group spacing="md" align="flex-end">
          <TextInput
            placeholder="Search mentors or skills..."
            icon={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ flex: 1, maxWidth: '500px' }}
            size="md"
            styles={{
              input: {
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              },
            }}
          />
          <Select
            placeholder="All Skills"
            value={skillFilter}
            onChange={setSkillFilter}
            data={['All Skills', 'Programming', 'Design', 'Marketing', 'Business']}
            style={{ width: '180px' }}
            size="md"
            styles={{
              input: {
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              },
            }}
          />
          <Select
            placeholder="All"
            value={categoryFilter}
            onChange={setCategoryFilter}
            data={['All', 'University Mentors', 'Industry Mentors', 'Alumni']}
            style={{ width: '180px' }}
            size="md"
            styles={{
              input: {
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              },
            }}
          />
        </Group>
      </Container>

      {/* Mentors Section */}
      <Container size="xl" style={{ paddingBottom: '40px' }}>
        <Title
          order={2}
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '20px',
            color: '#1a1a1a',
          }}
        >
          University Mentors
        </Title>

        <Group spacing="lg" align="stretch">
          {mentors.map((mentor) => (
            <Card
              key={mentor.id}
              shadow="sm"
              padding="lg"
              radius="md"
              style={{
                width: '100%',
                maxWidth: '340px',
                border: '1px solid #e9ecef',
              }}
              styles={{
                root: {
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease',
                  },
                },
              }}
            >
              <Stack spacing="md">
                <Group spacing="md" align="center">
                  <Avatar
                    size={56}
                    radius="xl"
                    style={{
                      backgroundColor: '#f1f3f5',
                      color: '#495057',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                    }}
                  >
                    {mentor.initials}
                  </Avatar>
                  <Box>
                    <Text
                      weight={600}
                      size="lg"
                      style={{
                        color: '#1a1a1a',
                        fontSize: '1rem',
                      }}
                    >
                      {mentor.name}
                    </Text>
                  </Box>
                </Group>

                <Text
                  size="sm"
                  style={{
                    color: '#495057',
                    lineHeight: 1.6,
                    minHeight: '75px',
                    textAlign:'left'
                  }}
                >
                  {mentor.bio}
                </Text>

                <Group spacing="xs">
                  {mentor.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="light"
                      style={{
                        backgroundColor: '#f1f3f5',
                        color: '#495057',
                        textTransform: 'lowercase',
                        fontWeight: 500,
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </Group>

                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  style={{
                    marginTop: '8px',
                    borderColor: '#dee2e6',
                    color: '#495057',
                    fontWeight: 500,
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                      },
                    },
                  }}
                >
                  View Profile
                </Button>
              </Stack>
            </Card>
          ))}
        </Group>
      </Container>
    </Box>
  );
};

export default MentoringSupport;