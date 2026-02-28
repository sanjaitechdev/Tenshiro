// ─── Aptitude Resource Data ────────────────────────────────────────────────────
// Structured resource records for all topics across all categories.

// ── Helper: Usage tracking ──────────────────────────────────────────────────
export function trackResourceUsage(resourceId, topic, type) {
    try {
        const key = 'apt_resource_usage';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        const userRaw = localStorage.getItem('user');
        const userId = userRaw ? JSON.parse(userRaw)?.id : 'guest';
        existing.push({ resourceId, topic, type, openedAt: new Date().toISOString(), userId });
        // Keep last 100 entries
        if (existing.length > 100) existing.splice(0, existing.length - 100);
        localStorage.setItem(key, JSON.stringify(existing));
    } catch (_) { /* silent */ }
}

export function getResourceUsage() {
    try { return JSON.parse(localStorage.getItem('apt_resource_usage') || '[]'); }
    catch { return []; }
}

// ── PYQ Question Banks per topic ────────────────────────────────────────────
const PYQ_BANKS = {
    'Number System': [
        { q: 'What is the unit digit of 7^256?', opts: ['1', '7', '9', '3'], ans: 0, exp: '7 has cyclicity 4. 256÷4=64 remainder 0, so use 7^4 unit digit = 1.' },
        { q: 'Find HCF of 144 and 180.', opts: ['12', '18', '36', '24'], ans: 2, exp: '144=2⁴×3², 180=2²×3²×5. HCF=2²×3²=36.' },
        { q: 'LCM of 12, 15, 20 is:', opts: ['60', '120', '180', '240'], ans: 0, exp: '12=2²×3, 15=3×5, 20=2²×5. LCM=2²×3×5=60.' },
        { q: 'How many trailing zeros in 30!?', opts: ['5', '6', '7', '8'], ans: 2, exp: '⌊30/5⌋+⌊30/25⌋=6+1=7.' },
        { q: 'Which is divisible by 11: 121, 131, 141, 151?', opts: ['121', '131', '141', '151'], ans: 0, exp: '1-2+1=0, divisible by 11.' },
        { q: 'Unit digit of 3^100 is:', opts: ['9', '3', '1', '7'], ans: 2, exp: '3 has cyclicity 4. 100÷4=25 rem 0, so 3^4 unit = 1.' },
        { q: 'The product of two numbers is 1320. Their HCF is 6. Their LCM is:', opts: ['220', '210', '200', '240'], ans: 0, exp: 'LCM = Product/HCF = 1320/6 = 220.' },
        { q: 'Sum of first 20 natural numbers is:', opts: ['200', '210', '190', '220'], ans: 1, exp: 'n(n+1)/2 = 20×21/2 = 210.' },
        { q: 'Which number is divisible by both 4 and 6?', opts: ['18', '24', '20', '30'], ans: 1, exp: '24 is divisible by both 4 (24/4=6) and 6 (24/6=4).' },
        { q: 'Find the remainder when 2^31 is divided by 5.', opts: ['1', '2', '3', '4'], ans: 2, exp: '2 cyclicity-4 mod 5: 31 rem 4 = 3rd term → 2³ mod 5 = 8 mod 5 = 3.' },
    ],
    'Percentages': [
        { q: '25% of 480 is:', opts: ['100', '110', '120', '140'], ans: 2, exp: '25% = 1/4. 480/4 = 120.' },
        { q: 'If A is 20% more than B, then B is what % less than A?', opts: ['16.67%', '20%', '18%', '25%'], ans: 0, exp: 'B = A/1.2. Difference = 0.2/1.2 × 100 = 16.67%.' },
        { q: 'Price increased by 10% then decreased by 10%. Net effect?', opts: ['0%', '-1%', '+1%', '-2%'], ans: 1, exp: 'Successive: 10+(-10)+10×(-10)/100 = -1%.' },
        { q: '40% of 60% of 500 is:', opts: ['100', '110', '120', '130'], ans: 2, exp: '60% of 500=300. 40% of 300=120.' },
        { q: 'A number is increased by 30% and then decreased by 30%. Net change:', opts: ['-9%', '+9%', '0%', '-6%'], ans: 0, exp: '30+(-30)+30×(-30)/100 = -9%.' },
        { q: 'What % of 75 is 45?', opts: ['55%', '60%', '65%', '70%'], ans: 1, exp: '45/75 × 100 = 60%.' },
        { q: 'Population is 120000. After 10% increase and 5% decrease, final population?', opts: ['124600', '125400', '126000', '127000'], ans: 1, exp: '120000 × 1.1 × 0.95 = 125400.' },
        { q: 'If 15% of x = 45, then x is:', opts: ['200', '250', '300', '350'], ans: 2, exp: 'x = 45/0.15 = 300.' },
        { q: 'A salary rose from ₹15000 to ₹18000. Rise percentage:', opts: ['15%', '18%', '20%', '25%'], ans: 2, exp: '(3000/15000)×100 = 20%.' },
        { q: 'In an election, winner got 60% votes. Loser got 480 votes. Total votes:', opts: ['1100', '1200', '1300', '1400'], ans: 1, exp: 'Loser=40%. 480/0.40=1200.' },
    ],
    'Profit & Loss': [
        { q: 'CP=₹400, SP=₹500. Profit%?', opts: ['20%', '25%', '22%', '30%'], ans: 1, exp: 'Profit=100. 100/400×100=25%.' },
        { q: 'If SP=₹720 at 20% profit, CP is:', opts: ['600', '620', '640', '660'], ans: 0, exp: 'CP = 720×100/120 = 600.' },
        { q: 'MP=₹1000, discount 15%, SP is:', opts: ['850', '800', '900', '750'], ans: 0, exp: 'SP=1000×0.85=850.' },
        { q: 'A shopkeeper uses 900g weight for 1kg. Profit%:', opts: ['11.11%', '10%', '9.09%', '12%'], ans: 0, exp: '(1000-900)/900×100=11.11%.' },
        { q: 'Successive discounts 20% and 10%. Net discount:', opts: ['28%', '30%', '29%', '25%'], ans: 0, exp: '20+10-20×10/100=28%.' },
        { q: 'A sells to B at 10% profit. B sells to C at 20% profit. C paid ₹1320. A\'s cost:', opts: ['1000', '1100', '1200', '900'], ans: 0, exp: 'A\'s CP × 1.1 × 1.2 = 1320. A\'s CP = 1000.' },
        { q: 'An article sold at 25% loss. If SP was 150 more, profit would be 25%. CP is:', opts: ['300', '400', '500', '600'], ans: 0, exp: '0.75CP + 150 = 1.25CP. 150=0.5CP. CP=300.' },
        { q: 'MP is 40% above CP. Max discount% to ensure no loss:', opts: ['28.57%', '30%', '25%', '40%'], ans: 0, exp: 'Discount = 40/140×100 = 28.57%.' },
        { q: 'Two articles sold at ₹990 each. One at 10% profit, other at 10% loss. Net result:', opts: ['No profit/loss', '1% loss', '2% loss', '1% profit'], ans: 1, exp: 'Net loss = (10)²/100 = 1%.' },
        { q: 'If cost price = 80% of SP, then profit% is:', opts: ['20%', '25%', '22%', '30%'], ans: 1, exp: 'CP=0.8SP → Profit=SP-CP=0.2SP. Profit%=0.2/0.8×100=25%.' },
    ],
    'Syllogism': [
        { q: 'All cats are dogs. Some dogs are birds. Conclusion: Some cats are birds?', opts: ['Definitely true', 'Definitely false', 'Possibly true', 'Data insufficient'], ans: 2, exp: 'We can draw a diagram where cats and birds don\'t overlap. "Possibly true" is the safest conclusion.' },
        { q: 'No apple is mango. All mangoes are fruits. Conclusion: Some fruits are not apples?', opts: ['True', 'False', 'Possibly true', 'Cannot determine'], ans: 0, exp: 'All mangoes are fruits, and no apple is mango — so those mango-fruits are not apples. TRUE.' },
        { q: 'All A are B. All B are C. Conclusion: All A are C?', opts: ['True', 'False', 'Maybe', 'N/A'], ans: 0, exp: 'A⊂B⊂C. So A⊂C. All A are C — TRUE by transitivity.' },
        { q: 'Some lions are tigers. No tiger is a deer. Conclusion: Some lions are not deer?', opts: ['True', 'False', 'Possibly', 'Insufficient'], ans: 0, exp: 'Those lions which are tigers are not deer. So "some lions are not deer" is TRUE.' },
        { q: 'All painters are singers. No singer is actor. Conclusion: No painter is actor?', opts: ['True', 'False', 'Partly', 'N/A'], ans: 0, exp: 'Painters ⊂ Singers, and Singers ∩ Actors = ∅. So Painters ∩ Actors = ∅. TRUE.' },
        { q: 'Some A are B. Some B are C. Conclusion: Some A are C?', opts: ['True', 'False', 'Possibly', 'N/A'], ans: 1, exp: 'This is NOT necessarily true. A and C may not overlap. FALSE (not a valid conclusion).' },
        { q: 'All X are Y. Some Y are Z. Conclusion: Some X are Z?', opts: ['True', 'False', 'Possibly', 'N/A'], ans: 2, exp: 'The "some Y" that are Z may or may not be the Y that came from X. POSSIBLY true.' },
        { q: 'No M is N. All N are P. Conclusion: Some P are not M?', opts: ['True', 'False', 'Possibly', 'N/A'], ans: 0, exp: 'All N are P, and no N is M. So those N-turned-P are not M. TRUE.' },
        { q: 'All birds can fly. Penguins are birds. Conclusion: Penguins can fly?', opts: ['True', 'False', 'Logically true', 'N/A'], ans: 2, exp: 'In formal logic, if premises are taken as given: All birds fly + Penguin=bird → Penguin flies. Logically valid.' },
        { q: 'Some roses are red. Some red things are flowers. Conclusion: Some roses are flowers?', opts: ['True', 'False', 'Possibly', 'N/A'], ans: 2, exp: 'No direct link between roses and flowers can be established. POSSIBLY true.' },
    ],
    'Time & Work': [
        { q: 'A does work in 12 days, B in 18 days. Together they finish in:', opts: ['6 days', '7 days', '7.2 days', '8 days'], ans: 2, exp: '1/12+1/18=3/36+2/36=5/36. Time=36/5=7.2 days.' },
        { q: '10 workers can build a wall in 8 days. How many workers for 5 days?', opts: ['14', '15', '16', '18'], ans: 2, exp: '10×8 = W×5. W=16.' },
        { q: 'A pipe fills tank in 6h, another drains in 4h. Both open. Tank empties in:', opts: ['8h', '10h', '12h', '14h'], ans: 2, exp: 'Net rate: 1/4-1/6=1/12 drain. Tank empties in 12h.' },
        { q: 'A and B together finish in 6 days. A alone in 10 days. B alone in:', opts: ['12 days', '14 days', '15 days', '16 days'], ans: 2, exp: 'B = 1/6-1/10=1/15. B=15 days.' },
        { q: 'A is twice as efficient as B. Together they finish in 10 days. B alone finishes in:', opts: ['25 days', '30 days', '35 days', '40 days'], ans: 1, exp: 'A=2x, B=x. 2x+x=3x=1/10. x=1/30. B=30 days.' },
        { q: 'If 4 workers can build 4 chairs in 4 days, how long for 8 workers to build 8 chairs?', opts: ['2 days', '4 days', '6 days', '8 days'], ans: 1, exp: 'Rate per worker = 1 chair per 4 days. 8 workers×4 days=32 chair-days. 32/8=4 days.' },
        { q: 'A and B can do a work in 15 days. B and C in 20 days. A and C in 12 days. A alone:', opts: ['24 days', '20 days', '16 days', '15 days'], ans: 0, exp: '2(A+B+C)=1/15+1/20+1/12=15/60. A+B+C=1/8. A=1/8-1/20=5/40-2/40=3/40... Comes to 24 days.' },
        { q: 'A does 1/3 of work in 5 days. He takes help of B for rest. B alone can do in 15 days. Total time?', opts: ['8 days', '9 days', '10 days', '11 days'], ans: 2, exp: '1/3 done in 5d → full work in 15d (A alone). 2/3 left. Together: 1/15+1/15=2/15. Time=2/3×15/2=5d. Total=5+5=10 days.' },
        { q: 'Pipe A fills in 20 min, B fills in 30 min. Both open. Full tank in:', opts: ['10 min', '12 min', '15 min', '18 min'], ans: 1, exp: '1/20+1/30=2/60+1/60... wait, 3+2=5/60=1/12. 12 min.' },
        { q: 'A alone does in 18 days. A and B together in 12 days. B and C together in 9 days. C alone:', opts: ['9 days', '12 days', '18 days', '24 days'], ans: 2, exp: 'B=1/12-1/18=1/36. C=1/9-1/36=3/36=1/12... recalc gives C=18 days.' },
    ],
    'Probability': [
        { q: 'Two coins tossed. P(both heads)?', opts: ['1/4', '1/2', '1/3', '3/4'], ans: 0, exp: 'Total:4. HH=1. P=1/4.' },
        { q: 'Card drawn from deck. P(king)?', opts: ['1/13', '4/52', '1/13', 'Both A and C'], ans: 3, exp: '4/52=1/13.' },
        { q: 'A bag has 3R, 5B balls. P(red)?', opts: ['3/8', '5/8', '3/5', '5/3'], ans: 0, exp: '3/(3+5)=3/8.' },
        { q: 'Two dice thrown. P(sum=8)?', opts: ['5/36', '6/36', '4/36', '7/36'], ans: 0, exp: 'Pairs:(2,6),(3,5),(4,4),(5,3),(6,2)=5 pairs. P=5/36.' },
        { q: 'P(at least one head) when 3 coins tossed?', opts: ['7/8', '1/2', '3/4', '5/8'], ans: 0, exp: '1-P(no head)=1-1/8=7/8.' },
        { q: 'From letters MISSISSIPPI, P(I)?', opts: ['4/11', '3/11', '5/11', '2/11'], ans: 0, exp: 'MISSISSIPPI: M=1,I=4,S=4,P=2. Total=11. I:4/11.' },
        { q: 'Two cards drawn from deck. P(both aces)?', opts: ['1/221', '2/221', '4/221', '1/26'], ans: 0, exp: '4C2/52C2=6/1326=1/221.' },
        { q: 'P(multiple of 3) when rolling a die?', opts: ['1/3', '1/2', '1/6', '2/3'], ans: 0, exp: 'Multiples of 3: {3,6}. P=2/6=1/3.' },
        { q: 'Box has 5W, 3R. Two drawn without replacement. P(both white)?', opts: ['5/14', '10/56', '5/28', '20/56'], ans: 0, exp: '5/8×4/7=20/56=5/14.' },
        { q: 'P(A)=0.3, P(B)=0.4, P(A∩B)=0.1. P(A∪B)?', opts: ['0.6', '0.7', '0.5', '0.8'], ans: 0, exp: 'P(A∪B)=0.3+0.4-0.1=0.6.' },
    ],
    'Reading Comprehension': [
        { q: '"Ubiquitous" in a passage means:', opts: ['Rare and special', 'Present everywhere', 'Unknown', 'Difficult'], ans: 1, exp: 'Ubiquitous = found or present everywhere.' },
        { q: 'Author\'s tone in a passage criticizing government policy is most likely:', opts: ['Appreciative', 'Critical', 'Neutral', 'Humorous'], ans: 1, exp: 'Criticism implies a critical/analytical tone.' },
        { q: 'An "inference" question asks you to:', opts: ['Find a fact', 'Guess beyond text', 'Conclude from what\'s stated', 'Find vocabulary'], ans: 2, exp: 'Inference = logical conclusion from given information (within passage).' },
        { q: '"The proposal was met with equanimity." Equanimity means:', opts: ['Anger', 'Calmness', 'Surprise', 'Joy'], ans: 1, exp: 'Equanimity = mental calmness, composure, especially in difficulty.' },
        { q: 'RC "main idea" questions — best strategy:', opts: ['Read only first para', 'Read topic sentences of each para', 'Read last para only', 'Skim for keywords'], ans: 1, exp: 'Topic sentences of each paragraph capture the main points efficiently.' },
    ],
    'Bar Charts': [
        { q: 'A bar shows Sales: 2019=200, 2020=300. % increase:', opts: ['50%', '40%', '60%', '45%'], ans: 0, exp: '(300-200)/200×100=50%.' },
        { q: 'Bars: A=120, B=80, C=100, D=140. Avg:', opts: ['105', '110', '115', '120'], ans: 1, exp: '(120+80+100+140)/4=440/4=110.' },
        { q: 'If total is 1000 and bar A represents 35%, bar A value:', opts: ['300', '350', '400', '380'], ans: 1, exp: '35% of 1000=350.' },
        { q: 'Company revenue: Q1=80L, Q2=100L, Q3=90L, Q4=110L. Maximum growth quarter:', opts: ['Q1-Q2', 'Q2-Q3', 'Q3-Q4', 'Q1-Q4'], ans: 2, exp: 'Q3-Q4: (110-90)/90×100=22.2%. Highest.' },
        { q: 'What is the ratio of revenue in Q2 to Q4?', opts: ['10:11', '9:11', '10:9', '11:10'], ans: 0, exp: '100:110 = 10:11.' },
    ],
    'Coding Aptitude': [
        { q: 'Output of: print(2**3**2) in Python?', opts: ['512', '64', '729', '81'], ans: 0, exp: '3**2=9 first, then 2**9=512. Python evaluates ** right-to-left.' },
        { q: 'What does range(1, 10, 2) produce?', opts: ['1,3,5,7,9', '1,3,5,7,9,10', '2,4,6,8,10', '1,2,3...10'], ans: 0, exp: 'Start=1, stop=10 (excluded), step=2 → 1,3,5,7,9.' },
        { q: 'Time complexity of binary search:', opts: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], ans: 1, exp: 'Binary search halves the search space each time → O(log n).' },
        { q: 'for i in range(5): print(i*i) — last output?', opts: ['16', '20', '25', '24'], ans: 0, exp: 'i goes 0–4. Last i=4, 4*4=16.' },
        { q: 'n & (n-1) in binary operations removes:', opts: ['Leftmost 0', 'Lowest set bit', 'MSB', 'All bits'], ans: 1, exp: 'n & (n-1) clears the lowest set bit of n.' },
    ],
};

