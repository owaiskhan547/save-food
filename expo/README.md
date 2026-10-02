# RescueFeed - React Native Expo Application (SDK 57)

A tactile claymorphic food rescue and redistribution mobile app built with **React Native (0.78+)** and **Expo SDK 57** with the New Architecture enabled.

## 🚀 Quick Start with Expo SDK 57

### 1. Install dependencies
From the `/expo` folder or your root project:

```bash
cd expo
npm install
```

Or when initializing in a new project:
```bash
npx create-expo-app rescue-feed
cd rescue-feed
npx expo install expo-status-bar expo-linear-gradient expo-haptics @expo/vector-icons react-native-safe-area-context react-native-svg
```

### 2. Start the development server
```bash
npx expo start
```

### 3. Open on your device
- **iOS**: Scan the QR code with the iOS Camera app (requires [Expo Go](https://apps.apple.com/app/expo-go/id982107779)).
- **Android**: Scan the QR code using the [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) app.
- **Simulator / Emulator**: Press `i` for iOS Simulator or `a` for Android Emulator.
- **Web**: Press `w` to open in your browser.

## 📦 Key Packages Used (Expo SDK 57)
- `expo`: ~57.0.0
- `react`: 19.0.0
- `react-native`: 0.78.0 (New Architecture enabled)
- `@expo/vector-icons`: MaterialIcons, Ionicons, Feather
- `expo-linear-gradient`: Soft organic lighting and claymorphism gradient cards
- `expo-status-bar`: Modern declarative status bar
- `react-native-safe-area-context`: Safe edge-to-edge support with `SafeAreaProvider`
- `expo-haptics`: Tactile feedback on reserving and confirming food batches

## 🎨 Visual Features
- **Tactile Claymorphism**: Custom layered shadows and elevated floating pill navigation.
- **Live Urgency Countdown Timer**: Real-time ticking auto-expiry window on critical batches.
- **5-Step Distribution Protocol**: Live transit status tracker with handoff milestones.
- **Role Switcher**: Dual perspectives for **NGOs & Shelters** and **Food Providers**.
- **Interactive Modals**: Locking reservations, verified PIN codes, and GPS delivery telemetry.
- **New Architecture Ready**: Fully optimized for Bridgeless mode and TurboModules in Expo SDK 57.
