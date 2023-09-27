import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ bookDetails }) => {
  return (
    <>
      <Col lg={4} className="mb-3">
        <Link
          to={`/book-detail/${bookDetails?.volumeInfo?.title}`}
          state={bookDetails}
        >
          <div className="book-item">
            <div className="book-img">
              <img
                src={
                  bookDetails?.volumeInfo?.imageLinks?.thumbnail
                    ? bookDetails?.volumeInfo?.imageLinks?.thumbnail
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                }
                alt="img"
                className="img-fluid"
              />
            </div>
            <h6 className="mt-3 mb-1 text-center">
              {bookDetails?.volumeInfo?.title}
            </h6>
          </div>
        </Link>
      </Col>
    </>
  );
};

export default BookCard;
