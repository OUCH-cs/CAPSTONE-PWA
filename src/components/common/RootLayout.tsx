export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[360px] h-screen my-0 mx-auto bg-background">
      {children}
    </div>
  );
}
