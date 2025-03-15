import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import './styles_skipasses.css';
import AddingForm from './AddingForm';
import EditingForm from './EditingForm';
import { toUTC } from './common';

const SkipassList = () => {
    const [skipasses, setSkipasses] = useState([]);
    const [searchTerms, setSearchTerms] = useState({
        skier_name: '',
        skipass_type: '',
        purchase_date: '',
        expiry_date: '',
        purchase_price: ''
    });
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingSkipass, setEditingSkipass] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);


    const fetchSkipasses = useCallback(() => {
        axios.get('http://localhost:8000/skipasses/')
            .then(res => {
                for (let skipass of res.data) {
                    if (skipass.is_active && skipass.expiry_date < toUTC(new Date())) skipass.is_active = false;
                }
                setSkipasses(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        fetchSkipasses();
    }, [fetchSkipasses]);

    useEffect(() => {
        if (initialLoad && skipasses.length > 0) {
          handleSort('purchase_date', 'desc');
          setInitialLoad(false); 
        }
      }, [skipasses, initialLoad]);

    const handleEditButton = (id) => {
        setShowEditForm(true);
        let skipass = skipasses.find((skipass) => skipass.id === id );
        setEditingSkipass(skipass);
    }

    const addSkipass = (newSkipass) => {
        axios.post('http://localhost:8000/skipasses/', newSkipass)
            .then(() => {
                fetchSkipasses();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const editSkipass = (editedSkipass) => {
        axios.put(`http://localhost:8000/skipasses/${editedSkipass.id}/`, editedSkipass)
            .then(() => {
                fetchSkipasses();
                setShowEditForm(false);
                setEditingSkipass(null);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const deleteSkipass = (id) => {
        axios.delete(`http://localhost:8000/skipasses/${id}/`)
            .then(() => {
                fetchSkipasses();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms({ ...searchTerms, [name]: value });
    };

    const handleSort = (column) => {
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);
        sortSkipasses(column, direction);
    };

    const sortSkipasses = (column, direction) => {
        const sorted = [...skipasses].sort((a, b) => {
            if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSkipasses(sorted);
    };

    const filteredSkipasses = skipasses.filter((skipass) =>
        skipass.skier_name.toLowerCase().includes(searchTerms.skier_name.toLowerCase()) &&
        skipass.skipass_type.toLowerCase().includes(searchTerms.skipass_type.toLowerCase()) &&
        new Date(skipass.purchase_date).toLocaleString().includes(searchTerms.purchase_date.toLowerCase()) &&
        new Date(skipass.expiry_date).toLocaleString().includes(searchTerms.expiry_date.toLowerCase()) &&
        skipass.purchase_price.toString().includes(searchTerms.purchase_price)
    );

    return (
        <>
            <div>
                {!showEditForm && ( <AddingForm addSkipass={addSkipass} /> )}
                { showEditForm && ( <EditingForm editingSkipass={editingSkipass} editSkipass={editSkipass} cancelEditing={() => setShowEditForm(false)} /> ) }
                <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Skier Name"
                                    name="skier_name"
                                    value={searchTerms.skier_name}
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Skipass Type"
                                    name="skipass_type"
                                    value={searchTerms.skipass_type}
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Purchase Date"
                                    name="purchase_date"
                                    value={searchTerms.purchase_date}
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Expiry Date"
                                    name="expiry_date"
                                    value={searchTerms.expiry_date}
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Purchase Price"
                                    name="purchase_price"
                                    value={searchTerms.purchase_price}
                                    onChange={handleSearchChange}
                                />
                            </th>
                            <th></th>
                        </tr>
                        <tr>
                            <th onClick={() => handleSort('skier_name')}>
                                Skier Name {sortColumn === 'skier_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('skipass_type')}>
                                Type of Skipass {sortColumn === 'skipass_type' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('purchase_date')}>
                                Date of Purchase {sortColumn === 'purchase_date' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('expiry_date')}>
                                Expiry Date {sortColumn === 'expiry_date' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('purchase_price')}>
                                Purchase Price {sortColumn === 'purchase_price' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSkipasses.map((skipass) => (
                            <tr key={skipass.id} className={!skipass.is_active ? 'inactive' : ''}>
                                <td>{skipass.skier_name}</td>
                                <td>{skipass.skipass_type}</td>
                                <td>{new Date(skipass.purchase_date).toLocaleString()}</td>
                                <td>{new Date(skipass.expiry_date).toLocaleString()}</td>
                                <td>${parseFloat(skipass.purchase_price).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => { handleEditButton(skipass.id) }} className="btn btn-edit"><i className="fas fa-pencil-alt" /></button>
                                    <button onClick={() => { if (window.confirm(`Are you sure to delete ${skipass.skier_name}'s ${skipass.skipass_type} skipass?`)) { deleteSkipass(skipass.id) } }} className="btn btn-remove"><i className="fas fa-trash-alt" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SkipassList;
