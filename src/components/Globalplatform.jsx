import { Container, Paper, Text, Group, Badge, Tabs, SimpleGrid, Card, rem } from '@mantine/core';
import { IconCode, IconBrandHackerrank, IconInfinity } from '@tabler/icons-react';

export default function GlobalPlatform() {
  return (
    <Container size="xl" py="xl">
      {/* Hero Section */}
      <Paper
        radius="lg"
        p="xl"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          marginBottom: '2rem'
        }}
      >
        <Group position="apart" align="flex-start" mb="md">
          <div>
            <Text size="xl" weight={700} mb="md" style={{ fontSize: '2rem',textAlign:'left' }}>
              Global Platform Assessments
            </Text>
            <Text  size="md" style={{ opacity: 0.95, maxWidth: '700px',textAlign:'left' }}>
              Enhance your skills through systematic evaluations on leading platforms
              like LeetCode, HackerRank, and GeeksforGeeks. These assessments
              provide you with a competitive advantage in the global tech landscape.
            </Text>
          </div>
          <Group spacing="md">
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <IconBrandHackerrank size={32} />
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <IconCode size={32} />
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '12px', 
              padding: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <IconInfinity size={32} />
            </div>
          </Group>
        </Group>
      </Paper>

      {/* Platform Tabs */}
      <Tabs defaultValue="all" mb="xl">
        <Tabs.List>
          <Tabs.Tab value="all">All Platforms</Tabs.Tab>
          <Tabs.Tab value="hackerrank" icon={<IconBrandHackerrank size={16} />}>
            HackerRank
          </Tabs.Tab>
          <Tabs.Tab value="leetcode" icon={<IconCode size={16} />}>
            LeetCode
          </Tabs.Tab>
          <Tabs.Tab value="geeksforgeeks" icon={<IconInfinity size={16} />}>
            GeeksforGeeks
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Statistics Cards */}
      <SimpleGrid 
       
        spacing="md" 
        mb="xl"
        cols={{ base: 2, sm: 2, md: 2, lg: 4 }} 
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text  style={{textAlign:'left'}} size="lg" color="dimmed" fw="700" mb="xs">
            Total Assessments
          </Text>
          <Text style={{textAlign:'left'}} size="2rem" fw="600">
            0
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ borderColor: '#4c6ef5' }}>
          <Text style={{textAlign:'left'}} size="lg" color="blue" fw="700" mb="xs">
            Active
          </Text>
          <Text style={{textAlign:'left'}} size="2rem" fw="600" color="blue">
            0
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ borderColor: '#9775fa' }}>
          <Text style={{textAlign:'left'}} size="lg" color="violet" fw="700" mb="xs">
            Upcoming
          </Text>
          <Text style={{textAlign:'left'}} size="2rem" fw="600" color="violet">
            0
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ borderColor: '#51cf66' }}>
          <Text style={{textAlign:'left'}} size="lg" color="green" fw="700" mb="xs">
            Completed
          </Text>
          <Text style={{textAlign:'left'}} size="2rem" fw="600" color="green">
            0
          </Text>
        </Card>
      </SimpleGrid>

      {/* All Assessments Section */}
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Text size="lg" weight={600}>
            All Assessments
          </Text>
          <Group>
            <IconCode size={20} style={{ opacity: 0.6 }} />
            <Text size="sm" color="dimmed">
              Help
            </Text>
          </Group>
        </Group>

        {/* Empty State */}
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          color: '#adb5bd'
        }}>
          <IconCode size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <Text size="lg" color="dimmed" weight={500}>
            No assessments available yet
          </Text>
          <Text size="sm" color="dimmed" mt="xs">
            Check back later for upcoming platform assessments
          </Text>
        </div>
      </Paper>
    </Container>
  );
}