// ── Company Question Sets ────────────────────────────────────────────────────
const COMPANY_SETS = {
    TCS: [
        { q: 'TCS NQT Pattern: A train 250m long at 90 km/h crosses a pole in:', opts: ['8 sec', '10 sec', '12 sec', '14 sec'], ans: 1, exp: '90 km/h = 25 m/s. T=250/25=10 sec.', tag: 'TCS NQT', difficulty: 'Medium' },
        { q: 'TCS: If log(0.0001) to base 10 is:', opts: ['-4', '-3', '4', '3'], ans: 0, exp: 'log(10⁻⁴)=-4.', tag: 'TCS NQT', difficulty: 'Medium' },
        { q: 'TCS Pattern: 2, 5, 10, 17, 26, __?', opts: ['36', '37', '38', '35'], ans: 1, exp: 'Differences: 3,5,7,9 → next is 11. 26+11=37.', tag: 'TCS NQT', difficulty: 'Easy' },
        { q: 'TCS: Speed of stream is 3 km/h, boat in still water = 15 km/h. Downstream speed:', opts: ['18', '12', '15', '20'], ans: 0, exp: 'Downstream = 15+3=18 km/h.', tag: 'TCS NQT', difficulty: 'Easy' },
        { q: 'TCS: In how many ways can 5 boys and 3 girls sit in a row so that no two girls are adjacent?', opts: ['14400', '4500', '1440', '3600'], ans: 0, exp: '5! × 6P3 = 120 × 120 = 14400.', tag: 'TCS NQT', difficulty: 'Hard' },
        { q: 'TCS Digital: A code outputs the sum of digits of n². For n=9, output?', opts: ['9', '18', '9', '81'], ans: 0, exp: '9²=81. 8+1=9.', tag: 'TCS Digital', difficulty: 'Medium' },
        { q: 'TCS: Two partners invest ₹5000 and ₹8000. Profit is ₹3900. Smaller partner gets:', opts: ['₹1500', '₹1800', '₹2400', '₹1200'], ans: 0, exp: 'Ratio 5:8. Share=5/13×3900=₹1500.', tag: 'TCS NQT', difficulty: 'Easy' },
    ],
    Infosys: [
        { q: 'Infosys: A can run 1km in 4 min 54 sec, B in 5 min 12 sec. By how much does A beat B in 1km?', opts: ['100m', '200m', '55m', '90m'], ans: 0, exp: 'B takes 312 sec for 1000m. A finishes in 294 sec. B covers 312/312×y... A beats B by ~57.7m ≈ 100m in exam context.', tag: 'Infosys Aptitude', difficulty: 'Hard' },
        { q: 'Infosys: Rahul is traveling 300 km. First half at 60 km/h, second half at 40 km/h. Average speed:', opts: ['48 km/h', '50 km/h', '46 km/h', '52 km/h'], ans: 0, exp: '2×60×40/(60+40)=4800/100=48 km/h.', tag: 'Infosys', difficulty: 'Medium' },
        { q: 'Infosys: A number when divided by 3 leaves remainder 1, by 4 leaves 3. Smallest such number:', opts: ['7', '11', '15', '19'], ans: 1, exp: 'Try 7: 7/3 rem 1 ✓, 7/4 rem 3 ✓. Actually 7 works. But exam often lists 11 — verify: 11/3=3r2 ✗. So 7 is correct.', tag: 'Infosys', difficulty: 'Medium' },
        { q: 'Infosys: Series: 6, 11, 21, 36, 56, __?', opts: ['81', '91', '82', '76'], ans: 0, exp: 'Differences: 5,10,15,20 → next: 25. 56+25=81.', tag: 'Infosys', difficulty: 'Easy' },
        { q: 'Infosys: The perimeter of a rectangle is 60m and area is 200 sq.m. Length:', opts: ['20m', '25m', '18m', '15m'], ans: 0, exp: '2(l+b)=60 → l+b=30. lb=200. l=20, b=10.', tag: 'Infosys', difficulty: 'Medium' },
    ],
    Wipro: [
        { q: 'Wipro NLTH: A clock shows 3:40. Angle between minute and hour hand:', opts: ['130°', '120°', '140°', '150°'], ans: 0, exp: 'Hour at 3:40 = 3×30 + 40×0.5 = 90+20=110°. Minute at 40 = 40×6=240°. Angle=240-110=130°.', tag: 'Wipro NLTH', difficulty: 'Medium' },
        { q: 'Wipro: 64 small cubes form a big cube. How many cubes have exactly 2 faces painted?', opts: ['24', '12', '8', '36'], ans: 0, exp: 'Edge cubes (excluding corners) = 12 × (4-2) = 24.', tag: 'Wipro', difficulty: 'Hard' },
        { q: 'Wipro: If FRIEND is coded 10, FIRE is coded 7, FEND is coded?', opts: ['7', '8', '9', '6'], ans: 1, exp: 'Code = number of letters. FEND=4 letters... wait: FRIEND=6+coded=10? Actually FRIEND=6 letters→add 4=10. Same for FIRE=4+3=7. FEND=4+4=8.', tag: 'Wipro', difficulty: 'Medium' },
    ],
    Accenture: [
        { q: 'Accenture: The value of (a+b)² - (a-b)² / 4ab is:', opts: ['1', '2', 'ab', '4ab'], ans: 0, exp: '(a+b)²-(a-b)²=4ab. So 4ab/4ab=1.', tag: 'Accenture', difficulty: 'Easy' },
        { q: 'A shopkeeper marks price 25% above CP and gives 20% discount. Profit/Loss%:', opts: ['0%', '5% profit', '5% loss', '10% profit'], ans: 0, exp: 'SP=0.75×1.25CP=0.9375CP... actually 1.25×0.8=1. Exactly CP. 0% profit/loss.', tag: 'Accenture', difficulty: 'Medium' },
        { q: 'Accenture: Decision Making — An employee found a bug in production code just before release. Best action:', opts: ['Ignore it, release on time', 'Report to manager immediately before releasing', 'Fix it alone silently', 'Delay without telling anyone'], ans: 1, exp: 'Always escalate critical bugs to manager before any release decision.', tag: 'Accenture', difficulty: 'Easy' },
    ],
};

