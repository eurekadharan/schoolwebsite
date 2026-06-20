import Link from "next/link";
import Image from "next/image";
import { getAchievements } from "@/lib/achievements-store";
import { adminDeleteAchievement } from "./actions";

const TrophyIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a7 7 0 0 0-7 7v3.78a6 6 0 0 0 3.65 5.54l1 .44a2 2 0 0 0 1.7 0l1-.44A6 6 0 0 0 19 12.78V9a7 7 0 0 0-7-7z" />
  </svg>
);

const CalendarIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export const revalidate = 0; // Fresh list always

export default async function AdminAchievementsPage() {
  const achievements = await getAchievements(true); // include drafts

  return (
    <>
      <div className="admin-topbar flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow text-xs uppercase text-slate-400 font-bold tracking-wider">Module</span>
          <h1 className="text-3xl font-black text-[#10233f]">Achievements Management</h1>
          <p className="text-slate-500 text-sm mt-1">Add, update, or remove student achievements, toppers, and awards.</p>
        </div>
        <Link className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#ff7b3b] px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-[#3eaea6] transition" href="/admin/achievements/new">
          <PlusIcon /> New Achievement
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {achievements.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <TrophyIcon className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="font-bold text-lg text-slate-700">No Achievements Discovered</p>
            <p className="text-sm text-slate-500 mt-1">Get started by creating your very first achievement record.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-500">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Student</th>
                  <th scope="col" className="px-6 py-4">Batch</th>
                  <th scope="col" className="px-6 py-4">Success Details</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                {achievements.map((item) => {
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded bg-slate-50 border overflow-hidden flex items-center justify-center shrink-0">
                          <Image src={item.cover_image} alt="" fill sizes="40px" className="object-contain" />
                        </div>
                        <div>
                          <div className="font-bold text-[#10233f] text-base">{item.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="text-xs font-semibold text-[#10233f] bg-slate-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="text-sm font-semibold text-[#3eaea6]">{item.summary}</div>
                        <div className="text-xs text-slate-400 mt-1 max-w-[280px] truncate">{item.body}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${
                          item.status === "published"
                            ? "bg-green-50 text-green-700"
                            : item.status === "draft"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2.5">
                          <Link
                            href={`/admin/achievements/${item.id}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-[#3eaea6] hover:text-white hover:border-transparent transition"
                            title="Edit Achievement"
                          >
                            <EditIcon />
                          </Link>
                          <form
                            action={async () => {
                              "use server";
                              await adminDeleteAchievement(item.id);
                            }}
                          >
                            <button
                              type="submit"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-[#b42318] hover:bg-[#b42318] hover:text-white hover:border-transparent transition"
                              title="Delete Achievement"
                              onClick={(e) => {
                                if (!confirm("Are you sure you want to delete this achievement? This action is permanent.")) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <TrashIcon />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
