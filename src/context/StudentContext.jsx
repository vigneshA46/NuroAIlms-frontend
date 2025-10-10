import { createContext, useState, useContext } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  // Student state
  const [student, setStudent] = useState(
    JSON.parse(localStorage.getItem("student")) || null
  );

  // Admin state
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  // Student login/logout
  const loginStudent = (studentData) => {
    setStudent(studentData);
    localStorage.setItem("student", JSON.stringify(studentData));
  };

  const logoutStudent = () => {
    setStudent(null);
    localStorage.removeItem("student");
  };

  // Admin login/logout
  const loginAdmin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        admin,
        loginStudent,
        logoutStudent,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
