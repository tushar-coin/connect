"use client";
import Header from "@/ui-components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        router.push("/auth/login");
      });
  }, []);

  return (
    <div>
      <div id="header">
        <Header user={user} />
      </div>
      {/* <div id="body">
        <div className="flex flex-row justify-between">
          <div className="bg-black basis-1/4">1</div>
          <div className="basis-1/2">2</div>
          <div className="bg-black basis-1/4">3</div>
        </div>
      </div>
      <div id="footer"></div> */}
    </div>
  );
};

export default Home;
