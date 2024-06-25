import React from 'react'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Header from '../Day1/Header';
import Image from 'react-bootstrap/Image';

type Props = {}

const ContactUs = (props: Props) => {
  return (
    <>
    <div id="gradBackground">
      <div id="contactUs-form-card" className='row'>
        <div className='col-sm-12 col-md-4 col-lg-4'>
          <Image id="contactUsImage" src="https://images.squarespace-cdn.com/content/v1/6554f6acf4e47e7677c40aa2/21e4cc66-38a2-4855-9a70-933f9ca2c365/SpringWear+Mail.png" fluid />
        </div>
        <div className='col-sm-12 col-md-8 col-lg-8'>
          <Image id="contactUsLogo" src="https://images.squarespace-cdn.com/content/v1/6554f6acf4e47e7677c40aa2/21e4cc66-38a2-4855-9a70-933f9ca2c365/SpringWear+Mail.png" fluid />
          <h3 className="text-center">Get in touch</h3>
          <Form className="mt-4">
            <FloatingLabel controlId="floatingInput" label="Mobile" className="mb-3">
              <Form.Control type="email" placeholder="9824######" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }}/>
          </FloatingLabel>
          </Form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ContactUs