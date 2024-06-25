import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React,{useState} from "react";
import "./Index.css"
import TitleDescCard from './TitleDescCard';


type Props = {}

type blogType = {
  title : string,
  description : string
}

const Index = (props: Props) => {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");

  const [blogs,setBLogs]=useState<blogType[]>([]);

  const printData = () => {
    const blog : blogType = {
      title : title,
      description : desc
    }

    const _blogs = [...blogs, blog];
    setBLogs(_blogs);

    setTitle("");
    setDesc("");
  }
  
  return (
    <>
    <div id="form-card">
      <h4>Blogs</h4>
      <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" onChange={(e)=>{
            setTitle(e.target.value);
          }} value={title} placeholder="Enter Title...." />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" onChange={(e)=>{
            setDesc(e.target.value);
          }} value={desc} placeholder="Enter Description...." />
        </Col>
      </Form.Group>
      <Button variant="primary" onClick={printData} type="button">
        Submit
      </Button>
    </Form>
    </div>
    <br/><br/><br/>
    <div id="cardArea" className="row">
    {blogs.map((item) => {
          return <TitleDescCard  title = { item.title } description = { item.description }  />
        })}
    </div>
    </>
  )
}
export default Index