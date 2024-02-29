import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session: Session | null;
    profile: any;
    isAdmin: boolean;
    loading: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    isAdmin: false,
    loading: true
});

export default function AuthProvider({children} : PropsWithChildren){
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: {session} } = await supabase.auth.getSession();
            setSession(session);

            if(session){
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }

            setLoading(false);
        };

        fetchSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    console.log(profile);

    return(
        <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group === "ADMIN"}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);