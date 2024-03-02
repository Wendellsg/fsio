
export const DashboardBadge: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number;
}> = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex gap-2 items-center">
        <div className="rounded-full p-4 bg-accent items-center justify-center">
          {icon}
        </div>

        <h2 className="font-bold text-5xl">{value}</h2>
      </div>
      <p className="text-xs font-bold">{title}</p>
    </div>
  );
};
