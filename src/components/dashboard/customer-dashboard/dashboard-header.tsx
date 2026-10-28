import { content } from "@/config";

type DashboardHeaderProps = {
  userName: string;
};

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight  sm:text-3xl">
        {content.common.wellbak}, {userName}.
      </h1>
      <p className="mt-2 text-sm leading-6 text-neutral-500">
        {content.common.wellbakdesc}
      </p>
    </div>
  );
}
