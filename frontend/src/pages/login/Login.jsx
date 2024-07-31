import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res.success) {
      // TODO:  Navigate or handle successful login here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0border-gray-50 border-2">
        <h1 className="text-3xl font-bold text-center text-[#EEEEEE]">
          BitChat
        </h1>

        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-[#c9b5b5]">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-[#c9b5b5]">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a
            href="#"
            className="text-sm  flex items-center justify-center   mt-2 text-[#c9b5b5] hover:underline hover:text-[#e3dada]"
          >
            Forget your password?
          </a>

          <button
            type="submit"
            className="btn btn-block btn-sm mt-2 text-[#EEEEEE]"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>

          <Link
            to={"/signup"}
            className="text-sm  flex items-center justify-center mt-2 text-[#c9b5b5] hover:underline hover:text-[#e3dada]"
          >
            {"Don't"} have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
