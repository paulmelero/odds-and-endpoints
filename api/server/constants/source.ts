import { Source } from '~~/types';

export const SOURCE = Object.freeze({
  1: {
    1: {
      value: 0.1,
      fraction: '1/10',
      indexNotation: '/1/1',
      source: 'https://pubmed.ncbi.nlm.nih.gov/PMC8898159/',
      exampleEvent: 'Being Born Left-Handed',
      exampleDescription: 'Approximately 10% of the population is left-handed.',
    },
    5: {
      value: 0.5,
      fraction: '1/2',
      indexNotation: '/1/5',
      source: 'https://en.wikipedia.org/wiki/Fair_coin',
      exampleEvent: 'Fair Coin Toss',
      exampleDescription:
        "A fair coin has a 50% chance of landing on each side, meaning it's 1/2 likely to land on heads and 1/2 likely to land on tails.",
    },
  },
  5: {
    6: {
      value: 0.00006535947712418301,
      fraction: '1/15300',
      indexNotation: '/5/6',
      mantissaRest: 535947712418301,
      source: 'https://www.weather.gov/safety/lightning-odds',
      exampleEvent: 'Lightning Strike in a lifetime in the US',
      exampleDescription:
        'The odds of being struck by lightning in a given year are about 1 in 1,222,000. This means that over a lifetime (80 years), the odds of being struck are about 1 in 15,300.',
      related: ['/7/8'],
    },
  },
  7: {
    8: {
      mantissaRest: 183306055646482,
      indexNotation: '/7/8',
      value: 8.183306055646482e-7,
      fraction: '1/1220000',
      source: 'https://www.weather.gov/safety/lightning-odds',
      exampleEvent: 'Odds of being struck by lightning in a year in the US',
      exampleDescription:
        'The odds of being struck by lightning in a given year are about 1 in 1,222,000.',
      related: ['/5/6'],
    },
  },
  6: {
    1: {
      value: 1.4285714285714286e-6,
      fraction: '1/700000',
      indexNotation: '/6/1',
      source:
        'https://stardate.org/faq/what-is-the-chance-of-earth-being-hit-by-a-comet-or-asteroid',
      exampleEvent: 'Meteor Impact in Your Lifetime',
      exampleDescription:
        'The probability of a significant meteor impact affecting Earth during your lifetime.',
    },
    2: {
      value: 80 / 300000,
      fraction: '1/3750',
      indexNotation: '/6/2',
      mantissaRest: 266666666666667,
      source:
        'https://stardate.org/faq/what-is-the-chance-of-earth-being-hit-by-a-comet-or-asteroid',
      exampleEvent: 'Meteor Impact in Your Lifetime',
      exampleDescription:
        'The chance of a significant meteor/asteroid hitting Earth in a given year is about 1 in 300,000; over an 80-year lifetime, that’s about 1 in 3,750.',
      related: ['/6/2'],
    },
  },
  9: {
    3: {
      value: 3.333333333333333e-9, // 1/300,000,000
      indexNotation: '/9/3',
      fraction: '1/300000000',
      source: 'https://en.wikipedia.org/wiki/Powerball',
      exampleEvent: 'Winning the Lottery Jackpot',
      exampleDescription:
        'The odds of winning a major lottery jackpot (US Powerball) are astronomically low.',
    },
  },
  4: {
    1: {
      value: 0.0001,
      fraction: '1/10000',
      mantissaRest: 1,
      indexNotation: '/4/1',
      source:
        'https://statisticsbyjim.com/fun/probability-theory-helps-find-more-four-leaf-clovers/',
      exampleEvent: 'Finding a Four-Leaf Clover',
      exampleDescription:
        'The probability of finding a four-leaf clover in a patch is about 1 in 10,000.',
      related: ['/4/1'],
    },
  },
}) satisfies Source;
