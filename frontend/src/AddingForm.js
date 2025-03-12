import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import './styles_skipasses.css';
import { toLocalTimezone, toUTC } from './common';

const AddingForm = ({ addSkipass }) => {
    const [newSkipass, setNewSkipass] = useState({
        skier_name: '',
        skipass_type: '',
        purchase_date: toLocalTimezone(new Date()),
        expiry_date: '',
        purchase_price: '',
    });
    const [skipassOffers, setSkipassOffers] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState();

    const fetchSkipassOffers = useCallback(() => {
        axios.get('http://localhost:8000/skipass-offers/')
            .then(res => {
                setSkipassOffers(res.data);
            })
            .catch(err => {
                console.error('Error fetching skipass offers:', err);
            });
    }, []);

    useEffect(() => {
        fetchSkipassOffers();
    }, [fetchSkipassOffers]);

    const handleSelectChange = (e) => {        
        setSelectedOffer(e.target.value);
        if (e.target.value != "placeholder")
        {
            let newDate = new Date(newSkipass.purchase_date);
            let skipassOffer = skipassOffers.find(offer => offer.id == e.target.value);
            newDate.setDate(newDate.getDate() + skipassOffer.duration_days);
            newDate.setHours(newDate.getHours() + skipassOffer.duration_hours);
            let expiryDate = toLocalTimezone(newDate);
            setNewSkipass({ ...newSkipass, skipass_type: skipassOffer.offer_name, expiry_date: expiryDate, purchase_price: skipassOffer.price });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSkipass({ ...newSkipass, [name]: value });
        if (name === 'purchase_date') {
            let newDate = new Date(value);
            let skipassOffer = skipassOffers.find(offer => offer.id == selectedOffer);
            if (!skipassOffer) skipassOffer = skipassOffers[0];
            newDate.setDate(newDate.getDate() + skipassOffer.duration_days);
            newDate.setHours(newDate.getHours() + skipassOffer.duration_hours);
            let expiry_date = newDate.toISOString().slice(0, 16);
            setNewSkipass({ ...newSkipass, purchase_date: value, expiry_date: expiry_date });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let skipassToSave = {...newSkipass, purchase_date: toUTC(newSkipass.purchase_date), expiry_date: toUTC(newSkipass.expiry_date)};
        addSkipass(skipassToSave);
        setNewSkipass({
            skier_name: '',
            skipass_type: '',
            purchase_date: '',
            expiry_date: '',
            purchase_price: '',
        });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className="mb-3">
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Skier Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="skier_name"
                            value={newSkipass.skier_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Skipass Type</label>
                        <select
                            id="skipassSelector"
                            value={selectedOffer}
                            onChange={handleSelectChange}
                        >
                            <option value="placeholder">-Select an offer-</option>
                            {skipassOffers.map((offer) => (
                                <option key={offer.id} value={offer.id}>
                                    {offer.offer_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        <label>Purchase Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="purchase_date"
                            value={newSkipass.purchase_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Expiry Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="expiry_date"
                            value={newSkipass.expiry_date}
                            onChange={handleInputChange}
                            required
                            disabled
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Purchase Price</label>
                        <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            name="purchase_price"
                            value={newSkipass.purchase_price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-add"><i className="fa fa-plus" />&nbsp;Add new</button>
            </form>
        </>
    );
}

export default AddingForm;
