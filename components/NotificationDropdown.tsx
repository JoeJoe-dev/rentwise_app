"use client";

import { useState } from "react";

interface Notification {
  id: string;
  type: "message" | "chat" | "login";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "login",
    title: "Login Alert",
    message: "You logged in from a new device",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "Maintenance Update",
    message: "Your repair request has been assigned",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "chat",
    title: "New Message",
    message: "Landlord sent you a message",
    time: "3 days ago",
    read: true,
  },
];

export function NotificationDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-black dark:text-white">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    {notification.type === "login" ? "login" :
                     notification.type === "message" ? "message" : "chat"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white truncate">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="w-full text-center text-primary text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}