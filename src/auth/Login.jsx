import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Alert,
  Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconAlertCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useStudent } from '../context/StudentContext';
import { callApi } from '../context/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const [error, setError] = useState('');
  const {student , loginStudent ,loginAdmin } = useStudent();


  // Ref for password field
  const passwordRef = useRef(null);
  useEffect(()=>{
    localStorage.removeItem('student');
    localStorage.removeItem('admin');
  },[])

 const handleSubmit = async () => {
  try {
    const res = await callApi("POST","/auth/student-login",{
      email : email,
      password :password,
    });

    // If login successful
    if (res.data && res.data.student) {
      // Example: Redirect based on email/role
      if (res.data.student.email === "nuroaiautomation@gmail.com") {
        loginAdmin(res.data.student)
        navigation("/admin");
      } else {
        loginStudent(res.data.student);
        navigation("/home");
      }
    }
  } catch (err) {
    console.log(err)
    setError(
      err.response?.data?.error || "Something went wrong. Try again."
    );
  }
};



  return (
    <Box maw={420} mx="auto" mt={60}>
      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Login Failed"
          color="red"
          mb="md"
        >
          {error}
        </Alert>
      )}
      <Paper shadow="md" radius="md" p="xl" withBorder>
        <Title order={2} mb="md" align="center">
          Login
        </Title>
        <Stack>
          {/* Email Input */}
          <Text component='label' size='sm' c="#000" fw="600" style={{textAlign:"left"}} >Email</Text>
          <TextInput
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            withAsterisk
            placeholder="Enter your email"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                passwordRef.current?.focus();
              }
            }}
          />

          {/* Password Input */}
          <Text mt={10} component='label' size='sm' c="#000" fw="600" style={{textAlign:"left"}} >Password</Text>
          <PasswordInput
            ref={passwordRef}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            withAsterisk
            placeholder="Your password"
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />

          <Button fullWidth mt="md" color="#000" c="#fff" onClick={handleSubmit}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
