function arraysEqual<T>(array1: T[], array2: T[]): boolean {
    // Check if both arrays have the same length
    if (array1.length !== array2.length) {
        return false;
    }

    // Iterate through the elements of both arrays and compare them
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    // If no differences were found, the arrays are equal
    return true;
}

export default arraysEqual