import './Lotteryresultfinder.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UnitWinResult from "./UnitWinResult";
// import LotteryresultList from './LotteryresultList.js';
export default function Lotteryresultfinder() {

    const [showResults, setShowResults] = React.useState(false);
    const onClick = () => setShowResults(true)

    const [Lottery, setLottery] = useState([]);
    const [lotteryid, setLotteryID] = useState("");
    const [winid, setWinID] = useState("");
    const [details, setDetails] = useState([]);
    const [date, setDate] = useState([]);
    const [number, setNumber] = useState([]);


     const [win, setWinner] = useState([]);
    // const [date,setDate]=useState("");
    // const [prize,setPrize]
    useEffect(() => {
        let url = "http://localhost:8080/fetchlottery";
        let request = {};
        let header = {};
        axios.post(url, request, header).then((res) => {
            console.log("result", res.data)
            setLottery(res.data)
        }).catch();
    }, [])


    const handleChange = (id) => {
        setLotteryID(id)
        // console.log("id",id)
        let url = "http://localhost:8080/LotteryResultfetch";
        let request = { id: id }
        console.log("req", request)
        let header = {};
        axios.post(url, request, header).then((res) => {
            console.log("details", res.data);
            setDetails(res.data)
            console.log("date", res.data);
            setDate(res.data)
            console.log("Number", res.data);
            setNumber(res.data)
        }).catch();

    }

    const handleCompareClick = (a1,a2) => {
        e.preventDefault();


        // var a1 = number;
        // var a2 = win;
        
                   if (a1.length !== a2.length) return false; 
                else {
                    // Comparing each element of your array
                    for (var i = 0; i < a1.length; i++) {
                        if (a1[i] !== a2[i]) {
                        return false;
                        console.log("False");
                        }
                    }
                    return true;
                    console.log("winner True ");
                }
               
    }

    // const handleCompareClick = (e) => {
    //     e.preventDefault();


    //     var a1 = number;
    //     console.log(JSON.stringify(a1));
    //     var a2 = win
    //     console.log(JSON.stringify(a2));

    //     setWinID(id)
    //     console.log("id",id)
    //     let url = "http://localhost:8080/LotteryUnitwinfetch1";
    //     let request = {id:id}
    //     console.log("req", request)
    //     let header = {};
    //     axios.post(url, request, header)
    //     .then((res) => {
    //         console.log(JSON.stringify(res.data.length))
    //         console.log("Winner", res.data);
    //         setWinner(res.data)
    //         if (a1.res.data.length !== a2.res.data.length) return false; 
    //             else {
    //                  Comparing each element of your array
    //                 for (var i = 0; i < a1.res.data.length; i++) {
    //                     if (a1[i] !== a2[i]) {
    //                     return false;
    //                     console.log("False");
    //                     }
    //                 }
    //                 return true;
    //                 console.log("winner True ");
    //             }               
    //     }).catch ();
    // }

return (
    <>
        <div className="Lotteryresultfinder_outer" >
            <div className="Lotteryresultfinder_row1">
                <div className="Lottresfinder_col1">

                    <div className="Lottresfinder_col1_row" >
                        <label>Lottery Name</label>
                        <select onChange={(e) => { handleChange(e.target.value) }} onClick={onClick} >
                            {Lottery.map((item, index) => {
                                return <>
                                    <option value={item.id} >{item.txtLotteryname} </option>

                                </>
                            })}


                        </select>
                    </div>

                    <div className="Lottresfinder_col1_row">
                        <label>Prize Money</label>


                        {details.map((item, index) => {
                            return <>
                                <input type="text" value={item.PrizeMoney} />
                            </>
                        })}
                    </div>

                </div>
                <div className="Lottresfinder_col2">
                    <div className="Lottresfinder_col1_row">
                        <label>Date</label>
                        {date.map((item, index) => {
                            return <>
                                <input type="text" value={item.Date} />
                            </>
                        })}
                        {/* <label>Date</label> */}

                    </div>
                    <div className="Lottresfinder_col1_row" >
                        <label>Winning Numbers</label>
                        {number.map((item, index) => {
                            return <>
                                <input type="text" value={item.First} />
                                {/* <input type="text" value={item.second} /> */}
                                {/* <label> {item.First} {item.Second} {item.Third} {item.Fourth} {item.Fifth}</label> */}


                            </>
                        })}
                        {/* <label>1 2 3 4 5</label> */}

                    </div>
                </div>
            </div>

            <div className="Lotteryresultfinder_row2">

                {/* <button onClick={onClick}>Compare</button> */}
                <button onClick={(e) => handleCompareClick(e)} >Compare</button>

            </div>

            {showResults ?
                <div className="Lotteryresultfinder_row3">
                   
                            {win}
                            <UnitWinResult ></UnitWinResult>
                            {/* <LotteryresultList value={item} label1={"First"} label2={"Second"} label3={"Third"} label4={"Fourth"} label5={"Fifth"} array={array}/> */}


                </div>
                : null}
        </div>
    </>
)
}