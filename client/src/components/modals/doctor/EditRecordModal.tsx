import React, { useState } from 'react';
import config from '@/common/config.ts';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Record {
  record_id: number;
  patient_name: string;
  patient_age: number;
  patient_dob: string;
  patient_gender: string;
  visit_date: string;
  purpose: string;
  diagnosis: string;
  prescription: string;
  record_status: string;
}

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
  doctorId?: number | null; // Optional if always passed or managed externally
}

const EditRecordModal: React.FC<EditRecordModalProps> = ({ isOpen, onClose, record, doctorId }) => {
  const { recordId } = useParams<{ recordId: string }>(); // Assuming the modal is always used in a route context where `recordId` is available
  const [formData, setFormData] = useState({
    visit_date: record?.visit_date || '',
    purpose: record?.purpose || '',
    diagnosis: record?.diagnosis || '',
    prescription: record?.prescription || '',
    record_status: record?.record_status || 'Pending'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId || !recordId) {
      alert("Doctor ID or Record ID is missing.");
      return;
    }

    try {
      const response = await axios.put(`${config.API}/api/records/edit/${doctorId}/${recordId}`, formData);
      if (response.status === 200) {
        window.location.reload(); 
        onClose(); // Close the modal on successful update
      } else {
        throw new Error('Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Error updating record');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold">Edit Record Details</h2>
        <p className="mt-2">DISCLAIMER: Only specific details can be modified.</p>

        {/* Form fields for editing record details */}
        <label className="flex justify-between mt-4">
          <span className="text-gray-700">Visit Date:</span>
          <input
            type="date"
            name="visit_date"
            className="form-input block w-[50%] rounded-md border-gray-300 shadow-sm"
            value={formData.visit_date}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between mt-4">
          <span className="text-gray-700">Purpose:</span>
          <input
            type="text"
            name="purpose"
            className="form-input block w-[50%] rounded-md border-gray-300 shadow-sm"
            value={formData.purpose}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between mt-4">
          <span className="text-gray-700">Diagnosis:</span>
          <input
            type="text"
            name="diagnosis"
            className="form-input block w-[50%] rounded-md border-gray-300 shadow-sm"
            value={formData.diagnosis}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between mt-4">
          <span className="text-gray-700">Prescription:</span>
          <input
            type="text"
            name="prescription"
            className="form-input block w-[50%] rounded-md border-gray-300 shadow-sm"
            value={formData.prescription}
            onChange={handleChange}
          />
        </label>

        <label className="flex justify-between mt-4">
          <span className="text-gray-700">Record Status:</span>
          <select
            name="record_status"
            className="form-select block w-[50%] rounded-md border-gray-300 shadow-sm"
            value={formData.record_status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Complete">Complete</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-700 rounded-md px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary text-white hover:bg-primarydark rounded-md px-4 py-2"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecordModal;

