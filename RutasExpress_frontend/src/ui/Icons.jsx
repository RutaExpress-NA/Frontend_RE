const D = (p) => (
    <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill={p.fill ? "currentColor" : "none"}
        stroke={p.fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={p.className} style={p.style}>
        {Array.isArray(p.d) ? p.d.map((d, i) => <path key={i} d={d} />) : <path d={p.d} />}
    </svg>
);

export const CircleIcon = (p) => (
    <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill="currentColor" className={p.className} style={p.style}>
        <circle cx="12" cy="12" r="10" />
    </svg>
);

export const HomeIcon = (p) => <D {...p} d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]} />;
export const PackageIcon = (p) => <D {...p} d={["M16.5 9.4l-9-5.19", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", "M3.27 6.96L12 12.01l8.73-5.05", "M12 22.08V12"]} />;
export const TruckIcon = (p) => <D {...p} d={["M1 3h15v13H1z", "M16 8h4l3 3v5h-7V8z", "M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z", "M18.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"]} />;
export const GridIcon = (p) => <D {...p} d={["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]} />;
export const ClipboardIcon = (p) => <D {...p} d={["M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", "M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z", "M9 12h6", "M9 16h4"]} />;
export const UserIcon = (p) => <D {...p} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]} />;
export const CheckIcon = (p) => <D {...p} d="M20 6L9 17l-5-5" />;
export const XIcon = (p) => <D {...p} d={["M18 6L6 18", "M6 6l12 12"]} />;
export const ClockIcon = (p) => <D {...p} d={["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"]} />;
export const AlertIcon = (p) => <D {...p} d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} />;
export const SearchIcon = (p) => <D {...p} d={["M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z", "M21 21l-4.35-4.35"]} />;
export const PlusIcon = (p) => <D {...p} d={["M12 5v14", "M5 12h14"]} />;
export const ChevronRightIcon = (p) => <D {...p} d="M9 18l6-6-6-6" />;
export const ChevronLeftIcon = (p) => <D {...p} d="M15 18l-6-6 6-6" />;
export const ArrowRightIcon = (p) => <D {...p} d={["M5 12h14", "M12 5l7 7-7 7"]} />;
export const SunIcon = (p) => <D {...p} d={["M12 1v2", "M12 21v2", "M4.22 4.22l1.42 1.42", "M18.36 18.36l1.42 1.42", "M1 12h2", "M21 12h2", "M4.22 19.78l1.42-1.42", "M18.36 5.64l1.42-1.42", "M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z"]} />;
export const MoonIcon = (p) => <D {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
export const BellIcon = (p) => <D {...p} d={["M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"]} />;
export const MailIcon = (p) => <D {...p} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />;
export const MapPinIcon = (p) => <D {...p} d={["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"]} />;
export const SettingsIcon = (p) => <D {...p} d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]} />;
export const LogOutIcon = (p) => <D {...p} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />;
export const FilterIcon = (p) => <D {...p} d={["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"]} />;
export const DownloadIcon = (p) => <D {...p} d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]} />;
export const RefreshIcon = (p) => <D {...p} d={["M23 4v6h-6", "M1 20v-6h6", "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"]} />;
export const StarIcon = (p) => <D {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
export const WeightIcon = (p) => <D {...p} d={["M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z", "M6 8h12l1 12H5L6 8z"]} />;
export const CalendarIcon = (p) => <D {...p} d={["M8 2v4", "M16 2v4", "M3 10h18", "M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"]} />;
export const ZapIcon = (p) => <D {...p} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;
export const ShieldIcon = (p) => <D {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
export const LayersIcon = (p) => <D {...p} d={["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"]} />;
export const InboxIcon = (p) => <D {...p} d={["M22 12h-6l-2 3H10L8 12H2", "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 17.76 4H6.24a2 2 0 0 0-1.79 1.11z"]} />;
