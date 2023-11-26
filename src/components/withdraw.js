import { useState } from "react";
import { Card } from "./context";
import { useValidateAmounts } from "./misc/useValidateAmounts";

export function Withdraw({ adjustBalance, balance }) {
    const [status, setStatus] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    const validationError = useValidateAmounts(withdrawalAmount);

    function handleWithdrawal() {
        if (validationError) {
            setStatus(`Error Withdrawal ${validationError}`);
            console.log('validation result exists in withdrawl.js');
            return;
        }

        const amountToWithdraw = parseFloat(withdrawalAmount);

        if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
            setStatus('Invalid withdrawal amount.');
            return;
        }

        if (amountToWithdraw > balance) {
            setStatus('Insufficient funds.');
            return;
        }

        adjustBalance(-amountToWithdraw);

        setWithdrawalAmount('');
        setStatus('Withdrawal successful');
    }

    return (
        <Card
            bgcolor="warning"
            header="Withdrawal"
            status={status}
            body={
                <>
                    Current Account Balance {balance} <br />
                    Amount<br />
                    <input
                        type="number"
                        className="form-control"
                        id=""
                        placeholder="Enter Amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.currentTarget.value)}
                    />
                    <br />
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleWithdrawal}
                        disabled={withdrawalAmount === ''}
                    >
                        Withdraw
                    </button>
                </>
            }
        />
    );
}


