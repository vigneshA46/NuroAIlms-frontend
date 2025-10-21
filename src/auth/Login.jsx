import React, { useState, useRef, useEffect } from 'react';
import NuroAI from '../assets/NuroAI.png';
import bgimg from '../assets/bgimg.avif'
import {
  Box,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Alert,
  Text,
  Container,
  Image,
  Flex,
  Grid,
  BackgroundImage,
  Center
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconAlertCircle } from '@tabler/icons-react';
import { useStudent } from '../context/StudentContext';
import { callApi } from '../context/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const [error, setError] = useState('');
  const { student, loginStudent, loginAdmin } = useStudent();

  // Ref for password field
  const passwordRef = useRef(null);

  useEffect(() => {
    localStorage.removeItem('student');
    localStorage.removeItem('admin');
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await callApi('POST', '/auth/student-login', {
        email: email,
        password: password,
      });

      // If login successful
      if (res.data && res.data.student) {
        // Example: Redirect based on email/role
        if (res.data.student.email === 'nuroaiautomation@gmail.com') {
          loginAdmin(res.data.student);
          navigation('/admin');
        } else {
          loginStudent(res.data.student);
          navigation('/home');
        }
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error || 'Something went wrong. Try again.'
      );
    }
  };

  return (
    <Grid gutter={0} w="100%" style={{ minHeight: '100vh', margin: 0,borderRadius:"2rem" }}>
      {/* Left side - Login Form */}
      <Grid.Col 
        span={{ base: 12, lg: 6 }} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: '20px'
        }}
      >
        <Container  size="xs" px="md" style={{ width: '100%', maxWidth: '420px' }}>
          <Stack gap="md">
            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title="Login Failed"
                color="red"
                withCloseButton
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            <Paper
            
              shadow="sm"
              radius="md"
              p="xl"
              withBorder
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e9ecef',
              }}
            >
              <Flex align="center" justify="center" mb="lg">
                <Image src={NuroAI} w={100} />
              </Flex>
              <Title
                order={2}
                fw="700"
                style={{
                  textAlign: 'center',
                  color: '#212529',
                }}
              >
                Get Started with NuroAI
              </Title>
              <Text
                style={{ textAlign: 'center', fontSize: '0.875rem' }}
                c="dimmed"
                mb="xl"
              >
                Sign in to your account to continue
              </Text>

              <Stack gap="md">
                {/* Email Input */}
                <Box>
                  <Text
                    component="label"
                    size="sm"
                    c="#495057"
                    fw="500"
                    mb={8}
                    style={{ display: 'block' }}
                  >
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    placeholder="m@example.com"
                    size="md"
                    styles={{
                      input: {
                        border: '1px solid #dee2e6',
                        '&:focus': {
                          borderColor: '#228be6',
                        },
                      },
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        passwordRef.current?.focus();
                      }
                    }}
                  />
                </Box>

                {/* Password Input */}
                <Box>
                  <Text
                    component="label"
                    size="sm"
                    c="#495057"
                    fw="500"
                    mb={8}
                    style={{ display: 'block' }}
                  >
                    Password
                  </Text>
                  <PasswordInput
                    ref={passwordRef}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    placeholder="Enter your password"
                    size="md"
                    styles={{
                      input: {
                        border: '1px solid #dee2e6',
                        '&:focus': {
                          borderColor: '#228be6',
                        },
                      },
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit();
                      }
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  mt="md"
                  size="md"
                  style={{
                    backgroundColor: '#000',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: '#1a1a1a',
                      },
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>

                <Text
                  size="sm"
                  c="dimmed"
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                  td="underline"
                >
                  Forgot your password?
                </Text>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Grid.Col>

      {/* Right side - Image (Desktop only) */}
      <Grid.Col
        span={{ base: 0, lg: 6 }}
        visibleFrom="lg"
        style={{
          padding: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <BackgroundImage
          src={bgimg}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Box
            style={{
              height: '100%',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
          />
        </BackgroundImage>
      </Grid.Col>
    </Grid>
  );
};

export default Login;