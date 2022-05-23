import { Maybe } from 'monet';

import type { IConfiguration } from '../../configuration';

import type { TimeRecommendation } from '../interfaces';

export function getTimeRecommendation(
  config: IConfiguration,
  type: Maybe<string>,
  modifier: Maybe<string>
): TimeRecommendation {
  if (type.isNone()) {
    return Maybe.none();
  }

  const withModifier = (value: number): number =>
    modifier.filter((m) => m === 'extra').isSome() ? value + config.breakRecommendation.breakModifier : value;

  switch (type.some()) {
    case 'focus':
      return Maybe.Some(config.focusRecommendationMinutes);
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
