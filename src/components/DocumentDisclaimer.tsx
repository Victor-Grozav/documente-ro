import { Info, AlertTriangle } from "lucide-react";

interface Props {
  valid: string;
  atentie?: string;
}

export default function DocumentDisclaimer({ valid, atentie }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
        <p className="text-sm text-green-800">{valid}</p>
      </div>
      {atentie && (
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">{atentie}</p>
        </div>
      )}
    </div>
  );
}
