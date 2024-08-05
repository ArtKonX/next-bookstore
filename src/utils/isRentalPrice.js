const isRentalPrice = (rentalPeriod, price) => {

    switch (rentalPeriod) {
        case '2 weeks':
            return price * 0.1;
        case '1 month':
            return price * 0.2;
        case '3 months':
            return price * 0.5;
        default:
            return 'Не выбрано';
    }
}

export default isRentalPrice