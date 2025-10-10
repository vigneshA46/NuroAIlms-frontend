import { Card, Button, Text, Container, Grid } from "@mantine/core";
import { useState } from "react";

export default function CodingAssignments({ onSolve }) {
  // Static sample questions
  const questions = [
    { id: 1, question_text: "Write a function to find the factorial of a number." },
    { id: 2, question_text: "Write a program to reverse a string." },
    { id: 3, question_text: "Check if a number is prime." },
  ];

  return (
    <Container>
      <h2>My Coding Assignments</h2>
      <Grid>
        {questions.map(q => (
          <Grid.Col span={6} key={q.id}>
            <Card shadow="sm" p="lg">
              <Text fw={600}>{q.question_text}</Text>
              <Button mt="md" onClick={() => onSolve(q)}>Solve</Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
