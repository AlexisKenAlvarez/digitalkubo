import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "@/components/Nav";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { ProtectedLayout } from "@/components/layouts/protectedLayout";

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

const queryClient = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function MyApp({ Component, pageProps }: AppPropsWithAuth) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <div className={`${poppins.variable}`}>
          <Nav />
          <ToastContainer
            position="bottom-center"
            autoClose={1500}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            theme="light"
            transition={Slide}
          />
          <div className="mt-14 md:mt-[6.5rem] bg-bg font-secondary">
            {Component.requireAuth ? (
              <ProtectedLayout>
                <Component {...pageProps} />
              </ProtectedLayout>
            ) : (
              <Component {...pageProps} key={router.asPath} />
            )}
            {/* <Component {...pageProps} key={router.asPath} /> */}
          </div>
          <Footer />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;
