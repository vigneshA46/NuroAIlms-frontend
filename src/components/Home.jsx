import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppShell,
  Text,
  Group,
  Button,
  Stack,
  Box,
  Burger,
  Flex,
} from "@mantine/core";
import {
  IconHome,
  IconChartBar,
  IconFileText,
  IconCalendar,
  IconUsers,
  IconWorld,
  IconBook,
  IconGrid3x3,
  IconCertificate,
  IconLogout,
} from "@tabler/icons-react";

import { useStudent } from "../context/StudentContext";
import LogoutModal from "../molecules/LogoutModal.jsx";

const Home = () => {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutStudent, student } = useStudent();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const logout = () => {
    setLogoutOpen(false);
    logoutStudent();
    navigate("/");
  };

  useEffect(() => {
    if (!student) navigate("/");
  }, []);

  // 🔒 Lock body scroll when mobile navbar is open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = opened ? "hidden" : "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [opened, isMobile]);

  const navItems = [
    { id: 1, icon: IconHome, label: "Dashboard", path: "/home/dashboard" },
    { id: 2, icon: IconChartBar, label: "Overall Report", path: "/home/overall-report" },
    { id: 3, icon: IconFileText, label: "Assessments", path: "/home/assessments" },
    { id: 4, icon: IconCalendar, label: "Coding Calendar", path: "/home/studentcoding" },
    { id: 5, icon: IconUsers, label: "Mentoring Support", path: "/home/mentoring-support" },
    { id: 6, icon: IconWorld, label: "Global Platform ...", path: "/home/global-platform" },
    { id: 7, icon: IconBook, label: "Courses", path: "/home/courses" },
    { id: 8, icon: IconGrid3x3, label: "DSA Sheets", path: "/home/dsa-sheets" },
    { id: 9, icon: IconCertificate, label: "Certificates", path: "/home/certificates" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Flex align="center" h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="sm" size="sm" />
          <Text p={20} fw="600">NuroAI</Text>
          <Box bg="#eeeeeeff" style={{ borderRadius: "50%", alignItems: "center" }} pt={8} w={40} h={40} mt={10}>
            <Text style={{ textAlign: "center" }} fw="600" size="20px" c="grey">
              VA
            </Text>
          </Box>
        </Flex>
      </AppShell.Header>

      {/* DIM BACKGROUND WHEN NAVBAR OPEN (MOBILE) */}
      {isMobile && opened && (
        <Box
          onClick={() => setOpened(false)}
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            width: "100%",
            height: "calc(100vh - 60px)",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        />
      )}

      {/* NAVBAR */}
      <AppShell.Navbar
        w={isMobile ? "75%" : 250}
        p="md"
        style={{
          zIndex: 1001,
          position: isMobile ? "fixed" : "fixed",
          height: "100vh",
          top: isMobile ? 60 : 0,
          left: opened ? 0 : isMobile ? "-75%" : 0,
          transition: "left 0.3s ease",
          backgroundColor: "white",
        }}
      >
        <Group mb="md">
          <Box
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#228be6",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                width: 16,
                height: 16,
                backgroundColor: "white",
                borderRadius: 2,
                transform: "rotate(45deg)",
              }}
            />
          </Box>
          <Text fw={600} size="lg">
            NuroAI
          </Text>
        </Group>

        {/* Sidebar Navigation */}
        <Stack gap="xs" flex={1}>
          {navItems.map((item) => (
            <Button
              key={item.id}
              leftSection={<item.icon size={18} />}
              variant={location.pathname === item.path ? "light" : "subtle"}
              color={location.pathname === item.path ? "blue" : "gray"}
              fullWidth
              justify="flex-start"
              onClick={() => {
                navigate(item.path);
                setOpened(false); // close navbar on mobile
              }}
              c="#000"
            >
              {item.label}
            </Button>
          ))}
        <Button
          leftSection={<IconLogout size={18} />}
          variant="subtle"
          color="gray"
          fullWidth
          justify="flex-start"
          onClick={() => {setLogoutOpen(true); setOpened(false)}}
        >
          Log out
        </Button>
        </Stack>

        {/* Logout */}
        <LogoutModal opened={logoutOpen} onClose={() => 
          
          setLogoutOpen(false)} onConfirm={logout} />
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main bg="gray.0" w="100%">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default Home;
