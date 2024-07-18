const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-[#EEEEEE]">
          Login
          <span className="text-[#222831] font-bold"> BitChat</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-[#393E46]">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-[#393E46]">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <a
            href="#"
            className="text-sm  text-[#393E46] flex items-center justify-center hover:underline hover:text-[#020304] mt-2"
          >
            Forget your password?
          </a>
          <button className="btn btn-block btn-sm mt-2 text-[#EEEEEE]">
            Login
          </button>
          <a
            href="#"
            className="text-sm  text-[#393E46] flex items-center justify-center hover:underline hover:text-[#020304] mt-2"
          >
            {"Don't"} have an account?
          </a>

          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
