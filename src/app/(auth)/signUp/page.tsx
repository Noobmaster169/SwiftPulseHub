import { SignupForm } from "@/components/signUpForm";

export default function SingUoRoute() {
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
      <div className="flex-1 flex flex-col items-center justify-between mt-36"><SignupForm /></div>
    </main>
  );
}