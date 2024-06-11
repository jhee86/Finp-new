import React, { useState } from 'react';

const AdminPage = ({ faqData, setFaqData }) => {
  const [keyword, setKeyword] = useState('');
  const [response, setResponse] = useState('');
  const [source, setSource] = useState('');

  const handleAddFaq = () => {
    const newFaq = { keyword, response, source, date: new Date().toLocaleString() };
    setFaqData([...faqData, newFaq]);
    setKeyword('');
    setResponse('');
    setSource('');
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Response"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <button onClick={handleAddFaq}>Add FAQ</button>
      <ul>
        {faqData.map((faq, index) => (
          <li key={index}>
            <strong>{faq.keyword}</strong>: {faq.response} (출처: {faq.source}) - {faq.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
