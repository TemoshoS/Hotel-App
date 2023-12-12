import React, { useEffect, useState } from 'react';
import { getRooms, addHotel, deleteHotel} from '../../services/roomServices';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    roomName: '',
    roomDescription: '',
    roomPrice: '',
    checkInDate:'',
    checkOutDate:'',
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

      
      setIsOpen(false);
      setHotels(await getRooms()); 
    } catch (error) {
      console.error('Error adding hotel:', error.message);
    }
  };

  const handleChange = (e) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleView = () => {
    
  };

  const handleDelete = async (hotelId) => {
    try {
      await deleteHotel(hotelId);
      setHotels(await getRooms());
    } catch (error) {
      console.error('Error deleting hotel:', error.message);
    }
  };

  const handleUpdate = () => {
    
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
          <button onClick={() => setIsOpen(true)}>Add Hotel</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Add Hotel Modal"
      >
        <h2>Add Hotel</h2>
        <form>
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
          <button type="button" onClick={handleAdd}>
            Add
          </button>
        </form>
      </Modal>

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
              <td>
                <button onClick={() => handleView(room)}>View</button>
                <button onClick={() => handleUpdate(room)}>Update</button>
                <button onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hotels;