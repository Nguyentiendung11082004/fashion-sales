/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import React, {
    createContext,
    ReactNode,
    useContext,
    useState
} from "react";
import { useAuth } from "../Auth/AuthContext";
interface UserContextType {
  user: any;
  loading: boolean;
  error: string | null;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: user, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await instance.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token,
  });
  if (isFetching) return <div></div>;

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {/* { 
            isFetching ? <Loading /> : children
            } */}
      {children}
    </UserContext.Provider>
  );
};
