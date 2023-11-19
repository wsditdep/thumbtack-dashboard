import './globals.scss';
import './dashboard.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastProvider } from '@/components/toastProvider/ToastProvider';
import { AuthProvider } from '@/components/authProvider/AuthProvider';
import favicon from "@/public/favicon.jpg";

export const metadata = {
  title: 'Control Center - Welcome',
  description: 'Designed and developed',
  icons: {
    icon: {
      url: {favicon},
      type: "image/png",
    },
    shortcut: { url: "/favicon.jpg", type: "image/jpg" },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
