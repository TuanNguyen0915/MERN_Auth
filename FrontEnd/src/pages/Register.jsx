import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as authServices from "../services/authServices";
import { toast } from "react-toastify";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/auth/register`;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authServices.register(formData);
      if (!data.success) {
        setErrMessage(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="container flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center md:w-1/2">
        <h1 className="mb-4 text-center text-[28px] font-bold md:text-[48px]">
          Register
        </h1>
        {/* ERROR MESSAGE */}
        {errMessage && <h2 className="mb-4 text-red-600">{errMessage}</h2>}
        {/* FORM */}
        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            required
            name="name"
            value={formData.name}
            className="mt-4 w-full rounded-lg bg-slate-100 p-4 px-8 outline-none focus:outline-textLink"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            required
            name="email"
            value={formData.email}
            className="w-full rounded-lg bg-slate-100 px-8 py-4 outline-none focus:outline-textLink"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            required
            name="password"
            value={formData.password}
            className="w-full rounded-lg bg-slate-100 p-4 px-8 outline-none focus:outline-textLink"
            onChange={handleChange}
          />
          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-lg bg-slate-700 p-4 px-8 uppercase text-white hover:opacity-90 disabled:opacity-70 md:text-[20px]"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="mt-5 flex w-full items-center justify-center">
          <p>
            Have an account?{" "}
            <Link to="/login">
              <span className="pl-2 text-textLink">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
