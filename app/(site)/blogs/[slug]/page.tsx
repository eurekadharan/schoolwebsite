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
    title: post ? `${post.title} | Eureka` : "School Blog"
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

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.type !== "blog") notFound();

  // Fetch sidebar recent blogs (excluding current)
  const allBlogs = await getPosts("blog", false);
  const recentBlogs = allBlogs.filter((b) => b.slug !== slug).slice(0, 4);

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
      {/* Blog Header Banner */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden text-white">
        <div className="absolute inset-0 -z-20">
          <SafeImage
            src={post.cover_image}
            alt={post.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10233f]/95 via-[#10233f]/75 to-[#10233f]/40" />
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="max-w-[840px]">
            <Link
              href="/blogs"
              className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3eaea6] transition hover:text-[#ff7b3b]"
            >
              &larr; Back to Blogs
            </Link>
            <h1 className="text-balance text-[clamp(28px,4.5vw,44px)] font-black leading-tight text-white mt-2">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
              <span className="bg-white/10 px-3 py-1 rounded">
                Published on {formattedDate}
              </span>
              {post.homepage_order != null && (
                <span className="bg-[#ff7b3b] text-white px-3 py-1 rounded">
                  Featured Article
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="bg-slate-50 py-[75px] max-md:py-14">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="grid grid-cols-[1.4fr_.8fr] gap-10 max-lg:grid-cols-1">
            {/* Left Column: Description & Metadata details */}
            <div className="grid gap-6">
              <article className="rounded-lg bg-white p-8 shadow-sm border border-slate-100">
                {post.excerpt && (
                  <p className="text-sm font-semibold text-slate-500 italic border-l-2 border-[#ff7b3b] pl-4 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Blog content body */}
                <div 
                  className="prose max-w-none text-slate-700"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
                />
              </article>

              {/* Internal CTA Banner */}
              <article className="rounded-lg bg-gradient-to-r from-[#3eaea6] to-[#258a83] p-8 text-white shadow-md flex items-center justify-between gap-6 max-md:flex-col max-md:text-center max-md:p-6">
                <div>
                  <h3 className="text-lg font-bold">Interested in joining Eureka?</h3>
                  <p className="text-xs text-white/95 mt-1">Enrollment is open for Montessori through Grade 12 streams. Learn about eligibility, documents, and key dates.</p>
                </div>
                <Link
                  href="/admission"
                  className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded bg-[#10233f] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-[#10233f]"
                >
                  Admissions Portal
                </Link>
              </article>
            </div>

            {/* Right Column: Sidebar recommendations */}
            <div className="grid gap-6 content-start">
              {/* Other Blogs list */}
              {recentBlogs.length > 0 && (
                <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                  <h4 className="text-sm font-bold text-[#10233f] mb-4">Recent Articles</h4>
                  <div className="grid gap-4">
                    {recentBlogs.map((rb) => {
                      const rbDateStr = rb.published_at
                        ? new Date(rb.published_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                        : "Recent";
                      return (
                        <Link
                          href={`/blogs/${rb.slug}`}
                          key={rb.id}
                          className="group block border-b pb-3 last:border-b-0 last:pb-0"
                        >
                          <h5 className="text-xs font-bold text-slate-800 transition group-hover:text-[#3eaea6] leading-snug line-clamp-2">
                            {rb.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 font-semibold mt-1 block">
                            {rbDateStr}
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
