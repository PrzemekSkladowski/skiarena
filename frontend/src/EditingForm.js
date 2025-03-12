import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import './styles_skipasses.css';
import { toLocalTimezone, toUTC } from './common';

const EditingForm = ({ editingSkipass, editSkipass, cancelEditing }) => {
    const [editedSkipass, setEditedSkipass] = useState({
        id: null,
        skier_name: '',
        skipass_type: '',
        purchase_date: '',
        expiry_date: '',
        purchase_price: '',
    });

    useEffect(() => {
        setEditedSkipass({
            id: editingSkipass.id,
            skier_name: editingSkipass.skier_name,
            skipass_type: editingSkipass.skipass_type,
            // purchase_date: new Date(editingSkipass.purchase_date).toISOString().slice(0, 16),
            purchase_date: toLocalTimezone(new Date(editingSkipass.purchase_date)),
            // expiry_date: new Date(editingSkipass.expiry_date).toISOString().slice(0, 16),
            expiry_date: toLocalTimezone(new Date(editingSkipass.expiry_date)),
            purchase_price: editingSkipass.purchase_price,
        });
    }, [editingSkipass]);

    const handleEditingInputChange = (e) => {
        const { name, value } = e.target;
        setEditedSkipass({ ...editedSkipass, [name]: value });
    };

    const handleEditingFormSubmit = (e) => {
        e.preventDefault();
        editSkipass(editedSkipass);
        setEditedSkipass({
            skier_name: '',
            skipass_type: '',
            purchase_date: '',
            expiry_date: '',
            purchase_price: '',
        });
    };

    return (
        <>
            <form onSubmit={handleEditingFormSubmit} className="mb-3">
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Skier Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="skier_name"
                            value={editedSkipass.skier_name}
                            onChange={handleEditingInputChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Skipass Type</label>
                        <input
                            type="text"
                            className="form-control"
                            name="skipass_type"
                            value={editedSkipass.skipass_type}
                            onChange={handleEditingInputChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Purchase Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="purchase_date"
                            value={editedSkipass.purchase_date}
                            onChange={handleEditingInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Expiry Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="expiry_date"
                            value={editedSkipass.expiry_date}
                            onChange={handleEditingInputChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Purchase Price</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="purchase_price"
                            value={editedSkipass.purchase_price}
                            onChange={handleEditingInputChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-warning">Edit</button>
                <button onClick={() => { cancelEditing() }} className="btn">Cancel</button>
            </form>
        </>
    );
}

export default EditingForm;
