import './ResultUpdate.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function ResultUpdate() {
    const [Lotprores, setLotprores] = useState([]);
    const [winningnumber, setWinningnumber] = useState({ resultl: "", lid: "" });
    const [RaffleId, setRaffleId] = useState({ resultr: "", rid: "" });
    const [winningarray, setWinningarray] = useState([winningnumber, RaffleId]);

    const handleChangeResult = (e, lid) => {     //Result Numbers
        console.log("i lid", lid)
        setWinningnumber({ resultl: e.target.value, lid: lid })
        setWinningarray({ winningnumber });
   
    }
    const handleChangeRaffleId = (e, rid) => {     //RaffleID
        console.log("i rid", rid)
        // console.log(e.target.value)
        setRaffleId({ resultr: e.target.value, rid: rid })
        setWinningarray({ RaffleId });
    }

    useEffect(() => {
        let url = "http://localhost:8080/Lotteryprovdresultfetch";
        let request = {};
        let header = {};
        axios.post(url, request, header).then((res) => {
            console.log("Provideresult", res.data)

            setLotprores(res.data)

        }).catch();
    }, [])

    const handleClickUpdate = (e) => {
        e.preventDefault();


        // if (RaffleId !== 0 && winningnumber !== 0){
        // const url = 'http://localhost:8080/RaffleBothInsert';
        // const req = { winl: winningnumber, winr: RaffleId };
        // // console.log(req)
        // const header = {};

        // axios.post(url, req, header)
        //     .then((res) => {
        //         if (res.data.length !== 0) {
        //             // console.log(JSON.stringify(res.data.length))
        //             console.log("insert lottery number");


        //         }
        //         else {
        //             alert("error lottery number");
        //         }
        //     })
        // }
        // else    

        // if (winningnumber !== 0 && RaffleId === 0) {
        //     // if (winningnumber !== 0 ) {
        const url = 'http://localhost:8080/RaffleBothInsert';
        console.log("winning array" + JSON.stringify(winningarray));
        // const req=[winningarray]
        const req = { winl: winningnumber, winr: RaffleId };
        console.log("request ia" + JSON.stringify(req))
        const header = {};

        axios.post(url, req, header)
            .then((res) => {
                if (res.data.length !== 0) {
                    console.log(JSON.stringify(res.data.length))
                    console.log("Insert lottery number");


                }
                else {
                    alert("error Insert lottery number");
                }
            })

        // }


        // else
        //     if (RaffleId !== 0 && winningnumber === 0) {
        //         // if (RaffleId !== 0 ) {
        //         const url = 'http://localhost:8080/RaffleIdInsert';
        //         const req = { winr: RaffleId };
        //         // console.log(req)
        //         const header = {};

        //         axios.post(url, req, header)
        //             .then((res) => {
        //                 if (res.data.length !== 0) {
        //                     console.log(JSON.stringify(res.data.length))
        //                     console.log("Insert lottery RaffleID");


        //                 }
        //                 else {
        //                     alert("error nsert lottery RaffleID");
        //                 }
        //             })
        //     }
        //     else
        //         //    console.log("error winning numbers")

        //         if (RaffleId !== 0 && winningnumber !== 0) {
        //             const url = 'http://localhost:8080/RaffleBothInsert';
        //             const req = { winl: winningnumber, winr: RaffleId };
        //             // console.log(req)
        //             const header = {};

        //             axios.post(url, req, header)
        //                 .then((res) => {
        //                     if (res.data.length !== 0) {
        //                         console.log(JSON.stringify(res.data.length))
        //                         console.log("insert lottery both number");


        //                     }
        //                     else {
        //                         alert("error lottery both number");
        //                     }
        //                 })
        //         }
        //         else
        //             console.log ("lotterry false");

    }



    return (
        <div className="Resupdate_outer">
            <div className="resupdate_container">
                <div className="resupdate_conttable">
                    <div className="resupdate_row_header1">

                        <div className="resupdate_hcol"><label>Provider Name</label></div>
                        <div className="resupdate_hcol"><label>Lottery Name</label></div>
                        <div className="resupdate_hcol"><label>Draw Date</label></div>
                        <div className="resupdate_hcol"><label>Result No:</label></div>
                        <div className="resupdate_hcol"><label>Raffle ID</label></div>

                    </div>

                    <div className="resupdate_row_test2" >
                        {Lotprores.map((itm, indx) => {
                            return <> 
                                <div className="fetch" key={indx}>
                                    <div className="resupdate_col_fetch" >
                                        <label>{itm.Providername}</label>
                                        <label>{itm.Lotteryname}</label>
                                        <label>{itm.DrawDate}</label>
                                        <input onChange={(e) => { handleChangeResult(e, itm.lotteryid) }} value={itm.Winningnumber} type="text" placeholder="Number" />
                                        <input onChange={(e) => { handleChangeRaffleId(e, itm.lotteryid) }} value={itm.Raffleid} type="text" placeholder="RaffleID" />
                                    </div>

                                </div>
                            </>
                        })}

                    </div>
                </div>
                <div className="resupdate_row_button"><button onClick={(e) => { handleClickUpdate(e) }}>Update</button></div>
            </div>



        </div>
    )
}