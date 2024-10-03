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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import {
  getAllBookings,
  getAllRiders,
  getAllTransactions,
  getRidersKYCDoc,
} from "../api/adminApis";
import CustomModal from "./CustomModal";
import { Oval } from "react-loader-spinner";

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

  const handleEditTransaction= (transactionId)=>{
    // api to be called for chnaging transaction status
    console.log("change the status to ch")
    console.log("transaction id here ",transactionId)
  }

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
    _id
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
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
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
              <Dropdown.Item onClick={()=>handleEditTransaction(_id)}>
                <FontAwesomeIcon 
                icon={faEdit}  /> Edit
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
  // const [transactions, seTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
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

  const handleEditTransaction= (transactionId)=>{
    // api to be called for chnaging transaction status
    console.log("change the status to ch")
    console.log("transaction id here ",transactionId)
  }

  const TableRow = ({
    trip_id,
    pickup_loc,
    drop_loc,
    price,
    issueDate,
    dueDate,
    status,
    bookingId,
    _id
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
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {trip_id}
          </Card.Link>
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
          <span className="fw-normal">${parseFloat(price).toFixed(2)}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
       
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <h4 className="p-3">Riders Earning </h4>
      <Card.Body className="pt-0">

     


        <Table hover className="user-table align-items-center">
          
          <thead>
            <tr>
              <th className="border-bottom">Trip Id</th>
              <th className="border-bottom">PickUp Location</th>
              <th className="border-bottom">Drop Location</th>
              <th className="border-bottom">Trip Date</th>
              <th className="border-bottom">Total</th>
              <th className="border-bottom">Status</th>
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
    navigate(`/trip/${tripId}`);
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
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {trip_id}
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

export const KycTable = () => {
  const [riderKycList, setRiderKycList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRiderImages, setSelectedRiderImages] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const recordsPerPage = 10;

  useEffect(() => {
    const fetchRidersdata = async () => {
      try {
        const response = await getAllRiders();
        const allRiders = response.riders;
        console.log("riders : ", allRiders);

        // Sort the ridersKyc by kycVerified status
        const sortedRiders = allRiders.sort((a, b) => {
          const order = { pending: 1, approved: 2, rejected: 3 };
          return order[a.kycVerified] - order[b.kycVerified];
        });
        console.log("sorterd riders : ", sortedRiders);

        const pendinKycRiders = allRiders.filter(
          (pendingKyc) => pendingKyc?.kyc_approved == "pending"
        );
        console.log("pendinKycRiders riders : ", pendinKycRiders);

        setRiderKycList(pendinKycRiders);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    };

    fetchRidersdata();

    console.log("kyc rediers : ", riderKycList);
  }, []);

  const handleViewDetails = (riderId) => {
    console.log("inside view details with id ", riderId);
    navigate(`/rider-kyc/${riderId}`);
  };

  console.log("here data : ", riderKycList);

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

  const totalRiders = riderKycList.length;

  const TableRow = ({
    mobile,
    first_name,
    last_name,
    kyc_approved,
    vehicle,
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
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {first_name + "  " + last_name}
          </Card.Link>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {kyc_approved}
          </span>
        </td>
        <td>
          <span className="fw-normal">{vehicle?.vehicle_no}</span>
        </td>
        <td>
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
              {/* <Dropdown.Item onClick={() => handleViewDetails(riderId)}> */}
              <Dropdown.Item onClick={() => handleViewDetails(_id)}>
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
                <th className="border-bottom">Riders Name</th>
                <th className="border-bottom">KYC Status</th>
                <th className="border-bottom">Vehicle Number</th>
                <th className="border-bottom">Phone</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((rider) => (
                <TableRow key={rider.riderId} {...rider} />
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
              Showing <b>{currentRecords.length}</b> out of <b>{totalRiders}</b>{" "}
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>

      {/* <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title="Rider's KYC Documents"
        images={selectedRiderImages}
        footerButtons={[{ label: 'Close', variant: 'primary', onClick: () => setShowModal(false) }]}
      >
        <p>Here are the KYC documents for the rider:</p>
      </CustomModal> */}
    </>
  );
};

export const RiderTable = () => {
  const [ridersList, setRidersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const recordsPerPage = 10;

  useEffect(() => {
    const fetchRidersdata = async () => {
      try {
        const response = await getAllRiders();
        const allRiders = response.riders;
        console.log("riders : ", allRiders);

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
    navigate(`/rider/${riderId}`);
  };


  const totalPages = Math.ceil(ridersList.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = ridersList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalRiders = ridersList.length;

  const TableRow = ({
    mobile,
    first_name,
    last_name,
    kyc_approved,
    vehicle,
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
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {first_name + "  " + last_name}
          </Card.Link>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {kyc_approved}
          </span>
        </td>
        <td>
          <span className="fw-normal">{vehicle?.vehicle_no}</span>
        </td>
        <td>
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
              {/* <Dropdown.Item onClick={() => handleViewDetails(riderId)}> */}
              <Dropdown.Item onClick={() => handleViewDetails(_id)}>
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
                <th className="border-bottom">Riders Name</th>
                <th className="border-bottom">KYC Status</th>
                <th className="border-bottom">Vehicle Number</th>
                <th className="border-bottom">Phone</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((rider) => (
                <TableRow key={rider.riderId} {...rider} />
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


  
  useEffect(() => {
    const fetchBookingsdata = async () => {
      try {
        const response = await getAllBookings();
        const allBookings = response.bookings;
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

  const handleViewBooking = (bookingId ) => {
    console.log("booking id : ",bookingId);
    navigate(`/booking/${bookingId}` );

  }
  const totalBookings = activeBookings.length;

  const TableRow = ({ orderId, status, trip_distance, _id }) => {
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

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {orderId}
          </Card.Link>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>{status}</span>
        </td>
        <td>
          <span className="fw-normal">{trip_distance}</span>
        </td>
        <td>
          <span className={`fw-normal text`}>"current bid"</span>
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
              <Dropdown.Item  onClick={()=>handleViewBooking(_id)}>
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
                <th className="border-bottom">Order Id</th>
                <th className="border-bottom">Booking Status</th>
                <th className="border-bottom">Trip Distance</th>
                <th className="border-bottom">Current Bid</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((booking) => (
                  <TableRow key={booking._id} {...booking} />
                ))
              ) : (
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
  const [ridersList, setRidersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const recordsPerPage = 10;

  useEffect(() => {
    const fetchRidersdata = async () => {
      try {
        const response = await getAllRiders();
        const allRiders = response.riders;
        console.log("riders : ", allRiders);

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
    navigate(`/rider/${riderId}`);
  };


  const totalPages = Math.ceil(ridersList.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = ridersList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalRiders = ridersList.length;

  const TableRow = ({
    mobile,
    first_name,
    last_name,
    
    _id,
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
    const handleEdit = (riderId) => {
      console.log("inside edit rider : ", riderId);
      // navigate(`/edit-rider/${riderId}`);  // Navigate to edit page with riderId
    };

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {first_name + "  " + last_name}
          </Card.Link>
        </td>
        <td>
          <span className={`fw-normal text`}>
            role
          </span>
        </td>
        {/* <td>
          <span className="fw-normal">{vehicle?.vehicle_no}</span>
        </td>
        <td>
          <span className="fw-normal">{mobile}</span>
        </td> */}
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
              <Dropdown.Item onClick={() => handleViewDetails(_id)}>
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
                <th className="border-bottom">User Name</th>
                <th className="border-bottom">Role</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((rider) => (
                <TableRow key={rider.riderId} {...rider} />
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
              Showing <b>{currentRecords.length}</b> out of <b>{totalRiders}</b>{" "}
              entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>

      
    </>
  );
};