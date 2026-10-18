"use client";

import { useEffect, useState } from "react";

const manilaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="contact-local-time" aria-label="Current local time in Pampanga, Philippines">
      <time dateTime={now?.toISOString()}>{now ? manilaTime.format(now) : "--:--"}</time>
      <span>PHT</span>
    </p>
  );
}
