import React from 'react';
import { Card, Badge, Text, Group, Stack, Box, ThemeIcon } from '@mantine/core';
import { Calendar, Clock, Code } from 'lucide-react';

const CodingChallengeComponent = ({ challenge }) => {
  // Parse language options
  const languages = challenge.language_options.split(',');
  
  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder
      style={{
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Stack spacing="md">
        {/* Header with Title and Difficulty */}
        <Group position="apart" align="flex-start">
          <Box style={{ flex: 1 }}>
            <Text size="xl" weight={600} lineClamp={2}>
              {challenge.title}
            </Text>
          </Box>
          <Badge 
            color={getDifficultyColor(challenge.difficulty)} 
            variant="filled"
            size="lg"
          >
            {challenge.difficulty}
          </Badge>
        </Group>

        {/* Description */}
        <Text size="sm" color="dimmed" lineClamp={3}>
          {challenge.description}
        </Text>

        {/* Language Options */}
        <Group spacing="xs">
          <ThemeIcon size="sm" variant="light" color="blue">
            <Code size={14} />
          </ThemeIcon>
          <Group spacing={6}>
            {languages.map((lang, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                color="blue"
                size="sm"
                style={{ textTransform: 'capitalize' }}
              >
                {lang.trim()}
              </Badge>
            ))}
          </Group>
        </Group>

        {/* Date Information */}
        <Stack spacing="xs">
          <Group spacing="xs">
            <ThemeIcon size="sm" variant="light" color="teal">
              <Calendar size={14} />
            </ThemeIcon>
            <Text size="xs" color="dimmed">
              <Text component="span" weight={500} color="dark">
                Start:
              </Text>{' '}
              {formatDate(challenge.start_date)}
            </Text>
          </Group>
          
          <Group spacing="xs">
            <ThemeIcon size="sm" variant="light" color="orange">
              <Clock size={14} />
            </ThemeIcon>
            <Text size="xs" color="dimmed">
              <Text component="span" weight={500} color="dark">
                End:
              </Text>{' '}
              {formatDate(challenge.end_date)}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CodingChallengeComponent