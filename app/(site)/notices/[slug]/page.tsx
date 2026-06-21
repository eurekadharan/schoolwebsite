import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/posts-store";
import SafeImage from "@/components/safe-image";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? `${post.title} | Eureka` : "School Notice"
  };
}

// Simple custom Markdown-to-HTML helper for server-side rendering
function renderMarkdown(md: string): string {
  if (!md) return "";
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headers
  html = html.replace(/^##\s+(.+)$/gm, "<h2 class='text-xl font-bold text-[#10233f] mt-6 mb-3'>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1 class='text-2xl font-extrabold text-[#10233f] mt-8 mb-4'>$1</h1>");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, "<blockquote class='border-l-4 border-[#3eaea6] pl-4 italic text-slate-500 my-4'>$1</blockquote>");

  // Code
  html = html.replace(/`([^`]+)`/g, "<code class='bg-slate-100 rounded px-1 text-xs font-mono'>$1</code>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#3eaea6] underline">$1</a>');

  // Bullet Lists
  html = html.replace(/^\s*[-*+]\s+(.+)$/gm, "<li class='list-disc ml-5 mb-1.5'>$1</li>");
  // Wrap list items in <ul>
  html = html.replace(/(<li class='list-disc ml-5 mb-1.5'>.*<\/li>)/gs, "<ul class='my-4'>$1</ul>");

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
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="mb-4 leading-relaxed text-slate-700 text-sm md:text-base">${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}

export default async function NoticeDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.type !== "notice") notFound();

  // Fetch sidebar recent notices (excluding current)
  const allNotices = await getPosts("notice", false);
  const recentNotices = allNotices.filter((n) => n.slug !== slug).slice(0, 4);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    : "Recent";

  return (
    <>
      {/* Notice Header Banner */}
      <section className="relative isolate flex min-h-[250px] items-center overflow-hidden bg-[#10233f] text-white">
        <div className="mx-auto w-full max-w-[1140px] px-4 py-8">
          <div className="max-w-[840px]">
            <Link
              href="/notices"
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3eaea6] transition hover:text-[#ff7b3b]"
            >
              &larr; Back to Notices
            </Link>
            <h1 className="text-balance text-[clamp(24px,4vw,38px)] font-black leading-tight text-white mt-2">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
              <span className="bg-white/10 px-3 py-1 rounded">
                Published on {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="bg-slate-50 py-[60px] max-md:py-12">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="grid grid-cols-[1.4fr_.8fr] gap-10 max-lg:grid-cols-1">
            {/* Left Column: Description & Metadata details */}
            <div className="grid gap-6">
              <article className="rounded-lg bg-white p-8 shadow-sm border border-slate-100">
                {post.cover_image && post.cover_image !== "/images/school details.jpg" && (
                  <div className="mb-6 rounded overflow-hidden max-h-[400px] flex items-center justify-center bg-slate-50 border border-slate-100">
                    <SafeImage
                      src={post.cover_image}
                      alt={post.title}
                      className="object-contain max-h-[400px] w-auto"
                    />
                  </div>
                )}

                {post.excerpt && (
                  <p className="text-sm font-semibold text-slate-500 italic border-l-2 border-[#ff7b3b] pl-4 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Notice content body */}
                <div 
                  className="prose max-w-none text-slate-700"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
                />
              </article>
            </div>

            {/* Right Column: Sidebar recommendations */}
            <div className="grid gap-6 content-start">
              {/* Other Notices list */}
              {recentNotices.length > 0 && (
                <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                  <h4 className="text-sm font-bold text-[#10233f] mb-4">Recent Notices</h4>
                  <div className="grid gap-4">
                    {recentNotices.map((rn) => {
                      const rnDateStr = rn.published_at
                        ? new Date(rn.published_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                        : "Recent";
                      return (
                        <Link
                          href={`/notices/${rn.slug}`}
                          key={rn.id}
                          className="group block border-b pb-3 last:border-b-0 last:pb-0"
                        >
                          <h5 className="text-xs font-bold text-slate-800 transition group-hover:text-[#3eaea6] leading-snug line-clamp-2">
                            {rn.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                            {rnDateStr}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
