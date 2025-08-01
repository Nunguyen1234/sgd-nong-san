// src/hooks/useNotifications.ts
import { useQuery } from "@tanstack/react-query";
import apiAxios, { BASE_URL_API } from "@/app/api/axiosConfig";

export type NotificationType = "info" | "warning" | "system";

export type NotificationItem = {
  id: number;
  type: NotificationType;
  message: string;
  createdAt: string;
};

const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const token = localStorage.getItem("access_token");

  const res = await apiAxios.get<{ data: NotificationItem[] }>(
    `${BASE_URL_API}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 30000,
    staleTime: 30000,
  });
};
