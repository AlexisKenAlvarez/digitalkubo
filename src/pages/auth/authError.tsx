import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthError = () => {
  const router = useRouter();
  const { error, email, errorType } = router.query;

  useEffect(() => {
    console.log(router.query);
  }, [router]);

  return (
    <section className="w-full min-h-screen h-auto sm:py-4 py-7 px-5 relative flex items-center justify-center">
      {error && email && errorType === "google-signin-denied" ? (
        <div className="flex flex-col items-center text-center -mt-56">
          <Image
            src="/auth/error.webp"
            alt="Error"
            width="400"
            height="400"
            className="w-32"
          />
          <div className="mt-4 flex flex-col gap-y-2">
            <h2 className="sm:text-[30px] text-xl font-semibold">
              This email is already associated with another account!
            </h2>
            <p className="opacity-50 sm:text-base text-sm">
              Your email <span className="italic">{email}</span> already exist
              in our database via credentials. Please use your password to sign
              in.
            </p>
          </div>

          <Link href="/auth/login" className="mt-5">
            <Button className="">Back to Login</Button>
          </Link>
        </div>
      ) : null}
    </section>
  );
};

export default AuthError;
