import DashNav from "@/components/DashNav";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import EditPassword from "@/components/EditPassword";

const Profile = () => {
  const { data: session } = useSession();
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [debounce, setDebounce] = useState(false);

  const handleSheet = (status: boolean) => {
    setIsPasswordOpen(status);
  };

  const passwordSchema = z.object({
    password: z
      .string()
      .min(3, "Must contain at least 3 letters")
      .max(20, "Must not be more than 20 characters"),
  });

  type passwordType = z.infer<typeof passwordSchema>;

  const checkPasswordForm = useForm<passwordType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const verifyPassword = async (data: passwordType) => {
    if (!debounce) {
      setDebounce(true);

      const checkPassword = await axios.post("/api/checkProfilePassword", {
        password: data.password,
        email: session?.user.email,
      });

      if (checkPassword.data.success) {
        setCorrect(true);
      } else {
        checkPasswordForm.setError("password", {
          message: "Incorrect password",
        });
        setCorrect(false);
        setDebounce(false);
      }
    }
  };

  useEffect(() => {
    if (!isPasswordOpen) {
      setCorrect(false);
      checkPasswordForm.reset();
      setDebounce(false);
    }
  }, [isPasswordOpen]);

  const handleOpen = () => {
    setIsPasswordOpen(true);
  };

  const handleClose = () => {
    setIsPasswordOpen(false);
  };

  return (
    <div className="pt-4 container pb-20 h-screen ">
      <DashNav />

      <div className="md:flex flex flex-col ">
        <div className=" flex flex-col pt-10">
          <h1 className=" mt-6 text-4xl font-primary text-nav font-bold ">
            Profile
          </h1>
          <p className=" text-xl pt-2 font-secondary text-black/50">
            My Profile
          </p>
        </div>
        <div className="border-[1px] border-black/10 container py-6 mt-4 flex flex-row justify-between">
          <div className="flex flex-col gap-3 w-full">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex md:items-center w-full md:flex-row flex-col">
                  <h1 className="text-nav font-primary  font-bold min-w-[16rem] flex items-start">
                    Email:{" "}
                  </h1>
                  <p className="text-base text-black/50 font-secondary font-medium">
                    {session?.user?.email}
                  </p>

                  <MdOutlineKeyboardArrowRight className="ml-auto text-lg md:block hidden" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Email Address</AlertDialogTitle>
                  <AlertDialogDescription>
                    This email is used to login to your account. You can't
                    change this address.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <p className="">{session?.user?.email}</p>
                <AlertDialogFooter>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Separator />
            {session && !session.user.image ? (
              <>
                <AlertDialog onOpenChange={handleSheet} open={isPasswordOpen}>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex md:items-center w-full md:flex-row flex-col"
                      onClick={handleOpen}
                    >
                      <h1 className="text-nav font-primary font-bold min-w-[16rem] flex items-start">
                        Password:
                      </h1>
                      <p className="text-base text-black/50 font-secondary font-medium">
                        *************
                      </p>
                      <MdOutlineKeyboardArrowRight className="ml-auto text-lg md:block hidden" />
                    </button>
                  </AlertDialogTrigger>
                  {!correct ? (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Manage your password
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Enter your password to continue.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <Form {...checkPasswordForm}>
                        <form
                          onSubmit={checkPasswordForm.handleSubmit(
                            verifyPassword
                          )}
                          className="flex flex-col gap-y-4"
                        >
                          <FormField
                            control={checkPasswordForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                                    <p className="text-sm text-red-400">
                                      {checkPasswordForm.formState.errors
                                        .password?.message
                                        ? `${checkPasswordForm.formState.errors.password?.message}`
                                        : null}
                                    </p>
                                  </div>
                                </FormLabel>
                                <FormControl className="relative">
                                  <div className="">
                                    <Input
                                      id="password"
                                      placeholder="********"
                                      autoComplete="off"
                                      autoFocus
                                      maxLength={100}
                                      type="password"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <AlertDialogFooter className="w-fit">
                            <AlertDialogCancel>Return</AlertDialogCancel>

                            <Button type="submit" disabled={debounce}>
                              Continue
                            </Button>
                          </AlertDialogFooter>
                        </form>
                      </Form>
                    </AlertDialogContent>
                  ) : (
                    <EditPassword
                      email={session?.user.email}
                      handleDialog={setIsPasswordOpen}
                    />
                  )}
                </AlertDialog>

                <Separator />
              </>
            ) : null}
            <div className="md:flex items-center md:flex-row flex-col">
              <h1 className="text-nav font-primary  font-bold min-w-[16rem]">
                Logged in via:
              </h1>
              <p className="text-base text-black/50 font-secondary font-medium">
                {session && session.user.image ? "Google" : "Credentials"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.requireAuth = true;

export default Profile;
