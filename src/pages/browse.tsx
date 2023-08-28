import Hero from "@/views/browse/Hero";
import AP from "@/views/browse/AP";
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

const browse = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('bg.webp')`,
        }}
      >
        <Hero />
        <AP />
      </div>
    </>
  );
};

export default browse;
