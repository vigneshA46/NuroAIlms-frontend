import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";

import {
  Card,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  Box,
  ThemeIcon
} from '@mantine/core';
import {
  IconCalendarEvent,
  IconClock,
  IconClipboardText,
  IconCircleCheck,
  IconArrowRight
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import axios from 'axios';
import { callApi } from '../context/api';


const SingleAssessment = ({ 
  id,
  status = 'completed', 
  title, 
  startDate, 
  endDate, 
  questions, 
  duration,
  expired = false 
}) => {
  // Determine colors and styles based on status

  const Navigetion = useNavigate();
  const isExpired = dayjs().isAfter(dayjs(endDate));
  const {student} = useStudent();
  const studentid = student.id;
  const [isattempted , setisattempted] = useState(true)

  useEffect(()=>{
    const getisattempted = async ()=>{
      const res = await callApi("GET",`/submission/${id}/student/${studentid}/attempted`);
      setisattempted(res.data.attempted)
    }
    getisattempted();
  },[])

  const getStatusConfig = () => {
  if (isExpired) {
    return {
      badgeColor: 'gray',
      badgeText: 'Expired',
      cardBg: '#f8fafc',
      borderColor: '#64748b',
      buttonVariant: 'filled',
      buttonColor: 'gray',
      buttonText: 'View Details',
      icon: IconClock
    };
  }

  if (isattempted) {
    return {
      badgeColor: 'green',
      badgeText: 'Completed',
      cardBg: '#f0fdf4',
      borderColor: '#22c55e',
      buttonVariant: 'filled',
      buttonColor: 'green',
      buttonText: 'View Results',
      icon: IconCircleCheck
    };
  }

  return {
    badgeColor: 'blue',
    badgeText: 'Active',
    cardBg: '#f0f9ff',
    borderColor: '#3b82f6',
    buttonVariant: 'filled',
    buttonColor: 'blue',
    buttonText: 'Start Test',
    icon: IconClipboardText
  };
};

  const config = getStatusConfig();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        backgroundColor: config.cardBg,
        borderColor: config.borderColor,
        borderWidth: 1,
        height: '100%',
        position: 'relative'
      }}
    >
      <Stack spacing="md" h="100%">
        {/* Status Badge */}
        <Group position="apart" align="flex-start">
          <Badge 
            color={config.badgeColor} 
            variant="filled"
            size="sm"
            radius="sm"
          >
            {config.badgeText}
          </Badge>
          <ThemeIcon 
            size={24} 
            radius="md" 
            variant="light" 
            color={config.badgeColor}
          >
            <config.icon size={16} />
          </ThemeIcon>
        </Group>

        {/* Title */}
        <Text weight={600} size="md" color="dark" lineClamp={2}>
          {title}
        </Text>

        {/* Date Information */}
        <Stack spacing="xs">
          <Group spacing="xs" align="center">
            <IconCalendarEvent size={14} color="#64748b" />
            <Text size="sm" color="dimmed">
              Start: {startDate}
            </Text>
          </Group>
          <Group spacing="xs" align="center">
            <IconClock size={14} color="#64748b" />
            <Text size="sm" color="dimmed">
              End: {endDate}
            </Text>
          </Group>
          <Group spacing="xs" align="center">
            <IconClipboardText size={14} color="#64748b" />
            <Text size="sm" color="dimmed">
              {questions} questions • {duration}
            </Text>
          </Group>
        </Stack>

         {/* Expired Label */}
        {isExpired && (
          <Text size="sm" color="red" fw="500">
            Expired
          </Text>
        )}

        {/* Spacer to push button to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Action Button */}
        <Button
          variant={config.buttonVariant}
          color={config.buttonColor}
          rightIcon={<IconArrowRight size={14} />}
          fullWidth
          radius="md"
          size="sm"
          onClick={()=>{ Navigetion(`/home/assessmentdetails/${id}`)}}
        >
          {config.buttonText}
        </Button>
      </Stack>
    </Card>
  );
};

export default SingleAssessment;