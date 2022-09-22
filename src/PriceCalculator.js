import React, { useState, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './App.css'
import Modal from 'react-bootstrap/Modal';

const realValue = []
const PriceCalculator = () => {

  const [row, setRow] = useState([])
  const name = useRef(null)
  const qt = useRef(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  document.body.style = 'background: black;';

  async function insert() {
    const namevalue = name.current.value
    const qtValue = qt.current.value

    if (namevalue !== '' && qtValue !== '') {
      try {
        let tempr = { name: namevalue, quantity: qtValue };

        const find = realValue.find((element) => element.name === namevalue);
        console.log(find);
        if(find){
          alert('duplicateds')
          return
        }
        setRow((old) => [...old, tempr])

        realValue.push(tempr)
        name.current.value = ''
        qt.current.value = ''
        // const result = await fetch(`http://localhost:8080/product/getProductByName?name=${namevalue}&quantity=${qtValue}`)
        await fetch(`http://localhost:8080/product/getProductByName?name=${namevalue}&quantity=${qtValue}&slow=10`)

          .then((data) => data.json())
          .then((datajson) => {
            console.log(datajson)

            if (datajson.error) {
              console.log('error!')
              alert("Product not found or product exceed inventory limit!");
              name.current.value = ''
              qt.current.value = ''
              document.getElementById("nameTxt").focus();
              //search in the row state the element with the same name as the req and replacet it with the result
            } else {
              return realValue.map(((prod, ind) => {
                if (prod.name === datajson.name) {
                  prod.price = datajson.price
                  prod.promotion = datajson.promotion
                  prod.percentage = datajson.percentage
                  prod.finalprice = datajson.finalprice
                  prod.earlyDate = datajson.earlyDate
                  prod.normalprice = datajson.normalprice
                }
                return prod
              }))

            }
          })
          .then((d) => {

            document.getElementById("nameTxt").focus();
            setRow(d)

          })
      } catch (error) {
        console.error(error);
      }

    }
  }

  async function insertOnEnter(e) {
    let key = e.keyCode || e.which;
    if (key == 13) {
      const namevalue = name.current.value
      const qtValue = qt.current.value
      if (namevalue !== '' && qtValue !== '') {
        try {
          let tempr = { name: namevalue, quantity: qtValue };
  
          const find = realValue.find((element) => element.name === namevalue);
          console.log(find);
          if(find){
            alert('duplicateds')
            return
          }
          setRow((old) => [...old, tempr])
  
  
          realValue.push(tempr)
          name.current.value = ''
          qt.current.value = ''
          // const result = await fetch(`http://localhost:8080/product/getProductByName?name=${namevalue}&quantity=${qtValue}`)
          await fetch(`http://localhost:8080/product/getProductByName?name=${namevalue}&quantity=${qtValue}&slow=10`)
  
            .then((data) => data.json())
            .then((datajson) => {
              console.log(datajson)
  
              if (datajson.error) {
                console.log('error!')
                alert("Product not found or product exceed inventory limit!");
                name.current.value = ''
                qt.current.value = ''
                document.getElementById("nameTxt").focus();
                //search in the row state the element with the same name as the req and replacet it with the result
  
  
              } else {
                return realValue.map(((prod, ind) => {
                  if (prod.name === datajson.name) {
                    prod.price = datajson.price
                    prod.promotion = datajson.promotion
                    prod.percentage = datajson.percentage
                    prod.finalprice = datajson.finalprice
                    prod.earlyDate = datajson.earlyDate
                    prod.normalprice = datajson.normalprice
                  }
                  return prod
                }))
  
              }
  
            })
            .then((d) => {
  
              document.getElementById("nameTxt").focus();
              setRow(d)
  
            })
  
  
        } catch (error) {
          console.error(error);
        }
  
      }

    }

  }

  return (
    <>
      <div style={{ padding: 20, margin: 20 }}>

        {/* <h1 style={{ color: 'white', padding: 3, textAlign: 'center', margin: 20 }}> Product Price Calculator </h1> */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>{'Price per item ($)'}</th>
              <th>Promotion detail</th>
              <th>Discount %</th>
              <th> Earliest Delivery</th>
              <th>{'Final price ($)'}</th>
            </tr>
          </thead>
          <tbody>
            {row?.map((prod, index) => {
              return <tr key={index}>
                <input type="checkbox" style={{ width: 30, height: 30, margin: 15 }} />
                <td>{index + 1}</td>
                <td>{prod?.name}</td>
                <td>{prod?.quantity ? prod.quantity : 'loading'}</td>
                <td>{prod?.price ? prod.price : 'loading'}</td>
                {/*so the same thing as above to promotion, percntage, final price */}
                <td>{prod?.promotion ? prod.promotion : 'loading'}</td>
                <td>{prod?.percentage ? prod.percentage : 'loading'}</td>
                <td> {prod?.earlyDate ? prod.earlyDate : 'loading'}</td>
                <td> {(prod?.finalprice || prod?.normalprice) ? (prod.finalprice ? prod.finalprice : prod.normalprice) : 'loading'}</td>
                <td> <Button variant="warning">Edit</Button> </td>
                <td> <Button variant="danger">Delete</Button> </td>

              </tr>
            })}

            <tr>
              <td></td>
              <td></td>
              <td><input required id='nameTxt' type={'text'} placeholder='name' ref={name}></input></td>
              <td><input required type={'text'} placeholder='quantity' ref={qt} onKeyPress={(e) => insertOnEnter(e)}></input></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <td><Button variant="primary" onClick={() => insert()}> Insert</Button></td>
            </tr>
          </tbody>
        </Table>
        <div>
          <Button variant="outline-info" onClick={handleShow}>Checkout</Button> {'    '}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Confirm to checkout all items </Modal.Title>
            </Modal.Header>
            <Modal.Body>list of products displayed here.....</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Go to Payment Page
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <button onClick={() => console.log(realValue)}>abc</button>
      </div>
    </>
  )
};

export default PriceCalculator;