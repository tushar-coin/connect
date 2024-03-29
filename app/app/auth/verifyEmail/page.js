"use client";

const { useEffect, useState } = require("react");
import { useSearchParams } from "next/navigation";
import axios from "axios";

const verifyEmail = ({ params }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token')

  const [val, setVal] = useState("Trying to verify Email")
  useEffect(() => {
    axios
      .post("/api/auth/verifyEmail", {
        token
      })
      .then((res) => {
        console.log(res);
        setVal("Email Verified")
      })
      .catch((err) => {
        console.log(err);
        setShowButton(true);
        setVal("Link Has Expired")
      });
  }, []);
  console.log(params)

  return (
    <div>
      <h1>{val}</h1>
    </div>
  );
};

export default verifyEmail;
