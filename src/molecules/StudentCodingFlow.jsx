import { useEffect, useState } from "react";
import CodingAssignments from "./CodingAssignments";
import CodeEditor from "./CodeEditor";
import { Box, Card, Flex, SimpleGrid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import axios from "axios";
import { useStudent } from "../context/StudentContext";
import CodingChallengeComponent from "../components/CodingChallengeComponent";
import { useNavigate } from "react-router-dom";
import { callApi } from "../context/api";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

export default function StudentCodingFlow() {
  const navigation = useNavigate();

  const {student} = useStudent();
  const [challenges , setchallenges] = useState([]);

  useEffect(()=>{
    const fetchchallengesfordepartment = async ()=>{
      const res = await callApi("GET",`/coding/student/department/${student.department_id}`)
      setchallenges(res.data)
      console.log(res.data)
    }

    fetchchallengesfordepartment()
  },[])
  
  return <>
  <Stack p="1rem" >   
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
                   Coding Challenges
                 </Title>
               </Flex>
               
               <Text size="lg" mb="xl" sx={{ maxWidth: '800px', lineHeight: 1.6 }} style={{textAlign:'left'}}>
                 Crack the code, challenge your logic, and prove your potential — every line counts!
               </Text>
     
               
             </Card>
             </Stack>

           <Box style={{ 
      maxWidth: '1400px',
    }} mt="2rem" >
      <SimpleGrid
        p="1rem"
        spacing="lg"
       cols={{ base: 1, sm: 2, md: 2, lg: 3 }} 
      >
        {challenges.map((challenge) => (
        <UnstyledButton onClick={()=>navigation(`/home/codeeditor/${challenge.id}`)} >
          <CodingChallengeComponent key={challenge.id} challenge={challenge} />
        </UnstyledButton>
        ))}
      </SimpleGrid>
    </Box>  
  </>
}
