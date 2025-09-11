import { Calendar, Camera, Mail, PhoneIcon, User, IdCard } from "lucide-react";
import { useJsonUser } from "./../../api/user/useJsonUser";

export default function ProfileCard() {
  const user = useJsonUser();

  if (!user) {
    return (
      <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm text-center">
        <p className="text-gray-500">Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-l-4 border-b-4 dark:border-dark-border dark:bg-dark-card p-6 rounded-xl shadow-sm">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl relative">
            {user.firstName?.[0]?.toUpperCase() || "U"}
            <User
              size={24}
              className="absolute bottom-0 right-0 bg-white dark:bg-dark-card text-blue-600 dark:text-blue-400 rounded-full p-1 border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-500 dark:text-gray-400" />
          <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <IdCard size={18} className="text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500">Member</p>
        </div>
        <div className="w-full border-t pt-4 mt-2">
          {user.email && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
              <Mail size={18} className="text-gray-500 dark:text-gray-400" />
              <span>{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <PhoneIcon size={18} className="text-gray-500 dark:text-gray-400" />
              <span>{user.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}