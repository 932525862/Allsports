import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {/* Telegram Button */}
      <a
        href="https://t.me/elegantmassage_uz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#F5D061] to-[#D4AF37] text-black shadow-lg shadow-yellow-900/30 hover:scale-110 hover:shadow-yellow-500/50 transition-all duration-300 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-[#E5C158]/30 animate-ping opacity-75 group-hover:opacity-100"></span>
        <FaTelegramPlane className="w-7 h-7 relative z-10 translate-x-[-1px] translate-y-[1px]" />
      </a>

      {/* Phone Call Button */}
      <a
        href="tel:+998977052027"
        aria-label="Phone Call"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-[#2A2419]/90 border-2 border-[#D4AF37] text-[#F5D061] shadow-lg shadow-black/50 hover:scale-110 hover:bg-[#382E1E] hover:border-[#F5D061] hover:shadow-yellow-500/30 transition-all duration-300 active:scale-95"
      >
        <FiPhoneCall className="w-6 h-6 animate-pulse" />
      </a>
    </div>
  )
}

export default FloatingContact
