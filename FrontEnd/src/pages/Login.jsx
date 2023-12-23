import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as authServices from "../services/authServices";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    photo: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errMessage = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const data = await authServices.logIn(formData);
      if (!data.success) {
        errMessage.current = data.message;
        toast.error(errMessage.current, { position: "top-center" });
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      toast.success(data.message);
      navigate("/");
      //catching err
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="container flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center md:w-1/2">
        <h1 className="mb-4 text-center text-[28px] font-bold md:text-[48px]">
          LOG IN
        </h1>
        {/* ERROR MESSAGE, USING TOAST INSTEAD */}
        <h2 className="mb-4 text-red-600">
          {error ? error.message || "Something went wrong!" : ""}
        </h2>

        {/* FORM */}
        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          {/* EMAIL */}
          <div className="flex w-full">
            <div className="flex w-[80px] items-center justify-center rounded-l-lg bg-slate-700">
              <IoMailSharp className="text-[24px] text-white" />
            </div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              required
              name="email"
              value={formData.email}
              className=" w-full rounded-e-lg bg-slate-200 p-4 px-8 opacity-50 outline-none focus:opacity-100"
              onChange={handleChange}
            />
          </div>
          {/* PASSWORD */}
          <div className="flex w-full">
            <div className="flex w-[80px] items-center justify-center rounded-s-lg bg-slate-700">
              <FaLock className="text-[20px] text-white" />
            </div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              required
              name="password"
              value={formData.password}
              className=" w-full rounded-e-lg bg-slate-200 p-4 px-8 opacity-50 outline-none focus:opacity-100"
              onChange={handleChange}
            />
          </div>
          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-lg bg-slate-800 p-4 px-8 uppercase text-white outline-1 outline-white hover:bg-slate-600 disabled:opacity-70 md:text-[20px]"
          >
            {loading ? "LOADING..." : "LOG IN"}
          </button>
        </form>
        <button className="mt-4 w-full rounded-lg bg-red-900 p-4 px-8 uppercase text-white hover:bg-red-600 disabled:opacity-70 md:text-[20px]">
          LOG IN WITH GOOGLE
        </button>
        <div className="mt-5 flex w-full items-center justify-center">
          <p className="text-[18px]">
            Have an account yet?{" "}
            <Link to="/register">
              <span className="pl-2 font-semibold text-textLink">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
