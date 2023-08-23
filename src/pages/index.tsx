import Offer from "@/views/landing/Offer";
import LandingHero from "@/views/landing/LandingHero";
import Latest from "@/views/landing/Latest";
import Expand from "@/views/landing/Expand";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        data: null,
      },
    };
  }
};

const index = () => {
  return (
    <>
      <LandingHero />
      <Latest />
      <Offer />
      <Expand />
    </>
  );
};

export default index;
