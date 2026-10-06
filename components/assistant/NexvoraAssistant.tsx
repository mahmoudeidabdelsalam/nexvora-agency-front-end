"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Room } from "livekit-client";

const VOICE_API_URL = process.env.NEXT_PUBLIC_VOICE_API_URL?.trim();

type Language = "en" | "ar-eg";
type ConnectionStatus = "idle" | "connecting" | "connected" | "error";
type Message = { id: string; role: "user" | "assistant"; text: string };
type VoiceTokenResponse = { url: string; token: string };

const COPY = {
  en: {
    title: "NEXVORA Assistant",
    welcome:
      "Hello! Welcome to NEXVORA. I can help you explore our services, discuss your project, and connect you with our team. How can I help?",
    placeholder: "Ask about our services…",
    send: "Send",
    startVoice: "Start voice conversation",
    stopVoice: "Stop voice conversation",
    minimize: "Minimize assistant",
    close: "Close assistant",
    clear: "Clear conversation",
    language: "Language",
    connecting: "Connecting…",
    error:
      "The assistant could not connect. Please try again or contact our team through the contact page.",
    microphoneError:
      "Microphone access is required for a voice conversation. Check your browser permissions and try again.",
  },
  "ar-eg": {
    title: "مساعد NEXVORA",
    welcome:
      "أهلاً بيك في NEXVORA! أقدر أساعدك تتعرف على خدماتنا، وتتكلم عن مشروعك، أو أوصلك بفريقنا. أقدر أساعدك إزاي؟",
    placeholder: "اكتب سؤالك عن خدماتنا…",
    send: "إرسال",
    startVoice: "ابدأ محادثة صوتية",
    stopVoice: "أوقف المحادثة الصوتية",
    minimize: "تصغير المساعد",
    close: "إغلاق المساعد",
    clear: "مسح المحادثة",
    language: "اللغة",
    connecting: "جاري الاتصال…",
    error: "تعذر الاتصال بالمساعد. حاول مرة أخرى أو تواصل مع فريقنا من صفحة اتصل بنا.",
    microphoneError: "يلزم السماح باستخدام الميكروفون للمحادثة الصوتية. راجع إعدادات المتصفح وحاول مرة أخرى.",
  },
} as const;

function isVoiceTokenResponse(value: unknown): value is VoiceTokenResponse {
  if (typeof value !== "object" || value === null) return false;
  const response = value as Record<string, unknown>;
  return (
    typeof response.url === "string" &&
    response.url.startsWith("wss://") &&
    typeof response.token === "string" &&
    response.token.length > 0
  );
}

