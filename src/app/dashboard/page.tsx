"use client";
import HorizontalNavBar from "@/components/HorizontalNavBar";
import ThemeSelector from "@/components/ThemeSelector";
import PopUp from "@/components/PopUp";
import { useTheme } from "@/components/ThemeContext";
import {useState} from 'react';

export default function Dashborad(){
    const { currentTheme, setCurrentTheme } = useTheme();
    const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState<boolean>(false);

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
            <div>Empty</div>

            <PopUp isOpen={isThemeSelectorOpen} setIsOpen={setIsThemeSelectorOpen}>
                <ThemeSelector 
                    setIsOpen={setIsThemeSelectorOpen} 
                    onThemeChange={handleThemeChange}
                />
            </PopUp>
        </main>
    </>)
}