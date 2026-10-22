import { ToastProvider } from '@/context/ToastContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import { PaperBackdrop } from '@/components/ui/PaperBackdrop'
import { ChibiFloatField } from '@/components/ui/ChibiSprites'
import { MagneticField } from '@/components/ui/MagneticField'
import { CursorDot } from '@/components/ui/CursorDot'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PaperBackdrop />
        <MagneticField />
        <ChibiFloatField />
        <CursorDot />
        <Layout />
      </ToastProvider>
    </ThemeProvider>
  )
}