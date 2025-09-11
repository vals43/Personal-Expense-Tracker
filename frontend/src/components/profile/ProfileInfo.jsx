import { PencilIcon, User, Mail, Calendar, Info } from "lucide-react";
import Input from "../ui/Input";
import { useJsonUser } from "../../api/user/useJsonUser";
import Button from "../ui/Button";

export default function ProfileInfo() {
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Info size={18} className="text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium">Personal Information</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">First Name</label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <Input
              type="text"
              value={user.firstName || ""}
              readOnly
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Name</label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <Input
              type="text"
              value={user.lastName || ""}
              readOnly
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email Address</label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <Input
              type="email"
              value={user.email || ""}
              readOnly
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Member Since</label>
          <div className="relative">
            <Calendar
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <Input
              type="text"
              value={user.createdAt ? user.createdAt.split("T")[0] : ""}
              readOnly
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}