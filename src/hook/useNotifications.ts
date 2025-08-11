// src/hooks/useNotifications.ts
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import apiAxios, { BASE_URL_API } from "src/app/api/axiosConfig";

export type NotificationType = "info" | "warning" | "system";

export type NotificationItem = {
  id: number;
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead?: boolean;
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
    select: (data) =>
      [...data].sort(
        (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
      ),
    refetchInterval: 30000,

    staleTime: 30000,
  });
};
