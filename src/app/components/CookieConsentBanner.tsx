import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCookie } from "react-icons/gi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CookieConsentBannerProps {
  onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAccept,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const hasResponded = localStorage.getItem("cookieConsent");
    if (!hasResponded) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    onAccept();
    hideBanner();
    localStorage.setItem("cookieConsent", "accepted");
    toast.success("Preferences saved!", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleDecline = () => {
    hideBanner();
    localStorage.setItem("cookieConsent", "declined");
  };

  const hideBanner = () => {
    setIsHiding(true);
    setTimeout(() => setIsVisible(false), 500);
  };

  if (!isVisible) return null;

  return (
    <>
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogContent className="border-2 border-daffodilYellow fixed z-[100000000]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GiCookie className="text-blue-600 text-xl sm:text-2xl" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                We use cookies to enhance your experience. By accepting, you agree to our use of:
                <ul className="list-disc list-inside mt-2">
                  <li>Essential site functions</li>
                  <li>Personalized content</li>
                  <li>Analytics and improvements</li>
                </ul>
              </p>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed mt-4">
                <a
                  href="/cookie-settings"
                  className="text-charcoalGray hover:text-daffodilYellow underline"
                >
                  Customize settings
                </a>
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDecline} variant="outline">
              Decline
            </Button>
            <Button
              className="bg-daffodilYellow text-charcoalGray hover:bg-daffodilYellow/90"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default CookieConsentBanner;