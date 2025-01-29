export function redirectTo(url: string, reload = false) {
  const baseUrl = window.location.origin
  if (reload) {
    window.location.href = baseUrl + url
    if (url.includes('#')) window.location.reload()
  } else {
    window.location.replace(url)
  }
}
