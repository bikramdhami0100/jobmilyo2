
"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import axios from 'axios';
import { CountdownTimerIcon } from '@radix-ui/react-icons';

function CountDownTimer({ targetDate }: any) {
  // Function to calculate time left
  const calculateTimeLeft = () => {
    const now = moment(Date.now());
    const end = moment(targetDate);
    const duration = moment.duration(end.diff(now));

    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Function to handle deletion of jobs
  const handlerDeleteJobs = async () => {
    try {
      const response = await axios.post("/api/postjob/deletejobs", { targetDate: targetDate });
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting jobs:", error);
    }
  };

  useEffect(() => {
    // Timer to update the countdown every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // If time is up, trigger job deletion and clear the timer
      if (
        newTimeLeft.days <= 0 &&
        newTimeLeft.hours <= 0 &&
        newTimeLeft.minutes <= 0 &&
        newTimeLeft.seconds <= 0
      ) {
        clearInterval(timer); // Stop the timer
        handlerDeleteJobs(); // Trigger job deletion
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [targetDate]);

  return (
    <div>
      <div className='flex justify-center items-center flex-wrap gap-1'>
        <CountdownTimerIcon />
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    </div>
  );
}

export default CountDownTimer;
