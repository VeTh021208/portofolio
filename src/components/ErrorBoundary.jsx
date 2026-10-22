import { Component } from 'react'

/**
 * Penangkap error render agar pengguna melihat pesan yang jelas,
 * bukan layar putih kosong.
 */
export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary menangkap:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="grid min-h-screen place-items-center bg-canvas px-6 text-center">
        <div className="max-w-md">
          <p className="font-display text-6xl font-extrabold text-gradient">404?</p>
          <h1 className="mt-4 font-display text-2xl font-extrabold">Ups, ada yang salah</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Halaman ini gagal dimuat karena kesalahan tak terduga. Muat ulang untuk mencoba lagi.
          </p>
          <button type="button" onClick={this.handleReload} className="btn btn-primary mt-6">
            Muat ulang halaman
          </button>
        </div>
      </div>
    )
  }
}
