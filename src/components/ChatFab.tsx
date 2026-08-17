import Link from "next/link";

export default function ChatFab() {
  return (
    <Link
      href="/info/contact"
      className="chat-fab fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-[var(--brand-blue)] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[var(--brand-blue-mid)] transition-colors"
      aria-label="Contact support"
    >
      <ChatIcon />
      Chat
    </Link>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18.5V7.75C5 6.23 6.23 5 7.75 5h8.5C17.77 5 19 6.23 19 7.75v6C19 15.27 17.77 16.5 16.25 16.5H9.2L5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5h6M9 12.5h4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
