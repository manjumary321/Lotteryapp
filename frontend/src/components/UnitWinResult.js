import axios from 'axios';
import { useEffect, useState } from 'react';
import LotteryresultList from './LotteryresultList.js';

export default function UnitWinResult(){
   
    const [array, setArrayFunc] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/LotteryUnitwinfetch'
        // const request ={};
        //  const request = '{ "LotteryName":"'+LotteryName+'" }';
        const request={}
        const header = {}

        axios.post(url, request, header)

            .then((response) => {

                if (response.data.length !== 0) {
                    console.log(JSON.stringify(response.data.length))
                    console.log("result record")
                    console.log(response.data)
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
    }, [])    // <- add empty brackets here

return(
    <>
    
    <LotteryresultList  label1={"First"} label2={"Second"} label3={"Third"} label4={"Fourth"} label5={"Fifth"} array={array}/>

    </>
)


}