// TRANSACTIONS LIST STYLES;

export const isPositive = a => {
    if (a > 0) return '+' + a;
    else return a;
}

export const amountToDisplay = a => {
    // If amount is lower than 1500 return amount, else return its negative.
    if (a > 1500) return a; else return  a * -1;
}

export const dotColor = a => {
    // If amount is negative: red, if positive: green. 
    if (amountToDisplay(a) < 0) return false; else return true;
}

export const iconResolver = tx => {
    // Return icon name based on tx categories. 
    if (amountToDisplay(tx.amount) > 0 ) {
        return 'login'
    }

    if (tx.category.includes('Travel')) {
        if (tx.category.includes('Car Service')) {
             return 'mustache';
        }
        return 'plane';
    }

    if (tx.category.includes('Food and Drink')) {
        return 'cup';
    }

    if (tx.category.includes('Payment')) {
        return 'credit-card';
    }

    if (tx.category.includes('Shops')) {
        return 'handbag';
    }

    if (tx.category.includes('Recreation')) {
        return 'trophy';
    }

    return 'logout'
}

// Others

export const monthResolver = number => {
    switch(number) {
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
    }
}