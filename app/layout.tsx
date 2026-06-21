import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eurekadharan.edu.np"),
  title: {
    default: "Eureka Residential Secondary School | Dharan - Best School & 10+2 College",
    template: "%s | Eureka Residential Secondary School"
  },
  description:
    "Eureka Residential Secondary School (estd. 1994) is recognized as the best school and 10+2 college in Dharan. Offering Montessori, Primary, Basic, Secondary, and advanced Higher Secondary (+2) Science, Management, and Computer Science programs with modern infrastructure, practical labs, and holistic character development.",
  keywords: [
    "best school in dharan",
    "best college in dharan",
    "best 10+2 college in dharan",
    "top school in dharan",
    "top college in dharan",
    "eureka school dharan",
    "eureka residential secondary school",
    "best plus two college in dharan",
    "science college in dharan",
    "management college in dharan",
    "computer science college in dharan",
    "montessori school in dharan",
    "schools in dharan",
    "colleges in dharan",
    "eureka dharan"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eurekadharan.edu.np",
    siteName: "Eureka Residential Secondary School",
    title: "Eureka Residential Secondary School | Best School & 10+2 College in Dharan",
    description: "Discover why Eureka is the best school and 10+2 college in Dharan. Explore Montessori, Secondary, and +2 Science, Management & Computer Science streams.",
    images: [
      {
        url: "/images/school building.jpg",
        width: 1200,
        height: 630,
        alt: "Eureka Residential Secondary School Building & Campus"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Eureka Residential Secondary School | Best School & 10+2 College in Dharan",
    description: "Discover why Eureka is the best school and 10+2 college in Dharan. Explore Montessori, Secondary, and +2 Science, Management & Computer Science streams.",
    images: ["/images/school building.jpg"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    "name": "Eureka Residential Secondary School",
    "alternateName": "Eureka School Dharan",
    "url": "https://eurekadharan.edu.np",
    "logo": "https://eurekadharan.edu.np/images/logo.png",
    "image": "https://eurekadharan.edu.np/images/school%20building.jpg",
    "description": "Eureka Residential Secondary School is the premier educational institution in Dharan, Koshi Province, Nepal. Established in 1994 A.D. (2050 B.S.), Eureka offers activity-based, student-centric Montessori, Primary, Basic, Secondary, and Higher Secondary (10+2) programs in Science, Management, and Computer Science streams.",
    "telephone": "+977-25-535533",
    "email": "eurekadharan@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dharan-1, Laxmi Sadak",
      "addressLocality": "Dharan",
      "addressRegion": "Koshi Province",
      "postalCode": "56700",
      "addressCountry": "NP"
    },
    "sameAs": [
      "https://www.facebook.com/eurekadharan"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
