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

// Define the type for the `onAccept` prop
interface CookieConsentBannerProps {
  onAccept: () => void; // `onAccept` is a function that takes no arguments and returns nothing
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAccept,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  // Check if the user has already accepted or declined cookies
  useEffect(() => {
    const hasResponded = localStorage.getItem("cookieConsent");
    if (!hasResponded) {
      setIsVisible(true); // Show the banner if the user hasn't responded yet
    }
  }, []);

  const handleAccept = () => {
    onAccept(); // Save preferences
    hideBanner();
    localStorage.setItem("cookieConsent", "accepted"); // Save acceptance
    toast.success("Cookie preferences saved successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleDecline = () => {
    hideBanner();
    localStorage.setItem("cookieConsent", "declined"); // Save decline
  };

  const hideBanner = () => {
    setIsHiding(true); // Start the hide animation
    setTimeout(() => {
      setIsVisible(false); // Hide the banner after the animation completes
    }, 500); // Match the duration of the slideDown animation
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Modern Cookie Consent Banner with CSS Animation */}
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogContent className="border-2 border-daffodilYellow fixed z-[100000000]">
          {" "}
          {/* Fixed z-index */}
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GiCookie className="text-blue-600 text-xl sm:text-2xl" />
              Cookie Consent
            </DialogTitle>
            <DialogDescription>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                We store and access personal data, like browsing data or unique
                identifiers, on your device. Selecting Accept all enables
                tracking technologies to support the purposes shown under we and
                our partners process data to provide. Selecting Reject all or
                withdrawing your consent will disable them. If trackers are
                disabled, some content and ads you see may not be as relevant to
                you. You can resurface this menu to change your choices or
                withdraw consent at any time by clicking the Cookies link on the
                bottom of the webpage. Your choices will have effect within our
                Website. For more details, refer to our Privacy Policy.
              </p>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed mt-4">
                We process data to provide:
                <ul className="list-disc list-inside mt-2">
                  <li>Use precise geolocation data.</li>
                  <li>
                    Actively scan device characteristics for identification.
                  </li>
                  <li>Store and/or access information on a device.</li>
                  <li>
                    Personalised advertising and content, advertising and
                    content measurement, audience research and services
                    development.
                  </li>
                </ul>
              </p>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed mt-4">
                <a
                  href="/cookie-settings"
                  className="text-charcoalGray hover:text-daffodilYellow underline transition-colors"
                >
                  Manage settings
                </a>
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="" onClick={handleDecline} variant="outline">
              Decline all
            </Button>
            <Button
              className="bg-daffodilYellow text-charcoalGray hover:bg-daffodilYellow/90"
              onClick={handleAccept}
            >
              Accept all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default CookieConsentBanner;
