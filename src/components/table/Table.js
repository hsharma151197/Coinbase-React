import React from 'react';
import axios from 'axios';

import Spinner from '../Spinner/Spinner';
import './Table.css';

const API_KEY = 'fef8641a9d1b839853d2cdc56cd95080af955a312a5bb109fd73e97d96def896';

var newArr = [];

class Table extends React.Component{
    state = {
        data : null
    }
    getData=()=>{
        axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=INR&CMC_PRO_API_KEY=${API_KEY}`).then((response)=>{
            
            let dataArr = response.data.Data;

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
        //event.target.parentNode.remove();
        this.setState({data:filteredArray})
    }

    render(){
        return(
            <div className="container">

                {this.state.data?
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item,index)=>{
                            return (<tr className="parent" key={item.id}><th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>&#8377; {Number(item.price).toFixed(2)}</td>
                            <td>&#8377; {Number(item.change).toFixed(2)}</td>
                            <td className="delete-icon" onClick={(event)=>this.deleteHandler(event,item.id)}><i className="fas fa-trash-alt"></i></td>
                            </tr>)
                        })}
                    </tbody>
                </table>: <Spinner />}
            </div>
        );          
    }
}

export default Table;