import { Card, Text, Title, List, Button, Divider } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function InstructionsBlock({ instructions, onStart }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={4} mb="sm" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IconInfoCircle size={20} /> Test Instructions
      </Title>
      <Divider mb="md" />

      <List  spacing="sm" size="sm" withPadding>
        {instructions.map((ins, idx) => (
          <List.Item style={{textAlign:'left'}} ml="3rem" key={idx}>
            <Text style={{textAlign:'left'}}>{ins}</Text>
          </List.Item>
        ))}
      </List>

      <Divider my="md" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
          />
          <Text   size="sm">I have read and understood the instructions</Text>
        </label>

        <Button
          disabled={!accepted}
          onClick={onStart}
          color="blue"
          radius="md"
        >
          Start Test
        </Button>
      </div>
    </Card>
  );
}
