import { ActionType, StateType, div, mult, salaryReducer, sub, sum } from "./task"


test('sum', () => {
    //1.тестовые данные
    const salary: number = 800
    const n: number = 200

    //2.вып тестивуемого кода
    const result = sum(salary, n)

    //3.проверка результата
    expect(result).toBe(1000)

})


test('sub', () => {
    //1.тестовые данные
    const salary: number = 1200
    const n: number = 200

    //2.вып тестивуемого кода
    const result = sub(salary, n)

    //3.проверка результата
    expect(result).toBe(1000)

})

test('div', () => {
    //1.тестовые данные
    const salary: number = 1000
    const n: number = 2.7

    //2.вып тестивуемого кода
    const result = div(salary, n)

    //3.проверка результата
    expect(result).toBe(370.3703703703703)

})

test('mult', () => {
    //1.тестовые данные
    const salary: number = 1000
    const n: number = 2.7

    //2.вып тестивуемого кода
    const result = mult(salary, n)

    //3.проверка результата
    expect(result).toBe(2700)

})

test('case SUM of salaryReducer', () => {
    const salary: StateType = 1000
    const action: ActionType = {
        type: 'SUM',
        n: 200
    }
    const result = salaryReducer(salary, action)

    expect(result).toBe(1200)
})