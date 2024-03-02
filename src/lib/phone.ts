export function toBrPhoneNumber(value: string) {
  return value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
}
