const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
import axios from "axios";
import fs from "fs";
import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pdfUrl =
      "https://res.cloudinary.com/dnfsr6bms/image/upload/v1692271246/digitalkubo/zvesel6ydioxsiybko6o.pdf";
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    const pdfFileName = "downloaded.pdf"; // Name for the downloaded PDF
    const pdfPath = path.join(process.cwd(), pdfFileName);

    fs.writeFileSync(pdfPath, response.data);

    return res
      .status(200)
      .json({ message: "PDF downloaded and saved successfully." });
  } catch (error) {
    console.error("Error downloading and saving PDF:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
  // try {
  //   // Initial setup, create credentials instance.
  //   const credentials =
  //     PDFServicesSdk.Credentials.servicePrincipalCredentialsBuilder()
  //       .withClientId(`${process.env.PDF_SERVICES_CLIENT_ID}`)
  //       .withClientSecret(`${process.env.PDF_SERVICES_CLIENT_SECRET}`)
  //       .build();

  //   //Create an ExecutionContext using credentials and create a new operation instance.
  //   const executionContext =
  //       PDFServicesSdk.ExecutionContext.create(credentials),
  //     exportPDF = PDFServicesSdk.ExportPDF,
  //     exportPdfOperation = exportPDF.Operation.createNew(
  //       exportPDF.SupportedTargetFormats.DOCX
  //     );

  //   // Set operation input from a source file
  //   const input = PDFServicesSdk.FileRef.createFromLocalFile(
  //     "exports/Curriculum-Vitae-Alvarez-Alexis-Ken.pdf"
  //   );
  //   exportPdfOperation.setInput(input);

  //   // Execute the operation and Save the result to the specified location.
  //   exportPdfOperation
  //     .execute(executionContext)
  //     .then((result: { saveAsFile: (arg0: string) => any }) =>
  //       result.saveAsFile("output/exportPdfOutput.docx")
  //     )
  //     .catch((err: any) => {
  //       if (
  //         err instanceof PDFServicesSdk.Error.ServiceApiError ||
  //         err instanceof PDFServicesSdk.Error.ServiceUsageError
  //       ) {
  //         console.log("Exception encountered while executing operation", err);
  //       } else {
  //         console.log("Exception encountered while executing operation", err);
  //       }
  //       res.status(200).json({ success: false });
  //     });
  // } catch (err) {
  //   console.log("Exception encountered while executing operation", err);
  //   res.status(400).json({ err });
  // }
}
