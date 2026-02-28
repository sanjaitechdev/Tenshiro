export const conceptBank = {
    quantitative: {
        'Number System': {
            concepts: [
                { title: 'Types of Numbers', content: 'Natural, Whole, Integers, Rational, Irrational, Real, and Complex numbers.' },
                { title: 'Divisibility Rules', content: 'Rules for 2, 3, 4, 5, 6, 8, 9, 10, 11.' },
                { title: 'Unit Digit calculation', content: 'Cyclicity of numbers to find the last digit of large powers.' }
            ],
            formulas: ['Sum of first n natural numbers = n(n+1)/2', 'Sum of squares = n(n+1)(2n+1)/6'],
            shortcuts: ['Multiplication by 5, 25, 125', 'Finding squares of numbers ending in 5'],
            video: 'https://www.youtube.com/results?search_query=number+system+aptitude',
            difficulty: 'Easy'
        },
        'Percentages': {
            concepts: [
                { title: 'Fraction to Percentage', content: '1/2 = 50%, 1/3 = 33.33%, 1/4 = 25%, 1/5 = 20%, 1/8 = 12.5%.' },
                { title: 'Successive Percentage', content: 'Formula: a + b + ab/100' }
            ],
            formulas: ['Percentage Change = (New - Old)/Old * 100'],
            shortcuts: ['Value to fraction conversion for faster calculations'],
            video: 'https://www.youtube.com/results?search_query=percentages+aptitude',
            difficulty: 'Easy'
        },
        'Profit & Loss': {
            concepts: [
                { title: 'Markup & Discount', content: 'SP = MP - Discount. Markup% = (MP-CP)/CP * 100.' }
            ],
            formulas: ['Profit% = (P/CP)*100', 'Loss% = (L/CP)*100'],
            shortcuts: ['CP to MP ratio trick: CP/MP = (100-D)/(100+P)'],
            difficulty: 'Medium'
        }
    },
    logical: {
        'Syllogism': {
            concepts: [
                { title: 'Venn Diagrams', content: 'Representing All, Some, No, Some Not using circles.' },
                { title: 'Possibility cases', content: 'Handling "Can be" or "Is a possibility" conclusions.' }
            ],
            shortcuts: ['Elimination method using standard patterns'],
            difficulty: 'Medium'
        },
        'Blood Relations': {
            concepts: [
                { title: 'Tree Method', content: 'Using symbols (+ for male, - for female) and generations.' }
            ],
            shortcuts: ['Starting from the last person mentioned in the statement'],
            difficulty: 'Easy'
        }
    }
};
