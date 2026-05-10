import { Source } from '~~/types';

export const SOURCE = Object.freeze({
  1: {
    1: [
      {
        slug: 'born-left-handed',
        value: 0.1,
        fraction: '1/10',
        indexNotation: '/1/1',
        source: 'https://pubmed.ncbi.nlm.nih.gov/PMC8898159/',
        exampleEvent: 'Being Born Left-Handed',
        exampleDescription:
          'Approximately 10% of the population is left-handed.',
        category: 'human-biology',
      },
      {
        slug: 'rolling-specific-number-die',
        value: 1 / 6,
        fraction: '1/6',
        indexNotation: '/1/1',
        mantissaRest: 6666666666666667,
        source: 'https://en.wikipedia.org/wiki/Dice',
        exampleEvent: 'Rolling a Specific Number on a Fair Die',
        exampleDescription:
          'Each face of a fair six-sided die has an equal probability of 1/6 (~16.7%) of landing face up on any given roll.',
        category: 'games',
      },
    ],
    2: {
      slug: 'blood-type-a-worldwide',
      value: 0.27,
      fraction: '27/100',
      indexNotation: '/1/2',
      source:
        'https://en.wikipedia.org/wiki/Blood_type_distribution_by_country',
      exampleEvent: 'Having Blood Type A (Worldwide)',
      exampleDescription:
        'About 27% of the global population has blood type A, making it the second most common blood type.',
      category: 'human-biology',
    },
    3: {
      slug: 'rolling-under-3-die',
      value: 1 / 3,
      fraction: '1/3',
      indexNotation: '/1/3',
      mantissaRest: 3333333333333333,
      source: 'https://en.wikipedia.org/wiki/Dice',
      exampleEvent: 'Rolling Under 3 on a Fair Die',
      exampleDescription:
        'The probability of rolling a 1 or 2 on a standard six-sided die is 2/6 = 1/3 (~33.3%).',
      category: 'games',
    },
    4: {
      slug: 'blood-type-o-worldwide',
      value: 0.44,
      fraction: '44/100',
      indexNotation: '/1/4',
      source:
        'https://en.wikipedia.org/wiki/Blood_type_distribution_by_country',
      exampleEvent: 'Having Blood Type O (Worldwide)',
      exampleDescription:
        'About 44% of the global population has blood type O, making it the most common blood type worldwide.',
      category: 'human-biology',
    },
    5: {
      slug: 'fair-coin-toss',
      value: 0.5,
      fraction: '1/2',
      indexNotation: '/1/5',
      source: 'https://en.wikipedia.org/wiki/Fair_coin',
      exampleEvent: 'Fair Coin Toss',
      exampleDescription:
        "A fair coin has a 50% chance of landing on each side, meaning it's 1/2 likely to land on heads and 1/2 likely to land on tails.",
      category: 'games',
    },
  },
  2: {
    1: [
      {
        slug: 'being-ambidextrous',
        value: 0.01,
        fraction: '1/100',
        indexNotation: '/2/1',
        source: 'https://en.wikipedia.org/wiki/Cross-dominance',
        exampleEvent: 'Being Ambidextrous',
        exampleDescription:
          'Only about 1% of the population is truly ambidextrous, able to use both hands equally well for all tasks.',
        category: 'human-biology',
      },
      {
        slug: 'having-twins',
        value: 0.012,
        fraction: '~12/1000',
        indexNotation: '/2/1',
        source: 'https://en.wikipedia.org/wiki/Twin#Statistics',
        exampleEvent: 'Having Twins',
        exampleDescription:
          'The twinning rate varies globally, ranging from about 9.4 to 16.7 twin sets per 1,000 births depending on region, ethnicity, and use of fertility treatments.',
        category: 'human-biology',
      },
    ],
    2: {
      slug: 'born-red-hair',
      value: 0.02,
      fraction: '1/50',
      indexNotation: '/2/2',
      source: 'https://en.wikipedia.org/wiki/Red_hair',
      exampleEvent: 'Being Born with Red Hair',
      exampleDescription:
        'Only about 1-2% of the global population has naturally red hair, caused by variants in the MC1R gene.',
      category: 'genetics',
    },
    4: {
      slug: 'being-colorblind',
      value: 0.045,
      fraction: '9/200',
      indexNotation: '/2/4',
      source:
        'https://nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness',
      exampleEvent: 'Being Colorblind',
      exampleDescription:
        'About 8% of men and 0.5% of women have some form of color vision deficiency, averaging roughly 4.5% across all people.',
      category: 'genetics',
    },
    7: {
      slug: 'white-christmas-london',
      value: 0.07,
      fraction: '7/100',
      indexNotation: '/2/7',
      source:
        'https://www.metoffice.gov.uk/weather/learn-about/weather/types-of-weather/snow/white-christmas',
      exampleEvent: 'A White Christmas in London',
      exampleDescription:
        'Based on historical records since 1900, there is roughly a 7% chance of snow falling on Christmas Day in London.',
      category: 'weather',
    },
    8: {
      slug: 'blue-eyes-worldwide',
      value: 0.085,
      fraction: '17/200',
      indexNotation: '/2/8',
      source: 'https://en.wikipedia.org/wiki/Eye_color',
      exampleEvent: 'Having Blue Eyes (Worldwide)',
      exampleDescription:
        'About 8-10% of the global population has blue eyes, though the proportion is much higher in Northern Europe.',
      category: 'genetics',
    },
  },
  3: {
    1: {
      slug: 'born-cleft-lip-palate',
      value: 1 / 700,
      fraction: '1/700',
      indexNotation: '/3/1',
      source: 'https://www.cdc.gov/birth-defects/data-research/index.html',
      exampleEvent: 'Being Born with a Cleft Lip or Palate',
      exampleDescription:
        'Cleft lip and/or cleft palate occurs in about 1 in 700 births (approximately 0.14%), varying by ethnicity and geography.',
      category: 'human-biology',
    },
    2: {
      slug: 'born-specific-date',
      value: 1 / 365,
      fraction: '1/365',
      indexNotation: '/3/2',
      mantissaRest: 7397260273972603,
      source: 'https://en.wikipedia.org/wiki/Birthday',
      exampleEvent: 'Being Born on Any Specific Date',
      exampleDescription:
        'Assuming births are uniformly distributed, the probability of being born on any given calendar date is 1/365 (0.274%). Not to be confused with the birthday paradox, which states that only 23 people are needed for a >50% chance of two sharing a birthday.',
      category: 'daily-life',
    },
  },
  4: {
    1: [
      {
        slug: 'four-leaf-clover',
        value: 0.0001,
        fraction: '1/10000',
        mantissaRest: 1,
        indexNotation: '/4/1',
        source:
          'https://statisticsbyjim.com/fun/probability-theory-helps-find-more-four-leaf-clovers/',
        exampleEvent: 'Finding a Four-Leaf Clover',
        exampleDescription:
          'The probability of finding a four-leaf clover in a patch is about 1 in 10,000.',
        category: 'nature',
      },
      {
        slug: 'pearl-in-wild-oyster',
        value: 0.0001,
        fraction: '1/10000',
        indexNotation: '/4/1',
        source: 'https://thepearlexpert.com/natural-pearl-what-are-the-odds/',
        exampleEvent: 'Finding a Pearl in a Wild Oyster',
        exampleDescription:
          'The chance of finding a natural pearl in a wild oyster is estimated at roughly 1 in 10,000.',
        category: 'nature',
      },
    ],
    2: {
      slug: 'meteor-impact-lifetime',
      value: 80 / 300000,
      fraction: '1/3750',
      indexNotation: '/4/2',
      mantissaRest: 266666666666667,
      source:
        'https://stardate.org/faq/what-is-the-chance-of-earth-being-hit-by-a-comet-or-asteroid',
      exampleEvent: 'Meteor Impact in Your Lifetime',
      exampleDescription:
        "The chance of a significant meteor/asteroid hitting Earth in a given year is about 1 in 300,000; over an 80-year lifetime, that's about 1 in 3,750.",
      related: ['/6/1'],
      category: 'space',
    },
    6: [
      {
        slug: 'born-february-29',
        value: 1 / 1461,
        fraction: '1/1461',
        indexNotation: '/4/6',
        mantissaRest: 8446269678302532,
        source: 'https://en.wikipedia.org/wiki/February_29',
        exampleEvent: 'Being Born on February 29',
        exampleDescription:
          'February 29 occurs once every 4 years (with rare exceptions), giving a probability of about 1 in 1,461 of being born on a leap day.',
        category: 'daily-life',
      },
      {
        slug: 'complete-heterochromia',
        value: 6e-4,
        fraction: '6/10000',
        indexNotation: '/4/6',
        source: 'https://en.wikipedia.org/wiki/Heterochromia',
        exampleEvent: 'Having Complete Heterochromia',
        exampleDescription:
          'Complete heterochromia, where each eye is a distinctly different color, occurs in about 6 in 10,000 people.',
        category: 'genetics',
      },
    ],
    8: {
      slug: 'born-extra-finger',
      value: 8e-4,
      fraction: '8/10000',
      indexNotation: '/4/8',
      source: 'https://en.wikipedia.org/wiki/Polydactyly',
      exampleEvent: 'Being Born with an Extra Finger',
      exampleDescription:
        'Polydactyly (extra fingers or toes) occurs in about 8 in 10,000 live births worldwide.',
      category: 'human-biology',
    },
  },
  5: {
    1: {
      slug: 'flipping-16-heads',
      value: 1 / 65536,
      fraction: '1/65536',
      indexNotation: '/5/1',
      mantissaRest: 52587890625,
      source: 'https://www.youtube.com/shorts/bjFbDbvMEcc',
      exampleEvent: 'Flipping 16 Heads in a Row',
      exampleDescription:
        'The probability of flipping a fair coin and getting heads 16 times consecutively is (1/2)^16 = 1 in 65,536.',
      category: 'games',
    },
    3: {
      slug: 'winning-oscar-sag-member',
      value: 3.2e-5,
      fraction: '~1/32000',
      indexNotation: '/5/3',
      source:
        'https://www.reddit.com/r/oscarrace/comments/1i2bd1n/sag_and_oscar_voters/',
      exampleEvent: 'Winning an Oscar (Per SAG Member Per Year)',
      exampleDescription:
        'With about 5 acting awards per year and ~160,000 SAG-AFTRA members, the odds of any single member winning in a given year are roughly 1 in 32,000.',
      category: 'daily-life',
    },
    5: {
      slug: 'born-with-albinism',
      value: 5e-5,
      fraction: '1/20000',
      indexNotation: '/5/5',
      source: 'https://en.wikipedia.org/wiki/Albinism',
      exampleEvent: 'Being Born with Albinism',
      exampleDescription:
        'Oculocutaneous albinism occurs in approximately 1 in 20,000 people worldwide, though rates vary significantly by region.',
      category: 'genetics',
    },
    6: {
      slug: 'lightning-strike-lifetime-us',
      value: 0.00006535947712418301,
      fraction: '1/15300',
      indexNotation: '/5/6',
      mantissaRest: 535947712418301,
      source: 'https://www.weather.gov/safety/lightning-odds',
      exampleEvent: 'Lightning Strike in a Lifetime (US)',
      exampleDescription:
        'The odds of being struck by lightning in a given year are about 1 in 1,222,000. Over a lifetime (80 years), the odds are about 1 in 15,300.',
      related: ['/7/8'],
      category: 'weather',
    },
    8: [
      {
        slug: 'hole-in-one-golf',
        value: 8e-5,
        fraction: '1/12500',
        indexNotation: '/5/8',
        source: 'https://en.wikipedia.org/wiki/Hole_in_one',
        exampleEvent: 'Getting a Hole-in-One in Golf (Amateur)',
        exampleDescription:
          'An amateur golfer has roughly a 1 in 12,500 chance of making a hole-in-one on any given par-3 hole.',
        category: 'sports',
      },
      {
        slug: 'perfect-300-bowling',
        value: 8.7e-5,
        fraction: '1/11500',
        indexNotation: '/5/8',
        source: 'https://en.wikipedia.org/wiki/Perfect_game_(bowling)',
        exampleEvent: 'Bowling a Perfect 300 Game',
        exampleDescription:
          'The odds of bowling a perfect 300 game (12 consecutive strikes) are estimated at roughly 1 in 11,500 for the average league bowler.',
        category: 'sports',
      },
    ],
  },
  6: {
    1: [
      {
        slug: 'meteor-impact-yearly',
        value: 1.4285714285714286e-6,
        fraction: '1/700000',
        indexNotation: '/6/1',
        source:
          'https://stardate.org/faq/what-is-the-chance-of-earth-being-hit-by-a-comet-or-asteroid',
        exampleEvent: 'Meteor Impact in Your Lifetime',
        exampleDescription:
          'The probability of a significant meteor impact affecting Earth during your lifetime.',
        related: ['/4/2'],
        category: 'space',
      },
      {
        slug: 'royal-flush-poker',
        value: 1.5390771693292702e-6,
        fraction: '1/649740',
        indexNotation: '/6/1',
        mantissaRest: 5390771693292702,
        source: 'https://en.wikipedia.org/wiki/Poker_probability',
        exampleEvent: 'Being Dealt a Royal Flush in Poker',
        exampleDescription:
          'In a standard 5-card poker hand, the probability of being dealt a royal flush is 4 in 2,598,960 — about 1 in 649,740.',
        category: 'games',
      },
    ],
  },
  7: {
    1: {
      slug: 'becoming-us-president',
      value: 1.39e-7,
      fraction: '~46/330000000',
      indexNotation: '/7/1',
      source: 'https://en.wikipedia.org/wiki/President_of_the_United_States',
      exampleEvent: 'Becoming President of the United States',
      exampleDescription:
        'With 46 presidents out of a current population of ~330 million, the historical odds of any given US citizen becoming president are roughly 1 in 7.2 million.',
      category: 'daily-life',
    },
    2: {
      slug: 'shark-attack-us-yearly',
      value: 2.4e-7,
      fraction: '~1/4200000',
      indexNotation: '/7/2',
      source:
        'https://www.floridamuseum.ufl.edu/shark-attacks/yearly-worldwide-summary/',
      exampleEvent: 'Being Attacked by a Shark (US, Per Year)',
      exampleDescription:
        'With roughly 80 unprovoked shark attacks per year in the US and a population of ~330 million, the annual odds are about 1 in 4.2 million.',
      category: 'nature',
    },
    8: {
      slug: 'lightning-strike-yearly-us',
      mantissaRest: 183306055646482,
      indexNotation: '/7/8',
      value: 8.183306055646482e-7,
      fraction: '1/1220000',
      source: 'https://www.weather.gov/safety/lightning-odds',
      exampleEvent: 'Being Struck by Lightning in a Year (US)',
      exampleDescription:
        'The odds of being struck by lightning in a given year are about 1 in 1,222,000.',
      related: ['/5/6'],
      category: 'weather',
    },
  },
  8: {
    1: {
      slug: 'winning-academy-award',
      value: 1.94e-8,
      fraction: '~5/258000000',
      indexNotation: '/8/1',
      source: 'https://en.wikipedia.org/wiki/Academy_Awards',
      exampleEvent: 'Winning an Academy Award (Per US Adult Per Year)',
      exampleDescription:
        'With about 5 acting Oscars awarded each year to a population of ~258 million US adults, the chance for any single adult is about 1 in 52 million.',
      category: 'daily-life',
    },
    8: {
      slug: 'dying-plane-crash',
      value: 8.77e-8,
      fraction: '~1/11400000',
      indexNotation: '/8/8',
      source: 'https://en.wikipedia.org/wiki/Aviation_safety',
      exampleEvent: 'Dying in a Plane Crash (Per Flight)',
      exampleDescription:
        'The odds of dying in a commercial airplane crash are roughly 1 in 11.4 million per flight, making flying one of the safest modes of travel.',
      category: 'daily-life',
    },
  },
  9: {
    3: [
      {
        slug: 'winning-powerball',
        value: 3.333333333333333e-9,
        indexNotation: '/9/3',
        fraction: '1/300000000',
        source: 'https://en.wikipedia.org/wiki/Powerball',
        exampleEvent: 'Winning the Powerball Jackpot',
        exampleDescription:
          'The odds of winning the US Powerball jackpot are 1 in 292,201,338 — roughly 1 in 300 million.',
        category: 'games',
      },
      {
        slug: 'winning-mega-millions',
        value: 3.3e-9,
        indexNotation: '/9/3',
        fraction: '1/302575350',
        mantissaRest: 30496188800,
        source: 'https://en.wikipedia.org/wiki/Mega_Millions',
        exampleEvent: 'Winning the Mega Millions Jackpot',
        exampleDescription:
          'The odds of winning the Mega Millions jackpot are 1 in 302,575,350, virtually identical to Powerball and among the worst odds in gambling.',
        category: 'games',
      },
    ],
    7: {
      slug: 'winning-euromillions',
      value: 7.15e-9,
      fraction: '1/139838160',
      mantissaRest: 112384201,
      indexNotation: '/9/7',
      source: 'https://en.wikipedia.org/wiki/EuroMillions',
      exampleEvent: 'Winning the EuroMillions Jackpot',
      exampleDescription:
        'The odds of winning the EuroMillions jackpot are 1 in 139,838,160 — about twice as likely as US lotteries, but still astronomically rare.',
      category: 'games',
    },
  },
  12: {
    1: {
      slug: 'forensic-dna-match',
      value: 1e-12,
      fraction: '1/1000000000000',
      indexNotation: '/12/1',
      source:
        'https://www.sciencedirect.com/science/article/abs/pii/S1872497311001931',
      exampleEvent: 'Forensic DNA Match Between Unrelated People',
      exampleDescription:
        'Using standard forensic DNA profiling (CODIS with 20 STR loci), the random match probability between two unrelated individuals is on the order of 1 in a trillion or less.',
      category: 'genetics',
    },
  },
  24: {
    1: {
      slug: 'guessing-24-digit-number',
      value: 1e-24,
      fraction: '1/10^24',
      indexNotation: '/24/1',
      source: 'https://en.wikipedia.org/wiki/Brute-force_attack',
      exampleEvent: 'Guessing a 24-Digit Number on the First Try',
      exampleDescription:
        'Randomly guessing a specific 24-digit number has a probability of 1 in 10^24 (1 in 1 septillion).',
      category: 'games',
    },
  },
  68: {
    1: {
      slug: 'shuffling-deck-same-order',
      value: 1.24e-68,
      fraction: '1/52!',
      indexNotation: '/68/1',
      mantissaRest: 658,
      source: 'https://en.wikipedia.org/wiki/Shuffling#Randomization',
      exampleEvent: 'Shuffling a Deck Into the Same Order Twice',
      exampleDescription:
        'There are 52! (approximately 8.07 x 10^67) possible orderings of a standard deck of cards. The probability that two independent shuffles produce the exact same order is effectively zero.',
      category: 'games',
    },
  },
}) satisfies Source;
