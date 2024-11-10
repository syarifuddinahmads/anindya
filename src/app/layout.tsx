import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Happy Birthday Anindya Berlinani Santoso - Special Message ",
  description: "Celebrate Anindya Berlinani Santoso’s birthday with a heartfelt surprise.",
  keywords: ["Anindya Berlinani Santoso", "Happy Birthday", "Birthday Message", "Ahmad Syarifuddin"],
  openGraph: {
    title: "Happy Birthday Anindya!",
    description: "A special birthday message for Anindya Berlinani Santoso .",
    url: "https://anindyabs.vercel.app",
    type: "website",
    images: [
      {
        url: "https://anindyabs.vercel.app/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Happy Birthday Anindya",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cover bg-center`}
      >
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        >
          <main className="flex flex-col gap-6 row-start-2 items-center sm:items-start">
            {children}
          </main>
          {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center italic">
            <small className="flex items-center gap-2 text-slate-50 absolute" style={{ fontSize: '10px' }}>
              <a href="https://www.linkedin.com/in/syarifuddinahmads/" target="_blank" rel="noopener noreferrer">
                Ahmad Syarifuddin
              </a>
            </small>
          </footer> */}
        </div>
      </body>
    </html>
  );
}
