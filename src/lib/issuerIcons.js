// Maps a certification issuer name to a skillicons.dev logo code, where a
// confident, known-good code exists. Falls back to a generic icon otherwise.
const ISSUER_ICON_CODES = {
  'Amazon Web Services': 'aws',
  Microsoft: 'azure',
}

export function issuerIconUrl(issuer, theme = 'dark') {
  const code = ISSUER_ICON_CODES[issuer]
  if (!code) return null
  return `https://skillicons.dev/icons?i=${code}&theme=${theme === 'dark' ? 'dark' : 'light'}`
}
