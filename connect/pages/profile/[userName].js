"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfilePage = ({ params }) => {
    const router = useRouter();
    const { userName } = router.query;

    // todo: query for user data wrt username
    const User = {
        userName: "manav",
        firstName: "Manavjeet",
        lastName: "Singh",
        email: "manavdandiwal11111@gmail.com",
        profileImageURL:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAoQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUBAv/EADkQAAICAQIDBAcDDQEAAAAAAAABAgMEBREGITFBUWHBEiNxgZGx0RMiUhQVMkNTYnOhssLh4vAl/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwC0gAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwZGZi4z2vyKq33SmkFZwa1Gfh5ElGnKpnLujNGyAAAQAAAAAAAAAAAAAAAAAAA+LbIU1ytskowgm5SfRI+yG8aapKy9abTL1cNnd4y6pe4DX1rie/LlKnAlOjH6emuU5ryXgR5tt7ye7fVsAuIHa0fiPL0+UYWylkY+/OEnu4r91v5HFAWLVxMqnMx4X48lKua5Pya7zMQHhPVHhZ6xrJeoyJKO3ZGT6PyJ8QAAAAAAAAAAAAAAAAAAB5KShCUn0S3ZVWTdLIyLbpvd2Tcn72WhlpvEvS/Zy+TKqAAA0gABSCbXR7NFpadkflWBj3vrZWpP27cyrSyuHU1oeHv21p/MyrogAAAAAAAAAAAAAAAAADxx9KLi+j5FVZVLx8q6mS2dc3F+5lrEK400yVWT+cKo+rt2Vu3ZLpv7/ICMgbA0gACLHqTfJLctPAo/JsGih9a64p/Ag3CulyztQjdZHfHx2pS37ZdUvMsD5kAAAAAAAAAAAAAAAAAAAD4tqhdXKu2KnXNbSjJbpo+wBD9U4QsjNz0yyMovmqrJbNex/U4dui6pS9rMC9eKj6SfvRZm+y3MMsrHr5WZFMfB2JBVb16RqVj2hgZDf8Nr5nY03hHKtnGWfONEO2EJKUn8OSJhDLxZ8oZNEn3faRfmZt91y6BGHExacOiNGNWoVR6RX/AHUzAAAAAAAAAAAAAAAAAAADl65rNOk0btKy+a9XVv18X4AbmbmY+FS7cq6NcF39X7F2kV1HjC2bcdOqjCP7S1bv3LoiPZ2bkZ+Q7suxzk+ndHwS7DXA2srUc3Le+Rk2z37PS5fA1Nl3I9BcR5su5Gxj5uViyTx8i2vb8M3t8DABgkun8XZVTUc6Eb4fij92f0ZKtO1LF1Gr7TFtUvxRfKUfaisDLjX24t0bseyVdkekkwsWsDicPa/DVI/Y3+jXlpbuK6T8V9DtkAAAAAAAAAAAAABqapn1abhTybtntyjHf9KT6IrXMyrs3JnkZEvSsm933LwXgdji/UHl6k8aD9VjNx5PrLtfkcEAACoAAoAAAAAPqqydNkbKpOE4PeMl2MsbQNVjq2GrOSug1G2K7+/2MrfxOlw/qP5t1KuyT9TP7lq/d/wRVkgPrz6+AIAAAAAAAABr6hkrEwb8h/q4OX0/mbBw+MrXVoVkV+ssjD3dfICAylKTcpPeTe7Z4AWIAAoAAAAAAAADwAIqyOHMp5mj485PecY+hL2rl9DpkY4DtcsLKq/BapL3r/Uk5AAAAAAAAAI5x2//ACqF35C/pkeACEAAsQABQAAAAAAAAAAEs4Af389dm1f9xLwCLAAEAAAf/9k=",
        bio: "here is something about me",
        skills: ["dsa", "cp", "web dev", "react", "nextjs"],
    };
    /*
    <li>Change Password</li>
                        <li>Edit Skills</li>
                        <li>Edit bio</li>
                        <li>Change Profile Image</li>
     */
    const options = [
        {
            text: "Change Password",
            linkto: "/modify/password",
        },
        {
            text: "Edit Skills",
            linkto: "/modify/skills",
        },
        {
            text: "Edit bio",
            linkto: "/modify/bio",
        },
        {
            text: "Change Profile Image",
            linkto: "/modify/profile-image",
        },
    ];

    return (
        <div className="flex flex-row justify-around h-[100vh] gap-5 bg-white-1">
            <div className="bg-blue-1 w-full h-full rounded text-blue-2 p-10 flex justify-center flex-col">
                <div className="bg-blue-1 rounded-lg p-5">
                    <span className="text-white-1 font-extrabold text-5xl font-mono">
                        Profile
                    </span>
                    <table>
                        <tbody>
                            <tr className="bg-blue-1">
                                <td className="pr-5 font-semibold text-gray-400">
                                    School
                                </td>
                                <td className="pl-5 font-semibold text-gray-400">
                                    Random school
                                </td>
                            </tr>
                            <tr className="bg-blue-1">
                                <td className="pr-5 font-semibold text-gray-400">
                                    Address
                                </td>
                                <td className="pl-5 font-semibold text-gray-400">
                                    Home address: some random address
                                </td>
                            </tr>
                            <tr className="bg-blue-1">
                                <td className="pr-5 font-semibold text-gray-400">
                                    Email
                                </td>
                                <td className="pl-5 font-semibold text-gray-400">
                                    {User.email}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-blue-1 rounded-lg p-5">
                    <span className="text-white-1 font-extrabold text-4xl font-mono">
                        Skills
                    </span>
                    <div>
                        {User.skills.map((skill, index) => {
                            return (
                                <p
                                    key={index}
                                    className="font-normal text-gray-400"
                                >
                                    {skill.toUpperCase()}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full bg-white-1 flex flex-col justify-around font-mono p-10">
                <div className="flex flex-col justify-center mb-15 items-center">
                    <Image
                        className="rounded-full"
                        src={User.profileImageURL}
                        alt="User profile image"
                        width={250}
                        height={250}
                    />
                    <div className="flex items-center flex-col">
                        <h1 className="font-bold text-5xl text-black-1">
                            {User.userName}
                        </h1>
                        <h1 className="font-bold text-3xl text-black-1">{`${User.firstName} ${User.lastName}`}</h1>
                    </div>
                </div>

                <div className="flex items-center flex-col">
                    <span className="text-blue-1 font-extrabold text-5xl font-mono">
                        About me
                    </span>
                    <p className="text-xl">{User.bio}</p>
                </div>
            </div>

            <div className="bg-blue-1 w-full h-full text-white-1 flex justify-center">
                <div className="flex flex-col justify-center mb-15 items-center w-[60%]">
                    <ul className="w-full">
                        {options.map((option) => {
                            return (
                                <li className="cursor-pointer p-2 rounded-lg hover:bg-blue-2 w-full">
                                    <Link href={option.linkto}>
                                        {option.text}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