export default function NexvoraAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const roomRef = useRef<Room | null>(null);
  const modeRef = useRef<"text" | "voice" | null>(null);
  const tokenRequestRef = useRef<AbortController | null>(null);
  const audioElementsRef = useRef<HTMLMediaElement[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const copy = COPY[language];
  const direction = language === "ar-eg" ? "rtl" : "ltr";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const disconnect = useCallback(async () => {
    tokenRequestRef.current?.abort();
    tokenRequestRef.current = null;
    const room = roomRef.current;
    roomRef.current = null;
    modeRef.current = null;
    audioElementsRef.current.forEach((element) => element.remove());
    audioElementsRef.current = [];
    if (room) await room.disconnect();
    setStatus("idle");
    setIsVoiceActive(false);
  }, []);

  useEffect(
    () => () => {
      tokenRequestRef.current?.abort();
      tokenRequestRef.current = null;
      const room = roomRef.current;
      roomRef.current = null;
      if (room) void room.disconnect();
      audioElementsRef.current.forEach((element) => element.remove());
      audioElementsRef.current = [];
    },
    [],
  );

  const upsertMessage = useCallback((id: string, role: Message["role"], text: string) => {
    setMessages((current) => {
      const index = current.findIndex((message) => message.id === id);
      if (index === -1) return [...current, { id, role, text }];
      const updated = [...current];
      updated[index] = { ...updated[index], text };
      return updated;
    });
  }, []);

  const connect = useCallback(
    async (mode: "text" | "voice") => {
      if (roomRef.current && modeRef.current === mode) return roomRef.current;

      await disconnect();
      setStatus("connecting");
      setError("");

      const controller = new AbortController();
      tokenRequestRef.current = controller;
      let room: Room | undefined;
      try {
        if (!VOICE_API_URL) throw new Error("NEXT_PUBLIC_VOICE_API_URL is not configured");

        const tokenUrl = new URL("token", `${VOICE_API_URL.replace(/\/+$/, "")}/`);
        tokenUrl.searchParams.set("lang", language);
        tokenUrl.searchParams.set("mode", mode);
        const response = await fetch(tokenUrl, {
          credentials: "omit",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Token endpoint returned ${response.status}`);

        const payload: unknown = await response.json();
        if (!isVoiceTokenResponse(payload)) {
          throw new Error("Token endpoint returned an invalid LiveKit connection response");
        }

        const { Room, RoomEvent, Track } = await import("livekit-client");
        if (controller.signal.aborted) return null;
        room = new Room();
        roomRef.current = room;

        room.on(RoomEvent.TrackSubscribed, (track) => {
          if (track.kind !== Track.Kind.Audio) return;
          const element = track.attach();
          element.autoplay = true;
          element.setAttribute("aria-hidden", "true");
          element.className = "sr-only";
          document.body.appendChild(element);
          audioElementsRef.current.push(element);
        });
        room.on(RoomEvent.TrackUnsubscribed, (track) => {
          track.detach().forEach((element) => element.remove());
          audioElementsRef.current = audioElementsRef.current.filter(
            (element) => element.isConnected,
          );
        });
        room.on(RoomEvent.Disconnected, () => {
          if (roomRef.current === room) {
            roomRef.current = null;
            modeRef.current = null;
            setStatus("idle");
            setIsVoiceActive(false);
          }
        });
        room.registerTextStreamHandler("lk.transcription", async (reader, participant) => {
          const attributes = reader.info.attributes ?? {};
          const segmentId = attributes["lk.segment_id"] ?? reader.info.id;
          const speaker =
            attributes["lk.participant_identity"] ?? participant.identity;
          let text = "";
          for await (const chunk of reader) {
            text += chunk;
            upsertMessage(
              `${speaker}:${segmentId}`,
              speaker === room?.localParticipant.identity ? "user" : "assistant",
              text,
            );
          }
        });

        await room.connect(payload.url, payload.token);
        if (controller.signal.aborted) throw new DOMException("Connection cancelled", "AbortError");
        if (mode === "voice") {
          await room.localParticipant.setMicrophoneEnabled(true);
          await room.startAudio();
        }

        if (controller.signal.aborted) throw new DOMException("Connection cancelled", "AbortError");
        modeRef.current = mode;
        tokenRequestRef.current = null;
        setStatus("connected");
        setIsVoiceActive(mode === "voice");
        return room;
      } catch (cause) {
        if (room) await room.disconnect();
        if (roomRef.current === room) roomRef.current = null;
        if (tokenRequestRef.current === controller) tokenRequestRef.current = null;
        if (controller.signal.aborted) return null;
        const isMicrophoneError =
          cause instanceof Error && /permission|denied|notallowed|microphone/i.test(cause.message);
        console.error("Unable to connect to the NEXVORA LiveKit assistant.", cause);
        setError(isMicrophoneError ? copy.microphoneError : copy.error);
        setStatus("error");
        return null;
      }
    },
    [copy.error, copy.microphoneError, disconnect, language, upsertMessage],
  );

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || status === "connecting") return;

    setInput("");
    upsertMessage(`visitor-${Date.now()}`, "user", text);
    try {
      const room = roomRef.current ?? (await connect("text"));
      if (!room) return;
      await room.localParticipant.sendText(text, { topic: "lk.chat" });
    } catch (cause) {
      console.error("Unable to send a message to the NEXVORA LiveKit assistant.", cause);
      setError(copy.error);
    }
  };

  const toggleVoice = async () => {
    if (isVoiceActive) {
      await disconnect();
      return;
    }
    await connect("voice");
  };

  const changeLanguage = async (nextLanguage: Language) => {
    if (nextLanguage === language) return;
    await disconnect();
    setLanguage(nextLanguage);
    setMessages([]);
    setError("");
  };

  if (!VOICE_API_URL) return null;

  return (
    <div className="fixed bottom-4 end-4 z-50" dir={direction}>
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={copy.title}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-2xl text-white shadow-lg transition hover:scale-105"
        >
          <span aria-hidden="true">✦</span>
        </button>
      ) : (
        <section
          role="dialog"
          aria-label={copy.title}
          className="flex h-[min(34rem,calc(100dvh-2rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl"
        >
          <header className="flex items-center justify-between gap-2 bg-[var(--secondary)] px-4 py-3 text-white">
            <strong className="text-sm">{copy.title}</strong>
            <div className="flex items-center gap-2">
              <label className="sr-only" htmlFor="assistant-language">
                {copy.language}
              </label>
              <select
                id="assistant-language"
                value={language}
                onChange={(event) => {
                  const nextLanguage = event.target.value;
                  if (nextLanguage === "en" || nextLanguage === "ar-eg") {
                    void changeLanguage(nextLanguage);
                  }
                }}
                className="rounded bg-white/10 px-1 py-1 text-xs text-white"
              >
                <option value="en" className="text-slate-900">English</option>
                <option value="ar-eg" className="text-slate-900">العربية</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  if (isVoiceActive) void disconnect();
                  setIsOpen(false);
                }}
                aria-label={copy.minimize}
                className="rounded px-2 py-1 text-lg hover:bg-white/10"
              >
                <span aria-hidden="true">−</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  void disconnect();
                  setIsOpen(false);
                }}
                aria-label={copy.close}
                className="rounded px-2 py-1 text-lg hover:bg-white/10"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto p-3 text-sm"
            aria-live="polite"
            aria-relevant="additions text"
          >
            <p className="rounded-xl bg-slate-100 p-3">{copy.welcome}</p>
            {messages.map((message) => (
              <p
                key={message.id}
                className={`max-w-[88%] whitespace-pre-wrap rounded-xl p-3 ${
                  message.role === "user"
                    ? "ms-auto bg-[var(--primary)] text-white"
                    : "bg-slate-100"
                }`}
              >
                {message.text}
              </p>
            ))}
            {status === "connecting" && (
              <p className="text-xs text-slate-500" role="status">{copy.connecting}</p>
            )}
            {error && <p className="text-xs text-red-700" role="alert">{error}</p>}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 p-2">
            <button
              type="button"
              onClick={() => void toggleVoice()}
              disabled={status === "connecting"}
              aria-pressed={isVoiceActive}
              aria-label={isVoiceActive ? copy.stopVoice : copy.startVoice}
              className={`h-10 w-10 shrink-0 rounded-full disabled:opacity-50 ${
                isVoiceActive ? "bg-red-600 text-white" : "bg-slate-100 text-[var(--secondary)]"
              }`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto h-5 w-5"
              >
                {isVoiceActive ? (
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                ) : (
                  <>
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" />
                  </>
                )}
              </svg>
            </button>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void sendMessage();
              }}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={!input.trim() || status === "connecting"}
              className="rounded-lg bg-[var(--primary)] px-3 py-2 text-sm text-white disabled:opacity-50"
            >
              {copy.send}
            </button>
          </div>
          <footer className="border-t border-slate-100 px-3 py-1 text-end">
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-xs text-slate-500 underline underline-offset-2"
            >
              {copy.clear}
            </button>
          </footer>
        </section>
      )}
    </div>
  );
}
