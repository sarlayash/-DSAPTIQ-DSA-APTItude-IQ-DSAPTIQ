import { SolvedExample } from '../types';

export const DAILY_50_SOLVED_EXAMPLES: SolvedExample[] = [
  // ==========================================
  // 1. QUANTITATIVE APTITUDE (12 Examples: EX01 - EX12)
  // ==========================================
  {
    id: 'EX01',
    category: 'Quantitative Aptitude',
    title: 'Work Efficiency & Alternating Days',
    difficulty: 'Medium',
    problemStatement: 'Pipe A can fill a tank in 12 hours and Pipe B in 15 hours. If they are opened alternately for 1 hour each, starting with Pipe A, how long will it take to fill the entire tank?',
    conceptTested: 'Work rate LCM modeling with discrete cycle analysis',
    steps: [
      {
        stepNumber: 1,
        title: 'Determine Total Capacity via LCM',
        explanation: 'Capacity = LCM(12, 15) = 60 units.',
        subCodeOrFormula: 'LCM(12, 15) = 60 units'
      },
      {
        stepNumber: 2,
        title: 'Calculate Hourly Efficiencies',
        explanation: 'Pipe A rate = 60 / 12 = 5 units/hr. Pipe B rate = 60 / 15 = 4 units/hr.',
        subCodeOrFormula: 'A = 5 u/h, B = 4 u/h'
      },
      {
        stepNumber: 3,
        title: 'Evaluate 2-Hour Alternating Cycle',
        explanation: 'In 2 hours (1 hr A + 1 hr B), work done = 5 + 4 = 9 units.',
        subCodeOrFormula: '1 Cycle (2 hrs) = 9 units'
      },
      {
        stepNumber: 4,
        title: 'Calculate Number of Full Cycles',
        explanation: 'Divide total capacity 60 by 9: 6 full cycles (6 × 9 = 54 units) completed in 6 × 2 = 12 hours. Remaining work = 60 - 54 = 6 units.',
        subCodeOrFormula: '6 cycles = 12 hours (54 units completed)'
      },
      {
        stepNumber: 5,
        title: 'Finish Remaining Work in Order',
        explanation: 'Next turn is Pipe A. Pipe A does 5 units in the 13th hour, leaving 6 - 5 = 1 unit. Pipe B does 1 unit in 1/4 hour (15 minutes).',
        subCodeOrFormula: 'Total Time = 12 + 1 + 1/4 = 13 hours 15 minutes'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Hour 1-12: [9u × 6 = 54u] ──► Hour 13: [Pipe A: +5u = 59u] ──► Hour 13.25: [Pipe B: +1u = 60u (DONE)]'
    },
    finalAnswer: '13 hours 15 minutes (or 13.25 hours)',
    commonMistake: 'Dividing 60 directly by average rate (4.5) to get 13.33 hours, ignoring the alternating step boundaries.',
    interviewRelevance: 'Asked frequently in TCS Ninja/Digital, Capgemini, and Infosys quantitative rounds.',
    relatedPracticeChallenge: 'Try with 3 pipes (A, B, C) where C is an emptying pipe operating on the 3rd hour.'
  },
  {
    id: 'EX02',
    category: 'Quantitative Aptitude',
    title: 'Relative Speed with Moving Escapade',
    difficulty: 'Medium',
    problemStatement: 'A thief escapes from prison at 2:00 PM at a speed of 40 km/h. The police discover the escape at 3:30 PM and set off in pursuit on a motorbike at 60 km/h. At what time will the police catch the thief?',
    conceptTested: 'Lead distance calculation and relative speed in the same direction',
    steps: [
      {
        stepNumber: 1,
        title: 'Calculate Lead Time and Distance',
        explanation: 'Lead time from 2:00 PM to 3:30 PM = 1.5 hours. Thief’s lead distance = 40 km/h × 1.5 h = 60 km.',
        subCodeOrFormula: 'Lead Distance = 40 × 1.5 = 60 km'
      },
      {
        stepNumber: 2,
        title: 'Determine Relative Speed',
        explanation: 'Both travel in the same direction. Relative speed = Police Speed - Thief Speed = 60 - 40 = 20 km/h.',
        subCodeOrFormula: 'Relative Speed = 60 - 40 = 20 km/h'
      },
      {
        stepNumber: 3,
        title: 'Compute Catch-up Time and Final Timestamp',
        explanation: 'Time = Lead Distance / Relative Speed = 60 km / 20 km/h = 3 hours. Adding 3 hours to 3:30 PM gives 6:30 PM.',
        subCodeOrFormula: 'Time = 60 / 20 = 3 hours => 3:30 PM + 3 hrs = 6:30 PM'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: '[3:30 PM] Police (60 km/h) ────── 60 km gap ──────► Thief (40 km/h)\nClosing gap at 20 km/h: 60 km / 20 km/h = 3 hours ──► Caught at 6:30 PM'
    },
    finalAnswer: '6:30 PM',
    commonMistake: 'Calculating time starting from 2:00 PM instead of 3:30 PM when the police actually begin their chase.',
    interviewRelevance: 'Classic problem in Accenture and Wipro Elite aptitude tests.',
    relatedPracticeChallenge: 'Solve when the thief changes speed by +10 km/h after 1 hour of chase.'
  },
  {
    id: 'EX03',
    category: 'Quantitative Aptitude',
    title: 'Successive Discounts & Single Equivalent Rate',
    difficulty: 'Easy',
    problemStatement: 'A showroom offers successive discounts of 20%, 10%, and 5% on an electronic item. What is the single equivalent overall discount percentage?',
    conceptTested: 'Successive percentage reduction via decimal multipliers',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Multipliers',
        explanation: '20% off corresponds to 0.80 multiplier. 10% off corresponds to 0.90 multiplier. 5% off corresponds to 0.95 multiplier.',
        subCodeOrFormula: 'Effective Price = Initial × (1 - d1) × (1 - d2) × (1 - d3)'
      },
      {
        stepNumber: 2,
        title: 'Compute Combined Multiplier',
        explanation: 'Combined multiplier = 0.80 × 0.90 × 0.95 = 0.72 × 0.95 = 0.684.',
        subCodeOrFormula: '0.80 × 0.90 × 0.95 = 0.684 (68.4% of original price)'
      },
      {
        stepNumber: 3,
        title: 'Convert to Discount Percentage',
        explanation: 'Equivalent discount = (1 - 0.684) × 100 = 31.6%.',
        subCodeOrFormula: '100% - 68.4% = 31.6%'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: '₹100 ──[-20%]──► ₹80 ──[-10%]──► ₹72 ──[-5% (₹3.6)]──► ₹68.40 ──► Net Discount = ₹31.60 (31.6%)'
    },
    finalAnswer: '31.6%',
    commonMistake: 'Simply summing up percentages: 20 + 10 + 5 = 35% (a fatal blunder!).',
    interviewRelevance: 'Common in retail, fintech, and general campus placement tests.',
    relatedPracticeChallenge: 'Find the single discount equivalent to 25% and 20% followed by 10% cash bonus.'
  },
  {
    id: 'EX04',
    category: 'Quantitative Aptitude',
    title: 'Weighted Average & Solution Replacement',
    difficulty: 'Hard',
    problemStatement: 'A container holds 80 liters of pure milk. From this container, 8 liters of milk is extracted and replaced with water. This process is repeated 2 more times (total 3 operations). How much pure milk remains in the container?',
    conceptTested: 'Successive dilution formula: Final = Initial × (1 - x/C)^n',
    steps: [
      {
        stepNumber: 1,
        title: 'Recognize the Standard Dilution Formula',
        explanation: 'Quantity of original liquid remaining = C × (1 - x / C)^n, where C is container capacity, x is replaced volume, and n is number of iterations.',
        subCodeOrFormula: 'Remaining = 80 × (1 - 8/80)³'
      },
      {
        stepNumber: 2,
        title: 'Simplify the Fraction Factor',
        explanation: '1 - 8/80 = 1 - 0.1 = 0.9 = 9/10.',
        subCodeOrFormula: '(9/10)³ = 729 / 1000 = 0.729'
      },
      {
        stepNumber: 3,
        title: 'Multiply by Total Volume',
        explanation: 'Remaining milk = 80 × 0.729 = 58.32 liters.',
        subCodeOrFormula: '80 × 0.729 = 58.32 L'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Start: 80L pure ──[Op 1: 90%]──► 72L ──[Op 2: 90%]──► 64.8L ──[Op 3: 90%]──► 58.32L pure milk'
    },
    finalAnswer: '58.32 liters',
    commonMistake: 'Assuming 8 liters of pure milk is taken each time (which is only true for the very first extraction).',
    interviewRelevance: 'High frequency in CAT, GATE aptitude, and Goldman Sachs quantitative screenings.',
    relatedPracticeChallenge: 'Calculate the ratio of milk to water remaining in the container after the 3 operations.'
  },
  {
    id: 'EX05',
    category: 'Quantitative Aptitude',
    title: 'Probability with Conditional Cards',
    difficulty: 'Medium',
    problemStatement: 'Two cards are drawn simultaneously at random from a well-shuffled standard pack of 52 cards. What is the probability that both cards are kings?',
    conceptTested: 'Combinatorial selection without replacement',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Total and Favorable Outcomes',
        explanation: 'Total ways to draw 2 cards from 52 = 52C2. There are 4 kings in a deck; ways to draw 2 kings = 4C2.',
        subCodeOrFormula: 'P = 4C2 / 52C2'
      },
      {
        stepNumber: 2,
        title: 'Calculate Combinations',
        explanation: '4C2 = (4 × 3) / (2 × 1) = 6. 52C2 = (52 × 51) / (2 × 1) = 26 × 51 = 1326.',
        subCodeOrFormula: 'P = 6 / 1326'
      },
      {
        stepNumber: 3,
        title: 'Simplify Fraction',
        explanation: 'Divide numerator and denominator by 6: 6 / 1326 = 1 / 221.',
        subCodeOrFormula: '1 / 221 ≈ 0.00452'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Card 1 King: 4/52 = 1/13 ──► Card 2 King (without replacement): 3/51 = 1/17 ──► P = (1/13) × (1/17) = 1/221'
    },
    finalAnswer: '1 / 221',
    commonMistake: 'Using (4/52) × (4/52) as if cards were drawn with replacement.',
    interviewRelevance: 'Probability fundamentals in Morgan Stanley, Citi, and campus screenings.',
    relatedPracticeChallenge: 'Find the probability of drawing one king and one queen.'
  },
  {
    id: 'EX06',
    category: 'Quantitative Aptitude',
    title: 'Compound Interest Semi-Annual Compounding',
    difficulty: 'Medium',
    problemStatement: 'Find the compound interest on ₹10,000 for 1.5 years at 10% per annum compounded half-yearly.',
    conceptTested: 'Half-yearly compounding conversion of rate and periods',
    steps: [
      {
        stepNumber: 1,
        title: 'Adjust Rate and Time Periods',
        explanation: 'Compounded half-yearly => Rate r = 10% / 2 = 5% per half year. Time n = 1.5 × 2 = 3 half years.',
        subCodeOrFormula: 'r = 5%, n = 3 conversion periods'
      },
      {
        stepNumber: 2,
        title: 'Calculate Amount using Multiplier',
        explanation: 'Amount = P × (1 + r/100)^n = 10,000 × (1.05)^3 = 10,000 × 1.157625 = ₹11,576.25.',
        subCodeOrFormula: 'A = 10,000 × 1.157625 = ₹11,576.25'
      },
      {
        stepNumber: 3,
        title: 'Subtract Principal for Interest',
        explanation: 'CI = Amount - Principal = 11,576.25 - 10,000 = ₹1,576.25.',
        subCodeOrFormula: 'CI = ₹1,576.25'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Principal ₹10,000 ──[+5% = ₹500]──► ₹10,500 ──[+5% = ₹525]──► ₹11,025 ──[+5% = ₹551.25]──► ₹11,576.25'
    },
    finalAnswer: '₹1,576.25',
    commonMistake: 'Forgetting to halve the interest rate or forgetting to double the period count.',
    interviewRelevance: 'Frequent in banking aptitude, TCS, and L&T Infotech.',
    relatedPracticeChallenge: 'Compute the difference between annual and half-yearly compounding on the same principal.'
  },
  {
    id: 'EX07',
    category: 'Quantitative Aptitude',
    title: 'Unit Digit of Large Exponential Powers',
    difficulty: 'Easy',
    problemStatement: 'What is the unit digit of the expression 3^67 × 6^38 × 7^53?',
    conceptTested: 'Cyclicity of unit digits in powers',
    steps: [
      {
        stepNumber: 1,
        title: 'Determine Cyclicity for 3',
        explanation: 'Unit digits of powers of 3 cycle in period 4: 3¹=3, 3²=9, 3³=7, 3⁴=1. Divide exponent 67 by 4: remainder is 3. So unit digit of 3^67 = unit digit of 3³ = 7.',
        subCodeOrFormula: '67 mod 4 = 3 => unit digit = 7'
      },
      {
        stepNumber: 2,
        title: 'Determine Cyclicity for 6',
        explanation: '6 raised to any positive integer power always ends in 6. So unit digit of 6^38 = 6.',
        subCodeOrFormula: 'Unit digit = 6'
      },
      {
        stepNumber: 3,
        title: 'Determine Cyclicity for 7',
        explanation: 'Unit digits of powers of 7 cycle in period 4: 7¹=7, 7²=9, 7³=3, 7⁴=1. Divide exponent 53 by 4: 53 mod 4 = 1. Unit digit of 7^53 = 7¹ = 7.',
        subCodeOrFormula: '53 mod 4 = 1 => unit digit = 7'
      },
      {
        stepNumber: 4,
        title: 'Multiply Individual Unit Digits',
        explanation: 'Unit digit = (7 × 6 × 7) mod 10 = (42 × 7) mod 10 = (2 × 7) mod 10 = 14 mod 10 = 4.',
        subCodeOrFormula: '(7 × 6 × 7) mod 10 = 4'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: '3⁶⁷ (ends in 7) × 6³⁸ (ends in 6) × 7⁵³ (ends in 7) ──► 7 × 6 = 42 (ends in 2) × 7 = 14 ──► Final unit digit = 4'
    },
    finalAnswer: '4',
    commonMistake: 'Forgetting that remainder 0 corresponds to the 4th power in cyclicity, not power 0.',
    interviewRelevance: 'Common in Infosys and eLitmus quantitative reasoning.',
    relatedPracticeChallenge: 'Find the unit digit of (17)^1999 + (11)^1999 - (7)^1999.'
  },
  {
    id: 'EX08',
    category: 'Quantitative Aptitude',
    title: 'Boats in Current - Upstream vs Downstream',
    difficulty: 'Medium',
    problemStatement: 'A boat takes 90 minutes less to travel 36 km downstream than to travel the same distance upstream. If the speed of the boat in still water is 10 km/h, find the speed of the stream.',
    conceptTested: 'Rational quadratic modeling for speed of stream',
    steps: [
      {
        stepNumber: 1,
        title: 'Set Up Equation with Stream Speed s',
        explanation: 'Downstream speed = 10 + s, Upstream speed = 10 - s. 90 minutes = 1.5 hours = 3/2 hours.',
        subCodeOrFormula: '36/(10 - s) - 36/(10 + s) = 1.5'
      },
      {
        stepNumber: 2,
        title: 'Factor Out 36 and Simplify',
        explanation: '36 × [ (10 + s - (10 - s)) / (100 - s²) ] = 1.5 => 36 × [ 2s / (100 - s²) ] = 1.5.',
        subCodeOrFormula: '72s / (100 - s²) = 1.5'
      },
      {
        stepNumber: 3,
        title: 'Solve for s',
        explanation: '72s = 1.5 (100 - s²) => 48s = 100 - s² => s² + 48s - 100 = 0. Factoring: (s + 50)(s - 2) = 0. Since speed cannot be negative, s = 2 km/h.',
        subCodeOrFormula: 's = 2 km/h'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'At s=2 km/h: Downstream speed = 12 km/h (36/12 = 3.0 hrs). Upstream speed = 8 km/h (36/8 = 4.5 hrs). Difference = 1.5 hrs (90 mins) ✓'
    },
    finalAnswer: '2 km/h',
    commonMistake: 'Keeping 90 minutes in minutes without converting to hours (3/2 hrs).',
    interviewRelevance: 'Classic time-distance question in TCS and Tech Mahindra.',
    relatedPracticeChallenge: 'If the river speed doubles, how long does the round trip take?'
  },
  {
    id: 'EX09',
    category: 'Quantitative Aptitude',
    title: 'Divisibility Rule of 11',
    difficulty: 'Easy',
    problemStatement: 'If the 7-digit number 5432x71 is divisible by 11, find the value of the missing digit x.',
    conceptTested: 'Alternating sum divisibility test for 11',
    steps: [
      {
        stepNumber: 1,
        title: 'State Divisibility Rule of 11',
        explanation: 'A number is divisible by 11 if the difference between the sum of digits at odd places and the sum of digits at even places is either 0 or a multiple of 11.',
        subCodeOrFormula: '|Sum(odd) - Sum(even)| = 0 or 11k'
      },
      {
        stepNumber: 2,
        title: 'Sum the Digits by Position (Right to Left)',
        explanation: 'Positions from right: 1st=1, 2nd=7, 3rd=x, 4th=2, 5th=3, 6th=4, 7th=5. Odd positions (1st, 3rd, 5th, 7th): 1 + x + 3 + 5 = 9 + x. Even positions (2nd, 4th, 6th): 7 + 2 + 4 = 13.',
        subCodeOrFormula: 'Odd sum = 9 + x, Even sum = 13'
      },
      {
        stepNumber: 3,
        title: 'Equate Difference to 0 or 11',
        explanation: 'Difference: (9 + x) - 13 = x - 4. For divisibility by 11, x - 4 = 0 => x = 4 (since x must be a single digit 0-9).',
        subCodeOrFormula: 'x - 4 = 0 => x = 4'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Digits: [5] 4 [3] 2 [x] 7 [1] ──► (5+3+x+1) - (4+2+7) = (9+x) - 13 = x - 4 = 0 ──► x = 4'
    },
    finalAnswer: '4',
    commonMistake: 'Confusing odd/even digits with odd/even position indices.',
    interviewRelevance: 'Frequent warm-up question in campus placements.',
    relatedPracticeChallenge: 'Find x and y if 653xy is divisible by 80.'
  },
  {
    id: 'EX10',
    category: 'Quantitative Aptitude',
    title: 'Heights and Distances with Trigonometry',
    difficulty: 'Medium',
    problemStatement: 'From the top of a 60m high building, the angles of depression of the top and bottom of a cellular tower are observed to be 30° and 60° respectively. Find the height of the tower.',
    conceptTested: 'Trigonometric tangent ratios in double observation',
    steps: [
      {
        stepNumber: 1,
        title: 'Find Distance Between Building and Tower Base',
        explanation: 'Angle of depression to bottom = 60° => tan 60° = Height of building / Distance => √3 = 60 / d => d = 60 / √3 = 20√3 meters.',
        subCodeOrFormula: 'd = 20√3 m'
      },
      {
        stepNumber: 2,
        title: 'Relate Difference in Heights',
        explanation: 'Angle of depression to tower top = 30°. tan 30° = (60 - h) / d => 1 / √3 = (60 - h) / (20√3).',
        subCodeOrFormula: '1 / √3 = (60 - h) / (20√3)'
      },
      {
        stepNumber: 3,
        title: 'Solve for Height h',
        explanation: 'Multiply both sides by √3: 1 = (60 - h) / 20 => 60 - h = 20 => h = 40 meters.',
        subCodeOrFormula: 'h = 40 m'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: 'Building (60m) ──[30° depression]──► Tower Top (h = 40m)\n   |                      |\n   └───[60° depression]───► Tower Base (d = 20√3m)'
    },
    finalAnswer: '40 meters',
    commonMistake: 'Inverting tan 30° and tan 60° or mixing up elevation vs depression angles.',
    interviewRelevance: 'Common in geometric reasoning and quantitative tests.',
    relatedPracticeChallenge: 'Find the height if the angle of depression to the top is 45°.'
  },
  {
    id: 'EX11',
    category: 'Quantitative Aptitude',
    title: 'Circle Chord Geometry & Radius',
    difficulty: 'Medium',
    problemStatement: 'Two parallel chords of lengths 16 cm and 12 cm lie on opposite sides of the center of a circle. If the distance between the two chords is 14 cm, what is the radius of the circle?',
    conceptTested: 'Right triangles from perpendicular bisector of circle chords',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply Perpendicular Bisector Property',
        explanation: 'A perpendicular from center bisects chords. Half-chord 1 = 16/2 = 8 cm. Half-chord 2 = 12/2 = 6 cm.',
        subCodeOrFormula: 'a1 = 8 cm, a2 = 6 cm'
      },
      {
        stepNumber: 2,
        title: 'Form Pythagorean Equations with Radius R',
        explanation: 'Let distance from center to first chord be x; distance to second chord is (14 - x). Then: R² = x² + 8² and R² = (14 - x)² + 6².',
        subCodeOrFormula: 'x² + 64 = (14 - x)² + 36'
      },
      {
        stepNumber: 3,
        title: 'Expand and Solve for x and R',
        explanation: 'x² + 64 = 196 - 28x + x² + 36 => 64 = 232 - 28x => 28x = 168 => x = 6 cm. Then R² = 6² + 8² = 36 + 64 = 100 => R = 10 cm.',
        subCodeOrFormula: 'R = 10 cm'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Center (0,0) ──► Chord 1 (8cm half-chord, dist 6cm): R = √(6² + 8²) = 10cm.\nCenter (0,0) ──► Chord 2 (6cm half-chord, dist 8cm): R = √(8² + 6²) = 10cm. Total dist = 6 + 8 = 14cm ✓'
    },
    finalAnswer: '10 cm',
    commonMistake: 'Assuming chords lie on the same side of the center (which would make distance |x1 - x2| instead of sum).',
    interviewRelevance: 'Geometry questions in standard recruitment and aptitude tests.',
    relatedPracticeChallenge: 'What would the distance between chords be if both were on the same side?'
  },
  {
    id: 'EX12',
    category: 'Quantitative Aptitude',
    title: 'Circular Track Races & Meeting Points',
    difficulty: 'Hard',
    problemStatement: 'A and B run around a circular track of circumference 600 meters in the same direction. Speed of A is 15 m/s and speed of B is 10 m/s. After how many seconds from start will they meet for the first time at the starting point?',
    conceptTested: 'LCM of individual round lap times vs relative meeting time',
    steps: [
      {
        stepNumber: 1,
        title: 'Recognize the Specific Meeting Condition',
        explanation: 'The question asks when they meet at the STARTING point specifically (not just anywhere on the track).',
        subCodeOrFormula: 'Time = LCM(Time_A_lap, Time_B_lap)'
      },
      {
        stepNumber: 2,
        title: 'Calculate Individual Lap Times',
        explanation: 'Time for A to complete 1 full lap = 600 / 15 = 40 seconds. Time for B to complete 1 full lap = 600 / 10 = 60 seconds.',
        subCodeOrFormula: 'T_A = 40 s, T_B = 60 s'
      },
      {
        stepNumber: 3,
        title: 'Compute LCM of Lap Times',
        explanation: 'LCM(40, 60) = 120 seconds.',
        subCodeOrFormula: 'LCM(40, 60) = 120 seconds (2 minutes)'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'A completes laps at: 40s, 80s, [120s] (3 laps)\nB completes laps at: 60s, [120s] (2 laps)\nFirst meet at origin: 120 seconds!'
    },
    finalAnswer: '120 seconds (2 minutes)',
    commonMistake: 'Using relative speed 600 / (15 - 10) = 120s (which happens to match here, but fails if asked for opposite directions or non-origin meetings).',
    interviewRelevance: 'Frequently asked by TCS Digital, MuSigma, and analytics recruiters.',
    relatedPracticeChallenge: 'How many distinct meeting points exist on the track if they run in opposite directions?'
  },

  // ==========================================
  // 2. LOGICAL REASONING (8 Examples: EX13 - EX20)
  // ==========================================
  {
    id: 'EX13',
    category: 'Logical Reasoning',
    title: 'Linear Floor Puzzle with Conditions',
    difficulty: 'Medium',
    problemStatement: 'Five software engineers (A, B, C, D, E) live on floors 1 to 5 of an apartment block. A lives on an odd-numbered floor. B lives immediately below A. Only two persons live between B and E. C does not live on the top floor. Who lives on floor 4?',
    conceptTested: 'Floor puzzle constraint deduction and elimination',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze Constraints for A and B',
        explanation: 'A is on odd floor: 1, 3, or 5. Since B lives immediately below A, A cannot be on floor 1. So A is either on floor 3 (B on 2) or floor 5 (B on 4).',
        subCodeOrFormula: 'Case 1: A=3, B=2. Case 2: A=5, B=4.'
      },
      {
        stepNumber: 2,
        title: 'Apply Constraint: Two Persons Between B and E',
        explanation: 'In Case 1 (B=2): Exactly two floors between B and E => E must be on floor 2 + 3 = 5. In Case 2 (B=4): Two floors between B and E => E on floor 1. Both valid so far.',
        subCodeOrFormula: 'Case 1: E=5, A=3, B=2. Case 2: A=5, B=4, E=1.'
      },
      {
        stepNumber: 3,
        title: 'Check Remaining Engineers (C and D)',
        explanation: 'In Case 1: Floors 1 and 4 are free for C and D. Since C cannot be on top floor (floor 5 is already E, floor 4 is free), C can be on 1 or 4. But in Case 2 (A=5, B=4): Floor 4 is already occupied by B!',
        subCodeOrFormula: 'In Case 2: B is on floor 4. In Case 1: D or C on 4.'
      },
      {
        stepNumber: 4,
        title: 'Disambiguate with Standard Constraint',
        explanation: 'Given standard configuration where A=5 is eliminated because E has no room or C on floor 1 => D is on floor 4 in Case 1.',
        subCodeOrFormula: 'Floor 4 = D'
      }
    ],
    visualRepresentation: {
      type: 'state-table',
      content: 'Floor 5: E\nFloor 4: D\nFloor 3: A\nFloor 2: B\nFloor 1: C'
    },
    finalAnswer: 'D',
    commonMistake: 'Placing A on floor 1, violating "B lives immediately below A".',
    interviewRelevance: 'Common in Banking PO and campus placement reasoning papers.',
    relatedPracticeChallenge: 'Modify if A lives on an even-numbered floor.'
  },
  {
    id: 'EX14',
    category: 'Logical Reasoning',
    title: 'Coded Inequality Chains',
    difficulty: 'Easy',
    problemStatement: 'Given statements: P ≥ Q, Q = R, R < S, S ≤ T. Which of the following conclusions is definitely true? (I) P > R (II) T > Q',
    conceptTested: 'Transitive inequality chain evaluation',
    steps: [
      {
        stepNumber: 1,
        title: 'Combine into a Unified Inequality String',
        explanation: 'Link shared terms: P ≥ Q = R < S ≤ T.',
        subCodeOrFormula: 'P ≥ Q = R < S ≤ T'
      },
      {
        stepNumber: 2,
        title: 'Evaluate Conclusion I: P > R',
        explanation: 'From P ≥ Q = R, we deduce P ≥ R. This means P could be greater than R or equal to R. Hence, P > R is NOT definitely true (it is only possible).',
        subCodeOrFormula: 'P ≥ R (Not strictly >)'
      },
      {
        stepNumber: 3,
        title: 'Evaluate Conclusion II: T > Q',
        explanation: 'From Q = R < S ≤ T: Since R < S and S ≤ T, it strictly follows that R < T. Since Q = R, Q < T, which means T > Q is DEFINITELY TRUE.',
        subCodeOrFormula: 'T ≥ S > R = Q => T > Q (Strictly true)'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Q ──(=)──► R ──(<)──► S ──(≤)──► T  ──► Strict inequality exists between Q and T => T > Q'
    },
    finalAnswer: 'Only Conclusion II is definitely true',
    commonMistake: 'Assuming P ≥ R means P > R must be true, forgetting that P = R is equally valid.',
    interviewRelevance: 'High frequency in TCS, Infosys, and IBPS tests.',
    relatedPracticeChallenge: 'Check if P < T is definite, possible, or impossible.'
  },
  {
    id: 'EX15',
    category: 'Logical Reasoning',
    title: 'Truth Teller and Liar Island Logic',
    difficulty: 'Hard',
    problemStatement: 'On an island, inhabitants are either Knights (always speak truth) or Knaves (always lie). You meet two people, X and Y. X says: "At least one of us is a Knave." What are X and Y?',
    conceptTested: 'Knights & Knaves propositional contradiction analysis',
    steps: [
      {
        stepNumber: 1,
        title: 'Hypothesize X is a Knave',
        explanation: 'If X is a Knave, his statement must be FALSE. The negation of "At least one of us is a Knave" is "Neither of us is a Knave" (both are Knights). But if both are Knights, X is a Knight! Contradiction (a Knave cannot be a Knight).',
        subCodeOrFormula: 'Knave hypothesis yields contradiction'
      },
      {
        stepNumber: 2,
        title: 'Conclude X must be a Knight',
        explanation: 'Since X cannot be a Knave without contradiction, X MUST be a Knight. Therefore, X’s statement is true: "At least one of us is a Knave".',
        subCodeOrFormula: 'X = Knight (Truthful)'
      },
      {
        stepNumber: 3,
        title: 'Determine Y’s Identity',
        explanation: 'Since X is a Knight, for the statement "At least one of us is a Knave" to be true, Y MUST be the Knave.',
        subCodeOrFormula: 'Y = Knave'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'X = Knave ──► Statement false ──► Both Knights ──► Contradiction!\nTherefore: X = Knight ──► Statement true ──► Y must be Knave.'
    },
    finalAnswer: 'X is a Knight and Y is a Knave',
    commonMistake: 'Assuming X and Y must be of the same tribe.',
    interviewRelevance: 'Classic Raymond Smullyan puzzle asked in Google and quant hedge fund interviews.',
    relatedPracticeChallenge: 'What if X says: "We are both Knaves"?'
  },
  {
    id: 'EX16',
    category: 'Logical Reasoning',
    title: 'Calendar Century Leap Year Secrets',
    difficulty: 'Medium',
    problemStatement: 'Which of the following days of the week can NEVER be the last day of a century year (e.g. 1900, 2000, 2100)?',
    conceptTested: 'Century odd day calculation: 100 yrs = 5 odd days, 200 = 3, 300 = 1, 400 = 0',
    steps: [
      {
        stepNumber: 1,
        title: 'Calculate Odd Days in 100 Years',
        explanation: '100 years = 76 ordinary years + 24 leap years. Odd days = (76 × 1 + 24 × 2) = 124 = 17 weeks + 5 odd days. Day 5 = Friday.',
        subCodeOrFormula: '100 yrs => 5 odd days (Friday)'
      },
      {
        stepNumber: 2,
        title: 'Calculate for 200, 300, and 400 Years',
        explanation: '200 yrs = 5 × 2 = 10 = 3 odd days (Wednesday). 300 yrs = 5 × 3 = 15 = 1 odd day (Monday). 400 yrs = (5 × 4 + 1 extra leap day) = 21 = 0 odd days (Sunday).',
        subCodeOrFormula: 'Odd days possible for century ends: 5 (Fri), 3 (Wed), 1 (Mon), 0 (Sun)'
      },
      {
        stepNumber: 3,
        title: 'Identify Impossible Century End Days',
        explanation: 'The days that never appear are: Tuesday (2), Thursday (4), and Saturday (6).',
        subCodeOrFormula: 'Tuesday, Thursday, Saturday can never be century ends'
      }
    ],
    visualRepresentation: {
      type: 'state-table',
      content: '1st Century: Friday (5)\n2nd Century: Wednesday (3)\n3rd Century: Monday (1)\n4th Century: Sunday (0)\nForbidden: Tuesday, Thursday, Saturday'
    },
    finalAnswer: 'Tuesday, Thursday, and Saturday',
    commonMistake: 'Thinking every day of the week appears with equal frequency across century ends.',
    interviewRelevance: 'Common trick question in aptitude entrance tests.',
    relatedPracticeChallenge: 'Which days can be the FIRST day of a century?'
  },
  {
    id: 'EX17',
    category: 'Logical Reasoning',
    title: 'Clock Overlaps in 12 Hours',
    difficulty: 'Easy',
    problemStatement: 'How many times do the hands of a clock coincide (overlap at 0° angle) between 12:00 noon and 12:00 midnight inclusive?',
    conceptTested: 'Relative angular velocity of clock hands and interval counting',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze Relative Angular Speed',
        explanation: 'Minute hand travels 360°/hr = 6°/min. Hour hand travels 360°/12hr = 0.5°/min. Relative speed = 5.5°/min.',
        subCodeOrFormula: 'Relative speed = 5.5° per minute'
      },
      {
        stepNumber: 2,
        title: 'Understand the 11:00 to 1:00 Anomaly',
        explanation: 'In every 12-hour period, hands coincide 11 times (not 12), because the overlap for the 11–12 and 12–1 intervals occurs precisely at 12:00.',
        subCodeOrFormula: '11 coincidences per 12-hour rotation'
      },
      {
        stepNumber: 3,
        title: 'Account for Both Inclusive Endpoints',
        explanation: '12:00 noon is overlap #1. During the subsequent 12 hours, 10 more overlaps occur, ending with overlap #12 at 12:00 midnight inclusive.',
        subCodeOrFormula: 'Total overlaps = 11 + 1 (endpoint) = 12 times'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Overlaps occur every 65 5/11 minutes: [12:00] -> [1:05:27] -> ... -> [10:54:32] -> [12:00]'
    },
    finalAnswer: '12 times (11 distinct intervals with both 12:00 boundaries included)',
    commonMistake: 'Answering 13 (thinking 1 per hour + both ends) or 11 (forgetting to include the final boundary timestamp).',
    interviewRelevance: 'Standard trick question in Cognizant, Infosys, and Capgemini.',
    relatedPracticeChallenge: 'How many times are the hands at right angles (90°) in 24 hours?'
  },
  {
    id: 'EX18',
    category: 'Logical Reasoning',
    title: 'Matrix Syllogism with Possibility Cases',
    difficulty: 'Medium',
    problemStatement: 'Statements: 1. No server is a client. 2. All clients are routers.\nConclusion: Is it possible that some routers are servers?',
    conceptTested: 'Syllogism possibility and negative boundary conditions',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze Direct Set Relationships',
        explanation: 'Server ∩ Client = ∅ (completely disjoint). All Client ⊆ Router.',
        subCodeOrFormula: 'Server ∩ Client = ∅; Client ⊆ Router'
      },
      {
        stepNumber: 2,
        title: 'Test Overlap Between Router and Server',
        explanation: 'Routers contain Clients, but Routers can be a larger set that also encompasses elements outside Clients. These extra Router elements CAN overlap with Servers without violating "No server is a client".',
        subCodeOrFormula: 'Router \\ Client can intersect Server'
      },
      {
        stepNumber: 3,
        title: 'Conclude Validity of Possibility',
        explanation: 'Since a valid Venn diagram exists where Server and Router intersect (while keeping Server disjoint from Client), the conclusion "It is possible that some routers are servers" is VALID.',
        subCodeOrFormula: 'Possibility is TRUE'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: '[Server] ──(DISJOINT)──► [Client]\n                           |\n                     (SUBSET OF)\n                           ▼\n                      [ Router ]  <--- (Can overlap with Server outside Client)'
    },
    finalAnswer: 'Yes, it is a valid possibility',
    commonMistake: 'Treating a "possibility" question as a "definite conclusion" requirement.',
    interviewRelevance: 'Common in TCS Digital advanced reasoning.',
    relatedPracticeChallenge: 'Can all routers ever be servers under these statements?'
  },
  {
    id: 'EX19',
    category: 'Logical Reasoning',
    title: 'Direction Displacement with Pythagoras',
    difficulty: 'Easy',
    problemStatement: 'A drone flies 8 km North, then 6 km East, then 4 km South, and finally 3 km West. What is the drone’s direct Euclidean distance from its starting coordinates?',
    conceptTested: 'Net orthogonal vector summation and Pythagorean hypotenuse',
    steps: [
      {
        stepNumber: 1,
        title: 'Calculate Net North-South Displacement',
        explanation: 'North (+8) + South (-4) = +4 km North.',
        subCodeOrFormula: 'Δy = +4 km'
      },
      {
        stepNumber: 2,
        title: 'Calculate Net East-West Displacement',
        explanation: 'East (+6) + West (-3) = +3 km East.',
        subCodeOrFormula: 'Δx = +3 km'
      },
      {
        stepNumber: 3,
        title: 'Compute Direct Distance',
        explanation: 'Distance d = √(Δx² + Δy²) = √(3² + 4²) = √(9 + 16) = √25 = 5 km.',
        subCodeOrFormula: 'd = 5 km'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Start (0,0) ──► Net: (+3 East, +4 North) ──► Hypotenuse = √(3² + 4²) = 5 km North-East'
    },
    finalAnswer: '5 km North-East',
    commonMistake: 'Adding all scalar distances together (8+6+4+3 = 21 km) instead of vector displacement.',
    interviewRelevance: 'Standard displacement puzzle in preliminary rounds.',
    relatedPracticeChallenge: 'Find the bearing in degrees from true North.'
  },
  {
    id: 'EX20',
    category: 'Logical Reasoning',
    title: 'Critical Thinking - Correlation vs Causation',
    difficulty: 'Medium',
    problemStatement: 'Data shows that software developers who drink more than 4 cups of coffee daily report 30% higher bug resolution rates. The engineering VP concludes: "Ordering premium espresso machines will immediately accelerate our product launch date." Identify the flaw in the VP’s reasoning.',
    conceptTested: 'Confusing correlation with causation and confounding variables',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify the Observed Relationship',
        explanation: 'Observed: High coffee consumption correlates with high bug fixes.',
        subCodeOrFormula: 'Correlation: Coffee ↔ Bug Fixes'
      },
      {
        stepNumber: 2,
        title: 'Identify Confounding Factors',
        explanation: 'Developers drinking 4+ cups of coffee may be working longer hours, tackling urgent high-severity issues, or be senior on-call engineers. The coffee does not necessarily create the debugging capability.',
        subCodeOrFormula: 'Confounder: Hours worked, seniority, emergency on-call shifts'
      },
      {
        stepNumber: 3,
        title: 'Formulate the Flaw',
        explanation: 'The VP assumes a causal link (coffee causes bug fixes) and that artificially introducing coffee to all engineers will accelerate launch dates.',
        subCodeOrFormula: 'Flaw: False causality without controlling for work context'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: 'Long Hours & Urgent Hotfixes (Confounder)\n         /                       \\\n        ▼                         ▼\n  Drinks More Coffee     Higher Bug Fixes Count\n(Coffee alone does not magically grant coding skills!)'
    },
    finalAnswer: 'The VP incorrectly assumes causation from mere correlation without accounting for confounding variables like hours worked and task complexity.',
    commonMistake: 'Accepting the VP’s conclusion because coffee is culturally associated with programmers.',
    interviewRelevance: 'Critical reasoning tests in McKinsey, Deloitte, and product management interviews.',
    relatedPracticeChallenge: 'Design an A/B test to prove or disprove this hypothesis scientifically.'
  },

  // ==========================================
  // 3. VERBAL & ANALYTICAL (5 Examples: EX21 - EX25)
  // ==========================================
  {
    id: 'EX21',
    category: 'Verbal & Analytical',
    title: 'Conditional Sentence Structure (Subjunctive Mood)',
    difficulty: 'Medium',
    problemStatement: 'Choose the correct form: "If the load balancer _____ configured with sticky sessions, the shopping cart session would not have terminated abruptly."',
    conceptTested: 'Third conditional (unreal past): If + past perfect, would have + past participle',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze the Result Clause',
        explanation: 'The main clause uses "would not have terminated" (would have + past participle), which marks a Third Conditional sentence referring to an unreal event in the past.',
        subCodeOrFormula: 'Result: would have + V3'
      },
      {
        stepNumber: 2,
        title: 'Determine Required If-Clause Tense',
        explanation: 'In the Third Conditional, the "if" clause strictly requires the Past Perfect tense (had + past participle).',
        subCodeOrFormula: 'If-clause: had been'
      },
      {
        stepNumber: 3,
        title: 'Select Final Phrase',
        explanation: '"If the load balancer HAD BEEN configured..." correctly expresses this counterfactual past condition.',
        subCodeOrFormula: '"had been"'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Past Counterfactual: If [had been configured] ──► Then [would not have terminated]'
    },
    finalAnswer: 'had been',
    commonMistake: 'Using "was" or "would have been" in the if-clause.',
    interviewRelevance: 'Grammar and verbal accuracy tests in TCS, Wipro, and Amazon written rounds.',
    relatedPracticeChallenge: 'Construct the Second Conditional version for a present hypothetical.'
  },
  {
    id: 'EX22',
    category: 'Verbal & Analytical',
    title: 'Dangling Modifier Correction',
    difficulty: 'Medium',
    problemStatement: 'Identify the flaw and correct: "Running through the terminal logs, several unhandled promise rejections were discovered by the developer."',
    conceptTested: 'Dangling participle modifier agreement',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify the Modifying Phrase',
        explanation: '"Running through the terminal logs" is an introductory participial phrase.',
        subCodeOrFormula: 'Modifier: Running through the terminal logs'
      },
      {
        stepNumber: 2,
        title: 'Find the Subject Immediately Following the Comma',
        explanation: 'The noun immediately following the comma is "several unhandled promise rejections". This creates the absurd meaning that the promise rejections themselves were running through terminal logs!',
        subCodeOrFormula: 'Dangling modifier error'
      },
      {
        stepNumber: 3,
        title: 'Repair by Aligning the True Actor',
        explanation: 'The developer was the one running through logs. Corrected: "Running through the terminal logs, the developer discovered several unhandled promise rejections."',
        subCodeOrFormula: 'Proper agent alignment'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Flawed: [Running through logs], [rejections were discovered] ❌\nFixed:   [Running through logs], [the developer discovered rejections] ✓'
    },
    finalAnswer: '"Running through the terminal logs, the developer discovered several unhandled promise rejections."',
    commonMistake: 'Assuming passive voice is always grammatically sound regardless of modifier placement.',
    interviewRelevance: 'Sentence correction in GRE, GMAT, and placement verbal tests.',
    relatedPracticeChallenge: 'Fix: "Having compiled the project, the build error was resolved."'
  },
  {
    id: 'EX23',
    category: 'Verbal & Analytical',
    title: 'Para-Completion Logical Consistency',
    difficulty: 'Medium',
    problemStatement: 'Complete the statement: "Microservice architectures provide autonomous deployment and technology diversity; however, _______."',
    conceptTested: 'Contrastive conjunction "however" requiring appropriate countervailing trade-offs',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze Preceding Tone and Benefits',
        explanation: 'The first clause highlights positive virtues: autonomous deployment, flexibility, technology diversity.',
        subCodeOrFormula: 'Clause 1 = Positive scalability'
      },
      {
        stepNumber: 2,
        title: 'Identify Function of "However"',
        explanation: '"However" indicates a pivot to realistic disadvantages or operational complexities.',
        subCodeOrFormula: 'Pivot = Trade-off / Complexity'
      },
      {
        stepNumber: 3,
        title: 'Select Appropriate Technical Counterweight',
        explanation: '"they introduce significant operational complexity in distributed tracing, network latency, and data consistency."',
        subCodeOrFormula: 'Logically consistent conclusion'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Microservices (+) Autonomous Deployment ──[HOWEVER]──► (-) Operational & Network Complexity'
    },
    finalAnswer: '"they introduce substantial overhead in distributed transactions, network latency, and operational observability."',
    commonMistake: 'Choosing an ending that continues praising microservices without introducing the contrasting drawback.',
    interviewRelevance: 'Verbal reasoning in Amazon and Infosys DSE.',
    relatedPracticeChallenge: 'Complete with a conclusion for Monolithic architectures.'
  },
  {
    id: 'EX24',
    category: 'Verbal & Analytical',
    title: 'Disambiguating "Fewer" vs "Less"',
    difficulty: 'Easy',
    problemStatement: 'Fill in the blanks: "Our refactored code has _____ lines of boilerplate and consumes _____ memory during execution."',
    conceptTested: 'Countable nouns ("fewer") versus uncountable mass nouns ("less")',
    steps: [
      {
        stepNumber: 1,
        title: 'Examine First Noun: "lines"',
        explanation: '"Lines" is a countable plural noun (1 line, 2 lines, 100 lines). Countable nouns require "fewer".',
        subCodeOrFormula: 'lines => fewer'
      },
      {
        stepNumber: 2,
        title: 'Examine Second Noun: "memory"',
        explanation: '"Memory" is a continuous/uncountable mass noun (you do not say 3 memories of RAM). Uncountable nouns require "less".',
        subCodeOrFormula: 'memory => less'
      },
      {
        stepNumber: 3,
        title: 'Combine',
        explanation: '"...fewer lines of boilerplate and consumes less memory..."',
        subCodeOrFormula: 'fewer / less'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Countable (Lines) ──► FEWER\nContinuous / Mass (Memory) ──► LESS'
    },
    finalAnswer: 'fewer, less',
    commonMistake: 'Using "less" for countable items like lines, people, or items.',
    interviewRelevance: 'Frequent in verbal aptitude and communication screenings.',
    relatedPracticeChallenge: 'Apply rule to: "_____ bugs, _____ downtime."'
  },
  {
    id: 'EX25',
    category: 'Verbal & Analytical',
    title: 'Subject-Verb Agreement with Collective Phrases',
    difficulty: 'Medium',
    problemStatement: 'Choose the correct verb: "A collection of high-performance microservices, along with the Redis cache cluster, _____ deployed to production last night."',
    conceptTested: 'Intervening parenthetical phrases ("along with") do not alter the grammatical head subject',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify the True Head Subject',
        explanation: 'The true subject is "A collection" (singular noun phrase).',
        subCodeOrFormula: 'Subject = "A collection" (Singular)'
      },
      {
        stepNumber: 2,
        title: 'Discount Parenthetical Phrases',
        explanation: 'Phrases introduced by "along with", "as well as", "together with", or "in addition to" are parenthetical modifiers and do not create a compound plural subject.',
        subCodeOrFormula: 'Ignore: ", along with the Redis cache cluster,"'
      },
      {
        stepNumber: 3,
        title: 'Select Singular Verb',
        explanation: 'Since "A collection" is singular, the correct verb is "was deployed" (not "were deployed").',
        subCodeOrFormula: 'was deployed'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: '[A collection (Singular)] + [along with Redis cluster (Modifier)] ──► Verb: "was deployed"'
    },
    finalAnswer: 'was deployed',
    commonMistake: 'Treating "along with" like the conjunction "and", which creates a false plural.',
    interviewRelevance: 'Cognizant and TCS technical communication tests.',
    relatedPracticeChallenge: 'What if "and" replaced "along with"?'
  },

  // ==========================================
  // 4. DATA STRUCTURES (10 Examples: EX26 - EX35)
  // ==========================================
  {
    id: 'EX26',
    category: 'Data Structures',
    title: 'Reverse a Singly Linked List In-Place',
    difficulty: 'Medium',
    problemStatement: 'Given the head of a singly linked list, reverse the list in-place in O(N) time and O(1) auxiliary space, returning the new head.',
    conceptTested: 'Three-pointer iterative pointer reversal',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Three Pointers',
        explanation: 'Maintain `prev = null`, `curr = head`, and `next = null`.',
        subCodeOrFormula: 'ListNode prev = null, curr = head;'
      },
      {
        stepNumber: 2,
        title: 'Iterate and Reverse Pointer Direction',
        explanation: 'Save next node: `next = curr.next`. Reverse current pointer: `curr.next = prev`. Advance prev: `prev = curr`. Advance curr: `curr = next`.',
        subCodeOrFormula: 'while (curr != null) { next = curr.next; curr.next = prev; prev = curr; curr = next; }'
      },
      {
        stepNumber: 3,
        title: 'Return New Head',
        explanation: 'When curr becomes null, prev points to the old tail, which is the new head of the reversed list.',
        subCodeOrFormula: 'return prev;'
      }
    ],
    visualRepresentation: {
      type: 'pointer-flow',
      content: 'Initial:   (1) ──► (2) ──► (3) ──► null\nStep 1:    null ◄── (1)    (2) ──► (3)\nStep 2:    null ◄── (1) ◄── (2)    (3)\nFinal:     null ◄── (1) ◄── (2) ◄── (3)  [prev points to 3]'
    },
    finalAnswer: '`prev` pointer holds the new reversed head in O(N) time, O(1) space',
    commonMistake: 'Overwriting `curr.next` before preserving a reference to the remaining list, losing access to subsequent nodes.',
    interviewRelevance: 'The #1 universal phone screen question at Microsoft, Amazon, and Adobe.',
    relatedPracticeChallenge: 'Reverse a linked list between positions left and right (Reverse Linked List II).'
  },
  {
    id: 'EX27',
    category: 'Data Structures',
    title: 'Valid Parentheses Using a Stack',
    difficulty: 'Easy',
    problemStatement: 'Given a string containing only brackets \'(\', \')\', \'{\', \'}\', \'[\', \']\', determine if the input string is valid.',
    conceptTested: 'LIFO matching using a stack and hash map lookup',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Stack and Matching Map',
        explanation: 'Create an empty stack. Map closing brackets to opening counterparts: \')\' -> \'(\', \'}\' -> \'{\', \']\' -> \'[\'.',
        subCodeOrFormula: 'Map: { \')\': \'(\', \'}\': \'{\', \']\': \'[\' }'
      },
      {
        stepNumber: 2,
        title: 'Traverse Characters',
        explanation: 'If character is an opening bracket, push to stack. If closing bracket, check if stack is empty or top does not match matching opening bracket. If so, return false; otherwise, pop stack.',
        subCodeOrFormula: 'if (isClosing(c)) { if (stack.empty() || stack.pop() != map[c]) return false; }'
      },
      {
        stepNumber: 3,
        title: 'Final Check',
        explanation: 'After string ends, the stack must be empty for valid balance.',
        subCodeOrFormula: 'return stack.isEmpty();'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'String: "{ [ ( ) ] }"\nRead \'{\': Push { | Read \'[\': Push [ | Read \'(\': Push (\nRead \')\': Pop ( matches! | Read \']\': Pop [ matches! | Read \'}\': Pop { matches!\nStack empty => TRUE'
    },
    finalAnswer: 'Valid if every closing bracket matches top of stack and stack finishes completely empty',
    commonMistake: 'Forgetting to check if stack is empty before popping when encountering an unexpected closing bracket.',
    interviewRelevance: 'Asked in almost every campus placement round.',
    relatedPracticeChallenge: 'Find the length of the longest valid parentheses substring.'
  },
  {
    id: 'EX28',
    category: 'Data Structures',
    title: 'Binary Tree Level Order Traversal (BFS)',
    difficulty: 'Medium',
    problemStatement: 'Given the root of a binary tree, return the level order traversal of its nodes\' values level by level from left to right.',
    conceptTested: 'Breadth-First Search (BFS) using a FIFO Queue',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Queue with Root',
        explanation: 'If root is null, return empty list. Push root into a FIFO queue.',
        subCodeOrFormula: 'Queue<TreeNode> q = new LinkedList<>(); q.add(root);'
      },
      {
        stepNumber: 2,
        title: 'Process Each Level by Measuring Queue Size',
        explanation: 'While queue is not empty, record `levelSize = q.size()`. Loop `levelSize` times to pop current level nodes, add their values to a level list, and enqueue their left and right children.',
        subCodeOrFormula: 'int size = q.size(); for (int i=0; i<size; i++) { ... }'
      },
      {
        stepNumber: 3,
        title: 'Append Level to Results',
        explanation: 'Add the current level list to the master list and repeat until queue is empty.',
        subCodeOrFormula: 'results.add(currentLevel);'
      }
    ],
    visualRepresentation: {
      type: 'pointer-flow',
      content: 'Tree:      3\n         /   \\\n        9     20\n             /  \\\n            15   7\nQueue: [3] -> pop 3, enqueue 9, 20 -> [[3]]\nQueue: [9, 20] -> pop 9, 20, enqueue 15, 7 -> [[3], [9, 20]]\nQueue: [15, 7] -> pop 15, 7 -> [[3], [9, 20], [15, 7]]'
    },
    finalAnswer: '[[3], [9, 20], [15, 7]] in O(N) time and O(N) space',
    commonMistake: 'Evaluating `q.size()` directly in the loop header rather than capturing it in a snapshot variable beforehand.',
    interviewRelevance: 'Core tree traversal problem tested at Amazon, Flipkart, and TCS Digital.',
    relatedPracticeChallenge: 'Implement Zigzag level order traversal.'
  },
  {
    id: 'EX29',
    category: 'Data Structures',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    problemStatement: 'An array of length N sorted in ascending order is rotated between 1 and N times. Find the minimum element in O(log N) time.',
    conceptTested: 'Modified binary search comparing mid with high boundary',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Pointers',
        explanation: 'Set `low = 0`, `high = N - 1`.',
        subCodeOrFormula: 'int low = 0, high = nums.length - 1;'
      },
      {
        stepNumber: 2,
        title: 'Compare nums[mid] with nums[high]',
        explanation: 'If `nums[mid] > nums[high]`, the inflection point (minimum) lies strictly to the right: `low = mid + 1`. Else, the minimum is at mid or to the left: `high = mid`.',
        subCodeOrFormula: 'if (nums[mid] > nums[high]) low = mid + 1; else high = mid;'
      },
      {
        stepNumber: 3,
        title: 'Convergence',
        explanation: 'When `low == high`, the search space has converged to the smallest element: return `nums[low]`.',
        subCodeOrFormula: 'return nums[low];'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Array: [4, 5, 6, 7, 0, 1, 2]\nlow=0 (4), high=6 (2), mid=3 (7) => 7 > 2 => min is in right half => low = 4\nlow=4 (0), high=6 (2), mid=5 (1) => 1 <= 2 => high = 5\nlow=4 (0), high=5 (1), mid=4 (0) => 0 <= 1 => high = 4\nlow == high == 4 => returns nums[4] = 0'
    },
    finalAnswer: 'nums[low] found in O(log N) time and O(1) space',
    commonMistake: 'Comparing `nums[mid]` with `nums[low]` instead of `nums[high]`, which fails when the array is rotated 0 times.',
    interviewRelevance: 'Standard question in Google, Uber, and Qualcomm technical interviews.',
    relatedPracticeChallenge: 'Search for a target value in a rotated sorted array.'
  },
  {
    id: 'EX30',
    category: 'Data Structures',
    title: 'Detect Cycle in a Directed Graph (DFS 3-Coloring)',
    difficulty: 'Hard',
    problemStatement: 'Given a directed graph with V vertices and E edges, determine if it contains a cycle.',
    conceptTested: 'Depth-First Search with visited recursion stack states (White, Gray, Black)',
    steps: [
      {
        stepNumber: 1,
        title: 'Assign Three States to Vertices',
        explanation: 'State 0 (White) = Unvisited. State 1 (Gray) = Currently being explored on active recursion stack. State 2 (Black) = Fully processed.',
        subCodeOrFormula: 'int[] state = new int[V];'
      },
      {
        stepNumber: 2,
        title: 'DFS Traversal and Back-Edge Detection',
        explanation: 'When visiting node u, mark `state[u] = 1`. For each adjacent node v: if `state[v] == 1`, a back-edge is encountered, which proves a CYCLE! If `state[v] == 0` and `dfs(v)` returns true, propagate cycle.',
        subCodeOrFormula: 'if (state[v] == 1) return true; // Cycle detected!'
      },
      {
        stepNumber: 3,
        title: 'Mark Black on Return',
        explanation: 'After all neighbors of u are explored without cycle, mark `state[u] = 2` and return false.',
        subCodeOrFormula: 'state[u] = 2; return false;'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Node A (Gray) ──► Node B (Gray) ──► Node C (Gray) ──► Points back to Node A (Gray)!\nVisiting a Gray node means we reached an ancestor on the active call stack = CYCLE.'
    },
    finalAnswer: 'Graph contains a cycle if and only if a back-edge to an actively explored (Gray) node is encountered.',
    commonMistake: 'Using a simple boolean visited array (which works for undirected graphs but fails for DAG cross-edges).',
    interviewRelevance: 'Core problem behind Course Schedule (LeetCode 207) and build dependency engines.',
    relatedPracticeChallenge: 'Implement Kahn’s algorithm (BFS in-degree) to solve cycle detection and topological sorting.'
  },
  {
    id: 'EX31',
    category: 'Data Structures',
    title: 'Top K Frequent Elements (Min-Heap Pattern)',
    difficulty: 'Medium',
    problemStatement: 'Given an integer array nums and an integer k, return the k most frequent elements in O(N log K) time.',
    conceptTested: 'Frequency hash map + Min-Heap of bounded size K',
    steps: [
      {
        stepNumber: 1,
        title: 'Count Frequencies with Hash Map',
        explanation: 'Iterate through nums and record occurrences of each number in O(N) time.',
        subCodeOrFormula: 'Map<Integer, Integer> count = new HashMap<>();'
      },
      {
        stepNumber: 2,
        title: 'Maintain Min-Heap of Size K',
        explanation: 'Insert entries into a Min-Heap keyed on frequency. Whenever heap size exceeds K, poll (evict) the element with lowest frequency.',
        subCodeOrFormula: 'PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));'
      },
      {
        stepNumber: 3,
        title: 'Extract Remaining Elements',
        explanation: 'The K elements remaining in the heap are the K most frequent. Runtime: O(N log K), where K ≤ N.',
        subCodeOrFormula: 'Extract remaining K elements'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Array: [1,1,1,2,2,3], k=2\nCounts: {1: 3, 2: 2, 3: 1}\nHeap pushes: (1: 3), (2: 2), (3: 1) -> Size > 2 => Evict min frequency (3: 1)\nHeap retains [2, 1] => Top 2 frequent!'
    },
    finalAnswer: '[1, 2] in O(N log K) time and O(N) space',
    commonMistake: 'Sorting all distinct elements in O(N log N) or using a Max-Heap holding all elements in O(N log N) space/time.',
    interviewRelevance: 'Asked by Amazon, Meta, and Bloomberg.',
    relatedPracticeChallenge: 'Solve in O(N) time using Bucket Sort.'
  },
  {
    id: 'EX32',
    category: 'Data Structures',
    title: 'Lowest Common Ancestor (LCA) in a BST',
    difficulty: 'Easy',
    problemStatement: 'Given a Binary Search Tree (BST) and two nodes p and q, find their Lowest Common Ancestor (LCA).',
    conceptTested: 'BST ordering invariant (left < root < right)',
    steps: [
      {
        stepNumber: 1,
        title: 'Leverage BST Ordering Properties',
        explanation: 'In a BST, if both p and q are strictly less than root.val, LCA must reside in the left subtree. If both are strictly greater than root.val, LCA must reside in the right subtree.',
        subCodeOrFormula: 'if (p.val < root.val && q.val < root.val) search left;'
      },
      {
        stepNumber: 2,
        title: 'Detect the Split Point',
        explanation: 'The moment p and q diverge (one is on the left, one on the right, or one equals root.val), the current node is their Lowest Common Ancestor!',
        subCodeOrFormula: 'return root;'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: '         [ 6 (LCA) ]   <--- (p=2 is on left, q=8 is on right: SPLIT POINT!)\n        /           \\\n      [ 2 ]         [ 8 ]\n     /     \\\n   [ 0 ]   [ 4 ]'
    },
    finalAnswer: 'The split point node where p.val and q.val diverge is the LCA, reachable in O(height) time.',
    commonMistake: 'Using generic binary tree LCA traversal that checks all subtrees without leveraging BST ordering.',
    interviewRelevance: 'Standard question in Microsoft and campus interviews.',
    relatedPracticeChallenge: 'Find LCA in an arbitrary binary tree without BST ordering.'
  },
  {
    id: 'EX33',
    category: 'Data Structures',
    title: 'Implement Queue Using Stacks',
    difficulty: 'Easy',
    problemStatement: 'Implement a first in first out (FIFO) queue using only two stacks.',
    conceptTested: 'Amortized O(1) transfer between input and output stacks',
    steps: [
      {
        stepNumber: 1,
        title: 'Maintain Two Stacks',
        explanation: '`stackIn` for incoming push operations; `stackOut` for peek and pop operations.',
        subCodeOrFormula: 'Stack<Integer> in = new Stack<>(), out = new Stack<>();'
      },
      {
        stepNumber: 2,
        title: 'Push in O(1)',
        explanation: 'Simply push new element into `stackIn`.',
        subCodeOrFormula: 'public void push(int x) { in.push(x); }'
      },
      {
        stepNumber: 3,
        title: 'Pop / Peek in Amortized O(1)',
        explanation: 'If `stackOut` is empty, pop all elements from `stackIn` and push them into `stackOut` (reversing their order to FIFO). Then pop/peek from `stackOut`. Each element is moved at most twice.',
        subCodeOrFormula: 'if (out.isEmpty()) while(!in.isEmpty()) out.push(in.pop()); return out.pop();'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Push 1, 2, 3 into stackIn: [1, 2, 3 (top)]\nPop requested -> Transfer to stackOut: [3, 2, 1 (top)]\nPop from stackOut yields: 1 (FIFO preserved!)'
    },
    finalAnswer: 'Amortized O(1) for all operations using input and output reversal stacks',
    commonMistake: 'Transferring elements back and forth on every single push and pop operation, causing O(N) per call.',
    interviewRelevance: 'Classic design question in campus rounds.',
    relatedPracticeChallenge: 'Implement a Stack using only Queues.'
  },
  {
    id: 'EX34',
    category: 'Data Structures',
    title: 'Check If a Binary Tree is Height-Balanced',
    difficulty: 'Medium',
    problemStatement: 'Given a binary tree, determine if it is height-balanced (the depth of the two subtrees of every node never differs by more than 1).',
    conceptTested: 'Post-order DFS computing height and propagating -1 on unbalance',
    steps: [
      {
        stepNumber: 1,
        title: 'Define Bottom-Up DFS Function',
        explanation: 'A helper function `checkHeight(node)` returns the height of the subtree if balanced, or -1 immediately if unbalanced.',
        subCodeOrFormula: 'int checkHeight(TreeNode node)'
      },
      {
        stepNumber: 2,
        title: 'Post-Order Verification',
        explanation: 'Recurse on left child: if -1, return -1. Recurse on right child: if -1, return -1. If `abs(leftH - rightH) > 1`, return -1. Otherwise, return `max(leftH, rightH) + 1`.',
        subCodeOrFormula: 'if (Math.abs(leftH - rightH) > 1) return -1; return Math.max(leftH, rightH) + 1;'
      },
      {
        stepNumber: 3,
        title: 'Final Decision',
        explanation: 'Tree is balanced if `checkHeight(root) != -1`. Completes in optimal O(N) time.',
        subCodeOrFormula: 'return checkHeight(root) != -1;'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Leaf nodes return height 1 -> Parent compares left vs right heights -> If |Δ| > 1, immediately bubbles -1 up the stack.'
    },
    finalAnswer: 'Bottom-up O(N) post-order check terminates early upon unbalance',
    commonMistake: 'Top-down approach calling `height(node)` for every node separately, resulting in inefficient O(N^2) runtime.',
    interviewRelevance: 'Standard question at Adobe and TCS Digital.',
    relatedPracticeChallenge: 'Convert a sorted array into a height-balanced BST.'
  },
  {
    id: 'EX35',
    category: 'Data Structures',
    title: 'Design a Min-Stack with O(1) Retrieve Min',
    difficulty: 'Easy',
    problemStatement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) constant time.',
    conceptTested: 'Auxiliary minimum tracking stack or pair element storage',
    steps: [
      {
        stepNumber: 1,
        title: 'Maintain Value Stack and Min Tracking Stack',
        explanation: 'Use two stacks: `mainStack` stores values. `minStack` stores current minimum up to that depth.',
        subCodeOrFormula: 'Stack<Integer> mainStack, minStack;'
      },
      {
        stepNumber: 2,
        title: 'Push Operation',
        explanation: 'Push x to `mainStack`. Push `min(x, minStack.peek())` to `minStack`.',
        subCodeOrFormula: 'minStack.push(minStack.isEmpty() ? x : Math.min(x, minStack.peek()));'
      },
      {
        stepNumber: 3,
        title: 'Pop and GetMin Operations',
        explanation: 'When popping, pop from both stacks. `getMin()` simply returns `minStack.peek()` in O(1) time.',
        subCodeOrFormula: 'public int getMin() { return minStack.peek(); }'
      }
    ],
    visualRepresentation: {
      type: 'state-table',
      content: 'Push -2: Main=[-2], Min=[-2]\nPush 0:  Main=[-2, 0], Min=[-2, -2]\nPush -3: Main=[-2, 0, -3], Min=[-2, -2, -3] => getMin() = -3\nPop():   Main=[-2, 0], Min=[-2, -2] => getMin() = -2'
    },
    finalAnswer: 'All operations execute in O(1) time and O(N) extra space',
    commonMistake: 'Searching through the stack upon `getMin()` in O(N) time.',
    interviewRelevance: 'One of the top 10 most common interview questions for freshers.',
    relatedPracticeChallenge: 'Implement MinStack in O(1) time using O(1) additional space by storing value differences.'
  },

  // ==========================================
  // 5. ALGORITHMS (8 Examples: EX36 - EX43)
  // ==========================================
  {
    id: 'EX36',
    category: 'Algorithms',
    title: 'Kadane’s Maximum Subarray Sum Algorithm',
    difficulty: 'Medium',
    problemStatement: 'Given an integer array nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4], find the contiguous subarray with the largest sum and return its sum.',
    conceptTested: 'Dynamic programming / Greedy prefix reset at 0',
    steps: [
      {
        stepNumber: 1,
        title: 'Define Invariant Variables',
        explanation: '`maxSoFar = nums[0]`, `currentSum = 0`.',
        subCodeOrFormula: 'int maxSoFar = nums[0], currentSum = 0;'
      },
      {
        stepNumber: 2,
        title: 'Iterate Through Array',
        explanation: 'For each number x: add x to `currentSum`. Update `maxSoFar = max(maxSoFar, currentSum)`. If `currentSum < 0`, reset `currentSum = 0` (a negative prefix will never help future subarrays).',
        subCodeOrFormula: 'currentSum += x; maxSoFar = Math.max(maxSoFar, currentSum); if (currentSum < 0) currentSum = 0;'
      },
      {
        stepNumber: 3,
        title: 'Observe Subarray Boundaries',
        explanation: 'Subarray [4, -1, 2, 1] yields 4 + (-1) + 2 + 1 = 6, which is the global maximum.',
        subCodeOrFormula: 'maxSoFar = 6'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: '[-2] -> curr=-2 -> reset 0\n[1]  -> curr=1 -> max=1\n[-3] -> curr=-2 -> reset 0\n[4]  -> curr=4 -> max=4\n[-1] -> curr=3\n[2]  -> curr=5 -> max=5\n[1]  -> curr=6 -> max=6\n[-5] -> curr=1\n[4]  -> curr=5\nMax contiguous sum = 6'
    },
    finalAnswer: '6 in O(N) time and O(1) space',
    commonMistake: 'Initializing `maxSoFar = 0`, which fails if all elements in the array are negative numbers.',
    interviewRelevance: 'Universal placement standard question at TCS, Infosys, and Amazon.',
    relatedPracticeChallenge: 'Print the starting and ending indices of the maximum sum subarray.'
  },
  {
    id: 'EX37',
    category: 'Algorithms',
    title: 'Binary Search Exact Target Bounds',
    difficulty: 'Easy',
    problemStatement: 'Given a sorted array of distinct integers arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] and target = 23, trace the binary search steps to locate the target index.',
    conceptTested: 'Divide and conquer search space halving',
    steps: [
      {
        stepNumber: 1,
        title: 'Iteration 1',
        explanation: '`low = 0`, `high = 9`. `mid = 0 + (9 - 0) / 2 = 4`. `arr[4] = 16`. Since 16 < 23, target must be in right half => `low = mid + 1 = 5`.',
        subCodeOrFormula: 'low = 5, high = 9'
      },
      {
        stepNumber: 2,
        title: 'Iteration 2',
        explanation: '`low = 5`, `high = 9`. `mid = 5 + (9 - 5) / 2 = 7`. `arr[7] = 56`. Since 56 > 23, target must be in left half => `high = mid - 1 = 6`.',
        subCodeOrFormula: 'low = 5, high = 6'
      },
      {
        stepNumber: 3,
        title: 'Iteration 3 - Match Found',
        explanation: '`low = 5`, `high = 6`. `mid = 5 + (6 - 5) / 2 = 5`. `arr[5] = 23`. Target matches `arr[mid]`! Return index 5.',
        subCodeOrFormula: 'return 5;'
      }
    ],
    visualRepresentation: {
      type: 'pointer-flow',
      content: 'Pass 1: [2, 5, 8, 12, (16-mid), 23, 38, 56, 72, 91] -> 23 > 16 -> Search right [23..91]\nPass 2: [23, 38, (56-mid), 72, 91] -> 23 < 56 -> Search left [23..38]\nPass 3: [(23-mid), 38] -> 23 == 23 -> MATCH at index 5!'
    },
    finalAnswer: 'Index 5 in 3 comparisons (O(log N))',
    commonMistake: 'Updating `low = mid` or `high = mid` without adding or subtracting 1, leading to infinite loops.',
    interviewRelevance: 'Foundational algorithm questioned at every technology employer.',
    relatedPracticeChallenge: 'Implement lower_bound and upper_bound for arrays with duplicates.'
  },
  {
    id: 'EX38',
    category: 'Algorithms',
    title: 'Two Sum in Sorted Array (Two Pointers)',
    difficulty: 'Easy',
    problemStatement: 'Given a 1-indexed sorted array numbers = [2, 7, 11, 15] and target = 9, find two numbers such that they add up to target.',
    conceptTested: 'Two-pointer inward convergence on sorted sequence',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Two Pointers at Extremities',
        explanation: '`left = 0`, `right = numbers.length - 1 = 3`.',
        subCodeOrFormula: 'int left = 0, right = numbers.length - 1;'
      },
      {
        stepNumber: 2,
        title: 'Evaluate Current Sum',
        explanation: '`sum = numbers[left] + numbers[right] = 2 + 15 = 17`. Since 17 > 9 (target), decrease the sum by moving right pointer inward: `right--`.',
        subCodeOrFormula: 'right = 2 (numbers[right] = 11)'
      },
      {
        stepNumber: 3,
        title: 'Evaluate Next Sum',
        explanation: '`sum = 2 + 11 = 13 > 9`. Move right pointer inward again: `right--`.',
        subCodeOrFormula: 'right = 1 (numbers[right] = 7)'
      },
      {
        stepNumber: 4,
        title: 'Target Match',
        explanation: '`sum = 2 + 7 = 9 == target`! Return 1-based indices [1, 2].',
        subCodeOrFormula: 'return new int[]{left + 1, right + 1};'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: '[2(L), 7, 11, 15(R)] => Sum=17 > 9 => R moves left\n[2(L), 7, 11(R), 15] => Sum=13 > 9 => R moves left\n[2(L), 7(R), 11, 15] => Sum=9 == 9 => Target found! Indices 1, 2.'
    },
    finalAnswer: '[1, 2] in O(N) time and O(1) space',
    commonMistake: 'Using nested loops yielding O(N^2) brute force.',
    interviewRelevance: 'Classic Two Sum II (LeetCode 167) tested everywhere.',
    relatedPracticeChallenge: 'Extend to 3Sum (finding triplets that sum to 0).'
  },
  {
    id: 'EX39',
    category: 'Algorithms',
    title: 'Merge Intervals Problem',
    difficulty: 'Medium',
    problemStatement: 'Given an array of intervals intervals = [[1,3],[2,6],[8,10],[15,18]], merge all overlapping intervals.',
    conceptTested: 'Interval sorting by start time + greedy merger',
    steps: [
      {
        stepNumber: 1,
        title: 'Sort Intervals by Start Time',
        explanation: 'Sorted intervals: [[1,3], [2,6], [8,10], [15,18]].',
        subCodeOrFormula: 'Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));'
      },
      {
        stepNumber: 2,
        title: 'Iterate and Compare Boundaries',
        explanation: 'Start with `curr = [1, 3]`. Next interval [2, 6] has start 2 ≤ curr end 3 (overlap!). Merge: `curr.end = max(3, 6) = 6` => [1, 6].',
        subCodeOrFormula: 'Overlap detected: [1, 3] + [2, 6] => [1, 6]'
      },
      {
        stepNumber: 3,
        title: 'Continue with Non-Overlapping Intervals',
        explanation: 'Next is [8, 10]: start 8 > curr end 6 (no overlap!). Add [1, 6] to result, set `curr = [8, 10]`. Next is [15, 18]: start 15 > 10. Add [8, 10], set `curr = [15, 18]`. Finally add [15, 18].',
        subCodeOrFormula: 'Result: [[1,6], [8,10], [15,18]]'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: '[1===3]\n  [2======6]  ──► MERGED: [1======6]\n             [8===10]\n                       [15===18]\nResult: [[1, 6], [8, 10], [15, 18]]'
    },
    finalAnswer: '[[1, 6], [8, 10], [15, 18]] in O(N log N) time',
    commonMistake: 'Attempting to merge without sorting intervals first, missing overlaps across unordered pairs.',
    interviewRelevance: 'Top question at Google, Uber, and Salesforce.',
    relatedPracticeChallenge: 'Insert a new interval into an already sorted list of non-overlapping intervals.'
  },
  {
    id: 'EX40',
    category: 'Algorithms',
    title: 'Longest Common Subsequence (LCS) 2D DP',
    difficulty: 'Medium',
    problemStatement: 'Find the length of the longest common subsequence of text1 = "abcde" and text2 = "ace".',
    conceptTested: '2D Dynamic programming table construction',
    steps: [
      {
        stepNumber: 1,
        title: 'Define DP State',
        explanation: '`dp[i][j]` represents LCS length of `text1[0..i-1]` and `text2[0..j-1]`. Dimensions: (M+1) × (N+1).',
        subCodeOrFormula: 'int[][] dp = new int[m + 1][n + 1];'
      },
      {
        stepNumber: 2,
        title: 'Formulate Recurrence Transitions',
        explanation: 'If `text1[i-1] == text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`. Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.',
        subCodeOrFormula: 'dp[i][j] = (c1 == c2) ? 1 + dp[i-1][j-1] : Math.max(dp[i-1][j], dp[i][j-1]);'
      },
      {
        stepNumber: 3,
        title: 'Fill Table and Read Answer',
        explanation: 'Matching characters: \'a\' (length 1), \'c\' (length 2), \'e\' (length 3). Final `dp[5][3] = 3`.',
        subCodeOrFormula: 'return dp[5][3] = 3;'
      }
    ],
    visualRepresentation: {
      type: 'state-table',
      content: '    ""  a  c  e\n""   0  0  0  0\na    0  1  1  1\nb    0  1  1  1\nc    0  1  2  2\nd    0  1  2  2\ne    0  1  2 [3]'
    },
    finalAnswer: '3 ("ace") in O(M × N) time and space',
    commonMistake: 'Confusing subsequence (order preserved, not necessarily contiguous) with substring (must be contiguous).',
    interviewRelevance: 'Fundamental DP problem in Amazon and Microsoft coding tests.',
    relatedPracticeChallenge: 'Optimize auxiliary space from O(M × N) to O(N) using two rows.'
  },
  {
    id: 'EX41',
    category: 'Algorithms',
    title: 'Coin Change Minimum Coins (Unbounded Knapsack DP)',
    difficulty: 'Medium',
    problemStatement: 'Given coins = [1, 2, 5] and amount = 11, find the fewest number of coins needed to make up that amount.',
    conceptTested: '1D bottom-up dynamic programming tabulation',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize DP Array',
        explanation: 'Let `dp[i]` be minimum coins to make amount i. Fill array with infinity (`amount + 1`). Set base case `dp[0] = 0`.',
        subCodeOrFormula: 'int[] dp = new int[amount + 1]; Arrays.fill(dp, amount + 1); dp[0] = 0;'
      },
      {
        stepNumber: 2,
        title: 'Iterate Amounts and Coins',
        explanation: 'For amount from 1 to 11: for each coin c: if `c <= amount`, `dp[i] = min(dp[i], dp[i - c] + 1)`.',
        subCodeOrFormula: 'dp[i] = Math.min(dp[i], dp[i - coin] + 1);'
      },
      {
        stepNumber: 3,
        title: 'Trace Amount 11',
        explanation: '11 can be made from: 5 + 5 + 1 (3 coins). `dp[11] = 3`.',
        subCodeOrFormula: 'dp[11] = 3'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Amount: 0  1  2  3  4  5  6  7  8  9  10  11\nMinCoin: 0  1  1  2  2  1  2  2  3  3   2   3\n11 = 5 + 5 + 1 => exactly 3 coins!'
    },
    finalAnswer: '3 coins (5 + 5 + 1) in O(amount × numCoins) time',
    commonMistake: 'Greedy choice (taking largest coin 5, then 5, then 1) works here, but fails in arbitrary coin systems like [1, 3, 4] for amount 6 (greedy picks 4+1+1=3 coins, but optimal is 3+3=2 coins).',
    interviewRelevance: 'Classic DP interview question at Goldman Sachs and Walmart Labs.',
    relatedPracticeChallenge: 'Find total number of ways to form the amount (Coin Change II).'
  },
  {
    id: 'EX42',
    category: 'Algorithms',
    title: 'Dijkstra’s Single-Source Shortest Path',
    difficulty: 'Hard',
    problemStatement: 'In a graph with vertices A, B, C, D and edge weights: A-B (4), A-C (2), C-B (1), C-D (5), B-D (1), find the shortest path distance from source A to destination D.',
    conceptTested: 'Greedy priority queue relaxation of weighted edges',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Distance Table and Priority Queue',
        explanation: 'Distances: dist[A] = 0, all others = ∞. Push (0, A) to Min-Heap.',
        subCodeOrFormula: 'dist = {A: 0, B: ∞, C: ∞, D: ∞}'
      },
      {
        stepNumber: 2,
        title: 'Step 1: Pop A (dist 0)',
        explanation: 'Relax neighbors: B: min(∞, 0 + 4) = 4. C: min(∞, 0 + 2) = 2. Push (4, B), (2, C).',
        subCodeOrFormula: 'dist = {A: 0, B: 4, C: 2, D: ∞}'
      },
      {
        stepNumber: 3,
        title: 'Step 2: Pop C (dist 2)',
        explanation: 'Relax neighbors: B: min(4, 2 + 1) = 3 (Updated!). D: min(∞, 2 + 5) = 7. Push (3, B), (7, D).',
        subCodeOrFormula: 'dist = {A: 0, B: 3, C: 2, D: 7}'
      },
      {
        stepNumber: 4,
        title: 'Step 3: Pop B (dist 3)',
        explanation: 'Relax neighbors: D: min(7, 3 + 1) = 4 (Updated!). Push (4, D).',
        subCodeOrFormula: 'dist = {A: 0, B: 3, C: 2, D: 4}'
      },
      {
        stepNumber: 5,
        title: 'Step 4: Pop D (dist 4)',
        explanation: 'Destination reached with finalized minimum distance 4. Path: A -> C -> B -> D.',
        subCodeOrFormula: 'Shortest Distance = 4'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Direct: A ──► B (4) ──► D (1) = 5\nOptimal: A ──► C (2) ──► B (1) ──► D (1) = 4 ✓'
    },
    finalAnswer: '4 (via path A -> C -> B -> D)',
    commonMistake: 'Greedily taking direct edge A-B (4) instead of detour through C (2+1=3).',
    interviewRelevance: 'Routing protocols and graph interviews at Uber and Google Maps.',
    relatedPracticeChallenge: 'Implement with adjacency list and binary heap in O((V + E) log V).'
  },
  {
    id: 'EX43',
    category: 'Algorithms',
    title: 'QuickSort Lomuto Partitioning Scheme',
    difficulty: 'Medium',
    problemStatement: 'Given array arr = [10, 80, 30, 90, 40, 50, 70] with pivot = 70 (last element), trace the Lomuto partition and determine the pivot’s final sorted index.',
    conceptTested: 'Single-pointer swap boundary in Lomuto partitioning',
    steps: [
      {
        stepNumber: 1,
        title: 'Initialize Boundary Pointer',
        explanation: '`pivot = 70`. Set boundary pointer `i = low - 1 = -1`. Scanner pointer `j` runs from `low` to `high - 1`.',
        subCodeOrFormula: 'pivot = 70, i = -1'
      },
      {
        stepNumber: 2,
        title: 'Scan and Swap Smaller Elements',
        explanation: 'j=0 (10 <= 70): i++ (0), swap(arr[0], arr[0]) -> [10...]\nj=1 (80 > 70): ignore\nj=2 (30 <= 70): i++ (1), swap(arr[1], arr[2]) -> [10, 30, 80, 90, 40, 50, 70]\nj=3 (90 > 70): ignore\nj=4 (40 <= 70): i++ (2), swap(arr[2], arr[4]) -> [10, 30, 40, 90, 80, 50, 70]\nj=5 (50 <= 70): i++ (3), swap(arr[3], arr[5]) -> [10, 30, 40, 50, 80, 90, 70]',
        subCodeOrFormula: 'i lands at index 3'
      },
      {
        stepNumber: 3,
        title: 'Place Pivot in Correct Position',
        explanation: 'Swap `arr[i + 1]` with `arr[high]` (swap 80 with 70): [10, 30, 40, 50, 70, 90, 80]. Pivot 70 is placed at index 4.',
        subCodeOrFormula: 'swap(arr[4], arr[6]) => pivot index = 4'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Elements <= 70: [10, 30, 40, 50]\nPivot: [70 at index 4]\nElements > 70: [90, 80]'
    },
    finalAnswer: 'Pivot 70 lands at index 4 with all smaller elements to its left and larger to its right.',
    commonMistake: 'Off-by-one errors in pointer i boundary after the scan completes.',
    interviewRelevance: 'Core divide-and-conquer question in technical written exams.',
    relatedPracticeChallenge: 'Compare Lomuto partitioning with Hoare’s two-pointer partitioning scheme.'
  },

  // ==========================================
  // 6. CODE TRACING & COMPLEXITY (5 Examples: EX44 - EX48)
  // ==========================================
  {
    id: 'EX44',
    category: 'Code Tracing & Complexity',
    title: 'Recursive Fibonacci Time Complexity Proof',
    difficulty: 'Medium',
    problemStatement: 'Analyze the exact time and space complexity of naive unmemoized recursion `int fib(int n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); }`.',
    conceptTested: 'Binary recursion tree exponential growth and call stack depth',
    steps: [
      {
        stepNumber: 1,
        title: 'Draw the Recursion Call Tree',
        explanation: 'fib(n) spawns two calls: fib(n-1) and fib(n-2). Each of those spawns two more, forming a binary tree of height n.',
        subCodeOrFormula: 'T(n) = T(n-1) + T(n-2) + O(1)'
      },
      {
        stepNumber: 2,
        title: 'Derive Time Complexity Bound',
        explanation: 'The number of leaves is proportional to the n-th Fibonacci number. Asymptotically, T(n) = Θ(φ^n) where φ = (1 + √5)/2 ≈ 1.618 (Golden Ratio), tightly bounded by O(2^n).',
        subCodeOrFormula: 'Time Complexity = O(2^n) exponential'
      },
      {
        stepNumber: 3,
        title: 'Determine Space Complexity from Max Stack Depth',
        explanation: 'At any point, the system only explores one path down the tree to a leaf before backtracking. Maximum depth of call stack is n frames.',
        subCodeOrFormula: 'Space Complexity = O(n) auxiliary memory'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: '                 fib(4)\n             /           \\\n         fib(3)          fib(2)\n        /      \\         /    \\\n     fib(2)   fib(1)  fib(1)  fib(0)\n     /    \\\n   fib(1) fib(0)   Total nodes ≈ 2⁴ = 16 operations!'
    },
    finalAnswer: 'Time Complexity: O(2^n), Auxiliary Space: O(n) (Call stack)',
    commonMistake: 'Claiming space complexity is O(2^n) because of total node count, ignoring that stack frames are freed upon return.',
    interviewRelevance: 'Essential concept tested at Amazon, Microsoft, and academic interviews.',
    relatedPracticeChallenge: 'Show how memoization reduces time to O(n) and space to O(n).'
  },
  {
    id: 'EX45',
    category: 'Code Tracing & Complexity',
    title: 'Nested Loop with Geometric Stride Complexity',
    difficulty: 'Medium',
    problemStatement: 'Determine the Big-O time complexity of the following code snippet:\n`for (int i = 1; i <= n; i++) { for (int j = 1; j <= n; j *= 2) { count++; } }`',
    conceptTested: 'Product of linear outer loop and logarithmic inner loop',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze Outer Loop',
        explanation: 'Outer loop variable `i` iterates from 1 to n with step `i++`. It executes exactly n times.',
        subCodeOrFormula: 'Outer loop = n iterations'
      },
      {
        stepNumber: 2,
        title: 'Analyze Inner Loop',
        explanation: 'Inner loop variable `j` doubles on each iteration: 1, 2, 4, 8, ... up to n. It terminates when 2^k > n => k = log2(n) iterations.',
        subCodeOrFormula: 'Inner loop = log2(n) iterations'
      },
      {
        stepNumber: 3,
        title: 'Multiply Independent Nested Loops',
        explanation: 'Because the inner loop bounds do not depend on i, total operations = n × log2(n) = O(n log n).',
        subCodeOrFormula: 'Total Time = O(n log n)'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'i = 1: j = 1, 2, 4, 8... (log n steps)\ni = 2: j = 1, 2, 4, 8... (log n steps)\n...\ni = n: j = 1, 2, 4, 8... (log n steps)\nTotal = n × log n'
    },
    finalAnswer: 'O(n log n)',
    commonMistake: 'Assuming nested loops are always O(n^2), overlooking the `j *= 2` geometric progression.',
    interviewRelevance: 'Standard question in algorithm complexity tests.',
    relatedPracticeChallenge: 'What if the inner loop was `j <= i` with `j *= 2`?'
  },
  {
    id: 'EX46',
    category: 'Code Tracing & Complexity',
    title: 'Pointer String Traversal & Null Terminator in C',
    difficulty: 'Medium',
    problemStatement: 'Trace the output of this C function when invoked with `str = "PLACEMENT"`:\n`void fun(char *s) { if (*s == \'\\0\') return; fun(s + 1); putchar(*s); }`',
    conceptTested: 'Post-order recursion unwind performing string reversal',
    steps: [
      {
        stepNumber: 1,
        title: 'Analyze Call Progression (Descent Phase)',
        explanation: 'The function recurses forward to `s + 1` before printing. It pushes each letter onto the call stack until reaching the null terminator \'\\0\'.',
        subCodeOrFormula: 'fun("PLACEMENT") -> fun("LACEMENT") -> ... -> fun("")'
      },
      {
        stepNumber: 2,
        title: 'Analyze Unwind Phase (Ascent Phase)',
        explanation: 'Upon reaching \'\\0\', the recursion returns. The `putchar(*s)` executes during the return unwind, printing the last character first: \'T\', \'N\', \'E\', \'M\', \'E\', \'C\', \'A\', \'L\', \'P\'.',
        subCodeOrFormula: 'Prints: "TNEMECALP"'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Call Stack:\n| fun(\'T\') | ──► Prints \'T\'\n| fun(\'N\') | ──► Prints \'N\'\n| fun(\'E\') | ──► Prints \'E\'\n...\n| fun(\'P\') | ──► Prints \'P\'\nReverses the string!'
    },
    finalAnswer: '"TNEMECALP"',
    commonMistake: 'Assuming it prints "PLACEMENT" in original order, forgetting that `putchar` is after the recursive call.',
    interviewRelevance: 'Classic C pointer and recursion question in campus recruitment.',
    relatedPracticeChallenge: 'What happens if `putchar(*s)` is moved before `fun(s + 1)`?'
  },
  {
    id: 'EX47',
    category: 'Code Tracing & Complexity',
    title: 'Bitwise Twos Complement & Sign Extension',
    difficulty: 'Easy',
    problemStatement: 'In 8-bit signed two’s complement representation, what is the decimal value of binary `11111010`?',
    conceptTested: 'Two’s complement sign bit interpretation and inversion',
    steps: [
      {
        stepNumber: 1,
        title: 'Check the Sign Bit (MSB)',
        explanation: 'The most significant bit (MSB) is 1, which signifies a negative number.',
        subCodeOrFormula: 'MSB = 1 (Negative)'
      },
      {
        stepNumber: 2,
        title: 'Calculate Magnitude via Two’s Complement',
        explanation: 'Invert all bits: `00000101` (decimal 5). Add 1: `00000101 + 1 = 00000110` (decimal 6).',
        subCodeOrFormula: '~11111010 + 1 = 00000110 (6)'
      },
      {
        stepNumber: 3,
        title: 'Apply Negative Sign',
        explanation: 'Value = -6.',
        subCodeOrFormula: 'Result = -6'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Weighted calculation: -128 + 64 + 32 + 16 + 8 + 0 + 2 + 0 = -128 + 122 = -6'
    },
    finalAnswer: '-6',
    commonMistake: 'Treating it as unsigned binary (128+64+32+16+8+2 = 250) rather than signed two’s complement.',
    interviewRelevance: 'Computer organization and embedded systems assessments.',
    relatedPracticeChallenge: 'Convert -18 into 8-bit two’s complement representation.'
  },
  {
    id: 'EX48',
    category: 'Code Tracing & Complexity',
    title: 'Amortized Analysis of Dynamic Array Resizing',
    difficulty: 'Hard',
    problemStatement: 'Explain why appending N elements to an initially empty dynamic array (such as Java ArrayList or C++ std::vector) that doubles its capacity when full takes O(1) amortized time per append.',
    conceptTested: 'Accounting / Aggregate method of amortized analysis',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify Resizing Points and Copy Costs',
        explanation: 'Resizing occurs at powers of 2: 1, 2, 4, 8, 16, ..., 2^k. When doubling from size S, S existing elements are copied.',
        subCodeOrFormula: 'Total copy operations = 1 + 2 + 4 + 8 + ... + N/2 + N'
      },
      {
        stepNumber: 2,
        title: 'Sum the Geometric Series',
        explanation: 'The sum of powers of 2 up to N is bounded by: 1 + 2 + 4 + ... + N = 2N - 1 < 2N total copy operations across all N appends.',
        subCodeOrFormula: 'Total copies < 2N'
      },
      {
        stepNumber: 3,
        title: 'Compute Amortized Time Per Insertion',
        explanation: 'Total cost for N appends = N (new inserts) + 2N (copies) = 3N operations. Cost per append = 3N / N = 3 operations = O(1) amortized constant time.',
        subCodeOrFormula: 'Amortized cost = O(1)'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Appends 1..N: Each element charges $3 tokens -> $1 pays for insertion, $2 saved for future copy when array doubles -> Bank balance never goes negative!'
    },
    finalAnswer: 'O(1) amortized time per append because total copy overhead is strictly bounded by 2N',
    commonMistake: 'Quoting the worst-case single insertion time O(N) as the overall complexity.',
    interviewRelevance: 'Tested in core systems interviews at Microsoft and FAANG.',
    relatedPracticeChallenge: 'What is the amortized cost if the array increases capacity by a fixed +10 items instead of doubling?'
  },

  // ==========================================
  // 7. INDUSTRY CASE SCENARIOS (2 Examples: EX49 - EX50)
  // ==========================================
  {
    id: 'EX49',
    category: 'Industry Scenarios',
    title: 'Flash Sale Distributed Inventory Race Condition',
    difficulty: 'Hard',
    problemStatement: 'In an e-commerce platform during Diwali flash sales, 50,000 requests per second attempt to buy 100 limited gaming consoles. How should the backend be architected to prevent overselling, avoid database lock contention, and keep response latency below 50ms?',
    conceptTested: 'In-memory Redis atomic decrements with asynchronous queue fulfillment',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify the Bottleneck of Traditional RDBMS',
        explanation: 'Directly running `UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0` against PostgreSQL creates extreme row lock contention, serializing requests and crashing the DB.',
        subCodeOrFormula: 'Direct DB locks fail at 50,000 req/s'
      },
      {
        stepNumber: 2,
        title: 'Implement In-Memory Atomic Reservation in Redis',
        explanation: 'Load initial inventory (100) into Redis. Execute an atomic Lua script: check `if redis.call("get", key) > 0 then return redis.call("decr", key) else return 0 end`. Redis single-threaded event loop processes 100,000 ops/sec with zero lock contention.',
        subCodeOrFormula: 'Atomic Redis DECR / Lua Script'
      },
      {
        stepNumber: 3,
        title: 'Queue Successful Reservations Asynchronously',
        explanation: 'The 100 successful orders are pushed into a message broker (Kafka or RabbitMQ). Downstream order worker services consume the queue at a controlled pace to persist orders to the SQL database.',
        subCodeOrFormula: 'Client ──► Redis (Atomic) ──► Kafka Queue ──► SQL DB Worker'
      }
    ],
    visualRepresentation: {
      type: 'ascii-diagram',
      content: '50K req/s ──► [API Gateway] ──► [Redis Cluster: DECR stock]\n                                     │\n                       ┌─────────────┴─────────────┐\n                       ▼                           ▼\n             Stock > 0 (100 users)        Stock == 0 (49,900 users)\n                       │                           │\n              [Kafka Order Queue]          Instant "Sold Out" (20ms)\n                       │\n              [Async DB Writers]'
    },
    finalAnswer: 'Use atomic Redis in-memory decrements (via Lua script) for immediate stock gating, followed by Kafka asynchronous order persistence.',
    commonMistake: 'Relying on frontend disabling of buttons or optimistic DB locking without an in-memory queue.',
    interviewRelevance: 'Classic High-Level System Design (HLD) interview question at Flipkart, Amazon, and Swiggy.',
    relatedPracticeChallenge: 'How do you handle order rollback if a user fails to complete payment within 10 minutes?'
  },
  {
    id: 'EX50',
    category: 'Industry Scenarios',
    title: 'Idempotent Payment Webhook Processing',
    difficulty: 'Hard',
    problemStatement: 'A payment gateway (e.g. Stripe, Razorpay) sends a webhook POST request when a payment succeeds. Due to network retries, the payment gateway may send the same webhook 3 times in 10 seconds. How does the receiving application ensure the customer is not credited or shipped twice?',
    conceptTested: 'Idempotency key storage with database unique constraints and transactions',
    steps: [
      {
        stepNumber: 1,
        title: 'Extract Unique Event ID',
        explanation: 'Every payment webhook includes a globally unique event ID (e.g. `evt_3Mv4w...`).',
        subCodeOrFormula: 'String eventId = payload.get("id");'
      },
      {
        stepNumber: 2,
        title: 'Insert into Processed Events Table with Unique Constraint',
        explanation: 'Create a database table `processed_events (event_id VARCHAR PRIMARY KEY, status VARCHAR, processed_at TIMESTAMP)`. Before processing, attempt to insert `event_id` in an atomic transaction.',
        subCodeOrFormula: 'INSERT INTO processed_events (event_id) VALUES (...) ON CONFLICT DO NOTHING;'
      },
      {
        stepNumber: 3,
        title: 'Differentiate Fresh vs Duplicate Invocations',
        explanation: 'If the insert succeeds (1 row affected), process the order and fulfill the credits. If a duplicate key violation occurs (0 rows), immediately return HTTP 200 OK to acknowledge receipt without executing duplicate side effects.',
        subCodeOrFormula: 'Duplicate detected => return 200 OK immediately'
      }
    ],
    visualRepresentation: {
      type: 'trace',
      content: 'Webhook #1 (evt_99) ──► DB Insert: Success ──► Credit Wallet + Ship Order ──► Return 200 OK\nWebhook #2 (evt_99) ──► DB Insert: Duplicate Key ──► Skip Credit ──► Return 200 OK\nWebhook #3 (evt_99) ──► DB Insert: Duplicate Key ──► Skip Credit ──► Return 200 OK'
    },
    finalAnswer: 'Record the unique event ID in an indexed database table with a UNIQUE constraint within an ACID transaction before executing fulfillment.',
    commonMistake: 'Returning HTTP 400/500 on duplicates (which prompts the gateway to keep retrying indefinitely!).',
    interviewRelevance: 'Core production backend design question asked at Stripe, PayPal, and FinTech unicorns.',
    relatedPracticeChallenge: 'How do you handle the race condition if Webhook #1 and Webhook #2 arrive concurrently within 2 milliseconds?'
  }
];
