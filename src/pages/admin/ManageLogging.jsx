import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { deleteLogContent, downloadLogFile, log4jJsonContent, sendLog4jContent } from '../../services/FileHandleService'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LogLevelComp from '../../components/admin/LogLevelComp';

const ManageLogging = () => {

  const [log4jContent,setLog4jContent] = useState(null);  
  const [loggerArray,setLoggerArray] = useState({
      Logger:[]
  });
  
  useEffect(()=>{
    getLog4jContent()
  },[])  

  useEffect(()=>{
    if(log4jContent != null && loggerArray != null){
      let tempLog4j = log4jContent;
      tempLog4j.Configuration.Loggers.Logger=loggerArray.Logger;
      setLog4jContent(tempLog4j);
    }
  },[loggerArray])

  const getLog4jContent = () =>{
    log4jJsonContent()
    .then(resp =>{
        setLog4jContent(resp)
        setLoggerArray({...loggerArray,Logger:resp.Configuration.Loggers.Logger})
        //console.log(resp.Configuration.Loggers.Logger)
    })
    .catch(err =>{

    })
  }  

  const deleteAppLogContent = () =>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result)=>{
        if (result.isConfirmed) {
          deleteLogContent()
          .then(resp=>{
            Swal.fire(
              'Deleted!',
              'Appserver log content has been deleted.',
              'success'
            )
          })
        }
      })
  }

  const downloadLog = () =>{
    downloadLogFile()
    .then(resp=>{
        //console.log(resp)
        const element = document.createElement("a");
        const file = new Blob([resp], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "appserver.log";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        toast.success("Apserver log downloaded successfully");
    })
    .catch(err=>{

    })
  }  

  const deleteOfLogger = (indexVal) =>{
    const newArray = loggerArray.Logger.filter((val,index)=>{
      return index!=indexVal;
    })
    setLoggerArray({...loggerArray,Logger:newArray})
  }

  const addLogger = () =>{
    const baseLog = {
      "-additivity": "false",
      "-level": "warn",
      "-name": "com",
      "AppenderRef": {
        "-ref": "appLog",
        "-self-closing": "true"
      }
    }
    setLoggerArray({...loggerArray,Logger:[baseLog,...loggerArray.Logger]})
  }

  const onChangeOfLogger = (event,indexVal,property) =>{
    const newLogArray = loggerArray.Logger.map((val,index)=>{
      if(index === indexVal){
        val[property] = event.target.value;
      }
      return val;
    })
    setLoggerArray({...loggerArray,Logger:newLogArray})
  }
  
  const sendLoggers = () =>{
    sendLog4jContent(log4jContent)
    .then(resp =>{
      toast.success(resp.message)
    }).catch(err=>{

    })
  }

  const loggingManagerView = () =>{
    return(
      <>
        <Container fluid>
          <Card className="border border-2 shadow-sm">
            <h5 className='text-center text-uppercase text-primary mt-2'>Manage Loggers</h5>
            <Card.Body>
              <Row>
                <Container className='my-3 text-center'>
                  <Button onClick={deleteAppLogContent}>Delete Log</Button>
                  <Button className='ms-2' onClick={downloadLog}>Download Log</Button>
                  {/* {JSON.stringify(log4jContent)} */}
                </Container>
              </Row>
              <Row>
                <Container className='my-3'>
                  <Button variant='info' className='float-end' onClick={addLogger}>
                    Add Logger
                  </Button>
                </Container>  
              </Row>
              <Row>
                <Container className='my-1'>
                  {
                    loggerArray?.Logger.map((val,index)=>{
                      return(
                        <LogLevelComp 
                          key={index} 
                          logger={val} 
                          index={index}
                          deleteLog={deleteOfLogger}
                          fieldValChange={onChangeOfLogger}
                          />
                      )
                    })
                  }
                </Container>
              </Row>
              <Row>
                <Container className='my-3 text-center'>
                  <Button onClick={sendLoggers}>Save Log Details</Button>
                </Container>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </>
    )
  }

  return (
    <div>
        {loggingManagerView()}
    </div>
  )
}

export default ManageLogging