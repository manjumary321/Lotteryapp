import './Lotteryresultfindercopy.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import List from './List.js'
import UnitWinResult from './UnitWinResult';

export default function Lotteryresultfinder() {
    const [showResults, setShowResults] = React.useState(false);
    const onClick = () => setShowResults(true)
    const [array, setArrayFunc] = useState([]);
    const [Lottery, setLottery] = useState([]);

    // const handleClick = (e, item) => {
    //     e.preventDefault();
    //     console.log(item);
    //     localStorage.setItem("txtLotteryname", item.LotteryName);


    // }
    const handleChange = (e,item) => {     //resigter
        console.log(e.target.value)
        setLottery(e.target.value)
      }
  useEffect( ()=>{
        const url = 'http://localhost:8080/LotteryResultfetch'
        // let LotteryName=request.body.LotteryName;
        let LotteryName = "Kerala Bumper"
        // const request ={};
        const request = { LotteryName:LotteryName };
        // const request = '{ "txtLotteryname":"'+ LotteryName +'"}';
        const header = {}
         console.log("req",request)
        axios.post(url, request, header)

            .then((response) => {

                if (response.data.length !== 0) {
                    console.log(JSON.stringify(response.data.length))
                    console.log("result record")
                    console.log("res",response.data)
                    setArrayFunc(response.data)
                    

                }
                else {
                    alert("error result record");
                }
            })
            .catch((error) => {
                console.log(error)
            })
        // alert(temp)
    } ,[] ) // <- add empty brackets here



    return (
        <>
            <div className="Lotteryresultfinder_outer" >
                <div className="Lotteryresultfinder_row1">
                    {array.map((item, index) => {
                        return (
                            <>
                                <div className="Lottresfinder_col1">

                                    <div className="Lottresfinder_col1_row" >
                                        <label>Lottery Name</label>
                                        <select  value={Lottery} onChange={(e) => { handleChange(e,item) }}  >
                                        {/* <select  value={item}  onClick={(e) => { handleClick(e, item)}} > */}
                                        {/* <select onClick={(e) => handleClick(e,item)} > */}
                                            {/* <option onChange={(e) => handleChange(e)} values={LotteryName}>LotteryMaster</option> */}
                                           <option key={item} >LotteryMaster</option>
                                            <option value="Kerala Bumper">Kerala Bumper</option>
                                            <option value="TN weekly">TN weekly</option>
                                            <option value="Christmas bumper">Christmas bumper</option>
                                        </select>
                                    </div>
                                    <div className="Lottresfinder_col1_row">
                                        <label>Prize Money</label>
                                        <label>{item.PrizeMoney}</label>
                                        {/* <input  /> */}
                                    </div>
                                </div>
                                <div className="Lottresfinder_col2">
                                    <div className="Lottresfinder_col1_row">
                                        <label>Date</label>
                                        <label>{item.Date}</label>
                                        {/* <input /> */}
                                    </div>
                                    <div className="Lottresfinder_col1_row" >
                                        <label>Winning Numbers</label>
                                        <label>{item.First} {item.Second} {item.Third} {item.Fourth} {item.Fifth}</label>
                                        {/* <input /> */}
                                    </div>
                                </div>
                            </>
                        );
                    })}

                </div>

                <div className="Lotteryresultfinder_row2">

                    <button onClick={onClick}>Compare</button>

                </div>
                {showResults ?
                    <div className="Lotteryresultfinder_row3">
                      
                        <UnitWinResult></UnitWinResult>

                    </div>
                    : null}

            </div>
        </>
    )
}