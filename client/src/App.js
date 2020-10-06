import React, { useEffect, useState, useCallback } from 'react';
import { useHttp } from './hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';
import { ReviewList } from './components/ReviewList';

function App() {
  const { loading, request } = useHttp();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchData = useCallback(async() => {
    const data = await request('/api/reviews', 'GET');
    setReviews(data.reverse());
  }, [request])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendReview = async() => {
    setName('');
    setMessage('');

    try {
      const id = uuidv4();

      const review = {
        id,
        name,
        message,
      };

      const data = await request('/api/reviews', 'POST', { ...review });

      fetchData();

      return data;
    } catch (e) {}
  };

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'message') {
      setMessage(event.target.value);
    }
  }

  return (
    <div className="app">
      <h1 className="app__heading">
        Yaroslav's <br/>
        Guestbook
      </h1>

      <div className="form">
        <label className = "text-input">
          Name: <br />
          <input
            type = "text"
            name = "name"
            placeholder = "Your name"
            className = "text-input__field"
            autoComplete = "off"
            value = {name}
            onChange = {(e) => handleChange(e)}
            required
          />
        </label>
        <label className="textarea">
          Message: <br />
          <textarea
            type = "textarea"
            name = "message"
            placeholder = "Your message"
            maxLength = "500"
            className = "textarea__field"
            autoComplete = "off"
            value = {message}
            onChange = {(e) => handleChange(e)}
            required
          >
          </textarea>
        </label>
        <button
          type="submit"
          className="button"
          onClick={sendReview}
          disabled={loading}
        >
          Send
        </button>
      </div>

      <h2 className="app__records">
        Number of records: {reviews.length}
      </h2>

      <ReviewList reviews={reviews} />
    </div>
  );
}

export default App;
