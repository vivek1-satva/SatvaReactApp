import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

type Props = {}

const Sidebar = (props: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Button variant="primary" className="d-lg-none" id="sidebarMenuBtn" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose} responsive="lg" id="sideBar">
        <Offcanvas.Header closeButton className='text-light' id="sidebarHeader">
          <Offcanvas.Title className="fs-2"> Menu </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 m-0" id="sideBarBody">
          <nav className="s-sidebar__nav">
            <ul className="p-0 m-4">
              <li>
                <em  className="mt-5 sidebar-li">
                  <Link to="/day1" className="s-sidebar__nav-link links-decor">Day 1</Link>
                </em>
              </li>
              <li className="sidebar-li">
                <em className="sidebar-li">
                  <Link to="/day2" className=" s-sidebar__nav-link links-decor">Day 2</Link>
                </em>
              </li>
              <li className="sidebar-li">
                <em className="sidebar-li">
                  <Link to="/day3" className=" s-sidebar__nav-link links-decor">Day 3</Link>
                </em>
              </li>
              <li className="sidebar-li">
                <em className="sidebar-li">
                  <Link to="/day4_7_8" className=" s-sidebar__nav-link links-decor">Day 4_7_8</Link>
                </em>
              </li>
              <li className="sidebar-li">
                <em className="sidebar-li">
                  <Link to="/day5_6" className=" s-sidebar__nav-link links-decor">Day 5_6</Link>
                </em>
              </li>
              <li className="sidebar-li">
                <em className="sidebar-li">
                  <Link to="/day9" className=" s-sidebar__nav-link links-decor">Day 9</Link>
                </em>
              </li>
              <li className="sidebar-li">
                <em className="sidebar-li">
                  <Link to="/day10" className=" s-sidebar__nav-link links-decor">Day 10</Link>
                </em>
              </li>
            </ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Sidebar