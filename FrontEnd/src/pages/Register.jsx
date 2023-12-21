const Register = () => {
  return (
    <div className="container flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center md:w-1/2">
        <h1 className="mb-8 text-center text-[28px] font-bold md:text-[48px]">
          Register
        </h1>
        {/* FORM */}
        <form className="flex w-full flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            required
            name="name"
            className="w-full rounded-lg bg-slate-100 p-4 px-8 outline-none focus:outline-textLink"
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            required
            name="email"
            className="w-full rounded-lg bg-slate-100 px-8 py-4 outline-none focus:outline-textLink"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            required
            name="password"
            className="w-full rounded-lg bg-slate-100 p-4 px-8 outline-none focus:outline-textLink"
          />
          {/* BUTTON */}
          <button className="w-full rounded-lg bg-slate-700 p-4 px-8 text-white hover:opacity-90 md:text-[20px] uppercase">
            Register
          </button>
        </form>
        <div className="mt-5 flex w-full items-center justify-center">
          <p>
            Have an account? <span className="pl-2 text-textLink">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
