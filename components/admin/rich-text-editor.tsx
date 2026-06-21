"use client";

import React, { useState, useRef, useEffect } from "react";

interface RichTextEditorProps {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  rows?: number;
}

// Simple custom Markdown-to-HTML helper for live preview
function parseMarkdown(md: string): string {
  if (!md) return "";
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headers
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

  // Code blocks
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--teal-strong); text-decoration: underline;">$1</a>');

  // Bullet Lists
  html = html.replace(/^\s*[-*+]\s+(.+)$/gm, "<li>$1</li>");
  // Wrap list items in <ul>
  html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

  // Paragraphs
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<li>")
      ) {
        return trimmed;
      }
      return `<p style="margin-bottom: 1rem; line-height: 1.6; color: #4a5568;">${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}

export function RichTextEditor({
  name,
  placeholder = "Write content here...",
  defaultValue = "",
  rows = 8
}: RichTextEditorProps) {
  const [text, setText] = useState(defaultValue);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (defaultValue !== undefined) {
      setText(defaultValue);
    }
  }, [defaultValue]);

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    const replacement = before + (selection || "text") + after;

    const newText =
      textarea.value.substring(0, start) +
      replacement +
      textarea.value.substring(end);

    setText(newText);
    
    // Return focus and select inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + (selection || "text").length
      );
    }, 0);
  };

  return (
    <div className="border border-slate-200 rounded-md overflow-hidden bg-slate-50">
      {/* Toolbar */}
      <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertText("**", "**")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 font-bold text-xs shrink-0"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertText("*", "*")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 italic text-xs shrink-0"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => insertText("# ", "")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 text-xs font-black shrink-0"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertText("## ", "")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 text-xs font-bold shrink-0"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertText("- ", "")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 text-xs shrink-0"
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => insertText("[", "](url)")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 text-xs shrink-0"
            title="Link"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => insertText("> ", "")}
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 text-xs shrink-0"
            title="Quote"
          >
            &ldquo; Quote
          </button>
        </div>

        {/* Tabs switcher */}
        <div className="flex bg-slate-200 p-0.5 rounded-md text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-2.5 py-1 rounded-sm font-semibold transition ${
              activeTab === "edit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 rounded-sm font-semibold transition ${
              activeTab === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        {activeTab === "edit" ? (
          <textarea
            ref={textareaRef}
            name={name}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-4 py-3 outline-none resize-y text-slate-800 text-sm border-0 focus:ring-0 placeholder:text-slate-400"
          />
        ) : (
          <div
            className="px-4 py-3 min-h-[160px] overflow-y-auto text-sm text-slate-800 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(text) || '<p class="text-slate-400 italic">Nothing to preview</p>' }}
          />
        )}
      </div>
    </div>
  );
}
