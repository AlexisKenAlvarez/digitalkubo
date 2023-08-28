// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/createpdf/create-pdf-from-docx.js

const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
        // Initial setup, create credentials instance.
        const credentials =  PDFServicesSdk.Credentials
        .servicePrincipalCredentialsBuilder()
        .withClientId(`${process.env.PDF_SERVICES_CLIENT_ID}`)
        .withClientSecret(`${process.env.PDF_SERVICES_CLIENT_SECRET}`)
        .build();

    //Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = PDFServicesSdk.ExecutionContext.create(credentials),
        exportPDF = PDFServicesSdk.ExportPDF,
        exportPdfOperation = exportPDF.Operation.createNew(exportPDF.SupportedTargetFormats.DOCX);

    // Set operation input from a source file
    const input = PDFServicesSdk.FileRef.createFromURL('https://res.cloudinary.com/dnfsr6bms/image/upload/v1692708286/digitalkubo/dweohszhbmwh0laa23x3.pdf');
    exportPdfOperation.setInput(input);

    // Execute the operation and Save the result to the specified location.
    exportPdfOperation.execute(executionContext)
        .then((result: { saveAsFile: (arg0: string) => any; }) => result.saveAsFile('output/exportPdfOutput.docx'))
        .catch((err: any) => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });

    res.status(200).json({ sucess: true });

  } catch (err) {
    console.log("Exception encountered while executing operation", err);
    res.status(400).json({ err });
  }
}

// // Initial setup, create credentials instance.
// const credentials =
// PDFservicesSdk.Credentials.servicePrincipalCredentialsBuilder()
//   .withClientId(`${process.env.PDF_SERVICES_CLIENT_ID}`)
//   .withClientSecret(`${process.env.PDF_SERVICES_CLIENT_SECRET}`)
//   .build();

// // Create an ExecutionContext using credentials and create a new operation instance.
// const executionContext =
//   PDFservicesSdk.ExecutionContext.create(credentials),
// createPdfOperation = PDFservicesSdk.CreatePDF.Operation.createNew();

// // Set operation input from a source file.
// const input = PDFservicesSdk.FileRef.createFromURL(
// "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.docx"
// );
// createPdfOperation.setInput(input);

// // Execute the operation and Save the result to the specified location.
// createPdfOperation
// .execute(executionContext)
// .then((result: { saveAsFile: (arg0: string) => any }) => {
//   result.saveAsFile("output/createPDFFromDOCX.pdf");
//   console.log(result);
// })
// .catch((err: any) => {
//   if (
//     err instanceof PDFservicesSdk.Error.ServiceApiError ||
//     err instanceof PDFservicesSdk.Error.ServiceUsageError
//   ) {
//     console.log("Exception encountered while executing operation", err);
//   } else {
//     console.log("Exception encountered while executing operation", err);
//   }
// });