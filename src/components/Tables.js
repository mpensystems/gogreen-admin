// Copyright 2025 MP ENSYSTEMS ADVISORY PRIVATE LIMITED.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';

import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {
  getAllBookings,
  getAllRiders,
  getRiderTrips,
  // getAllTransactions,
  // getRidersKYCDoc,
  getUserList,
} from "../api/adminApis";
import CustomModal from "./CustomModal";
import { Oval } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon
            icon={bounceIcon}
            className={`${bounceTxtColor} me-3`}
          />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">
              See all
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const {
      id,
      source,
      sourceIcon,
      sourceIconColor,
      sourceType,
      category,
      rank,
      trafficShare,
      change,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">
            {id}
          </Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon
            icon={sourceIcon}
            className={`icon icon-xs text-${sourceIconColor} w-30`}
          />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar
                variant="primary"
                className="progress-lg mb-0"
                now={trafficShare}
                min={0}
                max={100}
              />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map((pt) => (
              <TableRow key={`page-traffic-${pt.id}`} {...pt} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const {
      country,
      countryImage,
      overallRank,
      overallRankChange,
      travelRank,
      travelRankChange,
      widgetsRank,
      widgetsRankChange,
    } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image
              src={countryImage}
              className="image-small rounded-circle me-2"
            />
            <div>
              <span className="h6">{country}</span>
            </div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">{overallRank ? overallRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">{travelRank ? travelRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">{widgetsRank ? widgetsRank : "-"}</td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map((r) => (
              <TableRow key={`ranking-${r.id}`} {...r} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  // const [transactions, seTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();
  // api from backend

  // useEffect(() => {
  //   const fetchRidersdata = async () => {
  //     try {
  //       const response = await getAllTransactions();
  //       const allTransactions = response;
  //       console.log("riders : ", allTransactions);

  //       seTransactions(allTransactions);
  // setIsLoading(false);
  //     } catch (error) {
  //       console.log("Error while fetching the data", error);
  // setIsLoading(false);
  //     }
  //   };

  //   fetchRidersdata();

  //   console.log("kyc rediers : ", riderKycList);
  // }, []);

  const sortedTransactions = transactions.sort((a, b) => {
    const statusOrder = { Due: 1, Paid: 2, Canceled: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const totalTransactions = sortedTransactions.length;

  // Calculate total pages
  const totalPages = Math.ceil(totalTransactions / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentTransactions = sortedTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditTransaction = (transactionId) => {
    // api to be called for chnaging transaction status
    console.log("change the status to ch");
    console.log("transaction id here ", transactionId);
  };

  const TableRow = ({
    rider_id,
    rider_name,
    pickup_loc,
    drop_loc,
    price,
    issueDate,
    dueDate,
    status,
    bookingId,
    _id,
  }) => {
    const statusVariant =
      status === "Paid"
        ? "success"
        : status === "Due"
        ? "warning"
        : status === "Canceled"
        ? "danger"
        : "primary";

    return (
      <tr>
       
        <td>
          <Card.Link  className="fw-normal">
            {rider_id}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">{rider_name}</span>
        </td>
        <td>
          <span className="fw-normal">{pickup_loc}</span>
        </td>
        <td>
          <span className="fw-normal">{drop_loc}</span>
        </td>
        <td>
          <span className="fw-normal">{issueDate}</span>
        </td>
        <td>
          <span className="fw-normal">{dueDate}</span>
        </td>
        <td>
          <span className="fw-normal">${parseFloat(price).toFixed(2)}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => handleEditTransaction(_id)}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Dropdown.Item>
              {/* <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Rider Id</th>
              <th className="border-bottom">Rider Name</th>
              <th className="border-bottom">PickUp Location</th>
              <th className="border-bottom">Drop Location</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Due Date</th>
              <th className="border-bottom">Total</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((t) => (
              <TableRow key={`transaction-${t.trip_id}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>

              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{currentTransactions.length}</b> out of{" "}
            <b>{totalTransactions}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};










export const RiderEarningTable = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Adjust the number of records per page if needed

  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth?.token;
  const { id } = useParams(); // Rider ID from URL params

  // Fetch trips data from backend
  useEffect(() => {
    const fetchRidersTripdata = async () => {
      const startDate = "15-10-2024"; // Example start date
      const endDate = "20-10-2024"; 
      try {
        const response = await getRiderTrips(token, id, startDate, endDate); 

        const sortedTrips = response.sort((a, b) => {
          const dateA = new Date(a.date.split('-').reverse().join('-')); 
          const dateB = new Date(b.date.split('-').reverse().join('-'));
          return dateB - dateA;
        });

        setTrips(sortedTrips); // Store the fetched trips
        setIsLoading(false); // Mark loading as complete
      } catch (error) {
        console.log("Error while fetching the data", error);
        setIsLoading(false);
      }
    };

    fetchRidersTripdata();
  }, [token, id]);

  const totalTransactions = trips.length;

  // Pagination logic
  const totalPages = Math.ceil(totalTransactions / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentTrips = trips.slice(indexOfFirstRecord, indexOfLastRecord); // Current page's trips

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const TableRow = ({ date, balance, credit, debit, tid }) => (
    <tr>
      <td>
        <Card.Link as={Link} to={`/trip-details/${tid}`} className="fw-normal">
          {tid}
        </Card.Link>
      </td>
      <td>
        <span className="fw-normal">{date}</span>
      </td>
      <td>
        <span className="fw-normal"><span style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faRupeeSign} /></span> {debit}</span>
      </td>
      <td>
        <span className="fw-normal"><span style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faRupeeSign} /></span>{credit}</span>
      </td>
      <td>
        <span className="fw-normal"><span style={{ marginRight: '8px' }}><FontAwesomeIcon icon={faRupeeSign} /></span>{balance}</span>
      </td>
    </tr>
  );

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <h4 className="p-4">Rider's Earnings</h4>
      <Card.Body className="pt-0">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">Trip Id</th>
                  <th className="border-bottom">Date</th>
                  <th className="border-bottom">Debit</th>
                  <th className="border-bottom">Credit</th>
                  <th className="border-bottom">Balance</th>
                </tr>
              </thead>
              <tbody>
                {currentTrips.length > 0 ? (
                  currentTrips.map((trip) => (
                    <TableRow key={trip.tid} {...trip} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No trips found.</td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Pagination.Prev>

                  {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => handlePageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Pagination.Next>
                </Pagination>
              </Nav>
              <small className="fw-bold">
                Showing <b>{currentTrips.length}</b> out of{" "}
                <b>{totalTransactions}</b> entries
              </small>
            </Card.Footer>
          </>
        )}
      </Card.Body>
    </Card>
  );
};


export const TripsTable = () => {
  // const [transactions, seTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();
  // api from backend

  // useEffect(() => {
  //   const fetchRidersdata = async () => {
  //     try {
  //       const response = await getAllTransactions();
  //       const allTransactions = response;
  //       console.log("riders : ", allTransactions);

  //       seTransactions(allTransactions);
  // setIsLoading(false);
  //     } catch (error) {
  //       console.log("Error while fetching the data", error);
  // setIsLoading(false);
  //     }
  //   };

  //   fetchRidersdata();

  //   console.log("kyc rediers : ", riderKycList);
  // }, []);

  const handleViewDetails = (tripId) => {
    console.log("inside view details with id ", tripId);
    navigate(`/Trips/${tripId}`);
  };

  const sortedTransactions = transactions.sort((a, b) => {
    //to be change into ongoing or ended trip
    const statusOrder = { Due: 1, Paid: 2, Canceled: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const totalTransactions = sortedTransactions.length;

  // Calculate total pages
  const totalPages = Math.ceil(totalTransactions / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentTransactions = sortedTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const TableRow = ({
    trip_id,
    rider_name,
    pickup_loc,
    drop_loc,
    price,
    status,
  }) => {
    const statusVariant =
      status === "Completed"
        ? "success"
        : status === "On going"
        ? "warning"
        : status === "Canceled"
        ? "danger"
        : "primary";

    return (
      <tr style={{cursor:"pointer"}}>
        <td onClick={() => handleViewDetails(trip_id)}>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {trip_id}
          </Card.Link>
        </td>
        <td onClick={() => handleViewDetails(trip_id)}>
          <span className="fw-normal">{rider_name}</span>
        </td>
        <td onClick={() => handleViewDetails(trip_id)}>
          <span className="fw-normal">{pickup_loc}</span>
        </td>
        <td onClick={() => handleViewDetails(trip_id)}>
          <span className="fw-normal">{drop_loc}</span>
        </td>

        <td onClick={() => handleViewDetails(trip_id)}>
          <span className="fw-normal">${parseFloat(price).toFixed(2)}</span>
        </td>
        <td onClick={() => handleViewDetails(trip_id)}>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleViewDetails(trip_id)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Trip Id</th>
              <th className="border-bottom">Rider Name</th>
              <th className="border-bottom">PickUp Location</th>
              <th className="border-bottom">Drop Location</th>
              <th className="border-bottom">Total</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((t) => (
              <TableRow key={`transaction-${t.trip_id}`} {...t} />
            ))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>

              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{currentTransactions.length}</b> out of{" "}
            <b>{totalTransactions}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: "5%" }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: "5%" }}>
          <ul className="ps-0">
            {usage.map((u) => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: "50%" }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: "40%" }}>
          <pre>
            <Card.Link href={link} target="_blank">
              Read More{" "}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" />
            </Card.Link>
          </pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table
          responsive
          className="table-centered rounded"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: "5%" }}>
                Name
              </th>
              <th className="border-0" style={{ width: "5%" }}>
                Usage
              </th>
              <th className="border-0" style={{ width: "50%" }}>
                Description
              </th>
              <th className="border-0" style={{ width: "40%" }}>
                Extra
              </th>
            </tr>
          </thead>
          <tbody>
            {commands.map((c) => (
              <TableRow key={`command-${c.id}`} {...c} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

// current tables

// export const RiderTable = () => {
//   const [riderList, setRiderList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const recordsPerPage = 10;

//   useEffect(() => {
//     const fetchRiderdata = async () => {
//       try {
//         // console.log("inside try ");
//         const riders = await getAllRiders();
//         console.log("riders in useeffect : ", riders.riders);
//         setRiderList(riders);
//       } catch (error) {
//         console.log("Error while fetching the data", error);
//       }
//     };

//     fetchRiderdata();
//   }, []);

//   const totalPages = Math.ceil(riderList.length / recordsPerPage);

//   // Get current records
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   // const currentRecords = riderList.slice(indexOfFirstRecord, indexOfLastRecord);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   const totalRiders = riderList.length;

//   console.log("here data : ", riderList);
//   const TableRow = ({
//     _id,
//     mobile,
//     first_name,
//     last_name,
//     kyc_approved,
//     status,
//     address,
//   }) => {
//     const statusVariant =
//       status === "Paid"
//         ? "success"
//         : status === "Due"
//         ? "warning"
//         : status === "Canceled"
//         ? "danger"
//         : "primary";

//     const handleEdit = (riderId) => {
//       console.log("rider id inside handle edit : ", riderId);
//     };
//     return (
//       <tr>
//         <td>
//           <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
//             {first_name + "  " + last_name}
//           </Card.Link>
//         </td>
//         <td>
//           <span className="fw-normal">
//             <span className="fw-normal">{mobile}</span>
//           </span>
//         </td>
//         {/* <td>
//           <span className="fw-normal">
//             {licenseNumber}
//           </span>
//         </td> */}
//         <td>
//           <span className="fw-normal">{kyc_approved}</span>
//         </td>
//         <td>
//           <span className="fw-normal">{address ? address.city : "--"}</span>
//         </td>
//         <td>
//           <span className={`fw-normal text-${statusVariant}`}>{status}</span>
//         </td>
//         <td>
//           <Dropdown as={ButtonGroup}>
//             <Dropdown.Toggle
//               as={Button}
//               split
//               variant="link"
//               className="text-dark m-0 p-0"
//             >
//               <span className="icon icon-sm">
//                 <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
//               </span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item>
//                 <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
//               </Dropdown.Item>
//               {/* <Dropdown.Item onClick={()=>handleEdit(_id)}> */}
//               <Dropdown.Item
//                 onClick={() => {
//                   // console.log("Before calling handleEdit");
//                   handleEdit(_id);
//                 }}
//               >
//                 <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
//               </Dropdown.Item>
//               <Dropdown.Item className="text-danger">
//                 <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <Card border="light" className="table-wrapper table-responsive shadow-sm">
//       <Card.Body className="pt-0">
//         <Table hover className="user-table align-items-center">
//           <thead>
//             <tr>
//               <th className="border-bottom">Riders Name</th>
//               <th className="border-bottom">Phone</th>
//               {/* <th className="border-bottom">LicenseNumber</th> */}
//               <th className="border-bottom">kycVerified</th>
//               <th className="border-bottom">city Of Operation</th>
//               <th className="border-bottom">Status</th>
//               <th className="border-bottom">Action</th>
//             </tr>
//           </thead>
//           {/* <tbody>
//             {transactions.map(t => <TableRow key={`transaction-${t.trip_id}`} {...t} />)}
//           </tbody> */}

//           <tbody>
//             {riderList.map((rider) => (
//               <TableRow key={rider.riderId} {...rider} />
//             ))}
//           </tbody>
//         </Table>
//         <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
//           <Nav>
//             {/* <Pagination className="mb-2 mb-lg-0">
//               <Pagination.Prev>
//                 Previous
//               </Pagination.Prev>
//               <Pagination.Item active>1</Pagination.Item>
//               <Pagination.Item>2</Pagination.Item>
//               <Pagination.Item>3</Pagination.Item>
//               <Pagination.Item>4</Pagination.Item>
//               <Pagination.Item>5</Pagination.Item>
//               <Pagination.Next>
//                 Next
//               </Pagination.Next>
//             </Pagination> */}

//             <Pagination className="mb-2 mb-lg-0">
//               <Pagination.Prev
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Pagination.Prev>

//               {[...Array(totalPages).keys()].map((number) => (
//                 <Pagination.Item
//                   key={number + 1}
//                   active={number + 1 === currentPage}
//                   onClick={() => handlePageChange(number + 1)}
//                 >
//                   {number + 1}
//                 </Pagination.Item>
//               ))}

//               <Pagination.Next
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </Pagination.Next>
//             </Pagination>
//           </Nav>
//           <small className="fw-bold">
//             Showing <b>{totalRiders}</b> out of <b>{totalRiders}</b> entries
//           </small>
//         </Card.Footer>
//       </Card.Body>
//     </Card>
//   );
// };

// export const KycTable = () => {
//   const [riderKycList, setRiderKycList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRiderImages, setSelectedRiderImages] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const navigate = useNavigate();
//   const {auth} = useAuth();
//   const recordsPerPage = 10;

//   useEffect(() => {

//     const token = auth?.token;
//     console.log("token in kyc table : ",token);

//     const fetchRidersdata = async () => {
//       try {
//         const response = await getAllRiders(token);
//         const allRiders = response;
//         console.log("riders : ", allRiders);

//         // Sort the ridersKyc by kycVerified status
//         const sortedRiders = allRiders.sort((a, b) => {
//           const order = { pending: 1, approved: 2, rejected: 3 };
//           return order[a.kycVerified] - order[b.kycVerified];
//         });

//         console.log("sorterd riders : ", sortedRiders);

//         const pendinKycRiders = allRiders.filter(
//           (pendingKyc) => pendingKyc?.kyc_approved == "pending"
//         );
//         console.log("pendinKycRiders riders : ", pendinKycRiders);

//         setRiderKycList(sortedRiders);
//       } catch (error) {
//         console.log("Error while fetching the data", error);
//       }
//     };

//     fetchRidersdata();

//   }, []);

//   console.log("kyc rediers : ", riderKycList);

//   const handleViewDetails = (riderId) => {
//     console.log("inside view details with id ", riderId);
//     navigate(`/kyc/${riderId}/get`);

//   };

//   console.log("here data : ", riderKycList);

//   const totalPages = Math.ceil(riderKycList.length / recordsPerPage);
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = riderKycList.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalRiders = riderKycList.length;

//   const TableRow = ({
//     mobile,
//     first_name,
//     last_name,
//     kyc_approved,
//     vehicle,
//     status,
//     rid,
//     _id,
//   }) => {
//     const statusVariant =
//       kyc_approved === "approved"
//         ? "success"
//         : kyc_approved === "pending"
//         ? "warning"
//         : kyc_approved === "rejected"
//         ? "danger"
//         : "primary";

//     // const navigate = useNavigate();

//     // Function to handle navigation to edit page
//     const handleEdit = (riderId) => {
//       console.log("inside edit rider : ", riderId);
//       // navigate(`/edit-rider/${riderId}`);  // Navigate to edit page with riderId
//     };

//     return (
//       <tr>
//         <td>
//           <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
//             {first_name + "  " + last_name}
//           </Card.Link>
//         </td>
//         <td>
//           <span className={`fw-normal text-${statusVariant}`}>
//             {kyc_approved}
//           </span>
//         </td>
//         <td>
//           <span className="fw-normal">{vehicle?.vehicle_no}</span>
//         </td>
//         <td>
//           <span className="fw-normal">{mobile}</span>
//         </td>
//         <td>
//           <Dropdown as={ButtonGroup}>
//             <Dropdown.Toggle
//               as={Button}
//               split
//               variant="link"
//               className="text-dark m-0 p-0"
//             >
//               <span className="icon icon-sm">
//                 <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
//               </span>
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {/* <Dropdown.Item onClick={() => handleViewDetails(riderId)}> */}
//               <Dropdown.Item onClick={() => handleViewDetails(rid)}>
//                 <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => handleEdit(_id)}>
//                 <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
//               </Dropdown.Item>
//               <Dropdown.Item className="text-danger">
//                 <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </td>
//       </tr>
//     );
//   };

//   return (
//     <>
//       <Card border="light" className="table-wrapper table-responsive shadow-sm">
//         <Card.Body className="pt-0">
//           <Table hover className="user-table align-items-center">
//             <thead>
//               <tr>
//                 <th className="border-bottom">Riders Name</th>
//                 <th className="border-bottom">KYC Status</th>
//                 <th className="border-bottom">Vehicle Number</th>
//                 <th className="border-bottom">Phone</th>
//                 <th className="border-bottom">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRecords.map((rider) => (
//                 <TableRow key={rider.riderId} {...rider} />
//               ))}
//             </tbody>
//           </Table>
//           <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
//             <Nav>
//               <Pagination className="mb-2 mb-lg-0">
//                 <Pagination.Prev
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 >
//                   Previous
//                 </Pagination.Prev>

//                 {[...Array(totalPages).keys()].map((number) => (
//                   <Pagination.Item
//                     key={number + 1}
//                     active={number + 1 === currentPage}
//                     onClick={() => handlePageChange(number + 1)}
//                   >
//                     {number + 1}
//                   </Pagination.Item>
//                 ))}

//                 <Pagination.Next
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 >
//                   Next
//                 </Pagination.Next>
//               </Pagination>
//             </Nav>
//             <small className="fw-bold">
//               Showing <b>{currentRecords.length}</b> out of <b>{totalRiders}</b>{" "}
//               entries
//             </small>
//           </Card.Footer>
//         </Card.Body>
//       </Card>

//       {/* <CustomModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         title="Rider's KYC Documents"
//         images={selectedRiderImages}
//         footerButtons={[{ label: 'Close', variant: 'primary', onClick: () => setShowModal(false) }]}
//       >
//         <p>Here are the KYC documents for the rider:</p>
//       </CustomModal> */}
//     </>
//   );
// };

export const KycTable = () => {
  const [riderKycList, setRiderKycList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10); // You can set this as a constant

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchRidersData = async () => {
      const token = auth?.token;
      console.log("token in kyc table: ", token);

      try {
        const response = await getAllRiders(token);
        const allRiders = response;

        // Sort the ridersKyc by kyc_approved status
        const order = {
          pending: 1,
          approved: 2,
          rejected: 3,
          incomplete: 4,
          empty: 5,
        };
        const sortedRiders = allRiders.sort((a, b) => {
          const statusA = a.kyc_approved || "empty";
          const statusB = b.kyc_approved || "empty";
          return order[statusA] - order[statusB];
        });

        console.log("sorted riders: ", sortedRiders);
        setRiderKycList(sortedRiders);
      } catch (error) {
        console.error("Error while fetching the data", error);
      }
    };

    fetchRidersData();
  }, [auth]);

  const handleViewDetails = (riderId) => {
    console.log("inside view details with id ", riderId);
    navigate(`/Kyc/${riderId}/get`);
  };

  const totalPages = Math.ceil(riderKycList.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = riderKycList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const TableRow = ({
    mobile,
    first_name,
    last_name,
    kyc_approved,
    vehicle,
    rid,
  }) => {
    const statusVariant =
      kyc_approved === "approved"
        ? "success"
        : kyc_approved === "pending"
        ? "warning"
        : kyc_approved === "rejected"
        ? "danger"
        : "#F2D459";

    return (
      <tr style={{cursor:'pointer'}} >
        <td onClick={() => handleViewDetails(rid)}>
          <Card.Link as={Link} to={`/kyc/${rid}/get`} className="fw-normal">
            {first_name + " " + last_name}
          </Card.Link>
        </td>
        <td onClick={() => handleViewDetails(rid)}>
          <span className={`fw-normal text-${statusVariant}`}>
            {kyc_approved}
          </span>
        </td>
        <td onClick={() => handleViewDetails(rid)}>
          <span className="fw-normal">{vehicle?.vehicle_no}</span>
        </td>
        <td onClick={() => handleViewDetails(rid)}>
          <span className="fw-normal">{mobile}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleViewDetails(rid)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Edit Rider", rid)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Riders Name</th>
                <th className="border-bottom">KYC Status</th>
                <th className="border-bottom">Vehicle Number</th>
                <th className="border-bottom">Phone</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>

            {currentRecords.length > 0 ?
              (currentRecords.map((rider) => (
                <TableRow key={rider.rid} {...rider} />
              ))):(
                <tr style={{ textAlign: "center", height: "200px" }}>
                <td colSpan="5">
                  <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{
                      marginLeft: "500px",
                    }}
                  />
                </td>
              </tr>
              )
            }
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>

                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{currentRecords.length}</b> out of{" "}
              <b>{riderKycList.length}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export const RiderTable = () => {
  const [ridersList, setRidersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { auth } = useAuth();

  const navigate = useNavigate();

  const recordsPerPage = 10;

  useEffect(() => {
    const token = auth?.token;
    console.log("token inside try of booking : ", token);

    const fetchRidersdata = async () => {
      try {
        const response = await getAllRiders(token);
        const allRiders = response;
        console.log("riders in table : ", allRiders);

        // Sort the ridersKyc by kycVerified status

        console.log("sorterd riders : ", allRiders);

        setRidersList(allRiders);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchRidersdata();

    console.log("kyc rediers : ", ridersList);
  }, []);

  const handleViewDetails = (riderId) => {
    console.log("inside view details with id ", riderId);
    // navigate(`/rider/${riderId}`);
    navigate(`/Riders/${riderId}/get`);
  };

  const totalPages = Math.ceil(ridersList.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = ridersList?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalRiders = ridersList.length;

  const TableRow = ({
    index,
    rid,
    mobile,
    first_name,
    last_name,
    kyc_approved,
    vehicle_no,
    city,
    state,
    status,
    _id,
  }) => {
    const statusVariant =
      kyc_approved === "approved"
        ? "success"
        : kyc_approved === "pending"
        ? "warning"
        : kyc_approved === "rejected"
        ? "danger"
        : "primary";

    // const navigate = useNavigate();

    // Function to handle navigation to edit page
    const handleEdit = (riderId) => {
      console.log("inside edit rider : ", riderId);
      // navigate(`/edit-rider/${riderId}`);  // Navigate to edit page with riderId
    };

    return (
      <tr style={{cursor:'pointer'}} >
        <td onClick={() => handleViewDetails(rid)}>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {index + 1}
          </Card.Link>
        </td>
        <td onClick={() => handleViewDetails(rid)}>
          <span className="fw-normal">{mobile}</span>
        </td>

        {/* <td onClick={() => handleViewDetails(rid)}>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {first_name + "  " + last_name}
          </Card.Link>
        </td> */}
        <td onClick={() => handleViewDetails(rid)}>
          <span className={`fw-normal text-${statusVariant}`}>
            {kyc_approved}
          </span>
        </td>
        <td onClick={() => handleViewDetails(rid)}>
          <span className="fw-normal">{vehicle_no}</span>
        </td>
        <td onClick={() => handleViewDetails(rid)}>
          <span className="fw-normal">
            {/* {city + " , " + state} */}
            {city + (state ? " , " + state : "")}
          </span>
        </td>
       
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item onClick={() => handleViewDetails(riderId)}> */}
              <Dropdown.Item onClick={() => handleViewDetails(rid)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEdit(rid)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Id</th>
                <th className="border-bottom">Phone</th>
                {/* <th className="border-bottom">Riders Name</th> */}
                <th className="border-bottom">KYC Status</th>
                <th className="border-bottom">Vehicle Number</th>
                <th className="border-bottom">City</th>
                
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
            {currentRecords.length > 0 ?(
              currentRecords.map((rider, idx) => (
                <TableRow
                  key={rider.riderId}
                  {...rider}
                  index={(currentPage - 1) * recordsPerPage + idx}
                />
              ))
):(
  <tr style={{ textAlign: "center", height: "200px" }}>
                  <td colSpan="5">
                    <Oval
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{
                        marginLeft: "500px",
                      }}
                    />
                  </td>
                </tr>
)
}


            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>

                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{currentRecords.length}</b> out of <b>{totalRiders}</b>{" "}
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export const BookingTable = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const recordsPerPage = 10;
  const { auth } = useAuth();

  useEffect(() => {
    const token = auth?.token;
    console.log("token inside try of booking : ", token);

    const fetchBookingsdata = async () => {
      try {
        const response = await getAllBookings(token);
        const allBookings = response;
        console.log("bookings : ", allBookings);
        setBookingsList(allBookings);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchBookingsdata();
  }, []);

  const activeBookings = bookingsList.filter(
    (booking) => booking.status === "active"
  );

  const totalPages = Math.ceil(activeBookings.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = activeBookings.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewBooking = (bid) => {
    console.log("booking id : ", bid);

    // navigate(`/booking/${bid}` );
    navigate(`${bid}/get`);
  };
  const totalBookings = activeBookings.length;

  const TableRow = ({
    index,
    pickup_address2,
    drop_address2,
    status,
    trip_distance,
    _id,
    bidConfig,
    bid,
  }) => {
    const handleEdit = (riderId) => {
      console.log("inside edit rider : ", riderId);
    };

    const statusVariant =
      status === "active"
        ? "success"
        : status === "completed"
        ? "primary"
        : status === "canceled"
        ? "danger"
        : "warning";

    const distanceInKm = (trip_distance / 1000).toFixed(2);
    return (
      <tr style={{cursor:'pointer'}} >
        <td onClick={() => handleViewBooking(bid)}>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {index + 1}
          </Card.Link>
        </td>
        <td onClick={() => handleViewBooking(bid)} style={{ textAlign: 'center' }}>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
        <td onClick={() => handleViewBooking(bid)} style={{ textAlign: 'center' }}>
          <span className="fw-normal">{pickup_address2}</span>
        </td>
        <td onClick={() => handleViewBooking(bid)} style={{ textAlign: 'center' }}>
          <span className="fw-normal">{drop_address2}</span>
        </td>
        <td onClick={() => handleViewBooking(bid)} style={{ textAlign: 'center' }}>
          <span className="fw-normal">{distanceInKm}    <span style={{ marginLeft: '8px' }}>Km</span>
          </span>
        </td>
        <td onClick={() => handleViewBooking(bid)} style={{ textAlign: 'center' }}>
          <span className={`fw-normal text`}>{bidConfig.current_step}</span>
        </td>
        <td onClick={() => handleViewBooking(bid)}>
          <span className={`fw-normal text`}>    <span style={{ marginRight: '8px' }}>{<FontAwesomeIcon icon={faRupeeSign} />} </span>
          {bidConfig.current_bid}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleViewBooking(bid)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEdit(_id)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom" style={{ textAlign: 'center' }}>  Id</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Booking Status</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Pickup Location</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Drop Location</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Trip Distance</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Current Step</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Current Bid</th>
                <th className="border-bottom" style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((booking, idx) => (
                  <TableRow
                    key={booking._id}
                    {...booking}
                    index={(currentPage - 1) * recordsPerPage + idx}
                  />
                ))
              ) :
               (
                <tr style={{ textAlign: "center", height: "200px" }}>
                  <td colSpan="5">
                    <Oval
                      visible={true}
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{
                        marginLeft: "500px",
                      }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>

                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{currentRecords.length}</b> out of{" "}
              <b>{totalBookings}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export const UserManagmentTable = () => {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { auth } = useAuth();

  const recordsPerPage = 10;
  const token = auth?.token;
  console.log("token in user managment Table : ", token);

  useEffect(() => {
    const fetchUsersdata = async () => {
      try {
        const response = await getUserList(token);
        const users = response;
        console.log("response here : ", users);

        setUsersList(users);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchUsersdata();
  }, []);

  const totalPages = Math.ceil(usersList.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = usersList.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalRiders = usersList.length;

  const TableRow = ({
    phone,
    first_name,
    last_name,
    role,
    email,
    username,
    aid,
  }) => {
    // const statusVariant =
    //   kyc_approved === "approved"
    //     ? "success"
    //     : kyc_approved === "pending"
    //     ? "warning"
    //     : kyc_approved === "rejected"
    //     ? "danger"
    //     : "primary";

    // const navigate = useNavigate();

    // Function to handle navigation to edit page
    const handleEdit = (aid) => {
      console.log("inside edit rider : ", aid);
      navigate(`/UserManagment/${aid}/update-profile`);
    };

    return (
      <tr style={{cursor:'pointer'}} >
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {first_name + "  " + last_name}
          </Card.Link>
        </td>
        <td>
          <span className={`fw-normal text`}>{username}</span>
        </td>
        <td>
          <span className={`fw-normal text`}>{role}</span>
        </td>
        <td>
          <span className="fw-normal">{email}</span>
        </td>
        <td>
          <span className="fw-normal">{phone}</span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item onClick={() => handleViewDetails(riderId)}> */}
              {/* <Dropdown.Item onClick={() => handleViewDetails(_id)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item> */}
              <Dropdown.Item onClick={() => handleEdit(aid)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Update
                Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Name</th>
                <th className="border-bottom">User Name</th>
                <th className="border-bottom">Role</th>
                <th className="border-bottom">Email Id</th>
                <th className="border-bottom">Phone Number</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
            {currentRecords.length > 0 ?(
              currentRecords.map((rider) => (
                <TableRow key={rider.riderId} {...rider} />
              ))):(
                <tr style={{ textAlign: "center", height: "200px" }}>
                <td colSpan="5">
                  <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{
                      marginLeft: "500px",
                    }}
                  />
                </td>
              </tr>
              )
            }
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>

                {[...Array(totalPages).keys()].map((number) => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{currentRecords.length}</b> out of <b>{totalRiders}</b>{" "}
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};
