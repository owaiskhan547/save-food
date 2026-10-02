import React, { useState } from 'react';

export const ExpoCodeModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('app');
  const [copied, setCopied] = useState(false);

  const packageJsonContent = `{
  "name": "rescue-feed-expo",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~57.0.0",
    "expo-status-bar": "~3.0.0",
    "expo-linear-gradient": "~15.0.0",
    "expo-haptics": "~15.0.0",
    "@expo/vector-icons": "^15.0.0",
    "react": "19.0.0",
    "react-native": "0.78.0",
    "react-native-safe-area-context": "5.3.0",
    "react-native-svg": "15.11.2"
  },
  "devDependencies": {
    "@babel/core": "^7.25.0",
    "@types/react": "~19.0.0",
    "typescript": "^5.7.0"
  },
  "private": true
}`;

  const appJsonContent = `{
  "expo": {
    "name": "RescueFeed",
    "slug": "rescue-feed",
    "version": "1.0.0",
    "sdkVersion": "57.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.rescuefeed.network"
    },
    "android": {
      "package": "com.rescuefeed.network"
    }
  }
}`;

  const setupInstructions = `# Run RescueFeed in React Native Expo (SDK 57):

# 1. Create a fresh Expo project:
npx create-expo-app rescue-feed
cd rescue-feed

# 2. Install required mobile libraries for Expo SDK 57:
npx expo install expo-linear-gradient expo-status-bar react-native-safe-area-context @expo/vector-icons expo-haptics react-native-svg

# 3. Replace App.js / App.jsx with the converted App.jsx code
# (Saved in /expo/App.jsx in this repository)

# 4. Start Expo with New Architecture:
npx expo start

# 5. Open in Expo Go (SDK 57):
- iOS: Scan QR code with Camera app
- Android: Scan QR code in Expo Go app
- Or press 'i' for iOS Simulator, 'a' for Android Emulator`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0b1c30] text-white rounded-[28px] p-5 shadow-2xl flex flex-col gap-3.5 max-h-[92vh] border border-white/10 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-700/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              ▲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">React Native Expo Codebase</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Expo SDK 57
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Ready to run on iOS &amp; Android devices with Expo Go
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 flex items-center justify-center text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'app', label: 'App.jsx' },
            { id: 'package', label: 'package.json' },
            { id: 'appjson', label: 'app.json' },
            { id: 'setup', label: 'Terminal Commands' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content Box */}
        <div className="relative flex-1 bg-black/60 rounded-2xl p-4 border border-white/10 overflow-y-auto max-h-[50vh] font-mono text-xs">
          <button
            onClick={() => {
              if (activeTab === 'package') handleCopy(packageJsonContent);
              else if (activeTab === 'appjson') handleCopy(appJsonContent);
              else if (activeTab === 'setup') handleCopy(setupInstructions);
              else handleCopy("// Note: Complete App.jsx is saved at /expo/App.jsx in this project\n// View the repo file for full native StyleSheet and components!");
            }}
            className="sticky top-0 float-right px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-sans font-bold flex items-center gap-1 backdrop-blur z-10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">content_copy</span>
            <span>{copied ? 'Copied!' : 'Copy File'}</span>
          </button>

          {activeTab === 'app' && (
            <div>
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] mb-3">
                ✓ The full React Native Expo code has been compiled and saved to <b className="text-white">/expo/App.jsx</b> and <b className="text-white">/expo/package.json</b>.
              </div>
              <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
{`import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// Features:
// 1. Tactile Claymorphic Stylesheet with dual iOS/Android shadows
// 2. Real-time Urgency countdown timer (01h 42m 14s)
// 3. 5-Step Distribution Flow Tracker (Listed -> Claimed -> Locked -> In Transit -> Delivered)
// 4. Dual-mode Switcher: NGO / Recipient vs Food Provider
// 5. Interactive Claim Reservation modal with OTP generator
// 6. Live Route Map modal with ETA and temperature monitoring`}
              </pre>
            </div>
          )}

          {activeTab === 'package' && (
            <pre className="text-emerald-400 whitespace-pre leading-relaxed">
              {packageJsonContent}
            </pre>
          )}

          {activeTab === 'appjson' && (
            <pre className="text-blue-300 whitespace-pre leading-relaxed">
              {appJsonContent}
            </pre>
          )}

          {activeTab === 'setup' && (
            <pre className="text-amber-300 whitespace-pre-wrap leading-relaxed">
              {setupInstructions}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 text-xs text-gray-400">
          <span>Files generated in repository: <b className="text-white">/expo/*</b></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-white text-black font-bold active:scale-95 text-xs cursor-pointer"
          >
            Close &amp; Return to App
          </button>
        </div>
      </div>
    </div>
  );
};
