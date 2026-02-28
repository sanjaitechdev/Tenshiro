import { createContext, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const { t, i18n } = useTranslation();
    const { user } = useAuth() || {};
    const [language, setLanguageState] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        // Sync state with i18next
        if (i18n.language !== language) {
            i18n.changeLanguage(language);
        }
        localStorage.setItem('language', language);

        // Sync with backend if logged in
        if (user) {
            axios.put('/api/auth/update-language', { language })
                .catch(err => console.error('Failed to sync language with profile', err));
        }
    }, [language, i18n, user]);

    const setLanguage = (newLang) => {
        setLanguageState(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
