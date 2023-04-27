
import '../../../styles/componentStyles/userHome/SearchSection.css'
import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


 



function SearchBanner() {


  const [search, setSearch] = useState('');
 
  console.log("okk",search)

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search-results?query=${encodeURIComponent(search)}`);
  }


  return (

<div className='myComponent'>
  <div className='searchText'>
    <h1 className='text-center text-white fw-bold fs-1 py-3'>Your Home For Health</h1>
    <h3 className='text-center text-white fw-bold fs-3 py-3'>Find and Book</h3>
  </div>
  <div className='searchForm'>
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center" style={{marginTop:'-70px'}}>
        <Col xl={8} md={10} sm={6} className="mt-4" style={{marginLeft:"-60px"}}>
          <FormControl type="text" placeholder="Search for Doctors..." className="form-control-lg" onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col xl={4} md={2} sm={6} className="my-1">
          <Row>
            <Col xs={8} className="">
              <Button type="submit" className="btn-lg btn-block">Search</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  </div>
</div>







  )
}

export default SearchBanner

