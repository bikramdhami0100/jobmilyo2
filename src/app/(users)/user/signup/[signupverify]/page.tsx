

"use client";
import { validUserToken } from '@/Redux/Slice';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpVerify() {
  const param = useParams();
  const router=useRouter();
  const token = param.signupverify;
  const dispatch=useDispatch();
  const sendSuccess = async () => {
    try {
      const send = await fetch("/api/email/verify", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ token:token })
      });

      const newdata = await send.json();

      if (newdata) {
        toast.success('🎉 Email verified successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
         dispatch(validUserToken(newdata));
        router.push("/user/userinformation");
      }
     
    } catch (error) {
      console.error('Error verifying email:', error);
     
    }
  };

  useEffect(() => {
      sendSuccess();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className=" p-8 rounded shadow-md text-center mt-[100px] ">
        <h1 className="text-4xl font-bold text-green-500 mb-4">Congratulations!</h1>
        <p className="text-xl text-gray-700">Your email has been successfully verified.</p>
        <p className="mt-4">You can now use all the features of our platform.</p>
        <div className="mt-6">

        </div>
      </div>
    </div>
  );
}

export default SignUpVerify;

