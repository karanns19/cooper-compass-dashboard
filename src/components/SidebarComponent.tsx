import { NavLink } from 'react-router-dom'

import HomeIcon from '../assets/icons/home.png'
import HomeWhiteIcon from '../assets/icons/home_white_icon.png'
import TrackBaggageIcon from '../assets/icons/track baggage.png'
import TrackBaggageWhiteIcon from '../assets/icons/track_baggage_white.png'
import LostAndFoundIcon from '../assets/icons/LostAndFound.png'
import LostAndFoundIconWhite from '../assets/icons/LostAndFound_white.png'
import AlertsIcon from '../assets/icons/Alerts.png'
import AlertsIconWhite from '../assets/icons/Alerts_white.png'
import ReportsIcon from '../assets/icons/reports.png'
import ReportsIconWhite from '../assets/icons/reports_white.png'
import ProfileIcon from '../assets/icons/profile.png'
import ProfileIcon_white from '../assets/icons/Profile_white.png'
import HelpIcon from '../assets/icons/help.png'
import HelpIconWhite from '../assets/icons/help_white.png'
import Logo from '../assets/logo.png'
import TransferHubIcon from "../assets/icons/transferHubIcon.png"
import TransferHubIconWhite from "../assets/icons/transferHubIconWhite.png"


interface NavItem {
  label: string
  icon: string
  whiteIcon?: string
  to: string
}

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: HomeIcon, whiteIcon: HomeWhiteIcon, to: '/home' },
  { label: 'Track Baggage', icon: TrackBaggageIcon, whiteIcon: TrackBaggageWhiteIcon, to: '/track-baggage' },
  { label: 'Transfer Hub', icon: TransferHubIcon, whiteIcon: TransferHubIconWhite, to: '/transfer-hub' },
  { label: 'Lost and Found', icon: LostAndFoundIcon, whiteIcon: LostAndFoundIconWhite, to: '/lost-and-found' },
  { label: 'Alerts', icon: AlertsIcon, whiteIcon: AlertsIconWhite, to: '/alerts' },
  { label: 'Reports', icon: ReportsIcon, whiteIcon: ReportsIconWhite, to: '/reports' },
  { label: 'Profile', icon: ProfileIcon, whiteIcon: ProfileIcon_white, to: '/profile' },
]

const footerItems: NavItem[] = [
  { label: 'Help Center', icon: HelpIcon, whiteIcon: HelpIconWhite, to: '/help' },
]

export default function Sidebar({ isCollapsed }: SidebarProps) {

  const renderNavItem = (item: NavItem) => (
    <NavLink
      key={item.label}
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive ? 'bg-[#432143] text-white' : 'text-black hover:bg-gray-100'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive && item.whiteIcon ? item.whiteIcon : item.icon}
            alt={item.label}
            className="h-6 w-6"
          />
          {/* Remove text completely when collapsed */}
          {!isCollapsed && (
            <span className="whitespace-nowrap transition-all duration-300 md:text-sm lg:text-md">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col justify-between font-poppins transition-all duration-300 relative
      ${isCollapsed ? 'w-18' : 'w-60'}
      fixed md:relative z-50`}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 p-4">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
          {!isCollapsed && (
            <span className={`font-semibold text-2xl text-[#1f1f1f] transition-all duration-300
              hidden sm:inline  // Hide text on mobile
              md:text-lg lg:text-2xl
            `}>
              Paper Pod
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-2 flex flex-col space-y-1 px-2">
          {navItems.map(renderNavItem)}
        </nav>
      </div>

      {/* Footer */}
      <div className="pb-4 px-2 space-y-1">
        {footerItems.map(renderNavItem)}
      </div>
    </div>
  )
}


// export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {

//   const renderNavItem = (item: NavItem) => (
//     <NavLink
//       key={item.label}
//       to={item.to}
//       className={({ isActive }) =>
//         `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
//           isActive ? 'bg-[#432143] text-white' : 'text-black hover:bg-gray-100'
//         }`
//       }
//     >
//       {({ isActive }) => (
//         <>
//           <img
//             src={isActive && item.whiteIcon ? item.whiteIcon : item.icon}
//             alt={item.label}
//             className="h-6 w-6"
//           />
//           {/* Text label */}
//           <span
//             className={`whitespace-nowrap transition-all duration-300
//               ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}
//               hidden sm:inline  // hide text completely on mobile
//               md:text-sm lg:text-base
//             `}
//           >
//             {item.label}
//           </span>
//         </>
//       )}
//     </NavLink>
//   )

//   return (
//     <div
//       className={`h-screen bg-white border-r border-gray-200 flex flex-col justify-between font-poppins transition-all duration-300 relative
//       ${isCollapsed ? 'w-20' : 'w-64'}
//       fixed md:relative z-50`}
//     >

//       <div>
//         {/* Logo */}
//         <div className="flex items-center gap-3 p-4">
//           <img src={Logo} alt="Logo" className="h-10 w-10" />
//           {!isCollapsed && (
//             <span className={`font-semibold text-2xl text-[#1f1f1f] transition-all duration-300
//               hidden sm:none // Hide text on mobile
//               md:text-lg lg:text-2xl
//             `}>
//               Paper Pod
//             </span>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="mt-2 flex flex-col space-y-1 px-2">
//           {navItems.map(renderNavItem)}
//         </nav>
//       </div>

//       {/* Footer */}
//       <div className="pb-4 px-2 space-y-1">
//         {footerItems.map(renderNavItem)}
//       </div>
//     </div>
//   )
// }


// export default function Sidebar({ isCollapsed, toggleSidebar }: SidebarProps) {

//   const renderNavItem = (item: NavItem) => (
//     <NavLink
//       key={item.label}
//       to={item.to}
//       className={({ isActive }) =>
//         `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
//           isActive ? 'bg-[#432143] text-white' : 'text-black hover:bg-gray-100'
//         }`
//       }
//     >
//       {({ isActive }) => (
//         <>
//           <img
//             src={isActive && item.whiteIcon ? item.whiteIcon : item.icon}
//             alt={item.label}
//             className="h-6 w-6"
//           />
//           <span
//             className={`whitespace-nowrap transition-all duration-300 ${
//               isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
//             }`}
//           >
//             {item.label}
//           </span>
//         </>
//       )}
//     </NavLink>
//   )

//   return (
//     <div
//       className={`h-screen bg-white border-r border-gray-200 flex flex-col justify-between font-poppins transition-all duration-300 relative
//       ${isCollapsed ? 'w-20' : 'w-64'} 
//       fixed md:relative z-50`}
//     >

//       <div>
//         {/* Logo */}
//         <div className="flex items-center gap-3 p-4">
//           <img src={Logo} alt="Logo" className="h-10 w-10" />
//           {!isCollapsed && (
//             <span className="font-semibold text-2xl text-[#1f1f1f] transition-all duration-300">
//               Paper Pod
//             </span>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="mt-2 flex flex-col space-y-1 px-2">
//           {navItems.map(renderNavItem)}
//         </nav>
//       </div>

//       {/* Footer */}
//       <div className="pb-4 px-2 space-y-1">
//         {footerItems.map(renderNavItem)}
//       </div>
//     </div>
//   )
// }