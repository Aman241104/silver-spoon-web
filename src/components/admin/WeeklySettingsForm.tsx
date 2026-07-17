"use client";

import * as React from "react";
import { updateWeeklySettings } from "@/app/actions/weeklySettings";
import { useToast } from "@/components/admin/ui/Toast";

export default function WeeklySettingsForm({ count, randomize }: { count: number; randomize: boolean }) {
  const { toast } = useToast();
  const [value, setValue] = React.useState(count);
  const [random, setRandom] = React.useState(randomize);
  const [saving, setSaving] = React.useState(false);

  async function save(nextCount: number, nextRandom: boolean) {
    setSaving(true);
    const result = await updateWeeklySettings(nextCount, nextRandom);
    if (result?.error) toast(result.error, "error");
    else toast("Weekly settings updated");
    setSaving(false);
  }

  return (
    <div className="bg-white border border-gray-100 p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-5">
      <div>
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1.5">
          Products shown on homepage
        </label>
        <input
          type="number"
          min={1}
          max={50}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onBlur={() => save(value, random)}
          disabled={saving}
          className="w-24 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#2F3131] transition-colors"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={random}
          disabled={saving}
          onChange={(e) => {
            setRandom(e.target.checked);
            save(value, e.target.checked);
          }}
          className="w-4 h-4 accent-[#D4AF37]"
        />
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-600">
          Show random picks (rotates every few hours)
        </span>
      </label>
    </div>
  );
}
