import maskUep from '../maskUep'

describe('Teste a função que retorna uma mask', () => {
    test('Teste para saber se funcina', () => {
        
        const maskUepVal = maskUep("XXXXX", 1)
        expect(maskUepVal).toEqual("00001")
    })
    test('Dois numeros', () => {
        
        const maskUepVal = maskUep("XXXXXX", 18)
        expect(maskUepVal).toEqual("000018")
    })
})