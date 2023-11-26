import { Card } from "./context";

export function Balance({ balance }) {

    return (
        <Card
            bgcolor="warning"
            header='Balance'
            body={
                <>
                    Your Balance is {balance}

                </>
            }
        />
    )
}