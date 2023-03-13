class AppInstaller {
  _deferredPrompt: any

  constructor() {
    window.addEventListener('beforeinstallprompt',  (e) => {
      e.preventDefault()
      this._deferredPrompt = e
    })
    window.addEventListener('appinstalled',  () => {
      this._deferredPrompt = null
    })
  }

  install() {
    this._deferredPrompt?.prompt()
  }
}

export default new AppInstaller()