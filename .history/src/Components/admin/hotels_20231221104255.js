import React, { useEffect, useState } from 'react';
import { getRooms, addHotel, deleteHotel, updateHotel } from '../../services/roomServices';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    image: '',
    roomName: '',
    roomDescription: '',
    roomPrice: '',
    checkInDate: '',
    checkOutDate: '',
  });


  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelData = await getRooms();
        setHotels(hotelData);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
        setHotels([]);
      }
    };

    fetchHotels();
  }, []);

  const handleAdd = async () => {
    try {

      if (document.getElementById('myForm').checkValidity()) {
        const newHotelId = await addHotel(formData);
        alert('Room is added successfully');
        setAddModalIsOpen(false);
        setHotels(await getRooms());
      } else {
        alert('Please fill out all required fields')
      }
    } catch (error) {
      console.error('Error adding hotel:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleView = (room) => {
    setSelectedRoom(room);
    setViewModalIsOpen(true);
  };

  const closeViewModal = () => {
    setViewModalIsOpen(false);
  };

  const handleDelete = async (hotelId) => {
    try {
      const wantDelete = window.confirm('Are you sure you want to delete this room?');

      if (wantDelete) {
        await deleteHotel(hotelId);
        alert('Room is deleted successfully')
        setHotels(await getRooms());
      }
    } catch (error) {
      console.error('Error deleting hotel:', error.message);
    }
  };


  const handleUpdate = (roomId) => {
    const room = hotels.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoom(room);

      setFormData({
        id: room.id,
        roomName: room.roomName,
        roomDescription: room.roomDescription,
        roomPrice: room.roomPrice,
        checkInDate: room.checkInDate,
        checkOutDate: room.checkOutDate,
      });
      setUpdateModalIsOpen(true);
    } else {
      console.error('Invalid room selected for update.');
    }
  };


  const performUpdate = async () => {
    try {
      if (!selectedRoom || !selectedRoom.id) {
        console.error('Invalid room selected for update. selectedRoom:', selectedRoom);
        return;
      }

      if (!formData) {
        console.error('Invalid formData for update. formData:', formData);
        return;
      }

      
      if (document.getElementById('myForm1').checkValidity()) {
      await updateHotel(selectedRoom.id, formData);
      alert('Room is updated successfully');
      setUpdateModalIsOpen(false);
      setHotels(await getRooms());
      } else {
        alert('Please fill out all required fields')
      }
    } catch (error) {
      console.error('Error updating hotel:', error.message);
    }
  };



  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    },
  };

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => setAddModalIsOpen(true)} className='addBtn'>Add Hotel</button>
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        style={customStyles}

        overlayClassName="modal-overlay"
        contentLabel="Add Hotel Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">{formData.id ? 'Update Hotel' : 'Add Hotel'}</h2>
          <button className="modal-close-btn" onClick={() => setAddModalIsOpen(false)}>
          &#10005;
          </button>
        </div>
        <form id='myForm' className="modal-form">
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              required
            />
          </label>

          <label>
            Room Name:
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Room Description:
            <textarea
              name="roomDescription"
              value={formData.roomDescription}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Room Price:
            <input
              type="text"
              name="roomPrice"
              value={formData.roomPrice}
              onChange={handleChange}
              required
            />
          </label>
          <button type="button" onClick={formData.id ? handleUpdate : handleAdd}>
            {formData.id ? 'Update' : 'Add'} Hotel
          </button>
        </form>
      </Modal>

      {/* View Room Details Modal */}
      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={closeViewModal}
        style={customStyles}
        overlayClassName="modal-overlay"
        contentLabel="View Room Details Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">Room Details</h2>
          <button className="modal-close-btn" onClick={closeViewModal}>
          &#10005;
          </button>
        </div>
        <div  className="modal-content">
          <img src={selectedRoom?.roomImage} alt="Room" className="room-image" />
          <p>Room Name: {selectedRoom?.roomName}</p>
          <p>Description: {selectedRoom?.roomDescription}</p>
          <p>Price: {selectedRoom?.roomPrice}</p>

        </div>
      </Modal>

      <Modal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
        style={customStyles}
        overlayClassName="modal-overlay"
        contentLabel="Update Hotel Modal"
      >
        <div className="modal-header">
          <h2 className="modal-title">Update Hotel</h2>
          <button className="modal-close-btn" onClick={() => setUpdateModalIsOpen(false)}>
            Close
          </button>
        </div>
        <form id='myForm1' className="modal-form">


          <label>
            New Room Name:
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            New Description:
            <textarea
              name="roomDescription"
              value={formData.roomDescription}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            New Price:
            <input
              type="text"
              name="roomPrice"
              value={formData.roomPrice}
              onChange={handleChange}
              required
            />
          </label>


          <button type="button" onClick={performUpdate}>
            Update Hotel
          </button>
        </form>
      </Modal>

      {/* TABLE */}

      <table className="hotel-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Room Name</th>
            <th>Room Description</th>
            <th>Room Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((room) => (
            <tr key={room.id}>
              <td>
                <img src={room.roomImage} alt='Room' className="room-image" />
              </td>
              <td>{room.roomName}</td>
              <td>{room.roomDescription}</td>
              <td>{room.roomPrice}</td>
              <td >
                <div className="button-container">
                  <button className="view-button" onClick={() => handleView(room)}>
                    View
                  </button>
                  <button className="update-button" onClick={() => handleUpdate(room.id)}>
                    Update
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(room.id)}>
                    Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hotels;