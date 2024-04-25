import { createContext,  useEffect, useState } from "react";

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(localStorage.getItem("theme") === "1" ? 'dark' : '');
    const [isDark,setDark] = useState(localStorage.getItem("theme") === "1")

    const toggleDark = () => {
        if(darkTheme === 'dark') {
            localStorage.removeItem("theme");
            setDarkTheme('');
            
        } else {
            localStorage.setItem("theme", "1");
            setDarkTheme('dark');
        }
    };

    useEffect(()=>{
        if(isDark){
            document.querySelector('html').classList.add('dark')
            document.querySelector('body').classList.add('dark')
        }
    },[])

    const value = {darkTheme, toggleDark,isDark};

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;

