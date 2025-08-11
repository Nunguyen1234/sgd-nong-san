"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
import apiAxios, { BASE_URL_API } from "src/app/api/axiosConfig";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Chào bạn! Mình có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");

  const [user, setUser] = useState<{
    userName: string;
    avatar: string | null;
  }>({
    userName: "Người dùng",
    avatar: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lấy thông tin user theo userId
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");
      if (!userId || !token) return;

      try {
        const response = await apiAxios.get(`/user/${userId}`);
        const userData = response.data?.data;

        let avatarPath = null;
        if (Array.isArray(userData.avatar) && userData.avatar.length > 0) {
          avatarPath = userData.avatar[0];
        } else if (typeof userData.avatar === "string") {
          avatarPath = userData.avatar;
        }

        const fullAvatarUrl =
          avatarPath && !avatarPath.startsWith("http")
            ? `${BASE_URL_API}/${avatarPath}`
            : avatarPath;

        setUser({
          userName: userData.userName || "Người dùng",
          avatar: fullAvatarUrl || null,
        });
      } catch (error) {
        console.error("Lỗi khi lấy hồ sơ:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: input }]);

    // Phản hồi giả lập của bot
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `Có phải ý của bạn là: "${input}"` },
      ]);
    }, 1000);

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Toggle Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-110 transition-all duration-300 text-white p-4 rounded-full shadow-xl animate-bounce"
        aria-label="Mở chat"
      >
        <ChatIcon fontSize="medium" />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 border-b-blue-200 z-50 w-80 h-[500px] bg-white rounded-2xl shadow-2xl  flex flex-col animate-slide-up"
          style={{
            animation: "slideUp 0.3s ease-out,glow 2s infinite ease-in-out",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  {user.userName.charAt(0)}
                </div>
              )}
              <span className="font-semibold">{user.userName}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:text-red-500 p-1 rounded-full transition-all duration-200"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-100 space-y-3">
            {messages.map((msg, idx) => {
              const isUser = msg.from === "user";
              const avatarUrl = isUser ? user.avatar : "/bot-avatar.png"; // ảnh avatar bot (thay đường dẫn nếu cần)

              return (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar bên trái nếu là bot */}
                  {!isUser && (
                    <Image
                      src={avatarUrl ?? "/default-avatar.png"}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border"
                    />
                  )}

                  {/* Bong bóng tin nhắn */}
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md ${
                      isUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Avatar bên phải nếu là user */}
                  {isUser && (
                    <Image
                      src={avatarUrl || "/default-avatar.png"}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover border"
                    />
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t-0 flex items-center gap-2 bg-white shadow-[0_-2px_8px_rgba(59,130,246,0.3)]">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 h-10 px-4 rounded-full bg-white text-black border border-gray-300 shadow-sm transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-200 shadow hover:scale-105"
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-in-out;
        }
        @keyframes glow {
          0% {
            box-shadow:
              0 0 10px rgba(59, 130, 246, 0.6),
              0 0 20px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow:
              0 0 20px rgba(59, 130, 246, 0.8),
              0 0 40px rgba(59, 130, 246, 0.6);
          }
          100% {
            box-shadow:
              0 0 10px rgba(59, 130, 246, 0.6),
              0 0 20px rgba(59, 130, 246, 0.4);
          }
        }
      `}</style>
    </>
  );
}
