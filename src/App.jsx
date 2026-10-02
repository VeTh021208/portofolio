import { ToastProvider } from '@/context/ToastContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Layout } from '@/components/layout/Layout'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Layout />
      </ToastProvider>
    </ThemeProvider>
  )
}