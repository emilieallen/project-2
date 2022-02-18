import { BasketContext } from '../../App';
import {useState,useContext,useEffect} from 'react';

import iso from 'iso-3166-1'
import { hasFlag, countries } from 'country-flag-icons'


function TopLists({data}){
    
    // const [currentData,setCurrentData] = useState(data)
    return <div className="columns">
        <TopList data={[...data].sort((a,b)=>a.totalFootprint-b.totalFootprint).slice(0,10)} sortingDescription={"Ascending Total Footprint"} />
        <TopList data={[...data].sort((a,b)=>b.totalFootprint-a.totalFootprint).slice(0,10)} sortingDescription={"Descending Total Footprint"}/>
    </div>
}
function TopList({data,sortingDescription}){
    const iso2Code = iso.whereAlpha3(data[0].market).alpha2
    // console.log(iso2Code)
    return <table className="table is-half">
        <thead>
            <tr>
                <th><abbr title={`${sortingDescription}`}>Order</abbr></th>
                <th>Product Name</th>
                <th>Flag</th>
                <th><abbr title="Total Climate Footprint">Footprint</abbr></th>
                <th><abbr title='Add item to "Interested In" basket'>Interested In</abbr></th>
                <th><abbr title='Add item to "Want To Avoid" basket'>Want To Avoid</abbr></th>
                {/* <th><abbr title='Remove Item From Display List'>Delete Item</abbr></th> */}
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th><abbr title={`${sortingDescription}`}>Order</abbr></th>
                <th>Product Name</th>
                <th>Flag</th>
                <th><abbr title="Total Climate Footprint">Footprint</abbr></th>
                <th><abbr title='Add item to "Interested In" basket'>Interested In</abbr></th>
                <th><abbr title='Add item to "Want To Avoid" basket'>Want To Avoid</abbr></th>
                {/* <th><abbr title='Remove Item From Display List'>Delete Item</abbr></th> */}
            </tr>
        </tfoot>
        <tbody>
            {data.map((item,i)=>{
                return <ListItem key={i} item={item} order={i+1} iso2Code={iso2Code}/>
            })}
        </tbody>
    </table>
}

function ListItem({item,order, iso2Code}){
    const[interestedInArr,setInterestedInArr,wantToAvoidArr,setWantToAvoidArr] = useContext(BasketContext)
    // console.log(interestedInArr)
    // console.log(wantToAvoidArr)

    // console.log(hasFlag(iso2Code))
    // console.log(Flags[iso2Code])

    function handleAdding(arr,setArr){
        setArr([...arr,item])
    }
    function handleRemoving(arr,setArr){
        const index = arr.findIndex(arrItem=>arrItem.id==item.id)
        console.log(index)
        setArr([...arr.slice(0,index),...arr.slice(index+1)])
        
    }

    function checkContextArr(arr){
        return arr.length==0 || !arr.some(arrItem=>arrItem.id==item.id)
    }

    return <tr >
        <th>{order}</th>
        <td>{item.productName}</td>
        <td><img style={{width:"30px",height:"auto"}}src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${iso2Code}.svg`} /></td>
        <td>{item.totalFootprint.toFixed(2)}</td>
        <td>
        { checkContextArr(interestedInArr)?
        <button onClick={()=>{handleAdding(interestedInArr,setInterestedInArr)}}>Add Item</button> 
        : <button onClick={()=>{handleRemoving(interestedInArr,setInterestedInArr)}}>Remove Item</button>

        }</td>
        <td>{ checkContextArr(wantToAvoidArr)?
        <button onClick={()=>{handleAdding(wantToAvoidArr,setWantToAvoidArr)}}>Add Item</button> 
        : <button onClick={()=>{handleRemoving(wantToAvoidArr,setWantToAvoidArr)}}>Remove Item</button>

        }</td>
    </tr>

}

export default TopLists