import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser.user;
  return (
    <div className="container flex flex-col items-center justify-center gap-7">
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="h-[100px] w-[100px] rounded-full">
        <img
          src={user.photo}
          alt="user's photo"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className=" w-full md:w-1/2">
        <form className="flex w-full flex-col items-center justify-center gap-4">
          <input
            type="text"
            name="name"
            value={user.name}
            className="w-full rounded-lg px-4 py-2"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            className="w-full rounded-lg px-4 py-2"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="password"
            className="w-full rounded-lg px-4 py-2"
          />

          <button className="w-full rounded-lg bg-slate-800 p-4 px-8 uppercase text-white outline-1 outline-white hover:bg-slate-600 disabled:opacity-70 md:text-[20px]">
            UPDATE
          </button>
        </form>

        <div className="flex w-full items-center justify-between my-4">
          <Link className="w-full">
            <p className="text-red-600w text-left">Delete Account</p>
          </Link>
          <Link className=" w-full">
            <p className="text-right text-red-600">Log out</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
