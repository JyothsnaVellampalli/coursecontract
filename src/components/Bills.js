import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './Bills.css';
import { useCourseContext } from '../courseContext';

export default function Bills() {
    const {fetchBills, web3} = useCourseContext()
    const [loading, setLoading] = useState(true)
    const [bills, setBills] = useState()
    useEffect(() => {
        fetchBills().then((res) => {
            console.log({res})
            if(res) {
                const val = Object.values(res)
                console.log(val, val[0]['date'])
                console.log(new Date(Number(val[0]['date'])))
                const data = val.map((obj) => obj['courseId'])
                console.log({data})
            }
            setBills(res)
            setLoading(false)
        })
    }, [web3])

    function getDate(val) {
        const todate=new Date(val).getDate();
        const tomonth=new Date(val).getMonth()+1;
        const toyear=new Date(val).getFullYear();
        const original_date=tomonth+'/'+todate+'/'+toyear;
        return original_date
    }

    return (
        <div>
            <h2>Bills</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='bills-container'>
                    {bills && bills.length ? (
                        <div className='bills-wrapper'>
                            <div className='bill-row'>
                                <div className='row-element'>Course Id</div>
                                <div className='row-element'>Amount</div>
                                <div className='row-element'>Date</div>
                            </div>
                            {Object.values(bills).map((bill) =>
                                <div className='bill-row'>
                                    <div className='row-element'>{bill['courseId'].toString()}</div>
                                    <div className='row-element'>{Web3.utils.fromWei(Number(bill['paidAmount']), 'ether')}</div>
                                    <div className='row-element'>{getDate(Number(bill['date']))}</div>
                                </div>
                            )}
                        </div>
                    ) : (<div>No Bills</div>)}
                </div>
            )}
        </div>
    )
}