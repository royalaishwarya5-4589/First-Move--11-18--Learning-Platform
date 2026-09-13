'use client';

import React, { useState } from 'react';
import { RobotMascot } from './RobotMascot';
import { useAITutor } from './AITutorContext';

export function AITutorLauncher() {
  const { isOpen, robotState, toggleOpen } = useAITutor();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="ai-tutor-launcher-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '16px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* Tooltip */}
      {isHovered && !isOpen && (
        <div
          className="ai-tutor-tooltip"
          role="tooltip"
          style={{
            pointerEvents: 'auto',
            marginBottom: '8px',
            marginRight: '6px',
            backgroundColor: 'var(--bg-surface, #FFFFFF)',
            color: 'var(--text-main, #181A1D)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '0.45rem 0.85rem',
            fontSize: '0.85rem',
            fontWeight: 650,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            animation: 'fadeInUp 180ms ease-out forwards',
          }}
        >
          <span>✨</span>
          <span>Ask First Move(11~18) AI Tutor &amp; Debugger</span>
        </div>
      )}

      {/* Help Pill Button (Matching Reference Screenshot) */}
      {!isOpen && (
        <button
          type="button"
          onClick={toggleOpen}
          className="btn-interactive"
          aria-label="Open Help and AI Assistant"
          style={{
            pointerEvents: 'auto',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--text-inverse)',
            border: '1px solid var(--border-color)',
            borderRadius: '30px',
            padding: '0.6rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 750,
            fontSize: '0.925rem',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(24, 26, 29, 0.22), 0 2px 6px rgba(0, 0, 0, 0.08)',
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), background-color 180ms ease',
            marginBottom: '6px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1.8px solid #FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 900,
            }}
          >
            ?
          </span>
          <span>Help</span>
        </button>
      )}

      {/* Robot Button */}
      <button
        type="button"
        className="ai-tutor-robot-btn btn-interactive"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close AI Tutor Panel' : 'Open First Move(11~18) AI Tutor & Debugger'}
        style={{
          pointerEvents: 'auto',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isHovered
            ? 'drop-shadow(0 14px 28px rgba(201, 162, 39, 0.55)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.22))'
            : 'drop-shadow(0 8px 20px rgba(201, 162, 39, 0.4)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))',
          transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1), filter 220ms ease',
          transform: isHovered ? 'scale(1.08) translateY(-3px)' : 'scale(1)',
        }}
      >
        <RobotMascot state={robotState} size={76} />
      </button>
    </div>
  );
}
