import React,{useRef} from 'react'

function Contact() {
    const form = useRef();

    const sendEmail = ()=>{
        
    }
  return (
    <div>   <form
    
    ref={form} onSubmit={sendEmail}
  >
    <div className="pt-0 mb-3">
      <input
        type="text"
        placeholder="Your name"
        name="user_name"
        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
        required
      />
    </div>
    <div className="pt-0 mb-3">
      <input
        type="email"
        placeholder="Email"
        name="user_email"
        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
        required
      />
    </div>
    
    <div className="pt-0 mb-3">
      <input
        type="subject"
        placeholder="subject"
        name="subject"
        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
        required
      />
    </div>
    <div className="pt-0 mb-3">
      <textarea
        placeholder="Your message"
        name="message"
        className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
        required
      />
    </div>
    <div className="pt-0 mb-3">
      <button
        className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
        type="submit"
      >
        Send a message
      </button>
    </div>
  </form></div>
  )
}

export default Contact