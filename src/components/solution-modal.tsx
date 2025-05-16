import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, Send } from "lucide-react";

export default function SolutionModal({ open, onClose, reportId, userId }: {
  open: boolean;
  onClose: () => void;
  reportId: string;
  userId: string;
}) {
  const [solutionInput, setSolutionInput] = useState("");
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  // Fetch solutions
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`http://localhost:3000/api/solution/report/${reportId}`)
      .then(async res => setSolutions(await res.json()))
      .catch(() => setSolutions([]))
      .finally(() => setLoading(false));
  }, [open, reportId, posting]);

  // Submit solusi baru
  const handleSubmitSolution = async () => {
    setPosting(true);
    await fetch(`http://localhost:3000/api/solution/report/${reportId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: solutionInput, userId })
    });
    setSolutionInput("");
    setPosting(false);
  };

  // Upvote solusi
  const handleUpvote = async (id: string) => {
    await fetch(`http://localhost:3000/api/solution/${id}/vote`, { method: "POST" });
    setPosting(true);
    setTimeout(() => setPosting(false), 500);
  };

  // Comment solusi
  const handleComment = async (id: string) => {
    const text = commentInputs[id];
    if (!text) return;
    await fetch(`/api/solution/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId })
    });
    setCommentInputs(inputs => ({ ...inputs, [id]: "" }));
    setPosting(true);
    setTimeout(() => setPosting(false), 500);
  };

  if (!open) return null;

  return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center py-2">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full h-full p-8 relative">
            <button className="absolute top-3 right-4 text-gray-400 text-2xl hover:opacity-70 hover:cursor-pointer" onClick={onClose}>✕</button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Ajukan Solusi</h2>
            <Textarea
              placeholder="Tulis solusi Anda di sini..."
              value={solutionInput}
              onChange={e => setSolutionInput(e.target.value)}
              className="mb-3 text-base"
              rows={3}
            />
            <Button onClick={handleSubmitSolution} disabled={posting || !solutionInput} className="w-full font-semibold bg-gradient-to-r from-[#ec6f66] to-[#f3a183] hover:opacity-85 py-2 hover:cursor-pointer">
              {posting ? "Mengirim..." : "Kirim Solusi"}
            </Button>
            <hr className="my-6" />
            <h3 className="font-semibold mb-4 text-lg text-gray-700">Solusi dari Pengguna Lain</h3>
            {loading && <div>Memuat solusi...</div>}
            {!loading && solutions.length === 0 && (
              <div className="text-gray-400 text-base text-center">Belum ada solusi.</div>
            )}
            <div className="space-y-6 max-h-[420px] overflow-y-auto">
              {solutions.map((sol: any) => (
                <div
                  key={sol._id}
                  className="bg-white border rounded-xl shadow flex flex-col gap-2 p-5"
                >
                  {/* Header solusi */}
                  <div className="flex items-center gap-3 mb-1">
                    {/* Avatar default */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-bold">
                      <span>A</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-base">Anonim</div>
                      {sol.createdAt && (
                        <div className="text-xs text-gray-400">
                          {new Date(sol.createdAt).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1" />
                    {/* Upvote */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleUpvote(sol._id)}
                      className="hover:bg-[#ffe6e1] group"
                      aria-label="Upvote solusi"
                    >
                      <ThumbsUp className="h-5 w-5 text-[#ec6f66] group-hover:scale-110 transition" />
                    </Button>
                    <span className="text-xs text-gray-600 font-medium ml-1">{sol.upvotes || 0}</span>
                  </div>
                  {/* Isi solusi */}
                  <div className="text-gray-800 text-justify text-base px-1 pb-2 leading-relaxed">
                    {sol.content}
                  </div>
                  {/* Komentar solusi */}
                  <div className="">
                    {(sol.comments || []).map((c: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
                      >
                        {/* Avatar komentar */}
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-base uppercase">
                          <span>{c.name[0]}</span>
                        </div>
                        {/* Nama dan komentar */}
                        <div className="flex-1">
                          <div className="font-semibold text-xs text-gray-700 leading-tight mb-0.5 capitalize">
                            {c.name}
                          </div>
                          <div className="text-sm text-gray-700 text-justify">
                            {c.text}
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Input komentar */}
                    <div className="flex gap-2 mt-1">
                      <Input
                        size={20}
                        placeholder="Tulis komentar..."
                        value={commentInputs[sol._id] || ""}
                        onChange={e =>
                          setCommentInputs(inputs => ({
                            ...inputs,
                            [sol._id]: e.target.value,
                          }))
                        }
                        className="flex-1 text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleComment(sol._id)}
                        disabled={!commentInputs[sol._id]}
                        className="bg-gradient-to-r from-[#ec6f66] to-[#f3a183] text-white hover:opacity-85 hover:cursor-pointer"
                        aria-label="Kirim komentar"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}