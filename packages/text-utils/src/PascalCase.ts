import { TextUtils } from './TextUtils';

export class PascalCase {
  static fromKebabCase(text: string): string {
    return text.split('-').map(TextUtils.capitalize).join('');
  }
}
