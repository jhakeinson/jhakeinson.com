"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase"; // Path to your Firebase config
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, userTokenAtom } from "@/lib/stores/store";

type ClientComponentProps = {
  children: React.ReactNode;
};

const AuthChecker: React.FC<ClientComponentProps> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [userToken, setUserToken] = useAtom(userTokenAtom);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          verified: currentUser.emailVerified,
        });

        setUserToken(currentUser.uid);
      } else {
        setUser(null);
        setUserToken(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export default AuthChecker;
