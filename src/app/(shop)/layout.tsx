import AnnouncementBar from "@/components/public/anouncment-bar";
import Header from "@/components/public/header";

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
