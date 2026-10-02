import React from 'react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onClear: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onClear
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm h-full bg-[#f8f9ff] shadow-2xl flex flex-col justify-between border-l border-white/60 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006b2c] text-[22px]">
              notifications_active
            </span>
            <h2 className="font-extrabold text-base text-[#0b1c30]">Grid Alerts &amp; Activity</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200/50 flex items-center justify-between text-xs font-semibold text-gray-600">
          <button onClick={onMarkAllAsRead} className="hover:text-[#006b2c]">
            Mark all read
          </button>
          <button onClick={onClear} className="hover:text-red-600">
            Clear all
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2">notifications_none</span>
              <p className="text-xs">No active alerts right now.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl transition-all border ${
                  notif.read
                    ? 'bg-white/80 border-gray-100 text-gray-600'
                    : 'bg-white border-[#006b2c]/30 shadow-sm text-[#0b1c30]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-bold">{notif.title}</span>
                  <span className="text-[10px] text-gray-400">{notif.timeAgo}</span>
                </div>
                <p className="text-xs text-gray-600 leading-snug">{notif.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white border-t border-gray-100 text-[11px] text-center text-gray-500">
          Connected to Mumbai Central (PS-05) Mesh Radio Grid
        </div>
      </div>
    </div>
  );
};
