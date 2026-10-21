import { ToastProvider } from '@/context/ToastContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import { PaperBackdrop } from '@/components/ui/PaperBackdrop'
import { ChibiFloatField } from '@/components/ui/ChibiSprites'
import { CursorSakura } from '@/components/ui/CursorSakura'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PaperBackdrop />
        <ChibiFloatField />
        <CursorSakura />
        <Layout />
      </ToastProvider>
    </ThemeProvider>
  )
}