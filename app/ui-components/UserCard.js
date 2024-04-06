import Image from "next/image";
import Link from "next/link";

const UserCard = (props) => {
  const { user } = props;
  console.log(user);
  return (
    <div className="flex rounded-lg flex-col dark:bg-slate-700 h-full">
      <div className="mx-auto h-[40%] w-full rounded-t-lg border-b-2">
        <Link
          href="/profile"
          className="hover:underline my-7 flex flex-col justify-center items-center"
        >
          <Image src={user.profilePic} className="rounded-full" height={80} />
          <span className="text-center my-4">{`${user.firstName} ${user.lastName}`}</span>
        </Link>
      </div>
      <div className="overflow-hidden text-lg p-5 whitespace-pre-line">
        <ul className="flex flex-col items-center">
          <li>
            <span>Text 1</span>
          </li>
          <li>
            <span>Text 2</span>
          </li>
          <li>
            <span>Text 3</span>
          </li>
          <li>
            <span>Text 4</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
