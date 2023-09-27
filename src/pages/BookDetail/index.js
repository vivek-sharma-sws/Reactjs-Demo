import React, { useEffect, useState } from "react";
import "./bookdetail.scss";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const BookDetail = () => {
  const location = useLocation();
  const [bookDetails, setBookDetails] = useState();

  useEffect(() => {
    setBookDetails(location.state.volumeInfo);
  }, [location.state]);

  
  return (
    <>
      <div className="book-details py-5">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="book-img pe-5">
                <img
                  src={
                    bookDetails?.imageLinks?.thumbnail
                      ? bookDetails?.imageLinks?.thumbnail
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                  }
                  alt=""
                  className="img-fluid w-100"
                />
              </div>
            </Col>
            <Col lg={9}>
              <div className="book-details">
                <h2>{bookDetails?.title}</h2>
                <p>{bookDetails?.description}</p>
                <p className="d-flex">
                  <span className="heading-info">Author :</span>{" "}
                  <span>
                    {!bookDetails?.authors
                      ? "N/A"
                      : bookDetails?.authors?.map((item, index) => {
                          return (
                            <span key={index}>
                              {item}, <br />
                            </span>
                          );
                        })}
                  </span>
                </p>
                <p className="d-flex">
                  <span className="heading-info">Publish Date:</span>{" "}
                  <span>
                    {bookDetails?.publishedDate
                      ? bookDetails?.publishedDate
                      : "N/A"}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BookDetail;