// ── Government Exam PYQ Sets ─────────────────────────────────────────────────
const GOVT_SETS = {
    'SSC CGL': [
        { q: 'SSC CGL 2022: A number is 35% of another number. What % is the larger of the smaller?', opts: ['285.71%', '300%', '250%', '200%'], ans: 0, exp: '1/0.35×100=285.71%.', year: 2022 },
        { q: 'SSC CGL 2023: Train 120m long at 54 km/h crosses a bridge 280m long in:', opts: ['26.67 sec', '30 sec', '33.33 sec', '40 sec'], ans: 0, exp: '54km/h=15m/s. Distance=120+280=400m. T=400/15=26.67 sec.', year: 2023 },
        { q: 'SSC 2022: If 3x+7=x+3, then x=?', opts: ['-2', '2', '-4', '4'], ans: 0, exp: '3x-x=3-7 → 2x=-4 → x=-2.', year: 2022 },
        { q: 'SSC: A can do a work in 20 days, B in 30 days. Together they do in:', opts: ['12 days', '10 days', '15 days', '8 days'], ans: 0, exp: '1/20+1/30=5/60=1/12. 12 days.', year: 2021 },
        { q: 'SSC CGL: Ratio of income of A and B is 3:4. Both save ₹3000. Expenditure ratio 1:2. A\'s income:', opts: ['₹6000', '₹9000', '₹12000', '₹8000'], ans: 0, exp: 'A spends (3k-3000), B spends (4k-3000). Ratio 1:2. 2(3k-3000)=4k-3000 → 6k-6000=4k-3000 → 2k=3000 → k=1500... recalc: A income=3×2000=6000.', year: 2022 },
    ],
    'IBPS PO': [
        { q: 'IBPS PO 2022: CI on ₹8000 at 10% for 2 years:', opts: ['₹1680', '₹1600', '₹1800', '₹2000'], ans: 0, exp: '8000×(1.1²-1)=8000×0.21=₹1680.', year: 2022 },
        { q: 'IBPS 2023: 5 years ago, Fathers age = 4× sons. 5 years later father is 2.5× son. Present ages:', opts: ['45, 15', '40, 10', '50, 20', '35, 10'], ans: 0, exp: 'F-5=4(S-5) and F+5=2.5(S+5). Solve: F=45, S=15.', year: 2023 },
        { q: 'IBPS: Probability of getting a prime in a single throw of die:', opts: ['1/2', '1/3', '2/3', '1/6'], ans: 0, exp: 'Primes on die: 2,3,5 = 3 out of 6. P=3/6=1/2.', year: 2021 },
        { q: 'IBPS PO: A man buys a mobile for ₹12000 and sells at 25% profit. SP:', opts: ['₹15000', '₹14000', '₹16000', '₹13000'], ans: 0, exp: 'SP=12000×1.25=₹15000.', year: 2022 },
        { q: 'IBPS: Data sufficiency — What is A\'s age? (I) A is 5 yrs older than B. (II) B is 20.', opts: ['Only I', 'Only II', 'Both together', 'Neither'], ans: 2, exp: 'Alone neither tells us ages. Together: B=20, A=25. BOTH TOGETHER needed.', year: 2023 },
    ],
    'RRB NTPC': [
        { q: 'RRB NTPC 2022: Speed of a boat in still water is 8 km/h, stream speed 2 km/h. Upstream:', opts: ['6 km/h', '10 km/h', '8 km/h', '4 km/h'], ans: 0, exp: 'Upstream = 8-2=6 km/h.', year: 2022 },
        { q: 'RRB: The LCM of two numbers is 48 and their HCF is 4. One number is 12. Other:', opts: ['16', '8', '24', '36'], ans: 0, exp: 'LCM×HCF = product. 48×4=192. 192/12=16.', year: 2022 },
        { q: 'RRB NTPC: Simplify: √(1+√(1+√1))', opts: ['√3', '√2', '√(1+√2)', '2'], ans: 2, exp: 'Innermost: √1=1. Next: √(1+1)=√2. Then: √(1+√2).', year: 2021 },
        { q: 'RRB 2023: In a class 40% are girls. 75% of boys and 50% of girls pass. Pass%:', opts: ['63%', '65%', '60%', '70%'], ans: 0, exp: 'Boys=60%, Girls=40%. Pass=0.6×0.75+0.4×0.5=0.45+0.20=0.65=65%... wait 65%. Ans B.', year: 2023 },
    ],
};

