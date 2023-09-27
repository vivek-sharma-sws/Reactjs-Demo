import React, { useEffect } from "react";
import "./dashboard.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import BookCard from "../../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { searchFun, setSearch } from "../../state/searchSlice";
import { Circles } from "react-loader-spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, search, data } = useSelector((state) => state.search);

  // use effect to check the page refresh
  useEffect(() => {
    window.addEventListener("beforeunload", pageRefresh);
    return () => {
      window.removeEventListener("beforeunload", pageRefresh);
    };
  }, []);

  // function to handle the search
  const searchHandle = (event) => {
    dispatch(setSearch(event.target.value));
    localStorage.setItem("searchValue", event.target.value);
  };

  // function to stop reloading the page on enter
  const getKeyValue = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(searchFun(search));
    }
  };

  // function refresh the page
  const pageRefresh = () => {
    localStorage.removeItem("searchValue");
    dispatch(searchFun(search));
  };

  // user effect to handle the search input
  useEffect(() => {
    dispatch(setSearch(localStorage.getItem("searchValue")));
    if (error) toast.error(error);

    search ? dispatch(searchFun(search)) : dispatch(searchFun(search));
  }, [search]);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-search">
          <Container>
            <Row className="align-items-center justify-content-center text-center">
              <Col lg={6}>
                <h1 className="text-white mb-3">Book Store</h1>
                <Form>
                  <Form.Group
                    className="mb-5 position-relative"
                    controlId="book"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Search your book..."
                      value={localStorage.getItem("searchValue") || search}
                      onChange={(e) => searchHandle(e)}
                      onKeyDown={(e) => getKeyValue(e)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="search-result py-5">
          <Container>
            <Row>
              {!data?.length && !loading ? (
                <p className="text-center">Your result will be shown here</p>
              ) : loading ? (
                <div className="d-flex justify-content-center">
                  <Circles
                    height="80"
                    width="80"
                    color="#ff007d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                data?.map((item, index) => {
                  return <BookCard bookDetails={item} key={index} />;
                })
              )}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
