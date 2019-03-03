import React from 'react';
import axios from "axios";
import Spinner from "../Spinner/Spinner";
const API_KEY = 'fef8641a9d1b839853d2cdc56cd95080af955a312a5bb109fd73e97d96def896';

var newArr = [];

class Table extends React.Component{
    state={
        data:null
    }
    getData=()=>{
        axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=INR&CMC_PRO_API_KEY=${API_KEY}`).then((response)=>{
            let dataArr = response.data.Data;
            console.log(dataArr[0]['CoinInfo']['FullName']);
            newArr = dataArr.map(function(current, index){
                return {
                    id: current['CoinInfo']['Id'],
                    name: current['CoinInfo']['FullName'],
                    price: current['RAW']['INR']['PRICE'],     
                    change: current['RAW']['INR']['CHANGE24HOUR']
                }
            });

            this.setState({data:newArr})

        }).catch((err)=>console.log(err));
    }

    componentDidMount(){
        this.getData();
    }
   deleteHandler=(event,id)=>{
        let filteredArray=this.state.data.filter((item)=>item.id!==id);
        console.log(event);
        //event.target.parentNode.remove();
        this.setState({data:filteredArray})
   }
    render(){
        console.log(newArr);
        return(
            <div className="container">

                {this.state.data?
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.data.map((item,index)=>{
                            console.log(item);
                            return (<tr key={item.id}><td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>&#8377; {item.price}</td>
                            <td>{item.change}</td>
                            <td onClick={(event)=>this.deleteHandler(event,item.id)} style={{cursor:"pointer"}}><img style={{width:"25px",height:"25px"}} src="https://image.flaticon.com/icons/svg/61/61848.svg" alt="delete"/></td>
                            </tr>)
                        })}
                    </tbody>
                </table>:<Spinner/>}
            </div>
        );          
    }
}

export default Table;