export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "../../i18n/request";
import "../globals.css";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import StructuredData from "../../components/StructuredData";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "IMM Creative Media Production | Hong Kong",
    description: "Professional media production services in Hong Kong. We create compelling TV commercials, KOL videos, and creative content that builds brands and engages audiences. AI-powered storyboard generation available.",
    openGraph: {
      title: "IMM Creative Media Production | Hong Kong",
      description: "Professional media production services in Hong Kong with AI-powered storyboard generation",
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

  const organizationData = {
    name: 'IMM Creative Media Production',
    url: 'https://immmedia.hk',
    logo: 'https://immmedia.hk/logo.png',
    description: 'Professional media production services in Hong Kong. We create compelling TV commercials, KOL videos, and creative content that builds brands and engages audiences.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressCountry: 'HK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+852-1234-5678',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.facebook.com/immmedia',
      'https://www.linkedin.com/company/immmedia',
      'https://www.instagram.com/immmedia',
    ],
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <StructuredData 
        type="organization" 
        data={organizationData}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
} 