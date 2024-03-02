
export function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-h-[100dvh] min-h-[100dvh] h-[100dvh]  mx-auto bg-white shadow-md overflow-hidden flex flex-col-reverse items-end justify-between md:max-w-[90vw] md:max-h-[90vh] md:min-h-[90vh] md:h-[90vh]  md:w-[90vw] md:min-w-[90vw] md:flex-row m-auto md:rounded-lg md:my-[4vh]">
      {children}
    </div>
  );
}

export function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start justify-start h-full min-h-fit w-full max-w-full overflow-y-auto md:p-12 md:w-full md:h-full md:min-h-full scrollbar-hide">
     {children}
  </div>
  );
}