type Input = Array<any>;

export const arraySum = (input: Input): number => {
    let sum: number = 0;

    function sumNumbers(element: any) {
        if (typeof element === 'number' && !isNaN(element)) {
            sum += element;
        } else if (Array.isArray(element)) {
            element.forEach(sumNumbers);
        } else if (typeof element === 'object' && element !== null) {
            for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key)) {
                    sumNumbers(element[key]);
                }
            }
        }
    }

    input.forEach(sumNumbers);

    return sum;
};
