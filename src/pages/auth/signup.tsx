import React, { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerList } from "@/lib/list";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { TbLoaderQuarter } from "react-icons/tb";
import Image from "next/image";
import { useFetchDebounce } from "@/components/handlers/fetchDebounce";
import { useSession } from "next-auth/react";
import { handleEnter } from "@/lib/client-methods";

const Signup = () => {
  const { data: fetchData, debounce, setDebounce } = useFetchDebounce();
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

  const signupSchema = z
    .object({
      email: z.string().email(),

      password: z
        .string()
        .min(3, "Must contain at least 3 letters")
        .max(20, "Must not be more than 20 characters"),

      confirm: z
        .string()
        .min(3, "Must contain at least 3 letters")
        .max(20, "Must not be more than 20 characters"),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Password does not match.",
      path: ["confirm"],
    });

  type userInput = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userInput>({ resolver: zodResolver(signupSchema) });

  const submit = async (userData: userInput) => {
    if (!debounce) {
      setDebounce(true);

      const { email, password } = userData;

      const jsonData = {
        email,
        password,
        accountType: 1,
      };

      const data = await fetchData("addUser", jsonData);

      if (data.success) {
        toast.success("Account registered successfully!");
        router.push("/auth/login");
      } else {
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
              Let&apos;s get started
            </h1>
            <p className="text-black/50 mt-2">
              Create an account to access all of our great featuers!
            </p>
          </div>

          <div className="flex flex-col gap-y-3 mt-10">
            {registerList.map((items, i) => {
              return (
                <div className="drop-shadow-sm flex flex-col gap-y-2" key={i}>
                  <Label htmlFor={items.label}>{items.label}</Label>
                  <Input
                    type={items.type}
                    {...register(
                      `${items.id as "email" | "password" | "confirm"}`
                    )}
                    id={items.label}
                    placeholder={items.placeholder}
                    autoComplete="false"
                    autoFocus={items.id === "email" ? true : false}
                    className="outline-none"
                    onKeyUp={(e) => {
                      handleEnter(e, handleSubmit(submit));
                    }}
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
              className="mt-4 bg-button hover:bg-nav"
              onClick={handleSubmit(submit)}
              disabled={debounce ? true : false}
            >
              {debounce ? (
                <TbLoaderQuarter className="animate-spin" />
              ) : (
                "Sign up"
              )}
            </Button>

            <Link href="/auth/login">
              <h3 className="text-black/50 text-center">
                Already have an account?{" "}
                <span className="font-bold text-button hover:text-nav cursor-pointer">
                  Sign in
                </span>
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
