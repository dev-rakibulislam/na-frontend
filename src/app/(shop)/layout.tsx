import AnnouncementBar from "@/components/layout/public/anouncment-bar";
import Header from "@/components/layout/public/header";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      {children}
    </>
  );
}
