"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminContext } from "../../context/AdminExistProvider";
import { BarGraph } from "../../components/BarGraph";
import { motion } from "framer-motion";
import { User, Briefcase, FileText, PhoneCall } from "lucide-react"; // Icon imports

function AdminDashoBoard() {
  const [totaldata, setTotalData] = useState<any>();
  const { adminId } = useAdminContext();

  const dataSummary = [
    {
      name: "Total Users",
      number: totaldata?.totaluser || 0,
      icon: <User className="h-10 w-10 text-primary" />, // Icon instead of emoji
    },
    {
      name: "Total Jobs",
      number: totaldata?.totaljob || 0,
      icon: <Briefcase className="h-10 w-10 text-primary" />,
    },
    {
      name: "Applied Jobs",
      number: totaldata?.totalAppliedjob || 0,
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      name: "Contacted Users",
      number: totaldata?.totalContactuser || 0,
      icon: <PhoneCall className="h-10 w-10 text-primary" />,
    },
  ];

  console.log(adminId, "admin id from dashboard");

  const Totalhandler = async () => {
    const send = (
      await axios.get("/api/dashboard/", {
        params: {
          adminId: adminId,
        },
      })
    ).data;
    console.log(send);
    setTotalData(send.data);
  };

  useEffect(() => {
    Totalhandler();
    return () => {
      removeEventListener("beforeunload", Totalhandler);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center italic my-10 font-bold underline decoration-primary">
        Dashboard
      </h1>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {dataSummary.map((item: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            className="cursor-pointer bg-background hover:shadow-xl dark:hover:shadow-primary/40 transition rounded-2xl p-6 flex flex-col items-center justify-center w-[250px] h-[200px] border shadow-md"
          >
            <div className="mb-4">{item.icon}</div>
            <h2 className="text-lg font-semibold mb-2 text-center">{item.name}</h2>
            <p className="text-2xl font-bold text-primary">{item.number}</p>
          </motion.div>
        ))}
      </div>

      {/* Graph Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <BarGraph />
      </motion.div>
    </div>
  );
}

export default AdminDashoBoard;
