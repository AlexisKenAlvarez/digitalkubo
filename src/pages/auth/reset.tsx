import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetList } from "@/lib/list";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/router";
import { TbLoaderQuarter } from "react-icons/tb";
import { useFetchDebounce } from "@/components/handlers/fetchDebounce";
import { useSession } from "next-auth/react";
import { handleEnter } from "@/lib/client-methods";

const Page = () => {
  const { data: fetchData, debounce, setDebounce } = useFetchDebounce();
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { data: session } = useSession();

  const resetSchema = z.object({
    email: z.string().email(),
  });

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

  type userInput = z.infer<typeof resetSchema>;
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<userInput>({ resolver: zodResolver(resetSchema) });

  const submit = async (data: userInput) => {
    if (!debounce) {
      setDebounce(true);

      const jsonObject = {
        email: data.email,
      };

      const send = await fetchData("sendForgot", jsonObject);

      if (send.success) {
        setSent(true);
      } else {
        setError("email", {
          type: "custom",
          message: "Email is not registered!",
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
    <section className="w-full min-h-screen h-auto sm:py-4 py-7 relative">
      {/* <Image width="400" height="400" src="/logo2.webp" alt="" className="md:w-20 w-16 mx-auto sm:mt-4" /> */}

      <div className="sm:w-fit w-full h-full sm:h-auto px-10 sm:py-7 sm:border-[1px] border-black/5 rounded-lg sm:mt-9 mt-4 drop-shadow-sm mx-auto">
        <div className="leading-loose text-center">
          <h1 className="text-4xl sm:text-[48px] font-primary font-bold text-black">
            Password Reset
          </h1>
        </div>

        {sent ? (
          <div className="flex flex-col gap-y-3 mt-3">
            <p className="text-black/50 max-w-[30rem] text-center">
              We have sent a password reset link to your email. If it does not
              appear on your inbox, try checking your ignore or promotions
              mailbox.
            </p>

            <Link href="/auth/login">
              <h3 className="text-black/50 text-center mt-4">
                Back to{" "}
                <span className="font-bold text-button hover:text-nav  cursor-pointer">
                  Sign in
                </span>
              </h3>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-y-3 mt-10">
            {resetList.map((items, i) => {
              return (
                <div className="drop-shadow-sm flex flex-col gap-y-2" key={i}>
                  <Label htmlFor={items.label}>{items.label}</Label>
                  <Input
                    type={items.type}
                    {...register(`${items.id as keyof userInput}`)}
                    id={items.label}
                    placeholder={items.placeholder}
                    autoComplete="false"
                    autoFocus={items.id === "email" ? true : false}
                    className="outline-none"
                    onKeyUp={(e) => {handleEnter(e, handleSubmit(submit))}}
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
                <p className="">Reset password</p>
              )}
            </Button>

            <Link href="/auth/login">
              <h3 className="text-black/50 text-center">
                Back to{" "}
                <span className="font-bold text-button hover:text-nav cursor-pointer">
                  Sign in
                </span>
              </h3>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
