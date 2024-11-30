import React, { useState, useEffect } from 'react';
import './App.css';
import { getData } from './front';
import Loading from './Loading';

function App() {

  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [currpage, setCurrpage] = useState(1);
  const [postperpage, setPostperpage] = useState(10);

  useEffect(() => {
    resData();
  }, []);

  const resData = async () => {
    let res = await getData();
    setData(res);
    setIsloading(false);
  }

  console.log(data);


  const lastIndex = currpage * postperpage;
  const firstIndex = lastIndex - postperpage;
  const totalData = data.length / postperpage; 

  console.log(currpage, "totalData");

  const finData = data.slice(firstIndex, lastIndex);
  console.log(finData, "findata");

  var arr = [];

  for(let i = 0; i < totalData; i++) {
    arr.push(i + 1);
  }

  return (
    <>
      <div className='container'>
        <h2 className='h2'>Users data pagination</h2>
        {
          isloading ? <Loading /> :
            <>
              <div className='table-responsive'>
                <table>
                  <thead>
                    <tr>
                      <th>Sno</th>
                      <th>title</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      finData.map((da, index) => (
                        <tr key={index}>
                          <td>{da.id}</td>
                          <td>{da.title.substring(0, 30)}</td>
                          <td>{da.body}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className='flex mt-30'>
                <button type='button' className='btn' onClick={() => setCurrpage(currpage - 1)} disabled={currpage === 1}>Prev</button>
                <div className='flex innerflex'>
                  {
                    arr.map((ar, i) => (
                      <button type='button' className={`btn ${currpage === (i + 1) && "active"}`} key={i} onClick={() => setCurrpage(i + 1)}>{ar}</button>
                    ))
                  }
                </div>
                <button type='button' className='btn' onClick={() => setCurrpage(currpage + 1)} disabled={currpage === totalData}>Next</button>
              </div>
            </>
        }
      </div>
    </>
  );
}

export default App;
