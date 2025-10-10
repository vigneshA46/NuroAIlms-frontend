import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextInput,
  Select,
  Textarea,
  Button,
  Title,
  Group,
  Stack,
  Box,
  Text,
  UnstyledButton,
  Flex,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconUser, IconMapPin, IconCalendar, IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';
import { useStudent } from '../context/StudentContext';
import { useNavigate, } from 'react-router-dom';

const EditProfile = () => {
  const { student } = useStudent();
  const studentId = student.id;
  const navigation = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    location: '',
    dateOfBirth: null,
    about: '',
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch student data on mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/studentdata/${studentId}`);
        setFormData({
          fullName: data.full_name || '',
          gender: data.gender || '',
          location: data.location || '',
          dateOfBirth: data.dob ? new Date(data.dob) : null,
          about: data.about_you || '',
        });
      } catch (err) {
        console.error('Error fetching student data:', err);
      }
    };
    if (studentId) fetchStudentData();
  }, [studentId]);

  // ✅ Handle form updates
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ Save changes (update API)
  const handleSave = async () => {
    setLoading(true);
     try {
    // Convert date to ISO only if it's a valid Date object
    const dob =
      formData.dateOfBirth instanceof Date
        ? formData.dateOfBirth.toISOString().split("T")[0] // "YYYY-MM-DD"
        : formData.dateOfBirth; // fallback (could be null or already string)

    const payload = {
      full_name: formData.fullName,
      gender: formData.gender,
      location: formData.location,
      dob: dob,
      about_you: formData.about,
    };

    await axios.put(`http://localhost:3000/studentdata/${student.id}`, payload);

    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating student data:", error);
  } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '24px 0' }}>
      <Container size="md">
        <Stack spacing="lg">
                  <UnstyledButton onClick={()=>navigation('/home/dashboard')} >
                  <Flex gap={2} align="center"  >
                    <IconArrowLeft size={16} />
                    <Text>Back</Text>
                  </Flex>
                  </UnstyledButton>
          {/* Personal Details Section */}
          <Paper shadow="sm" p="xl" radius="md" style={{ border: '1px solid #e9ecef', backgroundColor: 'white' }}>
            <Group spacing="sm" mb="xl">
              <Box
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#e0f7f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconUser size={24} style={{ color: '#0ca678' }} />
              </Box>
              <Title order={2} style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
                Personal Details
              </Title>
            </Group>

            <Stack spacing="md">
              <Text style={{ textAlign: 'left' }}>Full name</Text>
              <TextInput
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.currentTarget.value)}
                required
                size="md"
                styles={{
                  input: {
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                  },
                }}
              />

              <Text style={{ textAlign: 'left' }}>Gender</Text>
              <Select
                placeholder="Select gender"
                value={formData.gender}
                onChange={(value) => handleInputChange('gender', value)}
                data={['Male', 'Female', 'Other', 'Prefer not to say']}
                required
                size="md"
                styles={{
                  input: {
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                  },
                }}
              />
            </Stack>
          </Paper>

          {/* Location & Birthday Section */}
          <Paper shadow="sm" p="xl" radius="md" style={{ border: '1px solid #e9ecef', backgroundColor: 'white' }}>
            <Group spacing="sm" mb="xl">
              <Box
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#f3e8ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconMapPin size={24} style={{ color: '#9333ea' }} />
              </Box>
              <Title order={2} style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
                Location & Birthday
              </Title>
            </Group>

            <Text style={{ textAlign: 'left' }}>Location</Text>
            <Stack spacing="md">
              <TextInput
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.currentTarget.value)}
                required
                size="md"
                styles={{
                  input: {
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                  },
                }}
              />

              <Text style={{ textAlign: 'left' }}>Date Of Birth</Text>
              <DateInput
                placeholder="Select date"
                value={formData.dateOfBirth}
                onChange={(value) => handleInputChange('dateOfBirth', value)}
                icon={<IconCalendar size={16} />}
                size="md"
                styles={{
                  input: {
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                  },
                }}
              />
            </Stack>
          </Paper>

          {/* About You Section */}
          <Paper shadow="sm" p="xl" radius="md" style={{ border: '1px solid #e9ecef', backgroundColor: 'white' }}>
            <Group spacing="sm" mb="xl">
              <Box
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconUser size={24} style={{ color: '#f59e0b' }} />
              </Box>
              <Title order={2} style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
                About You
              </Title>
            </Group>

            <Text style={{ textAlign: 'left' }} mb="1rem">
              Tell us about yourself
            </Text>
            <Textarea
              placeholder="Write something about yourself..."
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.currentTarget.value)}
              minRows={5}
              maxRows={8}
              size="md"
              styles={{
                input: {
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                },
              }}
            />
          </Paper>

          {/* Save Button */}
          <Group position="right" mt="md">
            <Button
              size="lg"
              onClick={handleSave}
              loading={loading}
              style={{
                backgroundColor: '#0ca678',
                color: 'white',
                fontWeight: 600,
                padding: '12px 48px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: 'none',
              }}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
};

export default EditProfile;