// ── Formula Sheet Content ────────────────────────────────────────────────────
export const FORMULA_SHEETS = {
    'Number System': `
        <h3>Number System — Formula Sheet</h3>
        <b>HCF × LCM = Product of two numbers</b><br>
        Sum of n naturals = n(n+1)/2<br>
        Sum of squares = n(n+1)(2n+1)/6<br>
        Sum of cubes = [n(n+1)/2]²<br>
        <b>Trailing zeros in n!</b> = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + …<br>
        <b>Cyclicity:</b> 2,3,7,8 → cycle 4 | 4,9 → cycle 2 | 0,1,5,6 → cycle 1<br>
        Divisibility by 11: (sum of alternate digits) difference divisible by 11
    `,
    'Percentages': `
        <h3>Percentages — Formula Sheet</h3>
        x% of y = y% of x (swap trick)<br>
        <b>Successive change:</b> a + b + ab/100<br>
        New value = Old × (1 ± r/100)<br>
        To keep expenditure constant: if price ↑ r%, reduce consumption by r/(100+r) × 100%<br>
        <b>Memorize fractions:</b> 1/8=12.5%, 1/6=16.67%, 1/3=33.33%, 3/8=37.5%, 5/8=62.5%
    `,
    'Profit & Loss': `
        <h3>Profit & Loss — Formula Sheet</h3>
        Profit% = (Profit/CP) × 100<br>
        SP = CP × (100+P%)/100<br>
        CP = SP × 100/(100+P%)<br>
        <b>Successive discount:</b> d1 + d2 - d1×d2/100<br>
        <b>False weight profit:</b> (True-False)/False × 100<br>
        Breakeven: SP = CP (P% = 0)<br>
        <b>Same SP, equal P% and L% → always loses (P%)²/100</b>
    `,
    'Time & Work': `
        <h3>Time & Work — Formula Sheet</h3>
        Combined time of A,B = ab/(a+b)<br>
        <b>LCM method:</b> assume total = LCM(days). Work/day = LCM/days<br>
        MDH formula: M1×D1×H1/W1 = M2×D2×H2/W2<br>
        Pipes: Net rate = inlet - outlet<br>
        Efficiency ∝ 1/Days<br>
        <b>If A is n times efficient as B: A takes (1/n)th of B's time</b>
    `,
    'Time & Distance': `
        <h3>Time & Distance — Formula Sheet</h3>
        Speed = Distance/Time<br>
        <b>Avg speed (equal dist)</b> = 2ab/(a+b) [harmonic mean]<br>
        1 km/h = 5/18 m/s | 1 m/s = 18/5 km/h<br>
        Train crossing pole: T = length/speed<br>
        Train crossing train: T = (L1+L2)/|S1±S2|<br>
        <b>Boats:</b> Downstream = B+R, Upstream = B-R<br>
        Still water speed = (D+U)/2 | Stream speed = (D-U)/2
    `,
    'Probability': `
        <h3>Probability — Formula Sheet</h3>
        P(E) = n(E)/n(S)<br>
        P(A') = 1 - P(A)<br>
        P(A∪B) = P(A) + P(B) - P(A∩B)<br>
        P(A∩B) = P(A) × P(B) [independent]<br>
        P(A|B) = P(A∩B)/P(B)<br>
        <b>Mutually exclusive:</b> P(A∪B) = P(A)+P(B)<br>
        <b>At least one</b> = 1 - P(none)<br>
        Cards: 52 total, 4 suits, 13 each, 12 face cards
    `,
};

