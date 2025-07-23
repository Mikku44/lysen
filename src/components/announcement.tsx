'use client'
import i18n from "@/app/i18n";
import Marquee from "react-fast-marquee";
import { I18nextProvider, useTranslation } from "react-i18next";

export default function Announcement () {
  const { t } = useTranslation();

  const announcementKeys = [
    "Announcement",
    "Announcement2",
    "Announcement3",
    
  ];

  const randomKey = announcementKeys[Math.floor(Math.random() * announcementKeys.length)];

  return (
    <div className="print:hidden">
      <I18nextProvider i18n={i18n}>
      <Marquee className="bg-[var(--color-primary)] text-white p-2 ">
        {t(randomKey)}
      </Marquee>
      </I18nextProvider>
    </div>
  );
}
