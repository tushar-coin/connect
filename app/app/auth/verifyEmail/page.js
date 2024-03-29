"use client";

const { useEffect } = require("react");
import { useSearchParams } from "next/navigation";
import axios from "axios";

const verifyEmail = ({ params }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token')
  useEffect(() => {
    axios
      .post("/api/auth/verifyEmail", {
        token
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(params)

  return (
    <div>
      <h1>Verify Email</h1>
      <p>Please check your email for a verification link.</p>
      <p>
        If you did not receive the email, please click
        {/* <button
        onClick={(e) => {
          sendVerificationEmail()
        }}
        >
          Resend verification link
        </button> */}
        .
      </p>
    </div>
  );
};

export default verifyEmail;
