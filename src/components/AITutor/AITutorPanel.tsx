'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAITutor } from './AITutorContext';
import { RobotMascot } from './RobotMascot';
import { TutorMode } from '@/lib/ai/prompts';
import { VoiceAgent } from './VoiceAgent';

export function AITutorPanel() {
  const {
    isOpen,
    robotState,
    messages,
    activeContext,
    isLoading,
    apiKey,
    provider,
    setApiKey,
    setProvider,
    setIsOpen,
    sendMessage,
    clearMessages,
  } = useAITutor();

  // All useState hooks at top level
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [currentlySpeakingMsgId, setCurrentlySpeakingMsgId] = useState<string | null>(null);

  // All useRef hooks at top level
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const openSettings = () => {
    setTempApiKey(apiKey);
    setShowSettings(true);
  };

  useEffect(() => {
    if (isOpen && !showSettings) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, showSettings]);

  useEffect(() => {
    if (isOpen && !showSettings) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, showSettings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showSettings) {
          setShowSettings(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showSettings, setIsOpen]);

  // Early return check AFTER ALL HOOKS
  if (!isOpen) return null;

  const handleVoiceInput = (transcript: string) => {
    sendMessage(transcript, 'TUTOR', true);
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    sendMessage(text, 'TUTOR');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (text: string, mode: TutorMode) => {
    sendMessage(text, mode);
  };

  const handleSaveSettings = () => {
    setApiKey(tempApiKey);
    setShowSettings(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const cleanMarkdownForSpeech = (text: string): string => {
    let clean = text.replace(/```[\s\S]*?```/g, 'Code snippet provided.');
    clean = clean.replace(/###/g, '');
    clean = clean.replace(/\*\*/g, '');
    clean = clean.replace(/\*/g, '');
    clean = clean.replace(/`([^`]+)`/g, '$1');
    clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    return clean.trim();
  };

  const handleSpeakMessage = (msgId: string, content: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (currentlySpeakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleaned = cleanMarkdownForSpeech(content);
    if (!cleaned) return;

    const utterance = new SpeechSynthesisUtterance(cleaned.slice(0, 800));
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setCurrentlySpeakingMsgId(msgId);
    utterance.onend = () => setCurrentlySpeakingMsgId(null);
    utterance.onerror = () => setCurrentlySpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="ai-tutor-panel"
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '112px',
        width: '420px',
        maxWidth: 'calc(100vw - 32px)',
        height: '620px',
        maxHeight: 'calc(100vh - 120px)',
        backgroundColor: 'var(--bg-surface, #FFFFFF)',
        border: '1.5px solid var(--accent-gold, #C9A227)',
        borderRadius: 'var(--radius-lg, 16px)',
        boxShadow: '0 16px 36px -4px rgba(28, 28, 28, 0.15), 0 6px 18px -2px rgba(201, 162, 39, 0.18)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'fadeInUp 200ms ease-out forwards',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '0.85rem 1rem',
          backgroundColor: 'var(--bg-muted, #F5F3EB)',
          borderBottom: '1px solid var(--border-color, #EDE7D5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <RobotMascot state={robotState} size={36} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main, #1C1C1C)' }}>
              First Move(11~18) AI Tutor & Debugger
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted, #6B6B6B)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              {activeContext.title || 'Interactive Learning Assistant'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={() => (showSettings ? setShowSettings(false) : openSettings())}
            className="btn-interactive"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted, #6B6B6B)',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: '4px',
            }}
            title="Settings"
          >
            ⚙️
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn-interactive"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted, #94a3b8)',
              cursor: 'pointer',
              padding: '0.3rem',
              fontSize: '1.1rem',
            }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Settings Modal Body */}
      {showSettings ? (
        <div style={{ padding: '1.25rem', flex: 1, overflowY: 'auto' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-main, #f8fafc)', fontSize: '0.95rem' }}>
            ⚙️ AI Provider Settings
          </h4>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #94a3b8)', marginBottom: '0.4rem' }}>
              Select AI Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: 'var(--bg-card, #1e293b)',
                color: 'var(--text-main, #f8fafc)',
                border: '1px solid var(--border-color, #334155)',
                borderRadius: '6px',
                fontSize: '0.85rem',
              }}
            >
              <option value="auto">✨ Auto / First Move Engine (Free Built-in)</option>
              <option value="gemini">Google Gemini 1.5 Flash</option>
              <option value="openai">OpenAI GPT-4o mini</option>
              <option value="groq">Groq Llama 3</option>
              <option value="anthropic">Anthropic Claude 3.5</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #94a3b8)', marginBottom: '0.4rem' }}>
              Custom API Key (Optional)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showKey ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Enter API Key (Optional)..."
                style={{
                  width: '100%',
                  padding: '0.5rem 2.2rem 0.5rem 0.6rem',
                  backgroundColor: 'var(--bg-card, #1e293b)',
                  color: 'var(--text-main, #f8fafc)',
                  border: '1px solid var(--border-color, #334155)',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                {showKey ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveSettings}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', backgroundColor: 'var(--color-primary, #6366f1)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
            >
              Save Settings
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Messages Container */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', margin: 'auto', padding: '1.5rem 1rem', color: 'var(--text-muted, #94a3b8)' }}>
                <RobotMascot state="HAPPY" size={54} />
                <h4 style={{ margin: '0.75rem 0 0.25rem 0', color: 'var(--text-main, #f8fafc)', fontSize: '1rem' }}>
                  Hello! How can I help you today?
                </h4>
                <p style={{ fontSize: '0.825rem', margin: '0 0 1rem 0' }}>
                  Ask any programming question, paste code to debug errors, or pick a quick action:
                </p>

                {/* Quick Action Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('Give me a hint for this exercise', 'HINT')}
                    style={{ padding: '0.35rem 0.65rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-main)', fontSize: '0.775rem', cursor: 'pointer' }}
                  >
                    💡 Give Hint
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('Debug my current code and error logs', 'DEBUG')}
                    style={{ padding: '0.35rem 0.65rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-main)', fontSize: '0.775rem', cursor: 'pointer' }}
                  >
                    🛠️ Debug Code
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('Explain terminal error tracebacks', 'EXPLAIN_ERROR')}
                    style={{ padding: '0.35rem 0.65rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-main)', fontSize: '0.775rem', cursor: 'pointer' }}
                  >
                    🚨 Explain Error
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAction('Quiz me on this lesson', 'QUIZ')}
                    style={{ padding: '0.35rem 0.65rem', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-surface-elevated)', color: 'var(--text-main)', fontSize: '0.775rem', cursor: 'pointer' }}
                  >
                    🧠 Quiz Me
                  </button>
                </div>
              </div>
            ) : (
              messages.map((m) => {
                const isUser = m.role === 'user';
                const isSpeakingThis = currentlySpeakingMsgId === m.id;

                return (
                  <div
                    key={m.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '0.7rem 0.9rem',
                        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        backgroundColor: isUser
                          ? 'var(--color-primary, #6366f1)'
                          : m.isError
                          ? 'var(--bg-danger-subtle, #450a0a)'
                          : 'var(--bg-surface-elevated, #1e293b)',
                        color: isUser ? '#ffffff' : 'var(--text-main, #f8fafc)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        border: isUser ? 'none' : '1px solid var(--border-color, #334155)',
                      }}
                    >
                      {m.content}
                    </div>

                    {/* Timestamp & Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', fontSize: '0.7rem', color: 'var(--text-muted, #94a3b8)' }}>
                      <span>{m.timestamp}</span>
                      {!isUser && !m.isError && (
                        <>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(m.content, m.id)}
                            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}
                          >
                            {copiedMsgId === m.id ? '✓ Copied' : '📋 Copy'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSpeakMessage(m.id, m.content)}
                            style={{ background: 'none', border: 'none', color: isSpeakingThis ? '#38bdf8' : 'inherit', cursor: 'pointer', padding: 0, fontWeight: isSpeakingThis ? 700 : 400 }}
                          >
                            {isSpeakingThis ? '⏹️ Stop' : '🔊 Listen'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted, #94a3b8)', fontSize: '0.8rem' }}>
                <RobotMascot state="THINKING" size={24} />
                <span>AI Tutor is analyzing code & details...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div
            style={{
              padding: '0.75rem',
              backgroundColor: 'var(--bg-surface-elevated, #1e293b)',
              borderTop: '1px solid var(--border-color, #334155)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <VoiceAgent onSpeechInput={handleVoiceInput} />
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearMessages}
                  style={{
                    padding: '0.35rem 0.6rem',
                    borderRadius: 'var(--radius-md, 6px)',
                    border: '1px solid var(--border-color, #334155)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-muted, #94a3b8)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  🗑️ Clear Chat
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-end' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask any question or debug code (Press Enter)..."
                rows={2}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.65rem',
                  backgroundColor: 'var(--bg-card, #0f172a)',
                  color: 'var(--text-main, #f8fafc)',
                  border: '1px solid var(--border-color, #334155)',
                  borderRadius: 'var(--radius-md, 6px)',
                  fontSize: '0.85rem',
                  resize: 'none',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                style={{
                  padding: '0.5rem 0.85rem',
                  height: '42px',
                  borderRadius: 'var(--radius-md, 6px)',
                  border: 'none',
                  backgroundColor: !input.trim() || isLoading ? 'var(--bg-surface, #334155)' : 'var(--color-primary, #6366f1)',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
