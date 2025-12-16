import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex relative min-h-screen w-full max-w-[1440px] mx-auto flex-col items-center justify-between pb-10 px-2 lg:px-16 bg-white dark:bg-black sm:items-start">
        {children}
      </main>
    </div>
  );
}
