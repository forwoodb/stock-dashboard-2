"use client";
import Link from "next/link";
import { useActionState } from "react";
import { LoginState } from "../../lib/types";
import { loginGoogleAction } from "../../lib/actions";

interface AuthFormTypes {
  mode: string;
  formAction: (
    prevState: LoginState,
    formData: FormData,
  ) => Promise<LoginState>;
}

const AuthForm = ({ mode, formAction }: AuthFormTypes) => {
  const [state, action] = useActionState(formAction, { message: null });

  console.log(action);

  return (
    <div className="flex flex-col items-center">
      {state?.message && <p className="text-red-500">{state.message}</p>}
      <form action={action}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">
            {mode === "login" ? "Log In" : `Register`}
          </legend>

          {mode === "register" && (
            <>
              <label className="label">Name</label>
              <input
                type="name"
                name="name"
                className="input"
                placeholder="Name"
                required
              />
            </>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />

          <button className="btn btn-neutral mt-4">
            {mode === "login" ? "Log In" : "Register"}
          </button>
        </fieldset>
      </form>
      <p>Or</p>
      <div className="oauth-wrapper p-4">
        <form action={loginGoogleAction}>
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            {mode === "login" ? "Log In" : "Register"} with Google
          </button>
        </form>
      </div>
      <p>
        {mode === "login" ? `Don't` : `Already`} have an account?{" "}
        {mode === "login" ? (
          <Link
            href={`/auth/register`}
            className="h-4 border-b border-blue-800 text-blue-800"
          >
            Register
          </Link>
        ) : (
          <Link
            href={`/auth/login`}
            className="h-4 border-b border-blue-800 text-blue-800"
          >
            Log In
          </Link>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
