import {
  FormControl,
  FormGroup,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavComponent(props) {
  const [updateSearchId, setUpdateSearchId] = useState([]); //set search id

  return (
    <div>
      <Navbar className="navbar" collapseOnSelect staticTop>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>BTI425-Weather</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Recently Viewed" id="basic-nav-dropdown">
              {" "}
              {props.recentlyViewed.length > 0 ? (
                props.recentlyViewed.map((id, index) => (
                  <LinkContainer to={`/City/id/${id}`} key={index}>
                    <MenuItem>
                      <Link className="btn btn-default" to={"/id/" + id}>
                        cityID : {id}
                      </Link>
                    </MenuItem>
                  </LinkContainer>
                ))
              ) : (
                <MenuItem>...</MenuItem>
              )}
            </NavDropdown>
          </Nav>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl
                type="text"
                onChange={(event) => setUpdateSearchId(event.target.value)}
                placeholder="City ID"
              />
            </FormGroup>{" "}
            <Link className="btn btn-default" to={"/City/" + updateSearchId}>
              Search
            </Link>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavComponent;
