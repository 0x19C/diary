export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="border border-green-default p-5 min-w-[700px]">
        {children}
      </div>
    </div>
  );
}
