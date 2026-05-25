import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { connectDb } from "@/app/lib/mongodb";
import { redirect } from "next/navigation";
import { LoginState } from "@/app/lib/types";
import { headers } from "next/headers";
import { loginGoogleAction } from "@/app/lib/actions";

const RegisterPage = () => {
  const registerEmailAction = async (
    prevState: LoginState,
    formData: FormData,
  ) => {
    "use server";
    await connectDb();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(name, email, password);

    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
      const err = error as Error;
      return { message: err.message };
    }

    redirect("/protected-route");
  };

  // const registerGoogleAction = async () => {
  //   "use server";
  //   await connectDb();

  //   const response = await auth.api.signInSocial({
  //     body: {
  //       provider: "google",
  //     },
  //   });

  //   redirect(response.url!);
  // };

  return (
    <>
      <h1>Register Page</h1>
      <AuthForm mode="register" emailAction={registerEmailAction} />
    </>
  );
};

export default RegisterPage;
