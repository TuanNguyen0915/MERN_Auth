import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as authServices from "../services/authServices";
import { toast } from "react-toastify";
import { FaLock, FaUser, FaImage } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { uploadImageToCloudinary } from "../services/uploadToCloudinary";

const Register = () => {
  const navigate = useNavigate();
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const errMessage = useRef(null);
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

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewPhoto(data.url);
    setFormData({...formData, photo: data.url})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authServices.signUp(formData);
      if (!data.success) {
        errMessage.current = data.message;
        console.log(errMessage.current)
        toast.error(errMessage.current, { position: "top-center" });
      } else {
        toast.success(data.message);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="container flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center md:w-1/2">
        <h1 className="mb-4 text-center text-[28px] font-bold md:text-[48px]">
          Register
        </h1>
        {/* ERROR MESSAGE, USING TOAST INSTEAD
        {errMessage.current && <h2 className="mb-4 text-red-600">{errMessage.current}</h2>} */}

        {/* FORM */}
        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          {/* USERNAME */}
          <div className="mt-4 flex w-full">
            <div className="flex w-[80px] items-center justify-center rounded-l-lg bg-slate-600">
              <FaUser className="text-[20px] text-white" />
            </div>
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              required
              name="name"
              value={formData.name}
              className=" w-full rounded-e-lg bg-slate-200 p-4 px-8 opacity-50 outline-none focus:opacity-100"
              onChange={handleChange}
            />
          </div>
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
          {/* PHOTO */}
          <div className="flex w-full">
            <div className="flex w-[80px] items-center justify-center rounded-s-lg bg-slate-700">
              <FaImage className="text-[20px] text-white" />
            </div>
            <input
              type="file"
              accept=".png, .jpeg"
              name="photo"
              className=" w-full rounded-e-lg bg-slate-200 p-4 px-8 opacity-50 outline-none focus:opacity-100"
              onChange={handleUploadPhoto}
            />
          </div>
          {/* SHOW UPLOAD PHOTO */}
          <div className="my-2 p-2">
            {previewPhoto && (
              <figure className="border-primaryColor flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-slate-500">
                <img
                  src={previewPhoto}
                  alt="avatar"
                  className="w-full h-full rounded-full object-contain"
                />
              </figure>
            )}
          </div>
          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full rounded-lg bg-slate-800 p-4 px-8 uppercase text-white outline-1 outline-white hover:bg-slate-600 disabled:opacity-70 md:text-[20px]"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <button className="mt-4 w-full rounded-lg bg-red-900 p-4 px-8 uppercase text-white hover:bg-red-600 disabled:opacity-70 md:text-[20px]">
          REGISTER WITH GOOGLE
        </button>
        <div className="mt-5 flex w-full items-center justify-center">
          <p className="text-[18px]">
            Have an account?{" "}
            <Link to="/login">
              <span className="pl-2 font-semibold text-textLink">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
