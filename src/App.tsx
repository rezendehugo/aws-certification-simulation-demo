import { useCallback, useEffect, useMemo, useState } from "react";
import { Results } from "./components/Results";
import { Simulation } from "./components/Simulation";
import { TopBar } from "./components/TopBar";
import { Welcome } from "./components/Welcome";
import questionsData from "./data/questions.json";
import { resultFor } from "./domain/scoring";
import {
  clearAttempt,
  freshAttempt,
  loadAttempt,
  loadLocale,
  loadTheme,
  saveAttempt,
  saveLocale,
  saveTheme,
} from "./domain/storage";
import type { AttemptState, Locale, Question, Theme } from "./types";

const questions = questionsData as Question[];

function scrollToTop(): void {
  window.scrollTo({ top: 0 });
}

export function App() {
  const [attempt, setAttempt] = useState<AttemptState>(loadAttempt);
  const [locale, setLocale] = useState<Locale>(loadLocale);
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    document.documentElement.lang = locale;
    saveLocale(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    scrollToTop();
  }, [attempt.status]);

  function update(next: AttemptState): void {
    setAttempt(next);
    saveAttempt(next);
  }

  function start(): void {
    if (attempt.status === "active") return;
    const now = new Date();
    update({
      ...freshAttempt(),
      status: "active",
      startedAt: now.toISOString(),
      deadlineAt: new Date(now.getTime() + 90 * 60 * 1000).toISOString(),
    });
    scrollToTop();
  }

  const submit = useCallback(() => {
    setAttempt((current) => {
      if (current.status !== "active" || !current.startedAt) return current;
      const next = {
        ...current,
        status: "submitted" as const,
        submittedAt: new Date().toISOString(),
      };
      saveAttempt(next);
      return next;
    });
    scrollToTop();
  }, []);

  function reset(): void {
    const message =
      locale === "pt-BR"
        ? "Excluir a tentativa salva e começar novamente?"
        : "Delete the saved attempt and start again?";
    if (attempt.status !== "ready" && !window.confirm(message)) return;
    clearAttempt();
    setAttempt(freshAttempt());
    scrollToTop();
  }

  const result = useMemo(
    () =>
      attempt.status === "submitted" && attempt.startedAt && attempt.submittedAt
        ? resultFor(questions, attempt.answers, attempt.startedAt, attempt.submittedAt)
        : null,
    [attempt],
  );

  return (
    <>
      <TopBar locale={locale} theme={theme} onLocale={setLocale} onTheme={setTheme}>
        {attempt.status === "active" && (
          <span>{Object.values(attempt.answers).filter((answer) => answer.response).length}/65</span>
        )}
      </TopBar>
      {attempt.status === "ready" ? (
        <Welcome locale={locale} resumable={false} onStart={start} onReset={reset} />
      ) : attempt.status === "active" ? (
        <Simulation
          questions={questions}
          attempt={attempt}
          locale={locale}
          onUpdate={update}
          onSubmit={submit}
        />
      ) : (
        result && (
          <Results
            questions={questions}
            answers={attempt.answers}
            result={result}
            locale={locale}
            onReset={reset}
            onDelete={reset}
          />
        )
      )}
    </>
  );
}
