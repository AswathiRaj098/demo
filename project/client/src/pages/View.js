import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className='card'>
                <div className='card-header'>
                    <p>Student Details List</p>
                </div>
                <div className='container'>
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>First Name:</strong>
                    <span>{user.firstname}</span>
                    <br />
                    <br />
                    <strong>Last Name:</strong>
                    <span>{user.lastname}</span>
                    <br />
                    <br />
                    <strong>Fathers Name:</strong>
                    <span>{user.fathersname}</span>
                    <br />
                    <br />
                    <strong>Mothers Name:</strong>
                    <span>{user.mothersname}</span>
                    <br />
                    <br />
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Contact:</strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />
                    <strong>Education:</strong>
                    <span>{user.education}</span>
                    <br />
                    <br />
                    <strong>Address:</strong>
                    <span>{user.address}</span>
                    <br />
                    <br />
                    <strong>University:</strong>
                    <span>{user.university}</span>
                    <br />
                    <br />
                    <strong>Country:</strong>
                    <span>{user.country}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <div className='btn btn-edit' onClick={'/'}>Go Back</div>
                    </Link>
                    </div>
                </div>
            </div>
    );
};

export default View;
