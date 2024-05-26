import React, { useEffect, useState } from 'react'

function App() {

  const [records, setRecords] = useState([])
  
  useEffect( () => {
    fetch("/api/test").then( //ip and port of backend already set in package.json
      response => response.json()
    ).then(
      data => setRecords(data)
    ).catch(
      err => console.log(err)
    )
  })

  return (
    <div>
      <h1>React is running successfully!</h1>
      {(typeof records.testing === 'undefined') ? (
        <h2>Unable to reach backend</h2>
      ):(
        <h2>{records.testing}</h2>
      )}
    </div>
  );
}

export default App;
