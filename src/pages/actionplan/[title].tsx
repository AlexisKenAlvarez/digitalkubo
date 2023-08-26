import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { AiOutlineFilePdf, AiOutlineFileWord } from "react-icons/ai";
import Image from "next/image";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id, title } = ctx.query;

  if (!id || !title) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    const pdfData = await axios.post(`${process.env.NEXTAUTH_URL}/api/getAcp`, {
      id,
    });

    const link = pdfData.data.data;

    return {
      props: {
        link,
        title,
      },
    };
  }
};

const Title = ({ title, link }: { title: string; link: string }) => {

  const [downloadUrl, setDownload] = useState('')

  const [docxContent, setDocxContent] = useState([
    {
      uri: link,
      fileType: "pdf",
      fileName: title,
    },
  ]);

  useEffect(() => {
    const insertStringAfterSubstring = (
      originalString: string,
      stringToInsert: string,
      substring: string | any[]
    ) => {
      const position = originalString.indexOf(substring as string);
      if (position !== -1) {
        return (
          originalString.slice(0, position + substring.length) +
          stringToInsert +
          originalString.slice(position + substring.length)
        );
      }
      return originalString;
    };
    const modifiedUrl = insertStringAfterSubstring(
      link,
      "fl_attachment/",
      "upload/"
    );

    setDownload(modifiedUrl)
  }, []);

  return (
    <div className="w-full h-auto">
      <div className="container py-10">
        <div className="pt-6 ">
          <span className="flex items-center ">
            <IoIosArrowBack />
            <Link href="/home">
              <h1 className="font-secondary">Back</h1>
            </Link>
          </span>
          <h1 className="text-nav font-bold font-primary pt-4 md:text-3xl text-4xl">
            {title}
          </h1>
        </div>
      </div>

      {/* PDF VIEW */}
      <div className="w-full h-full relative mt-4">
        <Image
          src="/bg.webp"
          height={20}
          width={20}
          alt="/"
          className="absolute top-0 left-0 object cover w-full h-full object-top"
        />
        <div className="flex  lg:flex-row flex-col pb-24 pt-14 container">
          <div className="w-50% h-screen border z-10">
            <div className="w-[50rem] h-full overflow-hidden relative">
              <iframe src={`${link}#toolbar=0&navpanes=0`} className="w-full h-full overflow-auto" />
            </div>
          </div>
          <div className="w-50% xl:h-screen pt-4 z-10">
            <div className="xl:w-[40rem] flex flex-col gap-y-4">
              <a href={downloadUrl} download={title} className="lg:pl-8">
                <Button className="bg-nav hover:bg-button pl-2 py-6">
                  <span className="pl-2">
                    <AiOutlineFilePdf size={27} />
                  </span>
                  <p className="font-secondary font-bold text-sm px-4">
                    EXPORT AS PDF
                  </p>
                </Button>
              </a>
              <span className="lg:pl-8">
                <Button className="bg-nav hover:bg-button pl-2 py-6">
                  <span className="pl-2">
                    <AiOutlineFileWord size={27} />
                  </span>
                  <p className="font-secondary font-bold text-sm px-2">
                    EXPORT AS WORD
                  </p>
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Title.requireAuth = true;

export default Title;
