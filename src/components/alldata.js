import React from "react";
import { useEffect, useState } from "react";
import { Card } from "./context";

export function AllData() {
    const [data , setData] = useState('');
    //const baseUrl = process.env.PORT || 4000;
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    //const baseUrl = 'https://hrku-cap-badbank-24d2d96dbd11.herokuapp.com';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/account/all`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                // Handle error appropriately
            }
        };

        if (data === '') {
            fetchData();
        }

    }, [data, baseUrl]); // Only re-run the effect if data changes

    if (data !== '')
        return (
            <Card
                bgcolor="warning"
                header='All Data'
                body={
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>


                    </>
                }
            />
        )
    else return (
        <Card
            bgcolor="primary"
            header='All Data'
            body={
                <>
                    <h5>No Data</h5>
                </>
            }
        />
    )
}

export default AllData;
