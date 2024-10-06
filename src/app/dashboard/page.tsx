"use client";
import HorizontalNavBar from "@/components/HorizontalNavBar";
import ThemeSelector from "@/components/ThemeSelector";
import PopUp from "@/components/PopUp";
import { useTheme } from "@/components/ThemeContext";
import {useState} from 'react';
import LoginPage from "@/components/LoginPage";
import AdminTeamBoard from "@/components/AdminTeamBoard";
import UserTeamBoard from "@/components/UserTeamBoard";

export default function Dashborad(){
    const { currentTheme, setCurrentTheme } = useTheme();
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState<boolean>(false);
    const [isAdminLogin, setIsAdminLogin] = useState<boolean>(false);
    const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

    const handleThemeChange = (newTheme: string) => {
        setCurrentTheme(newTheme);
    };

    return(<>
        <HorizontalNavBar setThemeSelectorOpen={setIsThemeSelectorOpen} />
        <main
            className="w-full flex min-h-screen bg-cover bg-center"
            style={{ 
            backgroundImage: `url('${currentTheme}')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center' }}
        >   
            
            <div className="flex-1 flex flex-col items-center justify-between p-4 ml-64">
                <div className="w-full mt-12">
                    {isAdminLogin? <AdminTeamBoard/>: isUserLogin ? <UserTeamBoard/> : <LoginPage setAdminLogin={setIsAdminLogin} setUserLogin={setIsUserLogin}/> }
                </div>
            </div>
                

            <PopUp isOpen={isThemeSelectorOpen} setIsOpen={setIsThemeSelectorOpen}>
                <ThemeSelector 
                    setIsOpen={setIsThemeSelectorOpen} 
                    onThemeChange={handleThemeChange}
                />
            </PopUp>
        </main>
    </>)
}