import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import signupImgae from "../images/signup.jpg";
import Branding from "../components/Branding";

const SignUpPage = () => {
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    phone: "",
    address: "",
    collegeName: "",
    collegeUID: "",
    idCardPhoto: null,
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen mx-auto grid grid-cols-1 md:grid-cols-2">
        <div
          style={{
            backgroundImage: `url(${signupImgae})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            transition: "all 0.4s ease",
          }}
          className="flex flex-col pt-15 items-center"
        >
          <h1 className="text-4xl font-extrabold">Welcome To </h1>
          <Branding />
        </div>
        <div className=" bg-zinc-50 flex flex-col justify-center items-center">
          <h1 className=" text-3xl font-extrabold my-4">Sign In Form</h1>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="w-full max-w-sm min-w-[200px]">
                <label htmlFor="name" className="block mb-2 text-bold text-xl">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline focus:border-slate-400 hover:slate-300 shadow-sm focus:shadow"
                  placeholder="Your Name"
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label htmlFor="email" className="block mb-2 text-xl text-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline focus:border-slate-400 hover:slate-300 shadow-sm focus:shadow"
                  placeholder="Your Email"
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="password"
                  className="block mb-2 text-xl text-bold"
                >
                  {" "}
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline focus:border-slate-400 hover:slate-300 shadow-sm focus:shadow"
                  placeholder="Password"
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="collegeName"
                  className="block mb-2 text-bold text-xl"
                >
                  College Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline focus:border-slate-400 hover:slate-300 shadow-sm focus:shadow"
                  placeholder="Your College Name"
                />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label
                  htmlFor="collegeUID"
                  className="block mb-2 text-bold text-xl"
                >
                  College UID
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline focus:border-slate-400 hover:slate-300 shadow-sm focus:shadow"
                  placeholder="College UID"
                />
              </div>
              <button
                class="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Sign Up
              </button>
              <p class="flex justify-center mt-6 text-sm text-slate-600">
                {/* Don&apos;t have an account? */}
                Already have an account?
                <a
                  href="/login"
                  class="ml-1 text-sm font-semibold text-slate-700 underline"
                >
                  Login Here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
