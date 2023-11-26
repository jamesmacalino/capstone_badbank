import { useState } from "react";
import { Card } from "./context";
import { useValidateAmounts } from "./misc/useValidateAmounts";

export function Deposit({ adjustBalance, balance }) {
   const [statusMessage, setStatusMesssage] = useState('');
   const [depositAmount, setDepositAmount] = useState('');

   const validationError = useValidateAmounts(depositAmount)

   function handleDeposit() {

      if (validationError) {
         setStatusMesssage(`Error Deposit ${validationError}`);
         console.log('see validation in deposit.js')
         return;
      }

      adjustBalance(depositAmount)

      setDepositAmount('');
      setStatusMesssage('Deposit successful');

   }

   return (
      <Card
         bgcolor="warning"
         header='Deposit'
         status={statusMessage}
         body=
         {
            <>
               Current Account Balance {balance}
               <br />
               Deposit Amount
               <br />
               <input
                  type="input"
                  className="form-control"
                  id="deposit"
                  placeholder="Enter Amount"
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.currentTarget.value)}
               />
               <br />
               <button
                  type="submit"
                  className="btn btn-light"
                  onClick={() => handleDeposit()}
                  disabled={depositAmount === ''}
               >
                  Deposit
               </button>
            </>

         }
      />
   )

}






