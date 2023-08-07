import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Nav from '@/components/Nav';
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()
const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <div className={inter.className}>
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
                    <div className="mt-14 md:mt-24 bg-bg">
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </div>
            </QueryClientProvider>
        </SessionProvider>
    );
}
export default MyApp
