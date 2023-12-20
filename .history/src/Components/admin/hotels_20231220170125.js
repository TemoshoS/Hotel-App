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
      const newHotelId = await addHotel(formData);
      alert
      setAddModalIsOpen(false);
      setHotels(await getRooms());
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
      await deleteHotel(hotelId);
      setHotels(await getRooms());
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

      await updateHotel(selectedRoom.id, formData);
      setUpdateModalIsOpen(false);
      setHotels(await getRooms());
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
    <div>
      <button onClick={() => setAddModalIsOpen(true)}>Add Hotel</button>
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
            Close
          </button>
        </div>
        <form className="modal-form">
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </label>

          <label>
            Room Name:
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
            />
          </label>
          <label>
            Room Description:
            <textarea
              name="roomDescription"
              value={formData.roomDescription}
              onChange={handleChange}
            />
          </label>
          <label>
            Room Price:
            <input
              type="text"
              name="roomPrice"
              value={formData.roomPrice}
              onChange={handleChange}
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
            Close
          </button>
        </div>
        <div className="modal-content">
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
        <form className="modal-form">


          <label>
            New Room Name:
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
            />
          </label>
          <label>
            New Description:
            <textarea
              name="roomDescription"
              value={formData.roomDescription}
              onChange={handleChange}
            />
          </label>
          <label>
            New Price:
            <input
              type="text"
              name="roomPrice"
              value={formData.roomPrice}
              onChange={handleChange}
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
              <td className="button-container">
                <button className="view-button" onClick={() => handleView(room)}>
                  View
                </button>
                <button className="update-button" onClick={() => handleUpdate(room.id)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => handleDelete(room.id)}>
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hotels;