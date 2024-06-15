"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLazyMutation, useMutation, gql } from "@apollo/client";

const StudentInfoPage = () => {
  const router = useRouter();

  // State variables to store user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [school, setSchool] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  // to be deleted
  const password = "123";

  // const CREATE_USER = gql`
  //     mutation CreateUser(
  //       $firstName: String!
  //       $lastName: String!
  //       $email: String!
  //       $password: String!
  //     ) {
  //       createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
  //       }
  //    `;
  //   // backend mai data and redirection
  //   const [createuser, { loading, error, data }] = useLazyMutation(CREATE_USER);
  //   await createuser({
  //     variables: { firstName, lastName, email, password },
  //   });
  //   router.push("/");
  // };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    router.push("/");
  };



  const handleSubjectChange = (event) => {
    const selectedSubjects = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSubjects(selectedSubjects);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen  p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Student Information
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-blue-300 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-black-700 font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            min={0}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="school"
            className="block text-gray-700 font-bold mb-2"
          >
            School
          </label>
          <input
            type="text"
            id="school"
            name="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subjects"
            className="block text-gray-700 font-bold mb-2"
          >
            Subjects (select all that apply)
          </label>
          <select
            id="subjects"
            name="subjects"
            multiple
            value={subjects}
            onChange={handleSubjectChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="history">History</option>
            <option value="art">Art</option>
            <option value="physical-education">Physical Education</option>
            <option value="music">Music</option>
            <option value="computer-science">Computer Science</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block text-gray-700 font-bold mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            rows="1"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentInfoPage;
