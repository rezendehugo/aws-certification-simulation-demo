import { useEffect, useMemo, useRef, useState, type CSSProperties, type WheelEvent } from "react";
import { domainNames, questionTypeNames, translate } from "../i18n";
import type { AnswerState, AttemptState, Locale, Question, Response } from "../types";
import { QuestionInput } from "./QuestionInput";

const emptyAnswer = (): AnswerState => ({ response: null, flagged: false, confidence: "medium" });

export function Simulation({
  questions,
  attempt,
  locale,
  onUpdate,
  onSubmit,
}: {
  questions: Question[];
  attempt: AttemptState;
  locale: Locale;
  onUpdate: (value: AttemptState) => void;
  onSubmit: () => void;
}) {
  const [remaining, setRemaining] = useState(() => seconds(attempt.deadlineAt));
  const [confirming, setConfirming] = useState(false);
  const [help, setHelp] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const rangeWheelDelta = useRef(0);
  const question = questions[attempt.position] ?? questions[0]!;
  const answerState = attempt.answers[question.id] ?? emptyAnswer();
  const answered = questions.filter((item) => attempt.answers[item.id]?.response).length;
  const flagged = questions.filter((item) => attempt.answers[item.id]?.flagged).length;

  const update = (patch: Partial<AttemptState>) => onUpdate({ ...attempt, ...patch });
  const answer = (response: Response) => update({ answers: { ...attempt.answers, [question.id]: { ...answerState, response } } });
  const move = (position: number) => update({ position: Math.max(0, Math.min(questions.length - 1, position)) });
  const toggleFlag = () => update({ answers: { ...attempt.answers, [question.id]: { ...answerState, flagged: !answerState.flagged } } });

  const handleRangeWheel = (event: WheelEvent<HTMLInputElement>) => {
    const delta = Math.abs(event.deltaX) >= Math.abs(event.deltaY)
      ? event.deltaX
      : event.shiftKey ? event.deltaY : 0;
    if (!delta) return;
    event.preventDefault();
    rangeWheelDelta.current += delta;
    const steps = Math.trunc(rangeWheelDelta.current / 36);
    if (steps !== 0) {
      rangeWheelDelta.current -= steps * 36;
      move(attempt.position + steps);
    }
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = seconds(attempt.deadlineAt);
      setRemaining(next);
      if (next <= 0) {
        window.clearInterval(id);
        onSubmit();
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [attempt.deadlineAt, onSubmit]);

  useEffect(() => {
    if (confirming || help) closeRef.current?.focus();
  }, [confirming, help]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, select, textarea, button, [contenteditable='true']")) return;
      if (confirming || help) {
        if (event.key === "Escape") {
          event.preventDefault();
          setConfirming(false);
          setHelp(false);
        }
        return;
      }
      if (event.key === "?") { event.preventDefault(); setHelp(true); return; }
      if (event.shiftKey && event.key === "Enter") { event.preventDefault(); setConfirming(true); return; }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(attempt.position - 1); return; }
      if (event.key === "ArrowRight") { event.preventDefault(); move(attempt.position + 1); return; }
      if (event.key.toLowerCase() === "f") { event.preventDefault(); toggleFlag(); return; }
      if (question.type !== "multiple_choice" && question.type !== "multiple_response") return;
      const key = event.key.toUpperCase();
      const index = /^[A-E]$/.test(key) ? key.charCodeAt(0) - 65 : Number(event.key) - 1;
      if (!Number.isInteger(index) || index < 0) return;
      const option = question.options[index];
      if (!option) return;
      event.preventDefault();
      const selected = Array.isArray(answerState.response) ? answerState.response : [];
      answer(question.type === "multiple_response"
        ? selected.includes(option.id) ? selected.filter((id) => id !== option.id) : [...selected, option.id]
        : [option.id]);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [attempt, answerState, confirming, help, question]);

  const instruction = useMemo(() => {
    if (question.type === "multiple_response") return translate(locale, "selectTwo");
    if (question.type === "ordering") return translate(locale, "arrange");
    if (question.type === "matching") return translate(locale, "match");
    return null;
  }, [locale, question.type]);

  return (
    <main className="exam">
      <nav className="question-navigator" aria-label={translate(locale, "questions")}>
        <div className="navigator-status">
          <strong>{translate(locale, "question")} {attempt.position + 1} {translate(locale, "of")} {questions.length}</strong>
          <span>{answered} {translate(locale, "answered").toLowerCase()}</span>
          {flagged > 0 && <span>{flagged} {translate(locale, "flagged").toLowerCase()}</span>}
        </div>
        <div className="range-controls">
          <button
            type="button"
            className="range-arrow"
            onClick={() => move(attempt.position - 1)}
            disabled={attempt.position === 0}
            aria-label={`${translate(locale, "previous")} ${translate(locale, "question").toLowerCase()}`}
          >←</button>
          <input
            className="question-range"
            type="range"
            min={1}
            max={questions.length}
            step={1}
            value={attempt.position + 1}
            aria-label={translate(locale, "question")}
            aria-valuetext={`${translate(locale, "question")} ${attempt.position + 1} ${translate(locale, "of")} ${questions.length}`}
            style={{ "--range-progress": `${(attempt.position / Math.max(1, questions.length - 1)) * 100}%` } as CSSProperties}
            onChange={(event) => move(Number(event.target.value) - 1)}
            onWheel={handleRangeWheel}
          />
          <button
            type="button"
            className="range-arrow"
            onClick={() => move(attempt.position + 1)}
            disabled={attempt.position === questions.length - 1}
            aria-label={`${translate(locale, "next")} ${translate(locale, "question").toLowerCase()}`}
          >→</button>
        </div>
      </nav>

      <article className="question-card">
        <div className="badges">
          <span>{domainNames[locale][question.domainId]}</span>
          <span>{translate(locale, questionTypeNames[question.type])}</span>
        </div>
        <p className="language-note">{translate(locale, "english")}</p>
        <h1>{question.stem}</h1>
        {instruction && <p className="instruction">{instruction}</p>}
        <QuestionInput question={question} response={answerState.response} onChange={answer} locale={locale} />
        <div className="shortcut-strip">
          <span><kbd>A–E</kbd>/<kbd>1–5</kbd> {translate(locale, "choose")}</span>
          <span><kbd>←</kbd><kbd>→</kbd> {translate(locale, "navigate")}</span>
          <span><kbd>F</kbd> {translate(locale, "flag")}</span>
          <span><kbd>?</kbd> {translate(locale, "openHelp")}</span>
        </div>
        <footer className="actionbar">
          <button onClick={() => move(attempt.position - 1)} disabled={attempt.position === 0}>← {translate(locale, "previous")}</button>
          <button className={answerState.flagged ? "flag active" : "flag"} onClick={toggleFlag}>⚑ {translate(locale, answerState.flagged ? "unflag" : "flag")}</button>
          <label>
            {translate(locale, "confidence")}
            <select value={answerState.confidence} onChange={(event) => update({ answers: { ...attempt.answers, [question.id]: { ...answerState, confidence: event.target.value as AnswerState["confidence"] } } })}>
              <option value="low">{translate(locale, "low")}</option>
              <option value="medium">{translate(locale, "medium")}</option>
              <option value="high">{translate(locale, "high")}</option>
            </select>
          </label>
          <button className="primary" onClick={() => move(attempt.position + 1)} disabled={attempt.position === questions.length - 1}>{translate(locale, "next")} →</button>
        </footer>
      </article>

      <aside className="summary">
        <span className="eyebrow">{translate(locale, "summary")}</span>
        <strong className="big-time" aria-live="polite">{clock(remaining)}</strong>
        <dl>
          <div><dt>{translate(locale, "answered")}</dt><dd>{answered}</dd></div>
          <div><dt>{translate(locale, "unanswered")}</dt><dd>{questions.length - answered}</dd></div>
          <div><dt>{translate(locale, "flagged")}</dt><dd>{flagged}</dd></div>
        </dl>
        <button className="primary submit" onClick={() => setConfirming(true)}>{translate(locale, "submit")}</button>
        <small>{translate(locale, "privacy")}</small>
      </aside>

      {(confirming || help) && (
        <div className="backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) { setConfirming(false); setHelp(false); } }}>
          <section className="dialog" role="dialog" aria-modal="true">
            <h2>{help ? translate(locale, "shortcuts") : translate(locale, "submitTitle")}</h2>
            {help
              ? <div className="help-list"><p><kbd>A–E</kbd> / <kbd>1–5</kbd> {translate(locale, "choose")}</p><p><kbd>←</kbd> <kbd>→</kbd> {translate(locale, "navigate")}</p><p><kbd>F</kbd> {translate(locale, "flag")}</p><p><kbd>Shift</kbd> + <kbd>Enter</kbd> {translate(locale, "submit")}</p></div>
              : <p>{translate(locale, "submitBody")}</p>}
            <div className="dialog-actions">
              <button ref={closeRef} onClick={() => { setConfirming(false); setHelp(false); }}>{help ? translate(locale, "close") : translate(locale, "keepWorking")}</button>
              {confirming && <button className="primary" onClick={onSubmit}>{translate(locale, "submitNow")}</button>}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function seconds(deadline: string | null) {
  return deadline ? Math.max(0, Math.ceil((Date.parse(deadline) - Date.now()) / 1000)) : 5400;
}

function clock(value: number) {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}
