import { MessageCircleQuestion } from "lucide-react";
import type { Question } from "@/lib/mock-product-detail";

interface QuestionAnswerProps {
    questions: Question[];
}

export function QuestionAnswer({ questions }: QuestionAnswerProps) {
    return (
        <section>
            <div className="mb-4 flex items-center gap-2">
                <MessageCircleQuestion className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-on-surface">Questions & Answers</h2>
            </div>
            <div className="space-y-4">
                {questions.map((q) => (
                    <div
                        key={q.id}
                        className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5"
                    >
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                                Q
                            </span>
                            <p className="text-sm font-semibold text-on-surface">{q.question}</p>
                        </div>
                        <div className="mt-3 flex items-start gap-3">
                            <span className="mt-0.5 shrink-0 rounded-md bg-success/10 px-2 py-0.5 text-xs font-bold text-success">
                                A
                            </span>
                            <div>
                                <p className="text-sm leading-relaxed text-on-surface-variant">
                                    {q.answer}
                                </p>
                                <p className="mt-2 text-xs text-on-surface-variant/50">
                                    — {q.author} · {q.date}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}