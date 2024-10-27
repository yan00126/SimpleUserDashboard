import { useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import Login from './components/Login';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({ isLoggedIn, login }) {
  if (isLoggedIn) {
    return null; // or a loading indicator
  }

  return <Login login={login} />;
}

// ... Add LoginForm, AdminDashboard, and UserDashboard components here ...