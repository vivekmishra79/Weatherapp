import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiSearch } from "react-icons/fi";
import dateFormat from 'dateformat';
import { IoLocationOutline } from "react-icons/io5";
import { FaCloudRain } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import '../App.css'

function Weathercomp() {
  const [weather,setWeather]=useState({})
  const [city,setCity]=useState("")
  let apikey="2b4dd2f35a2122e2adfa8a4ef31fadcc"

   function getinfo(e)
   {
      e.preventDefault()
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`).then((res1)=>{
        res1.json().then((res2)=>{
          console.log(res2)
          setWeather(res2)
        })
      })
   }

   function getdate()
   {
      const now=new Date()
      return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT")
   }
  return (
    <div>
        <Container>
<Form inline className='mt-4' onSubmit={getinfo}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2 p-3 me-5 fs-5"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              style={{backgroundColor:"purple",color:"pink"}}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className='p-3 fs-5 px-4 ms-3' style={{backgroundColor:"purple",color:"pink"}}><FiSearch /></Button>
          </Col>
        </Row>
      </Form>
      {weather && weather.weather?
      <div className='w'>
          <div className='d-flex justify-content-center align-items-center p-3'>
            <p><IoLocationOutline/></p>
            <p className='p-2'>{weather.name}</p>
            <p className='p-2'>({weather.sys.country})</p>
          </div>
          <div>
            <p>Date: {getdate()}</p>
          </div>
          <div>
            <h3>Current Temperature</h3>
            <p>{(weather.main.temp-273).toFixed(2)}&deg;C</p>
            <p>It Feels Like: {(weather.main.feels_like-273).toFixed(2)}&deg;C</p>
          </div>
          <div>
            <p><FaCloudRain/> {weather.weather[0].description}</p>
          </div>
          <div>
            <p><FaWind/> Wind</p>
            <p>Speed: {weather.wind.speed}</p>
            <p>Degree: {weather.wind.deg}&deg;C</p>
          </div>
      </div>:
      <p className='w'>Please Enter City to Get Waether</p>
      }
      
        </Container>
    </div>
  )
}

export default Weathercomp
