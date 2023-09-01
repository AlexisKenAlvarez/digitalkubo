import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { toast } from "react-toastify";
import { handleEnter } from "@/lib/client-methods";

const EditPassword = ({ email, handleDialog }: { email: string, handleDialog: Dispatch<SetStateAction<boolean>> }) => {
  const [debounce, setDebounce] = useState(false);

  const editPasswordSchema = z
    .object({
      password2: z
        .string()
        .min(3, "Must contain at least 3 letters")
        .max(20, "Must not be more than 20 characters"),
      confirm: z
        .string()
        .min(3, "Must contain at least 3 letters")
        .max(20, "Must not be more than 20 characters"),
    })
    .refine((data) => data.password2 === data.confirm, {
      message: "Password does not match.",
      path: ["confirm"],
    });

  type editType = z.infer<typeof editPasswordSchema>;

  const editPasswordForm = useForm<editType>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      password2: "",
      confirm: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = editPasswordForm;

  const updatePassword = async (data: editType) => {
    if (!debounce) {
      setDebounce(true)
      const myPromise = new Promise(async (resolve, reject) => {
        const changeQuery = await axios.post("/api/changePassword", {
          email,
          password: data.password2,
          withToken: false
        });
  
        if (changeQuery.data.success) {
          resolve(changeQuery);
          setDebounce(false)
        } else {
          reject();
        }
      });
  
      toast.promise(myPromise, {
        pending: "Updating your password...",
        success: "Password has been updated!",
        error: "Something went wrong. Please try again later",
      });

      handleDialog(false)

    }

  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit your password</AlertDialogTitle>
        <AlertDialogDescription>
          A secure password helps protect your account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...editPasswordForm}>
        <form
          onSubmit={handleSubmit(updatePassword)}
          className="flex flex-col"
        >
          <FormField
            control={control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                    <p className="text-sm text-red-400">
                      {errors.password2?.message
                        ? `${errors.password2?.message}`
                        : null}
                    </p>
                  </div>
                </FormLabel>
                <FormControl className="relative">
                  <div className="">
                    <Input
                      id="password2"
                      placeholder="Enter New Password"
                      autoComplete="off"
                      autoFocus
                      maxLength={100}
                      type="password"
                      onKeyUp={(e) => {handleEnter(e, handleSubmit(updatePassword))}}
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex sm:items-center gap-x-[5px] sm:flex-row flex-col">
                    <p className="text-sm text-red-400">
                      {errors.confirm?.message
                        ? `${errors.confirm?.message}`
                        : null}
                    </p>
                  </div>
                </FormLabel>
                <FormControl className="relative">
                  <div className="">
                    <Input
                      id="password"
                      placeholder="Confirm Password"
                      autoComplete="off"
                      autoFocus
                      maxLength={100}
                      type="password"
                      onKeyUp={(e) => {handleEnter(e, handleSubmit(updatePassword))}}
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <AlertDialogFooter className="w-fit mt-4">
            <Button type="submit" disabled={debounce}>
              Continue
            </Button>
            <AlertDialogCancel>Return</AlertDialogCancel>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default EditPassword;
