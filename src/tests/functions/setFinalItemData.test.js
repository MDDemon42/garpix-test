import setFinalItemData from "../../components/helpFunctions/functions/setFinalItemData";
import C from '../../redux/constants';

test('testing setFinalItemData()', () => {
    const itemData_one = [
        C.AUTHOR, 1, 'A', 'B'
    ];
    const itemData_two = [
        C.AUTHOR, 2, 'B', 'B'
    ];
    const itemData_three = [
        C.BOOK, 3, 'C', 'D', 'E', 2000, 'image'
    ];
    const itemData_four = [
        C.BOOK, 4, 'C', 'D', 'E', 2000
    ];
    expect(setFinalItemData(...itemData_one)).toEqual({
        id: 1, itemLastName: 'A', itemFirstName: 'B'
    });
    expect(setFinalItemData(...itemData_two)).not.toEqual({
        id: 2, itemLastName: 'A', itemFirstName: 'B'
    });
    expect(setFinalItemData(...itemData_three)).toEqual({
        id: 3, itemLastName: 'C', itemFirstName: 'D', bookTitle: 'E', bookCreatedAt: 2000, bookImage: 'image'
    });
    expect(setFinalItemData(...itemData_four)).not.toEqual({
        id: 4, itemLastName: 'C', itemFirstName: 'D', bookTitle: 'E', bookCreatedAt: 2000, bookImage: 'image'
    });
})