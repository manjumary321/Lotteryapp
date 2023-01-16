import './Lotteryresultfinder.css';
// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import UnitWinResult from "./UnitWinResult";
import LotteryresultList from './LotteryresultList.js';
export default function Lotteryresultfinder() {

    const [showResults, setShowResults] = React.useState(false);
    const onClick = () => setShowResults(true)

    const [Lottery, setLottery] = useState([]);
    const [lotteryid, setLotteryID] = useState("");
    const [details, setDetails] = useState([]);
    const [date, setDate] = useState([]);
    const [number, setNumber] = useState([]);

    const [unit1,setUnitID]=useState([]);
    const [unit,setUnit]=useState([]);
 
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
        let request = { LotteryName: LotteryName}
        console.log("req", request)
        let header = {};
        axios.post(url, request, header).then((res) => {
            console.log("details", res.data);
            setDetails(res.data)
            console.log("date", res.data);
            setDate(res.data)
            console.log("Winner", res.data);
            setNumber(res.data)
        }).catch();

    }

   const handleChange1 = (LotteryName) => {
    setLotteryID(LotteryName);
        const url = 'http://localhost:8080/LotteryUnitwinfetch'
        // const request ={};
        //  const request = '{ "LotteryName":"'+LotteryName+'" }';
        const request = { LotteryName:LotteryName};
        const header = {}

        axios.post(url, request, header)

            .then((response) => {

                if (response.data.length !== 0) {
                    console.log(JSON.stringify(response.data.length))
                    console.log("Display Unit", request.data);
                    console.log(response.data)
                    setUnit(response.data)
                    

                }
                else {
                    alert("error result record");
                }
            })
            .catch((error) => {
                console.log(error)
            })
        // alert(temp)
    }   // <- add empty brackets here



    return (
        <>
            <div className="Lotteryresultfinder_outer" >
                <div className="Lotteryresultfinder_row1">
                    <div className="Lottresfinder_col1">

                        <div className="Lottresfinder_col1_row" >
                            <label>Lottery Name</label>
                            <select onChange={(e) => { handleChange(e.target.value)  }}  onClick={onClick}>
                                {Lottery.map((item, index) => {
                                    return <>
                                        
                                        <option value={item.id} onChange={(e) => { handleChange1(e.target.value)  }} >{item.txtLotteryname} </option>
                                        
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
                                    
                                     {/* {item.First} {item.Second} {item.Third} {item.Fourth} {item.Fifth} */}


                                </>
                            })}
                            {/* <label>1 2 3 4 5</label> */}

                        </div>
                    </div>
                </div>

                {/* <div className="Lotteryresultfinder_row2">

                    <button onClick={onClick}>Compare</button>

                </div> */}

                {showResults ?
                    <div className="Lotteryresultfinder_row3">
                  
                                            <LotteryresultList  label1={"First"} label2={"Second"} label3={"Third"} label4={"Fourth"} label5={"Fifth"} array={unit}/>

                        {/* <UnitWinResult></UnitWinResult> */}

                    </div>
                    : null} 
                    {/* 
                    <div className="Lotteryresultfinder_row3">
                      
                      <UnitWinResult></UnitWinResult>
                      <LotteryresultList  label1={"First"} label2={"Second"} label3={"Third"} label4={"Fourth"} label5={"Fifth"} array={unit}/>


                  </div>
                  */}

            </div>
        </>
    )
}