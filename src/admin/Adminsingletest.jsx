import Papa from "papaparse";
import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Group,
  MultiSelect,
  Stack,
  Text,
  Title,
  Modal,
  UnstyledButton,
} from "@mantine/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { IconPlus } from "@tabler/icons-react";

const Adminsingletest = () => {


  const [questions, setQuestions] = useState([]);
const [openQuestionModal, setOpenQuestionModal] = useState(false);
const [editingQuestion, setEditingQuestion] = useState(null);
const [questionForm, setQuestionForm] = useState({
  question_text: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_option: "",
});

  const { testid } = useParams();
  const [testdata, settestdta] = useState([]);
  const [college, setCollege] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const availableDepartments = departments.filter(
  (dept) =>
    !testdata.departments?.some((allocated) => allocated.id === dept.id)
);

  // Modal state
  const [open, setOpen] = useState(false);

  const created_at = dayjs(testdata.created_at).format("DD MMM YYYY, hh:mm A");

  const handleCSVUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true, // expects headers in CSV
    skipEmptyLines: true,
    complete: async (result) => {
      try {
        const questionsData = result.data.map((row) => ({
          question_text: row.question_text,
          option_a: row.option_a,
          option_b: row.option_b,
          option_c: row.option_c,
          option_d: row.option_d,
          correct_option: row.correct_option,
          test_id: testid,
        }));

        await axios.post("http://localhost:3000/question/bulk", {
          questions: questionsData,
        });

        alert("CSV uploaded and questions added!");
        const qRes = await axios.get(`http://localhost:3000/question/${testid}`);
        setQuestions(qRes.data);
      } catch (err) {
        console.error("CSV Upload Error:", err);
        alert("Failed to upload CSV");
      }
    },
  });
};

 useEffect(() => {
  const fetchsingletest = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/test/${testid}`);
      settestdta(res.data);

      if (res.data.college_id) {
        const collegeRes = await axios.get(
          `http://localhost:3000/colleges/${res.data.college_id}`
        );
        setCollege(collegeRes.data);

        const deptRes = await axios.get(
          `http://localhost:3000/departments/college/${res.data.college_id}`
        );
        setDepartments(deptRes.data);
      }

      // fetch questions
      const qRes = await axios.get(`http://localhost:3000/question/${testid}`);
      setQuestions(qRes.data);
    } catch (error) {
      console.error("Error fetching test:", error);
      alert("Failed to fetch test details. Please try again later.");
    }
  };

  fetchsingletest();
}, [testid]);

const handleSaveQuestion = async () => {
  try {
    if (editingQuestion) {
      // Update existing
      await axios.put(
        `http://localhost:3000/question/${editingQuestion.id}`,
        { ...questionForm, test_id: testid }
      );
      alert("Question updated successfully!");
    } else {
      // Add new
      await axios.post("http://localhost:3000/question", {
        ...questionForm,
        test_id: testid,
      });
      alert("Question added successfully!");
    }

    // refresh list
    const qRes = await axios.get(`http://localhost:3000/question/${testid}`);
    setQuestions(qRes.data);

    setOpenQuestionModal(false);
    setEditingQuestion(null);
    setQuestionForm({
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_option: "",
    });
  } catch (err) {
    console.error("Error saving question:", err);
    alert("Failed to save question");
  }
};

