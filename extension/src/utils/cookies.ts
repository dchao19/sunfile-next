export function setCookie(name: string, value: string, expiresAt?: string) {
  const expiresTest = expiresAt
    ? `expires=${new Date(expiresAt).toUTCString()};`
    : "";
  const cookie = `${name}=${value}; path =/; ${expiresTest}`;
  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  const pattern = new RegExp(`${name}=([^;]*)`);
  const match = document.cookie.match(pattern);

  return match ? match[1] : null;
}
