import React from "react";
import { headers } from "next/headers";

export const metadata = {
  title: "Terms and Conditions - Auto Car Dealers",
  description: "Please read these terms carefully before using our services...",
};

async function getTermsContent(baseUrl) {
  const res = await fetch(`${baseUrl}/api/page-content/terms`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

const TermsPage = async () => {
  const headersList = headers(); 
  const host = headersList.get("host");
  console.log("Host:", host);
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const contentData = await getTermsContent(baseUrl);

  
  return (
    <div className="min-h-screen bg-gray-50 py-10 md:mt-12 mt-10 dark:bg-gray-800">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md dark:bg-gray-700">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
          {contentData?.name || "Terms and Conditions"}
        </h1>
        <div
          className="text-gray-600 dark:text-white"
          dangerouslySetInnerHTML={{
            __html: contentData?.content || "<p>Loading...</p>",
          }}
        />
        <div className="mt-8 border-t pt-4">
          <p className="text-center text-sm text-gray-500 dark:text-white">
            © 2025 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
