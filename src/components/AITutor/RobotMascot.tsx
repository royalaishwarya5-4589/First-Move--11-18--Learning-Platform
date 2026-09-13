import React from 'react';

export type RobotState = 'IDLE' | 'THINKING' | 'HAPPY' | 'WAVING' | 'SPEAKING';

interface RobotMascotProps {
  state?: RobotState;
  size?: number;
  className?: string;
}

export function RobotMascot({ state = 'IDLE', size = 88, className = '' }: RobotMascotProps) {
  const isThinking = state === 'THINKING';
  const isHappy = state === 'HAPPY';
  const isSpeaking = state === 'SPEAKING';
  const isWaving = state === 'WAVING';

  return (
    <div
      className={`robot-mascot-wrapper ${state.toLowerCase()} ${className}`}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Champagne Warm Beige Accent Gradient */}
          <linearGradient id="robotGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECE8DF" />
            <stop offset="35%" stopColor="#D9D2C5" />
            <stop offset="70%" stopColor="#B5AC9C" />
            <stop offset="100%" stopColor="#7A7264" />
          </linearGradient>

          {/* Deep Slate Graphite Accent */}
          <linearGradient id="robotGoldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3D424A" />
            <stop offset="100%" stopColor="#1C1E22" />
          </linearGradient>

          {/* Pristine Ceramic White Gradient */}
          <linearGradient id="robotWhiteBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F3EC" />
          </linearGradient>

          {/* Luxury Obsidian Visor Screen */}
          <linearGradient id="robotVisor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1B1914" />
            <stop offset="100%" stopColor="#0B0A08" />
          </linearGradient>

          {/* Visor Specular Glass Reflection */}
          <linearGradient id="robotVisorGlint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Warm Beige Thruster Energy Glow */}
          <radialGradient id="thrusterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F7F5F0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D9D2C5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B5AC9C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hover Energy Thruster Ring at Bottom */}
        <ellipse cx="50" cy="94" rx="14" ry="4" fill="url(#thrusterGlow)" />
        <ellipse cx="50" cy="93" rx="7" ry="2" fill="#FDF4BC" opacity="0.9" />

        {/* Floating Halo / Signal Crown */}
        <ellipse
          cx="50"
          cy="9"
          rx="12"
          ry="3.5"
          fill="none"
          stroke="url(#robotGoldGrad)"
          strokeWidth="1.8"
          opacity="0.8"
        />
        {/* Antenna Stem */}
        <line
          x1="50"
          y1="19"
          x2="50"
          y2="10"
          stroke="url(#robotGoldGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Antenna Orb */}
        <circle
          cx="50"
          cy="8"
          r="4"
          fill={isThinking ? '#F59E0B' : 'url(#robotGoldGrad)'}
          stroke="#9F7A16"
          strokeWidth="0.8"
          className={isThinking ? 'robot-antenna-pulse' : ''}
        />

        {/* Golden Audio Pods / Ear Discs on Sides */}
        <rect
          x="12"
          y="31"
          width="7"
          height="18"
          rx="3.5"
          fill="url(#robotGoldGrad)"
          stroke="#9F7A16"
          strokeWidth="1"
        />
        <circle cx="15.5" cy="40" r="1.8" fill="#FFFFFF" opacity="0.8" />

        <rect
          x="81"
          y="31"
          width="7"
          height="18"
          rx="3.5"
          fill="url(#robotGoldGrad)"
          stroke="#9F7A16"
          strokeWidth="1"
        />
        <circle cx="84.5" cy="40" r="1.8" fill="#FFFFFF" opacity="0.8" />

        {/* Left Floating Wing / Arm */}
        <path
          d="M22 68 C15 72, 14 81, 18 85 C22 88, 25 83, 26 76 Z"
          fill="url(#robotWhiteBody)"
          stroke="url(#robotGoldGrad)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Right Floating Wing / Arm (Waving or Floating) */}
        {isWaving ? (
          <path
            d="M74 66 C79 61, 86 52, 88 45 C89 39, 83 39, 80 44 C77 50, 75 58, 71 66 Z"
            fill="url(#robotWhiteBody)"
            stroke="url(#robotGoldGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M78 68 C85 72, 86 81, 82 85 C78 88, 75 83, 74 76 Z"
            fill="url(#robotWhiteBody)"
            stroke="url(#robotGoldGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        )}

        {/* Aerodynamic Hover Chassis (Body) */}
        <path
          d="M32 64 C32 64, 30 73, 34 85 C37 92, 63 92, 66 85 C70 73, 68 64, 68 64 Z"
          fill="url(#robotWhiteBody)"
          stroke="url(#robotGoldGrad)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Golden Collar Rim */}
        <path
          d="M35 65 Q50 71 65 65"
          stroke="url(#robotGoldDark)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Head Outer - Smooth Aerodynamic Capsule with Elegant Gold Border */}
        <rect
          x="16"
          y="18"
          width="68"
          height="49"
          rx="24.5"
          fill="url(#robotWhiteBody)"
          stroke="url(#robotGoldGrad)"
          strokeWidth="2.8"
        />

        {/* Panoramic Curved Visor */}
        <rect
          x="23"
          y="24"
          width="54"
          height="36"
          rx="18"
          fill="url(#robotVisor)"
          stroke="url(#robotGoldGrad)"
          strokeWidth="1.6"
        />

        {/* Visor Top Curved Glint */}
        <path
          d="M26 31 C29 27, 39 25, 50 25 C61 25, 71 27, 74 31 C67 28.5, 53 27.5, 26 31 Z"
          fill="url(#robotVisorGlint)"
        />

        {/* Eyes */}
        {isHappy ? (
          <>
            <path d="M34 43 Q39 36 44 43" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M56 43 Q61 36 66 43" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </>
        ) : isThinking ? (
          <>
            <circle cx="39" cy="42" r="4.5" fill="#F59E0B" className="robot-eye-pulse" />
            <circle cx="61" cy="42" r="4.5" fill="#F59E0B" className="robot-eye-pulse" />
          </>
        ) : (
          <>
            <ellipse cx="39" cy="42" rx="4.5" ry="5.5" fill="#38BDF8" />
            <ellipse cx="61" cy="42" rx="4.5" ry="5.5" fill="#38BDF8" />
            {/* Pupil spark gleam */}
            <circle cx="40.5" cy="40" r="1.5" fill="#FFFFFF" />
            <circle cx="62.5" cy="40" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Mouth */}
        {isSpeaking ? (
          <ellipse cx="50" cy="52" rx="5.5" ry="3.5" fill="#38BDF8" />
        ) : (
          <path d="M45 52 Q50 55.5 55 52" stroke="url(#robotGoldGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        )}

        {/* Core Chest Indicator - Shimmering Radiant Gold Gem */}
        <circle
          cx="50"
          cy="77"
          r="5.5"
          fill={isThinking ? '#F59E0B' : 'url(#robotGoldGrad)'}
          stroke="#7E5F0E"
          strokeWidth="1.2"
          className="robot-chest-core"
        />
        {/* Core Sparkle Shimmer */}
        <circle cx="48.5" cy="75.5" r="1.6" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
}
