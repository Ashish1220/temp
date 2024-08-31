import React, { useState, useEffect } from 'react';

const ParkingInfo = () => {
  const [arrowDirection, setArrowDirection] = useState('→'); // Right arrow
  const [fade, setFade] = useState(true); // For fade effect
  const [parkingStatus, setParkingStatus] = useState(''); // For parking status message
  const [available_slot,setas]=useState(10);
  const [nearest_slot,setns]=useState(1);
  const [last_parking_1,setlp1]=useState(0);
  const [last_parking_2,setlp2]=useState(0);
  const get_last_row=()=>{
  
    fetch('http://localhost/api/get_last_row.php') // Replace with your XAMPP API URL
    .then(response => response.json())
    .then(data => {
        console.log("algo used :",localStorage.getItem("activated_algo"))
    const ap1=data[0].available_in_parking_1;
    const ap2=data[0].available_in_parking_2;

    const np1=data[0].nearest_in_parking_1;
    const np2=data[0].nearest_in_parking_2;
    const k=5;
    console.log(ap1);
    console.log(ap2);


    //--TRAFFIC IN LAST BATCH--//
    // if(ap1>k ){
        // setParkingStatus("")
    //     setArrowDirection('<-')
    //     setas(ap1)
    //     setns(data[0].nearest_in_parking_1)
        

    // }else if (ap2>k ){
    //     setParkingStatus("")
    //     setArrowDirection('->')
    //     setas(ap2)
    //     setns(data[0].nearest_in_parking_2)
    //     setlp2((prev)=>{prev+1})
    //     setlp1(0);
    // } else if(ap1!=0){

    //     setParkingStatus("")
    //     setArrowDirection('<-')
    //     setas(ap1)
    //     setns(data[0].nearest_in_parking_1)
    // }else if(ap2!=0){
    //     setParkingStatus("")
    //     setArrowDirection('->')
    //     setas(ap2)
    //     setns(data[0].nearest_in_parking_2)
    // }else{
    //     setArrowDirection('')
    //     setParkingStatus("PARKING FULL")
        
    // }

        //--LEAST TRAFFIC--//
    if(localStorage.getItem("activated_algo")==1){
        console.log("least traffic first")
    if(ap1>ap2){
        setParkingStatus("")
        setArrowDirection('<-')
        setas(ap1);
        setns(np1);
        console.log("here")

    }
    else if(ap2>ap1){
        setParkingStatus("")
        setArrowDirection('->')
        setas(ap2);
        setns(np2);

    }
    else if(ap1==ap2 && ap1!=0){
        if(np1>np2){
            setParkingStatus("")
        setArrowDirection('<-')
        setas(ap1);
        setns(np1);

        }
        else if(np2>np1){
            setParkingStatus("")
        setArrowDirection('->')
        setas(ap2);
        setns(np2);
        }else if(np2==np1){
            setParkingStatus("")
        setArrowDirection('->')
        setas(ap2);
        setns(np2);
        }
    }else{
        setParkingStatus("PARKING FULL")
        setArrowDirection("x")
       
    }}
    //--NEAREST PARKING--//
    if(localStorage.getItem("activated_algo")==0){
        console.log("nearest parking first")

    if(ap1==ap2 && ap1==0){
        setArrowDirection("x");
        setParkingStatus("PARKING FULL")
    }
    else{
        if(np1<np2 && ap1!=0){
            setParkingStatus("")
            setArrowDirection('<-')
            setas(ap1);
            setns(np1);
        }else if(np2>np1 && ap2!=0){
            setParkingStatus("")
            setArrowDirection('->')
            setas(ap2);
            setns(np2);
        }else if(np2==np1 ){
            // setParkingStatus("")
            // setArrowDirection('->')
            if(ap1<ap2){
            setParkingStatus("")
            setArrowDirection('<-')
            setas(ap1);
            setns(np1);
            }else if(ap2>ap1){
                setParkingStatus("")
                setArrowDirection('->') 
                setas(ap2);
            setns(np2);
            }
            else{
                if(ap1!=0){
                setParkingStatus("")
                setArrowDirection('->') 
                setas(ap2);
            setns(np2);
                }
                else{
                    setArrowDirection("x")
                    setParkingStatus("PARKING FULL")
                }
            }
        } else{
            setParkingStatus("PARKING FULL")
            setArrowDirection('x')
        }
    
    }
    
    }



    }
  ).catch(error => console.error('Error fetching data:', error));
     
  }
  useEffect(() => {

    const intervalId = setInterval(get_last_row, 2000);
    return () => clearInterval(intervalId);
   }, []);
  

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    flexDirection: 'column',
    textAlign: 'center',
    color: '#fff',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };

  const arrowContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const arrowStyle = {
    fontSize: '25rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
    lineHeight: 1,
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    opacity: fade ? 1 : 0,
  };

  const statusStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#f00',
  };

  const infoStyle = {
    fontSize: '1.5rem',
    marginTop: '1rem',
  };

  return (
    <div style={containerStyle}>
      <div style={arrowContainerStyle}>
        <div
          style={{
            ...arrowStyle,
            transform: arrowDirection === '→' || arrowDirection === '←' ? 
              (arrowDirection === '→' ? 'translateX(0)' : 'translateX(-100px)') : 
              'translateX(0)',
          }}
        >
          {arrowDirection}
        </div>
        {parkingStatus && (
          <div style={statusStyle}>
            {parkingStatus}
          </div>
        )}
      </div>
      {parkingStatus === '' && (
        <>
          <div style={infoStyle}>
            No of available spaces: {available_slot}
          </div>
          <div style={infoStyle}>
            Nearest parking space: {nearest_slot}
          </div>
        </>
      )}
    </div>
  );
};

export default ParkingInfo;
