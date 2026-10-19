import React, { useState, useEffect } from 'react';
import { Globe, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export interface TimeZoneInfo {
  id: string;
  country: string;
  city: string;
  code: string;
  timeZone: string;
  flag: string;
  interviewTrack: string;
}

export const TIME_ZONES: TimeZoneInfo[] = [
  {
    id: 'usa-ny',
    country: 'United States',
    city: 'New York (EDT/EST)',
    code: 'USA-EAST',
    timeZone: 'America/New_York',
    flag: '🇺🇸',
    interviewTrack: 'Wall St & US East Tech'
  },
  {
    id: 'usa-sf',
    country: 'United States',
    city: 'San Francisco (PDT/PST)',
    code: 'USA-WEST',
    timeZone: 'America/Los_Angeles',
    flag: '🇺🇸',
    interviewTrack: 'Silicon Valley / FAANG'
  },
  {
    id: 'uk-lon',
    country: 'United Kingdom',
    city: 'London (BST/GMT)',
    code: 'UK-LON',
    timeZone: 'Europe/London',
    flag: '🇬🇧',
    interviewTrack: 'European FinTech & Dev'
  },
  {
    id: 'in-ist',
    country: 'India',
    city: 'New Delhi / Bengaluru (IST)',
    code: 'IND-IST',
    timeZone: 'Asia/Kolkata',
    flag: '🇮🇳',
    interviewTrack: 'TCS, Infosys & Campus Drives'
  },
  {
    id: 'sg-sgt',
    country: 'Singapore',
    city: 'Singapore (SGT)',
    code: 'SGP-SGT',
    timeZone: 'Asia/Singapore',
    flag: '🇸🇬',
    interviewTrack: 'APAC Tech Hub & SEA Drives'
  }
];

interface TimeZonesBarProps {
  compact?: boolean;
  className?: string;
}

export const TimeZonesBar: React.FC<TimeZonesBarProps> = ({ compact = false, className = '' }) => {
  const [time, setTime] = useState<Date>(new Date());
  const [expanded, setExpanded] = useState<boolean>(!compact);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatZonedTime = (tz: string) => {
    try {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(time);

      const dayStr = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(time);

      // Determine hiring window (approx 9:00 AM to 6:00 PM local)
      const hour24 = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: 'numeric',
          hour12: false
        }).format(time),
        10
      );
      const isWorkHours = hour24 >= 9 && hour24 < 18;

      return { timeStr, dayStr, isWorkHours };
    } catch {
      return { timeStr: '--:--:--', dayStr: '---', isWorkHours: false };
    }
  };

  return (
    <div className={`bg-white border-b border-slate-200 select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Section Header with Live indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-blue-950">
              <Globe className="w-3.5 h-3.5 text-blue-900" />
              <span>GLOBAL RECRUITMENT TIME ZONES</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-mono text-red-600 font-bold hidden sm:inline">
              LIVE SYNC
            </span>
          </div>

          {/* Toggle for full world clock matrix */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] font-mono text-blue-900 hover:text-blue-950 transition-colors py-1 px-2.5 rounded-lg bg-blue-50/80 border border-blue-200 font-semibold cursor-pointer"
          >
            <Clock className="w-3 h-3 text-blue-900" />
            <span>{expanded ? 'Compact View' : 'All 5 Time Zones'}</span>
            {expanded ? <ChevronUp className="w-3 h-3 text-blue-900" /> : <ChevronDown className="w-3 h-3 text-blue-900" />}
          </button>
        </div>

        {/* Clocks Grid / Bar */}
        <div className={`mt-2.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 transition-all ${
          expanded ? 'block' : 'hidden lg:grid'
        }`}>
          {TIME_ZONES.map((zone) => {
            const { timeStr, dayStr, isWorkHours } = formatZonedTime(zone.timeZone);
            return (
              <div
                key={zone.id}
                className="bg-white hover:bg-blue-50/40 border border-blue-100 hover:border-blue-300 rounded-xl p-3 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{zone.flag}</span>
                    <span className="font-bold text-xs text-blue-950">{zone.country}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isWorkHours
                        ? 'bg-blue-50 text-blue-900 border border-blue-300'
                        : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                    title={isWorkHours ? 'Active recruitment / interview window' : 'Off-hours / pre-test revision'}
                  >
                    {isWorkHours ? 'HIRE WINDOW' : 'OFF-HOURS'}
                  </span>
                </div>

                <div className="text-[10px] text-blue-800/80 font-mono truncate">{zone.city}</div>
                <div className="text-sm sm:text-base font-mono font-extrabold text-blue-950 tracking-wider my-0.5">
                  {timeStr}
                </div>
                <div className="flex items-center justify-between text-[10px] text-blue-900/70 font-mono pt-1 border-t border-slate-100">
                  <span className="font-medium text-blue-900">{dayStr}</span>
                  <span className="text-red-600 font-bold truncate max-w-[85px]" title={zone.interviewTrack}>
                    {zone.code}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
