import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: any

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = {

    }
})

test('test', () => {
    let a = 5
    let b = 4

    ++b
    expect(a).toBe(b);
})
export default 1