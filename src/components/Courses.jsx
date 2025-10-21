import { Avatar, Badge, Box, Button, Card, Container, Flex, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconBook, IconBrain, IconCertificate, IconClipboardCheck } from '@tabler/icons-react'
import React from 'react'

const Courses = () => {
  const courseData = [
  {
    id: 1,
    title:
      "Career Transformation Program - Dhanalakshmi Srinivasan Engineering College | CSE | ECE",
    label: "Course 1",
    level: "Beginner",
    levelColor: "green",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
    buttonText: "Continue",
    buttonVariant: "filled",
  },
  {
    id: 2,
    title: "Advanced Web Development Bootcamp",
    label: "Course 2",
    level: "Intermediate",
    levelColor: "orange",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
    buttonText: "Start",
    buttonVariant: "outline",
  },
];

  return (
      <Container size="xl" p="1rem">
          <Stack spacing="xl">
   <Card
           pl="2.5rem"
           radius={10}
           style={{
       background: "linear-gradient(135deg, rgba(52, 16, 255, 1), rgba(150, 248, 255, 1))",
       color: "white",
     }}
             sx={(theme) => ({
               borderRadius: theme.radius.lg,
               padding: theme.spacing.xl,
               color: 'white'
             })}
           >
             <Flex align="center" justify="flex-start" gap="1rem" spacing="md" mb="md">
               <Title order={1} color="white" weight={700}>
                 Courses
               </Title>
             </Flex>
             
             <Text size="lg" mb="xl" sx={{ maxWidth: '800px', lineHeight: 1.6 }} style={{textAlign:'left'}}>
               Step up and skill up! Interact live with passionate practitioners, learn without limits, and bloom your dreams.
             </Text>
   
             
           </Card>
           {/* Learning Now Section */}
      <Stack gap="xl">
        <Title
          order={3}
          size="xl"
          fw={600}
          c="dark.7"
          style={{textAlign:'left'}}
        >
          Learning now
        </Title>


       <Grid>
  {courseData.map((course) => (
    <Grid.Col key={course.id} span={{ base: 12, sm: 6, xl: 8 }}>
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
          {/* Avatar Icon */}
          <Avatar
            size={60}
            radius="md"
            style={{
              background: course.gradient,
              flexShrink: 0,
            }}
          >
            <IconBook size={28} color="white" />
          </Avatar>

          {/* Card Content */}
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Group gap="sm" mb="xs" wrap="wrap">
              <Text size="sm" c="dimmed" fw={500}>
                {course.label}
              </Text>
              <Badge
                color={course.levelColor}
                variant="light"
                size="sm"
                radius="sm"
              >
                {course.level}
              </Badge>
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
              {course.title}
            </Title>
          </Box>
        </Group>

        {/* Button */}
        <Button
          mt={10}
          variant={course.buttonVariant}
          color="blue"
          size="md"
          radius="md"
          style={{
            flexShrink: 0,
            minWidth: 100,
          }}
        >
          {course.buttonText}
        </Button>
      </Card>
    </Grid.Col>
  ))}
</Grid>
</Stack>
           </Stack>
           </Container>
  )
}

export default Courses
