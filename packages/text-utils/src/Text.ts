export class Text {
  constructor(readonly val: string) {
  }

  static capitalize(text: string): string {
    return text.toUpperCase() + text.slice(1)
  }

  capitalize(): string {
    return Text.capitalize(this.val);
  }
}