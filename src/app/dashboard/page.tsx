"use client";
import HorizontalNavBar from "@/components/HorizontalNavBar";
import ThemeSelector from "@/components/ThemeSelector";
import { useTheme } from "@/components/ThemeContext";
import { useState } from 'react';
import WelcomePage from "@/components/WelcomePage";
import AdminTeamBoard from "@/components/AdminTeamBoard";
import UserTeamBoard from "@/components/UserTeamBoard";
import NavBar from "@/components/NavigatorBar";

export default function Dashboard() {
    const { currentTheme, setCurrentTheme } = useTheme();
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState<boolean>(false);
    const [isAdminLogin, setIsAdminLogin] = useState<boolean>(false);
    const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

    const handleThemeChange = (newTheme: string) => {
        setCurrentTheme(newTheme);
        setIsThemeSelectorOpen(false);
    };

    return (
        <>
            <HorizontalNavBar setThemeSelectorOpen={setIsThemeSelectorOpen} />
            <main
                className="w-full flex min-h-screen bg-cover bg-center"
                style={{ 
                    backgroundImage: `url('${currentTheme}')`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center' 
                }}
            >   
                <NavBar/>
                <div className="flex-1 flex flex-col items-center justify-between p-4 ml-64">
                    <div className="w-full mt-12">
                        {isAdminLogin ? <AdminTeamBoard /> : isUserLogin ? <UserTeamBoard setIsUserLogin={setIsUserLogin} /> : <WelcomePage setAdminLogin={setIsAdminLogin} setUserLogin={setIsUserLogin} />}
                    </div>
                </div>
                
                {isThemeSelectorOpen && (
                    <ThemeSelector 
                        onThemeChange={handleThemeChange}
                        onClose={() => setIsThemeSelectorOpen(false)}
                    />
                )}
            </main>
        </>
    );
}