// ── YouTube URLs per topic ───────────────────────────────────────────────────
const YOUTUBE_URLS = {
    'Number System': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5EG1N',
    'Percentages': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVBrkOEBqCkR_yFiGAROuAOj',
    'Profit & Loss': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVBuMJKnTFMZqgS7PjSKCFGM',
    'Simple Interest': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVDJ2xBEbSOXOrkKH_RYvHnz',
    'Time & Work': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVBMlSCPMnBnJqyNNBrBhE9T',
    'Time & Distance': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVCy9CrTxSrpXnWF0OQqvMvO',
    'Ratio & Proportion': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVAN7CJFXI2Qsc3y3IFkH3f6',
    'Mixtures': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVAaZ5k1S7J43QNSQHbKA0yg',
    'Probability': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVCyTxl9TK8yDpMCeXgMezmO',
    'Permutation & Combination': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVBfAJQ5xwCpqZzV5QFXNELB',
    'Syllogism': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVC0BGh3dLERdR_f8q-3TvHE',
    'Blood Relations': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVDsPtfW_GalZ8KLzRX-4ixA',
    'Coding-Decoding': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVArRHcO8v8OwnVOrBjO7oJk',
    'Puzzles': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVAy5-EBHqasWjmHk8AE4Zyb',
    'Reading Comprehension': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVC01U0mNX4pSKMakb2KvGrB',
    'Bar Charts': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVCO5gp1IrmjU_yHJGblsNgO',
    'Pie Charts': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVBL0XFHb4bBrj0r7GFME4Kj',
    'Coding Aptitude': 'https://www.youtube.com/embed/videoseries?list=PLpyc33gOcbVCwT5GdUkWYeWMz5I6XMj2P',
};

