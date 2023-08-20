import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginList } from "@/lib/list";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { TbLoaderQuarter } from "react-icons/tb";
import Image from "next/image";

const Page = () => {
  const [debounce, setDebounce] = useState(false);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && !isRedirecting && router.isReady) {
      // display some message to the user that he is being redirected
      setIsRedirecting(true);
      setTimeout(() => {
        // redirect to the return url or home page
        router.push((router.query.returnUrl as string) || "/home");
      }, 2000);
    }
  }, [session, isRedirecting, router]);

  const signupSchema = z.object({
    email: z.string().email(),

    password: z
      .string()
      .min(3, "Must contain at least 3 letters")
      .max(20, "Must not be more than 20 characters"),
  });

  type userInput = z.infer<typeof signupSchema>;

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<userInput>({ resolver: zodResolver(signupSchema) });

  const submit = async (data: userInput) => {
    if (!debounce) {
      setDebounce(true);
      const result = await signIn("credential-login", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result?.error) {
        router.push("/home");
      } else {
        setError("email", {
          type: "custom",
          message: "Invalid email or password",
        });
        setDebounce(false);
      }
    }
  };

  if (isRedirecting) {
    return (
      <div className="w-full min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen h-auto sm:py-4 relative sm:px-5 sm:flex sm:items-center">
      {/* <Image width="400" height="400" src="/logo2.webp" alt="" className="md:w-20 w-16 mx-auto sm:mt-4" /> */}

      <div className="flex items-center w-full sm:max-w-[1400px] mx-auto h-full sm:h-fit sm:-mt-24">
        <div className="lg:block hidden">
          <Image
            src="/hut.webp"
            alt="kubo"
            width="1000"
            height="1000"
            className="w-[45rem] mt-10 border-black"
          />
        </div>
        <div className="sm:w-fit w-full h-screen sm:h-auto px-10 py-7 sm:border-[1px] bg-white border-black/5 rounded-lg drop-shadow-sm mx-auto">
          <div className="leading-loose text-center">
            <h1 className="text-4xl sm:text-[48px] font-primary font-bold text-black">
              Welcome back!
            </h1>
            <p className="text-black/50 mt-2">Login to your existing account</p>
          </div>

          <div className="flex flex-col gap-y-3 mt-10">
            {loginList.map((items, i) => {
              return (
                <div className="drop-shadow-sm flex flex-col gap-y-2" key={i}>
                  <Label htmlFor={items.label}>{items.label}</Label>
                  <Input
                    type={items.type}
                    {...register(`${items.id as "email" | "password"}`)}
                    id={items.label}
                    placeholder={items.placeholder}
                    autoComplete="false"
                    autoFocus={items.id === "email" ? true : false}
                    className="outline-none"
                  />

                  <div className="text-red-400 text-sm">
                    {errors[items.id as keyof userInput]?.toString() ? (
                      <p>
                        {errors[
                          items.id as keyof userInput
                        ]?.message?.toString()}
                      </p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </div>
              );
            })}

            <Button
              className="mt-3 bg-button hover:bg-nav"
              onClick={handleSubmit(submit)}
              disabled={debounce}
            >
              {debounce ? (
                <TbLoaderQuarter className="animate-spin" />
              ) : (
                <p className="">Sign in</p>
              )}
            </Button>

            <div className="flex items-center gap-x-4">
              <div className="w-full h-[1px] bg-black/10"></div>
              <p className="text-black/50 text-sm flex-shrink-0">
                you can also
              </p>
              <div className="w-full h-[1px] bg-black/10"></div>
            </div>

            <Button
              className="bg-[#4081ec] hover:bg-[#4081ec]/90 relative"
              onClick={() => {
                signIn("google");
              }}
            >
              <div className="bg-white w-8 h-8 rounded-md grid place-content-center absolute left-[4px]">
                <FcGoogle className="text-2xl" />
              </div>
              <p className="">Sign in with Google</p>
            </Button>

            <Link href="/auth/signup">
              <h3 className="text-black/50 text-center">
                Don&apos;t have an account?{" "}
                <span className="font-bold text-button hover:text-nav cursor-pointer">
                  Sign up
                </span>
              </h3>
            </Link>

            <Link href="/auth/reset">
              <h3 className="text-black/50 text-center hover:text-nav hover:underline">
                Trouble signing in?
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
