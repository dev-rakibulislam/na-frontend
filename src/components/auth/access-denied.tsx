import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";

export default function AccessDenied() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      {/* Top Blue Section with Responsive Image */}
      <div className="w-full h-1/2 min-h-[300px] md:min-h-[400px] bg-[#EBEBF3] flex justify-center items-end p-4">
        <div className="relative w-full max-w-sm h-64 md:h-80 flex justify-center items-end">
          <Image
            src="/access-denied.gif"
            alt="Access Denied Illustration"
            fill
            className="object-contain object-bottom"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Bottom White Section */}
      <div className="w-full h-1/2 flex flex-col items-center justify-start pt-8 pb-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
          Access denied
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md">
          You don't have permission to access this page
        </p>
        <Button variant={"destructive"}>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