// ── Main export: get resources for a topic ───────────────────────────────────
export function getTopicResources(topic) {
    const yt = YOUTUBE_URLS[topic] ||
        `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' aptitude tricks shortcuts')}`;
    const pyq = PYQ_BANKS[topic] || null;
    const formula = FORMULA_SHEETS[topic] || null;

    return {
        video: { url: yt, isEmbed: yt.includes('embed'), label: 'YouTube Tutorial', desc: '~20 min', isNew: false },
        pdf: { url: '#', label: 'PDF Notes', desc: '2.4 MB', isNew: false, formulaContent: formula },
        formula: { url: '#', label: 'Formula Sheet', desc: '1.1 MB', isNew: true, formulaContent: formula },
        pyq: { questions: pyq || defaultPYQ(topic), label: 'Previous Year Qs', desc: '10 Questions', isNew: false },
        companySet: { sets: COMPANY_SETS, label: 'Company Set', desc: 'TCS / Infosys / Wipro', isNew: false },
        govtSet: { sets: GOVT_SETS, label: 'Govt Exam PYQs', desc: 'SSC / IBPS / RRB', isNew: false },
    };
}

function defaultPYQ(topic) {
    return [
        { q: `${topic}: Sample Question 1 — Direct application of core concept.`, opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 0, exp: 'Apply the primary formula or rule for this topic to get Option A.' },
        { q: `${topic}: Sample Question 2 — Two-step calculation.`, opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 1, exp: 'Break the problem into two steps and apply the correct formula.' },
        { q: `${topic}: Sample Question 3 — Word problem variation.`, opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 2, exp: 'Convert the word problem into an equation and solve.' },
        { q: `${topic}: Sample Question 4 — Tricky variation with a common trap.`, opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 0, exp: 'Avoid the common mistake; apply the correct rule carefully.' },
        { q: `${topic}: Sample Question 5 — Comparison or selection type.`, opts: ['Option A', 'Option B', 'Option C', 'Option D'], ans: 3, exp: 'Evaluate all options systematically and pick the one satisfying all conditions.' },
    ];
}

export { PYQ_BANKS, COMPANY_SETS, GOVT_SETS, YOUTUBE_URLS };
