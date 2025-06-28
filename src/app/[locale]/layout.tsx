import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "../../i18n/request";
import "../globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Creative Media Production House | Hong Kong",
    description: "Professional media production services in Hong Kong. We create compelling TV commercials, KOL videos, and creative content that builds brands and engages audiences.",
    openGraph: {
      title: "Creative Media Production House | Hong Kong",
      description: "Professional media production services in Hong Kong",
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 