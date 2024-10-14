import { SigninForm } from "@/components/signInForm";

export default function SingInRoute() {
  return (  
    <main
      className="w-full flex min-h-screen bg-cover bg-center"
      style={{ 
          backgroundImage: `url('/background/action1.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center' 
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-between mt-48"><SigninForm /></div>
    </main>
    
  );
}