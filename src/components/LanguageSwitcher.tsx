'use client';

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales } from "../i18n/request";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-2 sm:py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] sm:min-h-[32px]"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === "en" ? "English" : "中文"}
          </option>
        ))}
      </select>
    </div>
  );
} 