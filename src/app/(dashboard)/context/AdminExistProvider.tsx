"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Define the type for your context value
interface AdminContextType {
  adminId: string | null;
  setAdminId: (id: string | null) => void;
}

const AdminExistContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminExistContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminExistProvider");
  }
  return context;
};

function AdminExistProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [adminId, setAdminId] = useState<string | null>(localStorage.getItem("adminId")); // Initialize from localStorage

  const handlerStorageEvent = (e: StorageEvent) => {
    if (e.key === "adminId") {
      const newAdminId = e.newValue;
      console.log(newAdminId, "admin id from storage event");
      setAdminId(newAdminId);
      if (newAdminId) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/login");
      }
    }
  };

  useEffect(() => {
    // Initial check on mount
    if (adminId) {
      router.push("/admin");
    } else {
      router.push("/user/login"); // Consider if you want to redirect here initially
    }

    window.addEventListener("storage", handlerStorageEvent);
    return () => {
      window.removeEventListener("storage", handlerStorageEvent);
    };
  }, []); // Add adminId and router to the dependency array

  return (
    <AdminExistContext.Provider value={{ adminId, setAdminId }}>
      {children}
    </AdminExistContext.Provider>
  );
}

export default AdminExistProvider;