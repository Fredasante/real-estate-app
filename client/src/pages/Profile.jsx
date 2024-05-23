import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto w-full mb-10">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-5 p-5 lg:p-10 rounded-lg border shadow-sm">
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.avatar}
            alt="user avatar"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          value={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          value={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button type="submit">UPDATE</Button>

        <Link to="/create-post">
          <Button className="w-full" outline type="button">
            CREATE LISTING
          </Button>
        </Link>
      </form>
      <div className="flex justify-between mt-5 p-3 md:p-0">
        <span className="text-red-500 cursor-pointer">Delete Account?</span>
        <span className="text-teal-500 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
