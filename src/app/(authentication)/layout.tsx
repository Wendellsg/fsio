
export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-center bg-cover bg-[url('https://fisio-app.s3.sa-east-1.amazonaws.com/images/pexels-ryutaro-tsukata-5473186.jpg')]">
     
      {children}
    </main>
  );
}
