"use client";

const { useEffect, useState } = require("react");
import { useSearchParams } from "next/navigation";
import axios from "axios";

const VerifyEmail = ({ params }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verificationStatus, setVerificationStatus] = useState(
    "Verifying your email..."
  );
  const [showResendButton, setShowResendButton] = useState(false);

  const resendVerificationEmail = () => {
    axios
      .post("/api/auth/resendVerification", { token })
      .then(() => {
        setVerificationStatus(
          "A new verification link has been sent to your email."
        );
        setShowResendButton(false);
      })
      .catch((err) => {
        console.error(err);
        setVerificationStatus(
          "Failed to resend verification email. Please try again later."
        );
      });
  };

  useEffect(() => {
    axios
      .post("/api/auth/verifyEmail", { token })
      .then((res) => {
        console.log("From frontend response-> " + res);
        if (res.status == "200")
          setVerificationStatus("Email is already Verified Successfully!");
        else setVerificationStatus("Email Verified Successfully!");

        setShowResendButton(false);
      })
      .catch((err) => {
        console.log(err);
        setVerificationStatus("Link Has Expired.");
        setShowResendButton(true);
      });
  }, [token]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid #ddd",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    resendButton: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <h1>{verificationStatus}</h1>
      {showResendButton && (
        <button style={styles.resendButton} onClick={resendVerificationEmail}>
          Resend Verification Email
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
