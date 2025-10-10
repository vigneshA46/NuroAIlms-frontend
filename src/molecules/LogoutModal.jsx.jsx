// src/components/LogoutModal.jsx
import { Modal, Button, Group, Text } from "@mantine/core";

export default function LogoutModal({ opened, onClose, onConfirm }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Confirm Logout"
      centered
    >
      <Text size="sm" mb="md">
        Are you sure you want to log out?
      </Text>

      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color="black" onClick={onConfirm}>
          Logout
        </Button>
      </Group>
    </Modal>
  );
}
