import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (question: string, options: string[]) => void;
}

export function CreatePollForm({ open, onClose, onSubmit }: Props) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (i: number) => setOptions(options.filter((_, idx) => idx !== i));
  const updateOption = (i: number, val: string) => {
    const newOpts = [...options];
    newOpts[i] = val;
    setOptions(newOpts);
  };

  const handleSubmit = () => {
    if (!question.trim() || options.some(o => !o.trim())) return;
    onSubmit(question.trim(), options.map(o => o.trim()));
    setQuestion("");
    setOptions(["", ""]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 animate-slide-up shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Create Poll</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </div>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="w-full px-3 py-2 rounded-xl border mb-3 text-sm bg-slate-50 dark:bg-slate-800"
        />
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
              className="flex-1 px-3 py-2 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800"
            />
            {options.length > 2 && (
              <button onClick={() => removeOption(i)} className="text-red-500 p-1"><Trash2 size={16} /></button>
            )}
          </div>
        ))}
        <button onClick={addOption} className="text-blue-600 text-sm flex items-center gap-1 mb-3">
          <Plus size={14} /> Add option
        </button>
        <button onClick={handleSubmit} className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold">
          Post Poll
        </button>
      </div>
    </div>
  );
}