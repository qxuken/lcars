import { Maybe } from 'monet';

import type { IConfiguration } from '../../configuration';

export function getTimeRecommendation(config: IConfiguration, type: string, modifier: string): Maybe<number> {
  const withModifier = (value: number): number =>
    modifier === 'extra' ? value + config.breakRecommendation.breakModifier : value;
  switch (type) {
    case 'focus':
      return Maybe.Some(config.focusRecommendation);
    case 'underTwentyFiveMinutes':
      return Maybe.Some(withModifier(config.breakRecommendation.underTwentyFiveMinutes));
    case 'underFiftyMinutes':
      return Maybe.Some(withModifier(config.breakRecommendation.underFiftyMinutes));
    case 'underNinetyMinutes':
      return Maybe.Some(withModifier(config.breakRecommendation.underNinetyMinutes));
    case 'pastNinetyMinutes':
      return Maybe.Some(withModifier(config.breakRecommendation.pastNinetyMinutes));
    default:
      return Maybe.None();
  }
}
