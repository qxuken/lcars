export interface IDelays {
  break: number;
  stop: number;
}

export interface IBreakRecommendation {
  underTwentyFiveMinutes: number;
  underFiftyMinutes: number;
  underNinetyMinutes: number;
  pastNinetyMinutes: number;
  breakModifier: number;
}

export interface IConfiguration {
  proposalDelays: IDelays;
  breakRecommendation: IBreakRecommendation;
  focusRecommendationMinutes: number;
  minimumActivityDurationMinutes: number;
  activityStreak: number;
}

export const defaultConfiguration: IConfiguration = {
  proposalDelays: {
    break: 25 * 60 * 1000,
    stop: 15 * 60 * 1000,
  },
  breakRecommendation: {
    underTwentyFiveMinutes: 10,
    underFiftyMinutes: 15,
    underNinetyMinutes: 25,
    pastNinetyMinutes: 35,
    breakModifier: 15,
  },
  focusRecommendationMinutes: 25,
  minimumActivityDurationMinutes: 5,
  activityStreak: 4,
};
