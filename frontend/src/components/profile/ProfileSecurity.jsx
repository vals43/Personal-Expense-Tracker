import { useState, useEffect } from "react";
import { Laptop, Shield, Key, Pencil, X, Globe, Clock, CheckCircle } from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ProfileSecurity() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    brand: "Inconnue",
    model: "Inconnu",
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set up the interval to update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (navigator.userAgentData) {
      const { brands, platform } = navigator.userAgentData;
      let brandName = "Inconnue";
      const browserBrand = brands[2];
      console.log(browserBrand);
      
      if (browserBrand) {
        brandName = browserBrand.brand;
      }

      navigator.userAgentData
        .getHighEntropyValues(["model"])
        .then((ua) => {
          setDeviceInfo({
            brand: brandName,
            model: ua.model || platform,
          });
        })
        .catch(() => {
          setDeviceInfo({
            brand: brandName,
            model: platform,
          });
        });
    } else {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Windows")) {
        setDeviceInfo({ brand: "Microsoft", model: "PC Windows" });
      } else if (userAgent.includes("Mac")) {
        setDeviceInfo({ brand: "Apple", model: "Mac" });
      } else {
        setDeviceInfo({ brand: "Inconnue", model: "Appareil Inconnu" });
      }
    }
  }, []);

  const formattedDate = currentTime.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white border-l-4 border-b-4 dark:border-dark-border dark:bg-dark-card p-6 rounded-xl shadow-sm mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield size={18} className="text-blue-600 dark:text-blue-400" />
        <h3 className="font-medium">Sécurité</h3>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Key size={18} className="text-gray-500 dark:text-gray-400" />
              <label className="block font-medium">Changer le mot de passe</label>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm hover:text-blue-700 dark:hover:text-blue-300"
            >
              {showChangePassword ? (
                <>
                  <X size={16} />
                  Fermer
                </>
              ) : (
                <>
                  <Pencil size={16} />
                  Changer
                </>
              )}
            </button>
          </div>
          {showChangePassword && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
            </div>
          )}
        </div>
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Laptop size={18} className="text-gray-500 dark:text-gray-400" />
              <label className="block font-medium">Sessions actives</label>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-dark-border p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 px-6">
                <div>
                  <p className="text-sm font-medium">Session actuelle</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Globe size={14} />
                    <span>{deviceInfo.brand} ({deviceInfo.model})</span>
                    <Clock size={14} />
                    <span>{formattedDate} à {formattedTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-700 dark:text-green-400" />
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}