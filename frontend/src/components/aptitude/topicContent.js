// ─── Topic Content Bank ─────────────────────────────────────────────────────
// Rich structured content for each topic across all categories.

const HAND_CRAFTED = {
    quantitative: {
        'Number System': {
            overview: { description: 'Number System covers classification of numbers, divisibility, LCM/HCF, and properties of integers.', importance: 'Foundation of all quantitative problems. Every arithmetic topic builds on this.', askedIn: ['IT/MNC', 'Banking', 'Govt (SSC/RRB)'], difficulty: 'Easy', weightage: '8–12%' },
            concepts: [
                { title: 'Types of Numbers', content: 'Natural (1,2,3…), Whole (0,1,2…), Integers (…-2,-1,0,1,2…), Rational (p/q form), Irrational (√2, π), Real, Complex.' },
                { title: 'Divisibility Rules', content: 'By 2: last digit even. By 3: digit sum divisible by 3. By 4: last 2 digits. By 5: ends in 0 or 5. By 9: digit sum. By 11: alternating digit difference.' },
                { title: 'Unit Digit (Cyclicity)', content: 'Powers of 2 cycle in 4 (2,4,8,6). Powers of 3 cycle in 4 (3,9,7,1). Powers of 7 cycle in 4 (7,9,3,1). Always find remainder of power ÷ 4.' },
                { title: 'Factorials & Trailing Zeros', content: 'Trailing zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …' },
            ],
            formulas: ['HCF × LCM = Product of two numbers', 'Sum of first n natural numbers = n(n+1)/2', 'Sum of squares = n(n+1)(2n+1)/6', 'Sum of cubes = [n(n+1)/2]²', 'Trailing zeros in n! = ⌊n/5⌋ + ⌊n/25⌋ + …'],
            shortcuts: ['To multiply by 5: multiply by 10 then divide by 2', 'To find square of n5: n(n+1) followed by 25. E.g. 65² = 6×7=42, so 4225', 'Cyclicity: always divide exponent by 4, use remainder to find unit digit', 'Product of n consecutive integers is always divisible by n!'],
            examples: [
                { q: 'Find unit digit of 7^95', solution: '95 ÷ 4 = remainder 3. 7¹=7, 7²=9, 7³=3. Unit digit = 3.' },
                { q: 'HCF of 36 and 48?', solution: '36=2²×3², 48=2⁴×3. HCF = 2²×3 = 12.' },
                { q: 'LCM of 12, 18, 24?', solution: '12=2²×3, 18=2×3², 24=2³×3. LCM = 2³×3² = 72.' },
                { q: 'Trailing zeros in 25!?', solution: '⌊25/5⌋+⌊25/25⌋ = 5+1 = 6 zeros.' },
                { q: 'Which is divisible by 11: 91487?', solution: 'Alt digits: (9+4+7)-(1+8)=20-9=11. Yes, divisible by 11.' },
            ],
            mistakes: ['Confusing HCF×LCM = a×b only for TWO numbers', 'Forgetting cyclicity starts at power=1 not power=0', 'Missing second term ⌊n/25⌋ in trailing zeros formula'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=number+system+aptitude+tricks', pyq: 'https://www.indiabix.com/aptitude/problems-on-numbers/' },
            aiInsights: { mostTested: 'Unit digit & cyclicity', avgTime: '45 sec', aiDifficulty: 'Easy–Medium', dailyCount: 10 },
        },
        'Percentages': {
            overview: { description: 'Percentages express a number as a fraction of 100. Used in profit/loss, DI, banking exams heavily.', importance: 'Appears in almost every section — profit, SI/CI, growth rate, data interpretation.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Easy', weightage: '10–15%' },
            concepts: [
                { title: 'Basic Conversion', content: '1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/7=14.28%, 1/8=12.5%, 1/10=10%.' },
                { title: 'Percentage Change', content: 'Change% = ((New−Old)/Old)×100. For increase: add positive; for decrease: use negative.' },
                { title: 'Successive Percentage Change', content: 'Two changes a% and b%: Net = a + b + ab/100. E.g., 10% up then 10% down = 10+(-10)+(10×-10/100) = -1%.' },
                { title: 'Population / Price Problems', content: 'If price rises by r%, consumption must drop by r/(100+r)×100% to keep expenditure same.' },
            ],
            formulas: ['x% of y = y% of x', 'New value after r% increase = Old × (1 + r/100)', 'Successive net change = a + b + ab/100', 'Expenditure = Price × Quantity'],
            shortcuts: ['Memorize 1/n fractions up to 1/20 for instant % conversions', 'For 33.33%: use 1/3 directly in calculation', '200% increase = 3× original, NOT 2×'],
            examples: [
                { q: '15% of 240 = ?', solution: '10% of 240=24, 5%=12. Total=36.' },
                { q: 'Price up 20%, then down 20%. Net change?', solution: '20+(-20)+(20×-20/100)=0-4=-4%. Net 4% decrease.' },
                { q: 'If 30% of x = 90, find x.', solution: '0.3x=90 → x=300.' },
                { q: 'A salary rose from ₹8000 to ₹10000. Rise%?', solution: '(2000/8000)×100=25%.' },
                { q: 'What % is 48 of 64?', solution: '(48/64)×100=75%.' },
            ],
            mistakes: ['200% of = 2×, but 200% more = 3×', 'Applying successive formula in wrong order', 'Forgetting base changes after first percentage'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=percentage+shortcut+tricks+aptitude', pyq: 'https://www.indiabix.com/aptitude/percentage/' },
            aiInsights: { mostTested: 'Successive % change', avgTime: '40 sec', aiDifficulty: 'Easy', dailyCount: 12 },
        },
        'Profit & Loss': {
            overview: { description: 'Profit & Loss involves cost price, selling price, markup, discount, and trading scenarios.', importance: 'Very high weightage in all placement tests and banking exams.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Medium', weightage: '8–12%' },
            concepts: [
                { title: 'Basic Terms', content: 'CP=Cost Price, SP=Selling Price, MP=Marked Price. Profit=SP-CP. Loss=CP-SP.' },
                { title: 'Discount', content: 'Discount=MP-SP. Discount%=(Discount/MP)×100. SP=MP×(1-d/100).' },
                { title: 'Successive Discounts', content: 'Two discounts d1% and d2%: Net discount = d1+d2-d1×d2/100.' },
                { title: 'False Weight', content: 'A shopkeeper uses w grams instead of 1000g. Profit% = (1000-w)/w × 100.' },
            ],
            formulas: ['Profit% = (P/CP)×100', 'SP = CP×(1+P%/100)', 'CP = SP×100/(100+P%)', 'MP = SP/(1-d/100)', 'Net discount = d1+d2-d1d2/100'],
            shortcuts: ['If equal items sold at same price with different %P and %L and % values are same → always a loss of (x/10)²%', 'CP to MP ratio: CP/MP = (100-D%)/(100+P%)'],
            examples: [
                { q: 'CP=₹500, SP=₹625. Profit%?', solution: 'P=125. P%=(125/500)×100=25%.' },
                { q: 'MP=₹800, discount 15%. SP?', solution: 'SP=800×0.85=₹680.' },
                { q: 'Item sold at 20% profit. If CP was ₹240, find SP.', solution: 'SP=240×1.20=₹288.' },
                { q: 'Two successive discounts 20% and 10%. Net?', solution: '20+10-200/100=28%.' },
                { q: 'Shopkeeper uses 900g for 1kg. Profit%?', solution: '(1000-900)/900×100=11.11%.' },
            ],
            mistakes: ['Taking SP as base for profit% instead of CP', 'Adding successive discounts directly without formula', 'Confusing Markup% (on CP) with Discount% (on MP)'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=profit+loss+tricks+aptitude', pyq: 'https://www.indiabix.com/aptitude/profit-and-loss/' },
            aiInsights: { mostTested: 'Discount & MP problems', avgTime: '50 sec', aiDifficulty: 'Medium', dailyCount: 8 },
        },
        'Simple Interest': {
            overview: { description: 'Simple Interest is interest calculated on the original principal for a fixed period.', importance: 'Core topic for banking exams (SBI, IBPS). Often combined with CI.', askedIn: ['Banking', 'Govt', 'IT/MNC'], difficulty: 'Easy', weightage: '5–8%' },
            concepts: [
                { title: 'SI Formula', content: 'SI = PRT/100, where P=Principal, R=Rate%, T=Time in years.' },
                { title: 'Amount', content: 'A = P + SI = P(1 + RT/100).' },
                { title: 'Finding unknowns', content: 'P = 100×SI/(R×T). R = 100×SI/(P×T). T = 100×SI/(P×R).' },
            ],
            formulas: ['SI = PRT/100', 'A = P + SI', 'P = 100×SI/(R×T)', 'Rate = 100×SI/(P×T)'],
            shortcuts: ['If SI is double principal: T = 100/R years', 'SI for 2 years at r% = 2r% of principal', 'Monthly rate: divide annual rate by 12'],
            examples: [
                { q: 'P=₹2000, R=5%, T=3yr. SI?', solution: 'SI=2000×5×3/100=₹300.' },
                { q: 'SI=₹600, P=₹2000, T=3yr. Rate?', solution: 'R=100×600/(2000×3)=10%.' },
                { q: 'When will ₹1000 double at 8% SI?', solution: 'T=100/8=12.5 years.' },
                { q: 'A=₹1200, P=₹1000, R=5%. Find T.', solution: 'SI=200. T=100×200/(1000×5)=4 years.' },
            ],
            mistakes: ['Mixing T in months and R in % per year without converting', 'Forgetting A = P + SI (taking A as SI directly)'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=simple+interest+aptitude', pyq: 'https://www.indiabix.com/aptitude/simple-interest/' },
            aiInsights: { mostTested: 'Finding Rate or Time', avgTime: '35 sec', aiDifficulty: 'Easy', dailyCount: 8 },
        },
        'Time & Work': {
            overview: { description: 'Time and Work deals with efficiency, combined work rates, and work distribution problems.', importance: 'Very frequently asked in TCS, Infosys, Banking, SSC.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Medium', weightage: '8–10%' },
            concepts: [
                { title: 'Work Rate', content: 'If A does work in n days, A\'s 1-day work = 1/n. If A and B work together: Combined rate = 1/a + 1/b.' },
                { title: 'Pipes and Cistern', content: 'Inlet pipe fills = positive rate. Outlet drain = negative rate. Net rate = sum of all.' },
                { title: 'Efficiency Method', content: 'Assume total work = LCM of days. Find daily work units. Divide total by combined daily units.' },
            ],
            formulas: ['Combined time = ab/(a+b) for two workers', 'Efficiency = 1/Days', 'Total Work = Efficiency × Time', 'MDH formula: M1D1H1/W1 = M2D2H2/W2'],
            shortcuts: ['LCM method: avoid fractions entirely', 'If A twice as fast as B, A completes in half B\'s time', 'Pipe problems: treat drain as negative pipe'],
            examples: [
                { q: 'A does in 10 days, B in 15. Together?', solution: 'Combined: 1/10+1/15=3/30+2/30=5/30=1/6. Time=6 days.' },
                { q: 'A fills tank in 20 min, B drains in 30 min. Net fill time?', solution: 'Net=1/20-1/30=1/60. Time=60 min.' },
                { q: '10 workers complete in 8 days. 8 workers?', solution: '10×8=80 man-days. 80/8=10 days.' },
            ],
            mistakes: ['Adding days instead of rates (never add days!)', 'Forgetting to check if outlet is open when filling'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=time+and+work+aptitude+tricks', pyq: 'https://www.indiabix.com/aptitude/time-and-work/' },
            aiInsights: { mostTested: 'LCM efficiency method', avgTime: '55 sec', aiDifficulty: 'Medium', dailyCount: 8 },
        },
        'Ratio & Proportion': {
            overview: { description: 'Ratio compares two quantities. Proportion states two ratios are equal.', importance: 'Base concept used in mixtures, partnership, and DI problems.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Easy', weightage: '6–8%' },
            concepts: [
                { title: 'Ratio', content: 'a:b = a/b. Always reduce to simplest form. Compounded ratio: (a:b) and (c:d) = ac:bd.' },
                { title: 'Proportion', content: 'a:b = c:d → ad = bc (cross multiplication). Mean proportion of a and b = √(ab). Third proportion of a,b = b²/a.' },
                { title: 'Partnership', content: 'Profit split proportional to Capital × Time each partner invests.' },
            ],
            formulas: ['product of means = product of extremes: ad=bc', 'Mean proportion = √(a×b)', 'Third proportion of a,b = b²/a'],
            shortcuts: ['Ratio of mixture: Alligation method for finding mix ratio', 'If ratio a:b and total=T, then a\'s share = a/(a+b)×T'],
            examples: [
                { q: 'Divide ₹900 in ratio 4:5.', solution: 'Parts: 4/9×900=400 and 5/9×900=500.' },
                { q: 'A:B=3:4, B:C=5:6. Find A:B:C.', solution: 'A:B:C = 15:20:24.' },
                { q: 'Mean proportion of 4 and 16?', solution: '√(4×16)=√64=8.' },
            ],
            mistakes: ['Compound ratio: multiply both sides, not add', 'Forgetting to normalize before combining ratios'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=ratio+proportion+aptitude', pyq: 'https://www.indiabix.com/aptitude/ratio-and-proportion/' },
            aiInsights: { mostTested: 'Partnership & compound ratio', avgTime: '40 sec', aiDifficulty: 'Easy', dailyCount: 8 },
        },
        'Time & Distance': {
            overview: { description: 'Covers speed, distance, time relationships, trains, boats and streams.', importance: 'High frequency in TCS NQT, Infosys, IBPS, SSC CGL.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Medium', weightage: '8–10%' },
            concepts: [
                { title: 'Basic Relation', content: 'Speed = Distance/Time. Distance = Speed × Time. Always use consistent units (km/h or m/s). 1 km/h = 5/18 m/s.' },
                { title: 'Relative Speed', content: 'Same direction: |S1−S2|. Opposite direction: S1+S2. Train crossing: uses length of train(s) as distance.' },
                { title: 'Average Speed', content: 'Avg speed for equal distances = 2ab/(a+b) (harmonic mean, NOT arithmetic mean).' },
            ],
            formulas: ['Speed = D/T', 'Average Speed (equal dist) = 2ab/(a+b)', 'Upstream speed = B−R, Downstream = B+R', '1 km/h = 5/18 m/s'],
            shortcuts: ['For trains: passing time = (train length + object length)/relative speed', 'Boats: boat speed in still water = (upstream+downstream)/2', 'Stream speed = (downstream−upstream)/2'],
            examples: [
                { q: 'A train 150m long at 60 km/h passes a pole. Time?', solution: '60 km/h=60×5/18=50/3 m/s. T=150÷(50/3)=9 sec.' },
                { q: 'Equal distance at 40 and 60 km/h. Avg speed?', solution: '2×40×60/(40+60)=4800/100=48 km/h.' },
                { q: 'Boat: downstream 30 km in 3h, upstream in 5h. Find speeds.', solution: 'D=10 km/h, U=6 km/h. Boat=8 km/h, Stream=2 km/h.' },
            ],
            mistakes: ['Using arithmetic average for speed (must use harmonic mean)', 'Forgetting to add both train lengths when two trains cross each other'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=time+distance+speed+aptitude', pyq: 'https://www.indiabix.com/aptitude/time-and-distance/' },
            aiInsights: { mostTested: 'Trains crossing problems', avgTime: '60 sec', aiDifficulty: 'Medium', dailyCount: 8 },
        },
        'Mixtures': {
            overview: { description: 'Mixtures problems involve combining two or more substances and finding the resultant concentration.', importance: 'Common in banking exams and TCS. Alligation is a key technique.', askedIn: ['Banking', 'IT/MNC', 'Govt'], difficulty: 'Hard', weightage: '5–8%' },
            concepts: [
                { title: 'Alligation Rule', content: '(Cheaper quantity):(Costlier quantity) = (Costlier price − Mean price):(Mean price − Cheaper price).' },
                { title: 'Replacement', content: 'After n replacements of x litres from V litres: remaining pure = V×(1−x/V)^n.' },
            ],
            formulas: ['Alligation ratio = (d−m):(m−c) where c=cheap, d=dear, m=mean', 'After n replacements: Concentration = (1−x/V)^n'],
            shortcuts: ['Draw alligation diagram for quick ratio finding', 'Replacement formula: think compound interest in reverse'],
            examples: [
                { q: 'Mix milk at ₹20 and ₹30 to get ₹24/L. Ratio?', solution: 'Alligation: (30-24):(24-20)=6:4=3:2.' },
                { q: '40L vessel, replace 8L with water 3 times. Pure milk left?', solution: '40×(1-8/40)³=40×0.8³=40×0.512=20.48L.' },
            ],
            mistakes: ['Inverting the alligation ratio', 'Not using compound formula for repeated replacement'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=alligation+and+mixtures+aptitude', pyq: 'https://www.indiabix.com/aptitude/alligation-or-mixture/' },
            aiInsights: { mostTested: 'Alligation & replacement', avgTime: '70 sec', aiDifficulty: 'Hard', dailyCount: 6 },
        },
        'Probability': {
            overview: { description: 'Probability measures likelihood of an event occurring, ranging from 0 to 1.', importance: 'Heavy in Wipro, Accenture, banking exams. Foundation for Permutation & Combination.', askedIn: ['IT/MNC', 'Banking'], difficulty: 'Hard', weightage: '5–8%' },
            concepts: [
                { title: 'Basic Probability', content: 'P(E) = Favorable outcomes / Total outcomes. P(not E) = 1 − P(E). 0 ≤ P(E) ≤ 1.' },
                { title: 'Addition Rule', content: 'P(A∪B) = P(A) + P(B) − P(A∩B). For mutually exclusive: P(A∪B) = P(A)+P(B).' },
                { title: 'Multiplication Rule', content: 'P(A∩B) = P(A) × P(B) for independent events.' },
                { title: 'Conditional Probability', content: 'P(A|B) = P(A∩B)/P(B).' },
            ],
            formulas: ['P(E) = n(E)/n(S)', 'P(A∪B) = P(A)+P(B)−P(A∩B)', 'P(A∩B) = P(A)×P(B) [independent]', 'P(A\') = 1−P(A)'],
            shortcuts: ['Draw sample space for dice/coin problems', 'Complementary counting: P(at least one) = 1 − P(none)'],
            examples: [
                { q: 'Two dice rolled. P(sum=7)?', solution: 'Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total=36. P=6/36=1/6.' },
                { q: 'Card drawn from deck. P(king or heart)?', solution: 'P(K)=4/52, P(H)=13/52, P(K∩H)=1/52. P=16/52=4/13.' },
                { q: 'Bag: 3R, 4B. P(2 red without replacement)?', solution: '(3/7)×(2/6)=6/42=1/7.' },
            ],
            mistakes: ['Using P(A)×P(B) when events are NOT independent', 'Forgetting to subtract intersection in addition rule'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=probability+aptitude+tricks', pyq: 'https://www.indiabix.com/aptitude/probability/' },
            aiInsights: { mostTested: 'Dice + card + ball problems', avgTime: '75 sec', aiDifficulty: 'Hard', dailyCount: 6 },
        },
        'Permutation & Combination': {
            overview: { description: 'Counting arrangements (permutations) and selections (combinations).', importance: 'Tested in product and banking exams. Overlaps with probability.', askedIn: ['IT/MNC', 'Banking'], difficulty: 'Hard', weightage: '5–6%' },
            concepts: [
                { title: 'Permutation', content: 'Arrangement matters. nPr = n!/(n-r)!. All permutations of n things = n!.' },
                { title: 'Combination', content: 'Selection only. nCr = n!/(r!(n-r)!). nCr = nC(n-r).' },
                { title: 'Circular Permutation', content: '(n-1)! ways to arrange n objects in a circle.' },
                { title: 'Repetition Allowed', content: 'r positions, n choices each = nʳ ways.' },
            ],
            formulas: ['nPr = n!/(n-r)!', 'nCr = n!/[r!(n-r)!]', 'Circular = (n-1)!', 'nC0 = nCn = 1', 'nCr + nCr-1 = (n+1)Cr'],
            shortcuts: ['Combination = Permutation/r!', '10C3 = 120 (memorize common values)', 'Vowels together: treat as single unit'],
            examples: [
                { q: '5 books arranged in 3 spaces: ways?', solution: '5P3 = 5×4×3 = 60.' },
                { q: 'Choose 3 from 7 people: ways?', solution: '7C3 = 35.' },
                { q: 'APPLE arrangements?', solution: '5!/2! = 60 (P repeats twice).' },
            ],
            mistakes: ['Using P when C is needed (or vice versa)', 'Forgetting to divide by repeated elements in word problems'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=permutation+combination+aptitude', pyq: 'https://www.indiabix.com/aptitude/permutation-and-combination/' },
            aiInsights: { mostTested: 'Word arrangements & selection', avgTime: '80 sec', aiDifficulty: 'Hard', dailyCount: 5 },
        },
    },
    logical: {
        'Syllogism': {
            overview: { description: 'Syllogism tests deductive reasoning — drawing valid conclusions from given statements.', importance: 'High frequency in all competitive exams. Tests analytical thinking.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Medium', weightage: '10–15%' },
            concepts: [
                { title: 'Universal Statements', content: '"All A are B" → draw A inside B. "No A is B" → A and B separate circles.' },
                { title: 'Particular Statements', content: '"Some A are B" → A and B partially overlap. "Some A are not B" → part of A outside B.' },
                { title: 'Possibility Cases', content: 'When conclusion says "Some A may be B" — check if any diagram allows this without contradiction.' },
            ],
            formulas: ['All+All → All (transitive)', 'All+Some → Some', 'Some+All → Some (reversed)', 'No+All → No', 'Conclusions with "all" need fully contained circles'],
            shortcuts: ['Draw Venn diagrams for every statement', 'Eliminate conclusions that contradict even one valid diagram', 'Possibility = Not impossible in ANY diagram'],
            examples: [
                { q: 'All cats are dogs. All dogs are birds. Conclusion: All cats are birds?', solution: 'Valid. Cats⊆Dogs⊆Birds, so Cats⊆Birds.' },
                { q: 'Some lions are tigers. All tigers are bears. Conclusion: Some lions are bears?', solution: 'Valid. The "some" lions that are tigers are also bears.' },
            ],
            mistakes: ['Assuming "Some A are B" means "Some A are not B" (not implied)', 'Reversing transitive chains incorrectly'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=syllogism+tricks+competitive+exam', pyq: 'https://www.indiabix.com/logical-reasoning/syllogism/' },
            aiInsights: { mostTested: 'Possibility-based conclusions', avgTime: '60 sec', aiDifficulty: 'Medium', dailyCount: 10 },
        },
        'Blood Relations': {
            overview: { description: 'Blood Relations test ability to decode family relationships from coded or direct sentences.', importance: 'Standard in all aptitude exams. Questions are often coded puzzles.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Easy–Medium', weightage: '6–8%' },
            concepts: [
                { title: 'Generation Tree', content: 'Draw the family tree top-down. Use ♂/♀ or M/F. Connect with lines (marriage = horizontal, parent-child = vertical).' },
                { title: 'Coded Relations', content: 'A+B = A is father of B. A-B = A is mother of B. A×B = A is brother of B. A÷B = A is sister of B.' },
                { title: 'Gender Clues', content: 'Uncle, Father, Brother, Son, Grandfather → Male. Aunt, Mother, Sister, Daughter → Female.' },
            ],
            formulas: ['No arithmetic formulas — logic tree approach.'],
            shortcuts: ['Start from the LAST person mentioned', 'Always establish genders first', 'Label each person with generation level (0, 1, 2)'],
            examples: [
                { q: 'A is B\'s mother. C is A\'s son. How is C related to B?', solution: 'A is mother of B and C. So C is B\'s brother.' },
                { q: 'Pointing to a photo: "He is the only son of my father\'s wife." Relation?', solution: 'Father\'s wife = mother. Only son of mother = the person himself.' },
            ],
            mistakes: ['Assuming gender without explicit info', 'Confusing maternal/paternal relationships'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=blood+relations+tricks+aptitude', pyq: 'https://www.indiabix.com/logical-reasoning/blood-relation-test/' },
            aiInsights: { mostTested: 'Coded blood relations', avgTime: '50 sec', aiDifficulty: 'Medium', dailyCount: 8 },
        },
        'Coding-Decoding': {
            overview: { description: 'Tests ability to identify patterns used to encode words or numbers and decode messages.', importance: 'Regular feature in TCS, Infosys, Wipro, SSC, and IBPS.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Easy–Medium', weightage: '8–10%' },
            concepts: [
                { title: 'Letter Position Coding', content: 'A=1, B=2 … Z=26. Also a+z=27, b+y=27. Reverse: Z=1, A=26. Reverse alphabet trick: position from end = 27 − position from start.' },
                { title: 'Word Coding', content: 'If APPLE→BQQMF (each letter +1), apply the same shift to find target word.' },
                { title: 'Number Coding', content: 'Identify mathematical operation applied to word length or letter positions.' },
            ],
            formulas: ['Position from end = 27 − position from front', 'Opposite letter of A(1) = Z(26)', 'CAT = 3+1+20=24'],
            shortcuts: ['EJOTY trick: E=5,J=10,O=15,T=20,Y=25 — memorize for quick position finding', 'Check both forward and reverse alphabets'],
            examples: [
                { q: 'If CAT=24, find DOG.', solution: 'D=4, O=15, G=7. Sum=26.' },
                { q: 'TIGER coded as UJHFS. Code for HORSE?', solution: 'Each letter +1: H→I, O→P, R→S, S→T, E→F → IPSTF.' },
            ],
            mistakes: ['Forgetting reverse alphabet coding option', 'Using wrong base (1 vs 0 indexed)'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=coding+decoding+reasoning+tricks', pyq: 'https://www.indiabix.com/logical-reasoning/coding-decoding/' },
            aiInsights: { mostTested: 'Letter shift coding', avgTime: '35 sec', aiDifficulty: 'Easy', dailyCount: 10 },
        },
        'Puzzles': {
            overview: { description: 'Puzzles require organizing given constraints to determine correct arrangement of people, objects, or events.', importance: 'Highest weightage in IBPS, SBI, Infosys. Most time-consuming section.', askedIn: ['Banking', 'IT/MNC'], difficulty: 'Hard', weightage: '15–20%' },
            concepts: [
                { title: 'Linear Arrangement', content: 'Arrange n people in a row. Use direct clues first, then relative clues. Create a blank template.' },
                { title: 'Circular Arrangement', content: 'Fix one person as reference (since rotational symmetry). Determine clockwise vs anti-clockwise neighbors.' },
                { title: 'Floor Puzzle', content: 'n-floor building. Use clue logic: "X is above Y" = X\'s floor number > Y\'s.' },
                { title: 'Scheduling / Ordering', content: 'Order events/people by days/months. Use "before/after" constraints as inequalities.' },
            ],
            formulas: ['No formulas — pure logical deduction.'],
            shortcuts: ['Fix definite clues first, then work outward', 'Use elimination: if X can\'t be 3 positions, it must be the remaining one', 'Draw a grid: rows=positions, columns=attributes'],
            examples: [
                { q: '5 people A-E sit in a row. B is 2nd from left, D is to the right of B but not adjacent. E is at one end. Arrange.', solution: 'E is at end 1 or 5. B=2nd. D not adjacent to B so D is 4th or 5th. Work through constraints to get: E,B,A,D,C or similar.' },
            ],
            mistakes: ['Ignoring "not" conditions in clues', 'Forgetting to verify final arrangement against ALL clues'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=seating+arrangement+puzzles+banking', pyq: 'https://www.indiabix.com/logical-reasoning/puzzle-test/' },
            aiInsights: { mostTested: 'Circular seating arrangement', avgTime: '3–4 min (set)', aiDifficulty: 'Hard', dailyCount: 3 },
        },
        'Seating Arrangement': {
            overview: { description: 'Seating arrangement puzzles involve placing people in defined positions based on given constraints.', importance: 'Major topic in IBPS PO, SBI PO — typically 2 sets of 5 questions each.', askedIn: ['Banking', 'IT/MNC', 'Govt'], difficulty: 'Hard', weightage: '10–15%' },
            concepts: [
                { title: 'Linear (Row) Arrangement', content: 'All face same direction or opposite. "Left of" and "right of" must account for facing direction.' },
                { title: 'Circular Arrangement', content: 'Facing inward or outward matters. "Immediate left" changes with direction.' },
                { title: 'Double Row', content: '2 parallel rows, each person faces another. Person in row1 facing person in row2 = directly opposite.' },
            ],
            formulas: ['Circular arrangements of n = (n-1)! unique rotations'],
            shortcuts: ['For "persons facing center": 2nd to left of A facing center = 2nd to A\'s right from outside view', 'Box approach for double row: label seats 1-N each row, match cross-facing'],
            examples: [
                { q: '8 people sit in circle facing center. A is 3rd to right of B. Find position gaps.', solution: 'Count clockwise from B: 1st,2nd,3rd = A. Use to deduce others.' },
            ],
            mistakes: ['Reversing left/right when direction changes', 'Misidentifying "immediate" vs "2nd to the left/right"'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=seating+arrangement+tricks+ibps', pyq: 'https://www.indiabix.com/logical-reasoning/data-sufficiency/' },
            aiInsights: { mostTested: 'Circular arrangement with 8 people', avgTime: '3–4 min (set)', aiDifficulty: 'Hard', dailyCount: 3 },
        },
    },
    verbal: {
        'Reading Comprehension': {
            overview: { description: 'RC tests ability to understand, analyze, and draw inferences from a given passage.', importance: 'Highest weightage in verbal section across all exams.', askedIn: ['IT/MNC', 'Banking', 'Govt', 'International (GMAT/GRE)'], difficulty: 'Medium–Hard', weightage: '20–25%' },
            concepts: [
                { title: 'Passage Types', content: 'Analytical, Narrative, Descriptive, Argumentative. Each has a different tone and structure.' },
                { title: 'Question Types', content: 'Main idea, Factual, Inference, Vocabulary in context, Author\'s tone, Title selection.' },
                { title: 'Active Reading', content: 'Read topic sentence of each paragraph first. Identify author\'s stance in last paragraph.' },
            ],
            formulas: ['No formulas. Strategy: Skim → Mark key points → Answer questions using paragraph reference.'],
            shortcuts: ['Eliminate extreme answers (always, never, completely)', 'Inference questions: must be TRUE based on passage, not just possible', 'Author tone words: critical, supportive, neutral, satirical, skeptical'],
            examples: [
                { q: 'After reading a passage on climate change, Q: "Author\'s main purpose?"', solution: 'Look for thesis in first/last paragraph. Match with answer that covers the entire passage scope, not just one detail.' },
            ],
            mistakes: ['Answering from general knowledge instead of passage content', 'Choosing answers that are "too strong" in tone (always/never)'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=reading+comprehension+tips+aptitude', pyq: 'https://www.indiabix.com/english/reading-comprehension/' },
            aiInsights: { mostTested: 'Inference & author tone questions', avgTime: '90 sec per question', aiDifficulty: 'Hard', dailyCount: 2 },
        },
        'Error Spotting': {
            overview: { description: 'Identify grammatical errors in sentences — subject-verb agreement, tense, prepositions, articles.', importance: 'Standard question type in SSC, Banking, and IT verbal sections.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Medium', weightage: '10–12%' },
            concepts: [
                { title: 'Subject-Verb Agreement', content: 'Singular subject takes singular verb. "Each, every, either, neither" = singular. "None" can be singular or plural.' },
                { title: 'Tense Errors', content: 'If one clause uses Past Perfect (had + V3), the other must use Simple Past. "Since" → Present Perfect.' },
                { title: 'Preposition Errors', content: 'Common correct usage: "differ from", "agree with", "cope with", "interfere in", "abide by".' },
                { title: 'Article Errors', content: 'Use "an" before vowel sounds (not letters). "A unique" (yu-sound). A/an with first mention; "the" with specific/known.' },
            ],
            formulas: ['None — grammatical rules determine answers.'],
            shortcuts: ['Identify subject first, then check verb (ignore middle phrases)', '"Either/or" and "neither/nor": verb agrees with nearer subject', '"Despite / In spite of" → always followed by noun/gerund, never clause'],
            examples: [
                { q: 'Spot error: "He don\'t know the answer."', solution: '"don\'t" should be "doesn\'t" — He (3rd person singular) takes "does not".' },
                { q: 'Spot error: "Neither of the boys were present."', solution: '"were" should be "was" — Neither = singular verb.' },
            ],
            mistakes: ['Ignoring intervening phrases between subject and verb', 'Confusing "less" (uncountable) vs "fewer" (countable)'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=error+spotting+english+grammar+tricks', pyq: 'https://www.indiabix.com/english/spotting-errors/' },
            aiInsights: { mostTested: 'Subject-verb agreement', avgTime: '30 sec', aiDifficulty: 'Medium', dailyCount: 10 },
        },
        'Vocabulary Builder': {
            overview: { description: 'Tests knowledge of synonyms, antonyms, one-word substitutions, and idioms.', importance: 'Quick wins if memorized. Tested in SSC CGL, Banking, and all IT verbal sections.', askedIn: ['IT/MNC', 'Banking', 'Govt'], difficulty: 'Easy–Medium', weightage: '8–10%' },
            concepts: [
                { title: 'Root Words', content: 'Latin/Greek roots: "bene"=good, "mal"=bad, "auto"=self, "bio"=life, "phon"=sound, "scrib"=write.' },
                { title: 'High Frequency Words', content: 'Aberrant (deviating), Benevolent (kind), Candid (honest), Dogmatic (rigid), Ephemeral (short-lived), Frivolous (trivial).' },
                { title: 'One-Word Substitution', content: 'Autobiography=own life story, Philanthropy=love for mankind, Misanthrope=hates mankind, Omniscient=all knowing.' },
            ],
            formulas: ['No formula. Memorization by root words + context.'],
            shortcuts: ['Learn 10 root words/day instead of individual words', 'Use memory pegs: "Ephemeral" sounds like "ephemera" (short-lived material)', 'Antonym of a rare word often easier to identify'],
            examples: [
                { q: 'Synonym of "Opulent"?', solution: 'Wealthy / Affluent / Luxurious.' },
                { q: 'Antonym of "Verbose"?', solution: 'Concise / Terse / Laconic.' },
            ],
            mistakes: ['Confusing similar-sounding words: affect/effect, eminent/imminent', 'Ignoring context — many words have multiple meanings'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=vocabulary+builder+competitive+exams', pyq: 'https://www.indiabix.com/english/synonyms/' },
            aiInsights: { mostTested: 'High-frequency synonym/antonym pairs', avgTime: '20 sec', aiDifficulty: 'Easy', dailyCount: 20 },
        },
    },
    dataInterpretation: {
        'Bar Charts': {
            overview: { description: 'Bar charts display data as rectangular bars. Questions test ability to read, compare, and calculate from bar data.', importance: 'DI forms 10–20% of Banking exams. Bar charts are the most common DI type.', askedIn: ['Banking', 'IT/MNC', 'Govt'], difficulty: 'Medium', weightage: '15–20% in DI' },
            concepts: [
                { title: 'Reading Values', content: 'Read each bar carefully from the scale. For stacked bars, subtract lower segment from top.' },
                { title: 'Ratio & Percentage Questions', content: 'Ratio between bars: simply divide the two values. % change between years: (New-Old)/Old×100.' },
                { title: 'Average Calculations', content: 'Sum all bar values, divide by number of bars.' },
            ],
            formulas: ['% change = (New-Old)/Old × 100', 'Average = Sum/Count', 'Ratio = Value1/Value2'],
            shortcuts: ['Approximate bar heights to nearest 5 to speed up reading', 'For % share: (one bar / total all bars)×100', 'Pre-calculate total before answering multiple questions on same chart'],
            examples: [
                { q: 'Sales: Jan=₹200, Feb=₹300, Mar=₹250. Avg sales?', solution: '(200+300+250)/3 = 750/3 = ₹250.' },
                { q: 'Jan=200 to Feb=300. % increase?', solution: '(300-200)/200×100 = 50%.' },
            ],
            mistakes: ['Reading wrong scale (y-axis may start at non-zero)', 'Calculating % on wrong base (always use Old/Original as base)'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=bar+chart+data+interpretation+tricks', pyq: 'https://www.indiabix.com/data-interpretation/bar-charts/' },
            aiInsights: { mostTested: '% change between consecutive periods', avgTime: '45 sec per question', aiDifficulty: 'Medium', dailyCount: 5 },
        },
        'Pie Charts': {
            overview: { description: 'Pie charts show proportional data as slices of a circle. Each slice = percentage of 360°.', importance: 'Very common in banking prelims (IBPS, SBI) and SSC.', askedIn: ['Banking', 'Govt', 'IT/MNC'], difficulty: 'Medium', weightage: '10–15% in DI' },
            concepts: [
                { title: 'Degree to Percent', content: '360° = 100%. So x° = (x/360)×100%. Sector angle = (Value/Total)×360°.' },
                { title: 'Value Calculation', content: 'If total = T and sector = x%, value = x%×T.' },
                { title: 'Ratio Between Sectors', content: 'Directly compare sector angles/percentages.' },
            ],
            formulas: ['Sector % = (angle/360)×100', 'Value = %/100 × Total', 'Ratio of two sectors = their degree ratio'],
            shortcuts: ['36° = 10%, 18° = 5%, 72° = 20%', 'Memorize common degree-percent pairs'],
            examples: [
                { q: 'Sector = 72°. Total = ₹5000. Value?', solution: '72/360 = 20%. 20% of 5000 = ₹1000.' },
                { q: 'A=30%, B=45%, C=25%. If C=₹500, total?', solution: 'Total = 500/0.25 = ₹2000.' },
            ],
            mistakes: ['Confusing degree with percentage', 'Not checking if total is given or to be derived'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=pie+chart+data+interpretation', pyq: 'https://www.indiabix.com/data-interpretation/pie-charts/' },
            aiInsights: { mostTested: 'Degree-percent conversion', avgTime: '40 sec per question', aiDifficulty: 'Medium', dailyCount: 5 },
        },
    },
    advanced: {
        'Coding Aptitude': {
            overview: { description: 'Coding aptitude tests programming logic: output prediction, pseudocode, complexity, and algorithm tracing.', importance: 'Critical for software company OAs (Amazon, Flipkart, TCS Digital, Wipro Turbo).', askedIn: ['IT/MNC (Product)', 'IT/MNC (Service)'], difficulty: 'Medium–Hard', weightage: '30–50% in tech tests' },
            concepts: [
                { title: 'Output Prediction', content: 'Trace code step by step. Track variable values. Watch for loops, recursion, and edge cases.' },
                { title: 'Time Complexity', content: 'O(1) constant, O(log n) binary search, O(n) linear, O(n²) nested loops, O(2^n) recursive.' },
                { title: 'Pseudocode', content: 'Read pseudocode like English. Focus on loop boundaries and conditional logic.' },
            ],
            formulas: ['Time Complexity rules: drop constants, lower-order terms', '2**3**2 = 2**(3**2) = 2**9 = 512 (right-to-left exponentiation in Python)'],
            shortcuts: ['For output questions: trace with small values first', 'Recognize patterns: sum of 1..n = n(n+1)/2', 'Bit operations: n&(n-1) removes lowest set bit'],
            examples: [
                { q: 'What is output of print(2**3**2) in Python?', solution: '3**2=9 first, then 2**9=512. Answer: 512.' },
                { q: 'for i in range(1,5): print(i*2)?', solution: 'Outputs: 2 4 6 8.' },
            ],
            mistakes: ['Left-to-right evaluation of ** (Python is right-to-left)', 'Off-by-one in range() — range(1,5) excludes 5'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=coding+aptitude+TCS+digital+questions', pyq: 'https://www.geeksforgeeks.org/tcs-coding-aptitude-questions/' },
            aiInsights: { mostTested: 'Output prediction & time complexity', avgTime: '90 sec', aiDifficulty: 'Hard', dailyCount: 5 },
        },
        'Decision Making': {
            overview: { description: 'Tests ability to choose the most logical, ethical, and process-oriented response in workplace scenarios.', importance: 'Featured in Accenture, Capgemini, and all consulting firm aptitude tests.', askedIn: ['IT/MNC', 'Consulting'], difficulty: 'Medium', weightage: '10–15%' },
            concepts: [
                { title: 'Principles', content: 'Follow procedure before action. Investigate before acting. Escalate when appropriate. Prioritize safety and ethics.' },
                { title: 'Elimination Strategy', content: 'Eliminate extreme options (fire immediately, ignore completely). Choose the measured, process-driven middle option.' },
            ],
            formulas: ['No calculation formulas. Apply: Investigate → Follow Policy → Escalate → Act.'],
            shortcuts: ['Extreme options are almost always wrong', 'Option with "investigate" or "consult" is usually correct', 'Ethical violations: always escalate to higher authority'],
            examples: [
                { q: 'Employee leaking trade secrets. Best action?', solution: 'Initiate a formal investigation following company policy before taking any disciplinary action.' },
            ],
            mistakes: ['Choosing the most drastic immediate action', 'Ignoring the investigation/verification step'],
            resources: { youtube: 'https://www.youtube.com/results?search_query=decision+making+questions+aptitude', pyq: 'https://www.indiabix.com/verbal-reasoning/decision-making/' },
            aiInsights: { mostTested: 'Workplace ethics scenarios', avgTime: '45 sec', aiDifficulty: 'Medium', dailyCount: 5 },
        },
    },
};

// Template generator for topics without hand-crafted content
function generateContent(category, topic) {
    const catMeta = {
        quantitative: { label: 'Quantitative Aptitude', askedIn: ['IT/MNC', 'Banking', 'Govt'], pyqBase: 'https://www.indiabix.com/aptitude/' },
        logical: { label: 'Logical Reasoning', askedIn: ['IT/MNC', 'Banking', 'Govt'], pyqBase: 'https://www.indiabix.com/logical-reasoning/' },
        verbal: { label: 'Verbal Ability', askedIn: ['IT/MNC', 'Banking', 'Govt'], pyqBase: 'https://www.indiabix.com/english/' },
        dataInterpretation: { label: 'Data Interpretation', askedIn: ['Banking', 'Govt', 'IT/MNC'], pyqBase: 'https://www.indiabix.com/data-interpretation/' },
        advanced: { label: 'Advanced Aptitude', askedIn: ['IT/MNC (Product)', 'Govt'], pyqBase: 'https://www.indiabix.com/' },
    };
    const meta = catMeta[category] || catMeta.quantitative;
    const slug = topic.toLowerCase().replace(/\s+/g, '+');
    return {
        overview: { description: `${topic} is a key topic in ${meta.label}. It tests conceptual understanding and application in exam settings.`, importance: `Regularly asked in competitive exams. Mastering ${topic} helps boost your overall score significantly.`, askedIn: meta.askedIn, difficulty: 'Medium', weightage: '5–10%' },
        concepts: [
            { title: `Introduction to ${topic}`, content: `Understand the fundamental definitions, core principles, and scope of ${topic}. Start with the basic definitions and build up to applied problems.` },
            { title: 'Key Principles', content: `Apply the standard methods: identify given values, select the right formula or technique, and verify your answer. Work through examples from simple to complex.` },
            { title: 'Problem-Solving Approach', content: `Break complex ${topic} problems into sub-steps. Identify the question type first, then choose the appropriate approach.` },
            { title: 'Common Variations', content: `Exam questions on ${topic} appear in several forms: direct calculation, word problems, and data-based interpretation. Practice each type.` },
        ],
        formulas: [`Core ${topic} formula: Apply the foundational equation for the topic`, `Derived formula: Use when standard approach needs modification`, `Verification method: Cross-check your answer with reverse calculation`],
        shortcuts: [`Identify the question type before solving ${topic} problems`, `Practice converting word problems to mathematical expressions quickly`, `Use estimation to eliminate wrong answer choices`, `Check units and boundary conditions in every ${topic} problem`],
        examples: [
            { q: `Example 1: Basic ${topic} problem — Direct application of the core formula.`, solution: `Step 1: Identify the given values. Step 2: Apply the primary formula. Step 3: Verify by substituting back.` },
            { q: `Example 2: Moderate ${topic} problem — Multi-step calculation required.`, solution: `Step 1: Simplify the problem. Step 2: Break into sub-parts. Step 3: Combine results for final answer.` },
            { q: `Example 3: Word problem on ${topic} — Translate language to equation.`, solution: `Step 1: Extract numerical data from sentence. Step 2: Set up the equation. Step 3: Solve and verify.` },
            { q: `Example 4: Tricky variation where a common mistake leads to a wrong answer.`, solution: `Step 1: Don't fall for the trap. Step 2: Reread carefully. Step 3: Apply the correct rule or formula.` },
            { q: `Example 5: Choose-the-odd-one or comparison problem on ${topic}.`, solution: `Step 1: Evaluate each option systematically. Step 2: Compare results. Step 3: Select the one that satisfies all conditions.` },
        ],
        mistakes: [`Using the wrong formula for a specific ${topic} variation`, `Not reading the question completely — missing a constraint or condition`, `Unit mismatch when different formats are given (e.g., hours vs minutes)`, `Failing to verify the answer by substituting back into the original equation`],
        resources: {
            youtube: `https://www.youtube.com/results?search_query=${slug}+aptitude+tricks+shortcuts`,
            pyq: `${meta.pyqBase}`,
        },
        aiInsights: { mostTested: `Core application of ${topic}`, avgTime: '60 sec', aiDifficulty: 'Medium', dailyCount: 8 },
    };
}

export function getTopicContent(category, topic) {
    const catData = HAND_CRAFTED[category];
    if (catData && catData[topic]) return catData[topic];
    return generateContent(category, topic);
}

export default HAND_CRAFTED;
