"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Announcement {
  id: string;
  text: string;
  link: string | null;
}

export function AnnouncementBar({ announcements }: { announcements: Announcement[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!announcements.length) return null;

  const current = announcements[index];
  const content = (
    <span className="text-sm font-medium">{current.text}</span>
  );

  return (
    <div className="bg-primary text-primary-foreground py-2.5 text-center">
      {current.link ? (
        <Link href={current.link} className="hover:underline">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
