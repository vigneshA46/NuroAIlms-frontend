import { Box, Button, Card, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { IconEdit, IconPlus } from '@tabler/icons-react'
import React from 'react'

const AdminDashboard = () => {
  return (
    <Stack gap="xl">
      <Card 
           p="xl"  radius="md"
  style={{
    background: "linear-gradient(135deg, rgba(227, 236, 241, 0.9), rgba(255, 255, 255, 0.6))",
    color: "white",
  }}>
            <Title style={{textAlign:'left'}} order={1} mb="sm" c="#000">
              Welcome Back, <Text size='30px' fw="700" component="span" c="blue">VIGNESH A!</Text>
            </Title>
            <Text style={{textAlign:'left'}} c="dimmed" size="lg" mb="md">
              Ready to continue your admin journey? You're making great progress!
            </Text>
          </Card>

         
    </Stack>
  )
}

export default AdminDashboard 