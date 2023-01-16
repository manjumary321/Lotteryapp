// import axios from "axios";
import React, { useEffect, useState } from 'react';
// import React, {useState } from 'react';
import UnitWinResult from "./UnitWinResult";
import Lotteryresultfinder from "./Lotteryresultfinder";


export default function Lotteryresultwin() {

    // const [showResults, setShowResults] = React.useState(false);
    // const onClick = () => setShowResults(true)
    return (
        <>
            <div>
                <div >
                    <Lotteryresultfinder ></Lotteryresultfinder>
                </div>

                {/* {showResults ?
                    <div className="Lotteryresultfinder_row3">

                        <UnitWinResult></UnitWinResult>

                    </div>
                    : null} */}
                <div className="Lotteryresultfinder_row2">

                    {/* <button onClick={onClick}>Compare</button> */}
                    <button >Compare</button>

                </div>

            </div>

        </>
    )
};