import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignUp from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic: null,
  });

  const { loading, handleSignup } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", inputs.fullName);
    formData.append("username", inputs.username);
    formData.append("password", inputs.password);
    formData.append("confirmPassword", inputs.confirmPassword);
    formData.append("gender", inputs.gender);
    if (inputs.profilePic) {
      formData.append("profilePic", inputs.profilePic);
    }

    const res = await handleSignup(formData);
    if (res.success) {
      setInputs({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
        profilePic: null,
      });
    }
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  border-2 border-white">
        <h1 className="text-3xl font-bold text-center text-[#EEEEEE]">
          BitChat
        </h1>

        <div className="flex w-full flex-col">
          <div className="divider "></div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-[#c9b5b5]">
                Full Name <span className="text-red-600 text-md">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-[#c9b5b5]">
                Username <span className="text-red-600 text-md">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-[#c9b5b5]">
                Password <span className="text-red-600 text-md">*</span>
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-[#c9b5b5]">
                Confirm Password <span className="text-red-600 text-md">*</span>
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <div>
            <label className="label">
              <span className="text-base label-text text-[#c9b5b5]">
                Profile Picture (Optional)
              </span>
            </label>
            <input
              type="file"
              className="w-full  h-10"
              onChange={(e) =>
                setInputs({ ...inputs, profilePic: e.target.files[0] })
              }
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-70 text-[#EEEEEE]"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
            <Link
              to={"/login"}
              className="text-sm text-[#c9b5b5] hover:underline hover:text-[#e3dada] mt-2 flex items-center justify-center"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
