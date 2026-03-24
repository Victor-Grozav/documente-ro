import { Info, AlertTriangle } from "lucide-react";

interface Props {
  valid: string;
  atentie?: string;
}

export default function DocumentDisclaimer({ valid, atentie }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
        <p className="text-sm text-green-800 dark:text-green-300">{valid}</p>
      </div>
      {atentie && (
        <div className="flex gap-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300">{atentie}</p>
        </div>
      )}
    </div>
  );
}
