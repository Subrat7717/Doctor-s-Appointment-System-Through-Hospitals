import React from "react";
import { MapPin } from "lucide-react";

const FindDirectionButton = ({ destination }) => {
  const handleFindDirection = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const encodedDestination = encodeURIComponent(destination);

        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${encodedDestination}&travelmode=driving`;

        window.open(googleMapsUrl, "_blank");
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Could not get your location. Please allow location access.");
      }
    );
  };

  return (
    <button
      onClick={handleFindDirection}
      className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 hover:shadow-md transition duration-200 flex items-center justify-center gap-2"
    >
      <MapPin className="w-4 h-4" />
      Find Direction
    </button>
  );
};

export default FindDirectionButton;