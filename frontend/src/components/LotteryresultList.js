import "./LotteryresultList.css";
export default function LotteryresultList({ label1, label2, label3,label4, label5, array }) {
    return (
        <div className="list">
            <table className="list_table">
                <tr className="list_table_row1">
                    
                    <th className="list_table_row1_clm1">{label1}</th>
                    <th className="list_table_row1_clm2">{label2}</th>
                    <th className="list_table_row1_clm4">{label3}</th>
                    <th className="list_table_row1_clm2">{label4}</th>
                    <th className="list_table_row1_clm4">{label5}</th>
                </tr>
                {array.map((item, index) => {
                    return (
                        <>
                            <tr>
                                <td>{item.First}</td>
                                <td>{item.Second}</td>
                                <td>{item.Third}</td>
                                <td>{item.Fourth}</td>
                                <td>{item.Fifth}</td>
                                {/* <td><span>{item[value4]}</span></td> */}
                            </tr>
                        </>
                    );
                })}

            </table>
        </div>
    );
}