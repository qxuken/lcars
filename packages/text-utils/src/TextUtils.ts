export class TextUtils {
  static capitalize(text: string): string {
    return text[0].toUpperCase() + text.slice(1);
  }
}
