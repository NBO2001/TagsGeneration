import returnDateOrder from '../returnDateOrder'

describe('Retun date in order', () => {
    test('Parse number and restun string in order', () => {
        const retDate = returnDateOrder('19/09/2020', '01/08/2021');

        expect(retDate).toEqual("19/09/2020 - 01/08/2021")
    })

    test('Parse number and restun string in order(month)', () => {
        const retDate = returnDateOrder('19/09/2021', '01/08/2021');

        expect(retDate).toEqual("01/08/2021 - 19/09/2021")
    })

    test('Parse number and restun string in order(days)', () => {
        const retDate = returnDateOrder('19/08/2021', '01/08/2021');

        expect(retDate).toEqual("01/08/2021 - 19/08/2021")
    })

    test('Parse number and restun string in order(Nothign)', () => {
        const retDate = returnDateOrder('19/08/2021');

        expect(retDate).toEqual(false)
    })

    test('Forcer error', () => {
        const retDate = returnDateOrder(154, 484);

        expect(retDate).toEqual(false)
    })
})