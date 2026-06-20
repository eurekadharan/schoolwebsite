declare module "lucide-react" {
  import type { SVGProps } from "react";

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  };

  export type LucideIcon = (props: LucideProps) => JSX.Element;

  export const ArrowUp: LucideIcon;
  export const Award: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Camera: LucideIcon;
  export const CalendarDays: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const CirclePlus: LucideIcon;
  export const FileText: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const Home: LucideIcon;
  export const Image: LucideIcon;
  export const MapPin: LucideIcon;
  export const Medal: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const Microscope: LucideIcon;
  export const Newspaper: LucideIcon;
  export const Phone: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Trophy: LucideIcon;
  export const Users: LucideIcon;
  export const X: LucideIcon;
}
