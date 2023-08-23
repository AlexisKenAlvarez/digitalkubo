import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { AiOutlineFilePdf, AiOutlineFileWord } from "react-icons/ai";
import Image from "next/image";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import {pdfjs, Document, Page} from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(link, { responseType: "blob" })
      .then((response) => {
        const blobUrl = URL.createObjectURL(response.data);
        setPdfBlobUrl(blobUrl);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  }, [link]);

  useEffect(() => {
    console.log(pdfBlobUrl);
  }, [pdfBlobUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };


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
            <div className="md:w-[40rem] h-full overflow-hidden">
              <iframe src={link}  className="w-full h-[calc(100%+3.5rem)] -mt-14"/>
            </div>
          </div>
          <div className="w-50% xl:h-screen pt-4 z-10">
            <div className="xl:w-[40rem] flex flex-col gap-y-4">
              <span className="lg:pl-8">
                <Button className="bg-nav hover:bg-button pl-2 py-6">
                  <span className="pl-2">
                    <AiOutlineFilePdf size={27} />
                  </span>
                  <p className="font-secondary font-bold text-sm px-4">
                    EXPORT AS PDF
                  </p>
                </Button>
              </span>
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
