import { useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState('1404-03-21');
  const [textComment, setTextComment] = useState('');
  const [comment, setComment] = useState([]);
  const [file, setFile] = useState();


  let newComment = {
    date: '',
    text: '',
    pics: 'pic'
  }

  function handleFile(e) {
    console.log(e);
    setFile(e.target.value)
  }

  function handleComment(e) {
    setComment(e.target.value);
  }
  
  function handleDateChange(e) {
    console.log(e.target.value);
  }

  function auto_height(elem) { 
    elem.style.height = '10px';
    elem.style.height = `${elem.scrollHeight}px`;
  }

  function handleAddComment() {
    // newComment = {date: date, text: textComment};
    setComment([...comment, { date: date, text: textComment, pics: { '1': 'pic1.jpg', '2': 'pic2.jpg'} }]);
    setTextComment('');
  }

  // console.log(comment);


  return (
    <>
      <h1>Wine Tracker</h1>
      <div className="card flex-col">
        <div className='flex-row'>
          <label htmlFor="date">Date</label>
          <input type="text" name='date' value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
        {/* <label htmlFor="comment">Enter Your comment</label> */}
        <textarea type='text' className='auto_height comment' name='comment' placeholder='Enter your comment'
          onInput={(e)=> auto_height(e.target)} value={textComment} onChange={(e) => setTextComment(e.target.value)}/>
        <input type='file' accept='image/*' name='file' onChange={(e) => handleFile(e)}/>
        <button className='add' onClick={handleAddComment}>Add Comment</button>
      </div>
      <div className='list'>
        <ul className='items flex-col'>
          {/* <li>
            <h3 className='date'>1404-03-12</h3>
            <p className='my-comment'>my comment</p>
            <div className='pics'>

            </div>
          </li> */}
          {
            comment.map((item, index) => (
            <li key={index} className='item flex-row'>
              <span className='date'>{item.date}</span>
              <span className='my-comment'>{item.text}</span>
              {
                Object.entries(item.pics).map((pic) => (<span className='pic' key={pic[0]}>{pic[1]}</span>))
              }
            </li>))
          }
        </ul>
      </div>
    </>
  )
}

export default App
