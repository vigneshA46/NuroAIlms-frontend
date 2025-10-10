import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Group,
  Button,
  Stack,
  Title,
  Divider,
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";

const CreateCodingChallengeModal = ({ opened, onClose, onCreated , college_id }) => {
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "",
    college_id: college_id,
    department_ids: [],
    language_options: [],
    test_cases: "",
    start_date: "",
    end_date: "",
  });

  // Fetch colleges on open
  useEffect(() => {
    if (opened) {
      axios.get("http://localhost:3000/colleges").then((res) => setColleges(res.data));
    }
  }, [opened]);

  // Fetch departments when college changes
  useEffect(() => {
    if (form.college_id) {
      axios
        .get(`http://localhost:3000/departments/college/${college_id}`)
        .then((res) => setDepartments(res.data));
    }
  }, [form.college_id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/coding/admin/create", form);
      onCreated?.();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} size="lg" title="Create Coding Challenge" centered>
      <Stack spacing="md">
        <Title order={4}>Challenge Details</Title>
        <TextInput
          label="Title"
          placeholder="Enter challenge title"
          required
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <Textarea
          label="Description"
          placeholder="Enter challenge description"
          minRows={3}
          required
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Select
          label="Difficulty"
          placeholder="Select difficulty"
          data={["Easy", "Medium", "Hard"]}
          value={form.difficulty}
          onChange={(value) => handleChange("difficulty", value)}
        />
{/*         <Select
          label="College"
          placeholder="Select college"
          data={colleges.map((c) => ({ value: c.id.toString(), label: c.name }))}
          value={form.college_id}
          onChange={(value) => handleChange("college_id", value)}
        /> */}
        <MultiSelect
          label="Departments"
          placeholder="Select departments"
          data={departments.map((d) => ({ value: d.id.toString(), label: d.name }))}
          value={form.department_ids}
          onChange={(value) => handleChange("department_ids", value)}
        />
        <MultiSelect
          label="Allowed Languages"
          placeholder="Select programming languages"
          data={["Python", "C++", "Java", "JavaScript", "C", "Go"]}
          value={form.language_options}
          onChange={(value) => handleChange("language_options", value)}
        />
        <Textarea
          label="Test Cases (JSON format)"
          placeholder='Example: [{"input": "2 3", "output": "5"}]'
          minRows={3}
          value={form.test_cases}
          onChange={(e) => handleChange("test_cases", e.target.value)}
        />
        <Grid>
          <Grid.Col span={6}>
{/*     <DateInput
      label="Start Date"
      value={form.start_date ? new Date(form.start_date) : null}
      onChange={(value) => {
        const dateValue = value instanceof Date ? value.toISOString() : "";
        handleChange("start_date", dateValue);
      }}
    /> */}
    <TextInput
          type="datetime-local"
          label="Start Date"
          value={form.start_date}
          onChange={(e) => handleChange("start_date",e.target.value)}
          required
        />
  </Grid.Col>

  <Grid.Col span={6}>

        <TextInput
          type="datetime-local"
          label="End Date"
          value={form.end_date}
          onChange={(e) => handleChange("end_date",e.target.value)}
          required
        />
  </Grid.Col>
        </Grid>

        <Divider my="sm" />
        <Group position="right">
          <Button variant="default" onClick={onClose}>
            Cancel  
          </Button>
          <Button loading={loading} onClick={handleSubmit}>
            Create
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CreateCodingChallengeModal;