const handleDeleteQuestion = async (id) => {
  if (!window.confirm("Are you sure you want to delete this question?")) return;
  try {
    await axios.delete(`http://localhost:3000/question/${id}`);
    setQuestions(questions.filter((q) => q.id !== id));
  } catch (err) {
    console.error("Error deleting question:", err);
    alert("Failed to delete question");
  }
};



  // Allocate departments
  const handleAllocateDepartments = async () => {
    if (selectedDepartments.length === 0) {
      alert("Please select at least one department.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://localhost:3000/test/${testid}/departments`, {
        department_ids: selectedDepartments,
      });
      alert("Departments allocated successfully!");
      setSelectedDepartments([]);
      setOpen(false); // close modal after success
    } catch (error) {
      console.error("Error allocating departments:", error);
      alert("Failed to allocate departments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xl" p={0}>
      <Stack spacing="xl">
        {/* Header */}
        <Card
          pl="2.5rem"
          radius={10}
          style={{
            background:
              "linear-gradient(135deg, rgba(52, 16, 255, 1), rgba(150, 248, 255, 1))",
            color: "white",
          }}
        >
          <Flex align="center" justify="flex-start" gap="1rem" mb="md">
            <Title order={1} weight={700}>
              {college.name}
            </Title>
          </Flex>
          <Text size="lg" mb="xl" style={{ textAlign: "left" }}>
            Step into the test, step closer to your dreams
          </Text>
        </Card>

        {/* Test Details */}
        <Flex align="center" gap="1rem" justify="space-between" mr="3rem">
          <Group>
            <Title style={{ textAlign: "left" }} order={3}>
              {testdata.title}
            </Title>
            <Text fw="500">{created_at}</Text>
          </Group>
          <Badge color="blue" size="xl">
            {testdata.id}
          </Badge>
        </Flex>

        <Card   shadow="lg"
  radius="lg"
  p="xl"
  sx={{
    background: "rgba(255, 255, 255, 0.15)", // transparent white
    backdropFilter: "blur(12px)",            // frosted blur effect
    WebkitBackdropFilter: "blur(12px)",      // Safari support
    border: "1px solid rgba(255, 255, 255, 0.2)", // subtle border
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // soft shadow
  }}>
    <Flex align="center" justify="space-between" >
       <Title style={{textAlign:'left'}}  order={4} mb="sm">
    Allocated Departments
  </Title>
       <UnstyledButton
          bg="blue" 
          w="32px" 
          h="32px" 
          style={{borderRadius:'50%'}} 
          p="5px"
          onClick={() => setOpen(true)}
        >
          <IconPlus size={23} color='#fff'/> 
        </UnstyledButton>
      

    </Flex>
      
 
  <Group spacing="sm">
    {testdata.departments && testdata.departments.length > 0 ? (
      testdata.departments.map((dept) => (
        <Badge key={dept.id} color="teal" size="lg">
          {dept.name}
        </Badge>
      ))
    ) : (
      <Text size="sm" color="dimmed">
        No departments allocated yet
      </Text>
    )}
  </Group>
</Card>
<input
  type="file"
  accept=".csv"
  style={{ display: "none" }}
  id="csvUpload"
  onChange={handleCSVUpload}
/>
<label htmlFor="csvUpload">
  <Button size="xs" color="teal" component="span" mt="xs">
    Upload CSV
  </Button>
</label>
<Card
  shadow="lg"
  radius="lg"
  p="xl"
  sx={{
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  }}
>
  <Flex align="center" justify="space-between">
    <Title order={4}>Questions</Title>
    <UnstyledButton
      bg="blue"
      w="32px"
      h="32px"
      style={{ borderRadius: "50%" }}
      p="5px"
      onClick={() => {
        setEditingQuestion(null);
        setOpenQuestionModal(true);
      }}
    >
      <IconPlus size={23} color="#fff" />
    </UnstyledButton>
  </Flex>

  <Stack mt="md">
    {questions.length > 0 ? (
      questions.map((q) => (
        <Card key={q.id} shadow="sm" radius="md" p="md">
          <Flex justify="space-between" align="center">
            <Stack>
              <Text fw={500}>{q.question_text}</Text>
              <Text size="sm" color="dimmed">
                A. {q.option_a} 
              </Text>
              <Text size="sm" color="dimmed">
                B. {q.option_b}
              </Text>
              <Text size="sm" color="dimmed">
                 C. {q.option_c}
              </Text>
              <Text size="sm" color="dimmed">
                 D.{" "}
                {q.option_d}
              </Text>
              <Badge color="green" mt="xs">
                Correct: {q.correct_option}
              </Badge>
            </Stack>
            <Stack>
              <Button
                size="xs"
                onClick={() => {
                  setEditingQuestion(q);
                  setQuestionForm(q);
                  setOpenQuestionModal(true);
                }}
              >
                Edit
              </Button>
              <Button
                size="xs"
                color="red"
                onClick={() => handleDeleteQuestion(q.id)}
              >
                Delete
              </Button>
            </Stack>
          </Flex>
        </Card>
      ))
    ) : (
      <Text size="sm" color="dimmed">
        No questions yet
      </Text>
    )}
  </Stack>
</Card>
<Modal
  opened={openQuestionModal}
  onClose={() => setOpenQuestionModal(false)}
  title={editingQuestion ? "Edit Question" : "Add Question"}
  centered
  size="lg"
>
  <Stack>
    <Text>Question</Text>
    <input
      value={questionForm.question_text}
      onChange={(e) =>
        setQuestionForm({ ...questionForm, question_text: e.target.value })
      }
    />
    <Text>Options</Text>
    <input
      placeholder="Option A"
      value={questionForm.option_a}
      onChange={(e) =>
        setQuestionForm({ ...questionForm, option_a: e.target.value })
      }
    />
    <input
      placeholder="Option B"
      value={questionForm.option_b}
      onChange={(e) =>
        setQuestionForm({ ...questionForm, option_b: e.target.value })
      }
    />
    <input
      placeholder="Option C"
      value={questionForm.option_c}
      onChange={(e) =>
        setQuestionForm({ ...questionForm, option_c: e.target.value })
      }
    />
    <input
      placeholder="Option D"
      value={questionForm.option_d}
      onChange={(e) =>
        setQuestionForm({ ...questionForm, option_d: e.target.value })
      }
    />
    <input
      placeholder="Correct Option (A/B/C/D)"
      value={questionForm.correct_option}
      onChange={(e) =>
        setQuestionForm({ ...questionForm, correct_option: e.target.value })
      }
    />

    <Button mt="md" fullWidth onClick={handleSaveQuestion}>
      {editingQuestion ? "Update Question" : "Add Question"}
    </Button>
  </Stack>
</Modal>

        
        {/* Modal */}
        <Modal
          opened={open}
          onClose={() => setOpen(false)}
          title="Allocate Departments to Test"
          centered
          size="sm"
        >
          <MultiSelect
  data={availableDepartments.map((dept) => ({
    value: dept.id.toString(),
    label: dept.name,
  }))}
  placeholder="Select departments"
  value={selectedDepartments}
  onChange={setSelectedDepartments}
  searchable
  nothingFound="No departments found"
/>
          <Button
            mt="md"
            fullWidth
            onClick={handleAllocateDepartments}
            loading={loading}
            disabled={departments.length === 0}
          >
            Allocate
          </Button>
        </Modal>
      </Stack>
    </Container>
  );
};

export default Adminsingletest;
