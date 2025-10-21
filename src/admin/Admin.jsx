import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AppShell,
  Text,
  Group,
  Button,
  Stack,
  Box,
  Badge,
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
import "@mantine/core/styles.css";

import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";

// Import your pages
import AdminDashboard from "./AdminDashboard";
import Create from "./Create";
import Analytics from "./Analytics";
import Activeports from "./Activeports";
import { useStudent } from "../context/StudentContext";
import LogoutModal from "../molecules/LogoutModal.jsx";
import { useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";


const Admin = () => {
  const [opened, setOpened] = useState(false); 
    const isMobile = useMediaQuery("(max-width: 768px)");
  
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutAdmin , admin} = useStudent();
    const [logoutOpen, setLogoutOpen] = useState(false);
    const logout = ()=>{
    setLogoutOpen(false);
    logoutAdmin();
    navigate("/");
  }

  useEffect(()=>{
    if(!admin){
      navigate('/')
    }
  })
   useEffect(() => {
      if (isMobile) {
        document.body.style.overflow = opened ? "hidden" : "auto";
      }
      return () => (document.body.style.overflow = "auto");
    }, [opened, isMobile]);
  

  

  // Sidebar items
  const navItems = [
    { id:1,icon: IconHome, label: "Dashboard", path: "/admin/dashboard" },
    { id:2,icon: IconChartBar, label: "Create", path: "/admin/create" },
    { id:3,icon: IconFileText, label: "Analytics", path: "/admin/analytics" },
    { id:4,icon: IconCalendar, label: "Active ports", path: "/admin/activeports" }
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Flex align="center" h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="sm" size="sm" />
          <Text p={20} fw={600}>NuroAI</Text>
          <Box bg="#eeeeeeff" style={{borderRadius:'50%',alignItems:'center'}} pt={8} w={40} h={40} mt={10}  >
            <Text style={{textAlign:'center'}} fw="600" size="20px" c="grey" >VA</Text>
          </Box>
        </Flex>
      </AppShell.Header>

      {/* NAVBAR */}
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
        {/* Logo */}
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
          {navItems.map((item, index) => (
            <Button
              key={index}
              leftSection={<item.icon size={18} />}
              variant={location.pathname === item.path ? "light" : "subtle"}
              color={location.pathname === item.path ? "blue" : "gray"}
              fullWidth
              justify="flex-start"
              onClick={() => navigate(item.path)}
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
          onClick={()=>{setLogoutOpen(true);setOpened(false)}}
        >
          Log out
        </Button>
        </Stack>

        {/* Logout */}
 <LogoutModal
        opened={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={logout}
      />  
            </AppShell.Navbar>

      {/* MAIN CONTENT WITH ROUTES */}
      <AppShell.Main bg="gray.0" w="100%">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
 
export default Admin;
 