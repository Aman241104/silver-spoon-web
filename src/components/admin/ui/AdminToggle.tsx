"use client";

interface Props {
  active: boolean;
  pending: boolean;
  onClick: () => void;
  label?: string;
}

export default function AdminToggle({ active, pending, onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title={label ?? (active ? "Turn off" : "Turn on")}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 ${
        pending ? "cursor-wait opacity-60" : "cursor-pointer"
      } ${active ? "bg-[#D4AF37]" : "bg-gray-200 hover:bg-gray-300"}`}
    >
      <span
        className={`absolute top-0.5 left-0 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          active ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
