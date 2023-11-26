export function useValidateAmounts(props) {
    let status = ''
    // no amount entered, has to be a number, then positive number/ not zero

    if (!props) {
        status = 'has no amount entered';
        // setTimeout(() => setStatus(''), 3000);


    } else if (isNaN(props)) {
        status = 'amount must be a number';



    } else if (Number(props) <= 0) {
        status = 'amount must be positive';

    }

    return status;


}
