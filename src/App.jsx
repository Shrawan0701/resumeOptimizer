import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL  || 'http://localhost:8080';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [isRoastMode, setIsRoastMode] = useState(false);
  const [roastTone, setRoastTone] = useState('Honest');

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
    setNotice('');
    setResponse(null);
  };

  const handleOptimize = async () => {
    if (!resumeFile) {
      setNotice('⚠️ Please upload your resume.');
      return;
    }

    if (jobDescription.trim().length < 10) {
      setNotice('ℹ Optimizing based on job title only. For better results, please paste the full job description.');
    } else {
      setNotice('');
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/resume/optimize`, formData);
      setResponse(res.data);
    } catch (err) {
      setNotice('❌ Something went wrong during optimization.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoast = async () => {
    if (!resumeFile) {
      setNotice('⚠️ Please upload your resume.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('tone', roastTone);

    try {
      setNotice('');
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/resume/roast`, formData);
      setResponse(res.data);
    } catch (err) {
      setNotice('❌ Something went wrong during roasting.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-white custom-header">Resume {isRoastMode ? 'Roaster' : 'Optimizer'}</h1>
          <button
            className="btn btn-outline-light"
            onClick={() => {
              setIsRoastMode(!isRoastMode);
              setNotice('');
              setResponse(null);
            }}
          >
            {isRoastMode ? '← Switch to Optimize Mode' : '🔥 Roast My Resume'}
          </button>
        </div>

        <div className="card-glow">
          <h4 className="mb-3">Upload Your Resume</h4>
          <input
            type="file"
            className="form-control bg-dark text-white border-0 mb-3"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {!isRoastMode && (
            <>
              <h4 className="mb-3">Paste Job Description or Title</h4>
              <textarea
                className="form-control bg-dark text-white border-0 mb-3 custom-placeholder"
                rows="5"
                placeholder="Tip: For better results, provide the full job description instead of just a job title."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </>
          )}

          {notice && <div className="alert alert-warning">{notice}</div>}

          {!isRoastMode ? (
            <button className="btn-modern" onClick={handleOptimize} disabled={loading}>
              {loading ? 'Optimizing...' : 'Optimize Resume'}
            </button>
          ) : (
            <>
              <div className="mb-3">
                <label className="text-white me-2">Tone:</label>
                <select
                  className="form-select bg-dark text-white border-light"
                  value={roastTone}
                  onChange={(e) => setRoastTone(e.target.value)}
                >
                  <option value="Friendly">Friendly</option>
                  <option value="Honest">Honest</option>
                  <option value="Brutal">Brutal</option>
                </select>
              </div>
              <button className="btn-modern" onClick={handleRoast} disabled={loading}>
                {loading ? 'Roasting...' : 'Roast My Resume'}
              </button>
            </>
          )}

          {loading && (
            <div className="text-center my-4 fade-in">
              <div className="spinner-border text-light spinner-lg mb-3" role="status" style={{ width: '4rem', height: '4rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="text-white">
                <strong>{isRoastMode ? 'Grilling your resume...' : 'Generating optimized resume... Please wait.'}</strong>
              </div>
            </div>
          )}

          {response && (
            <div className="mt-5 text-white">
              <div className="card bg-dark border-light p-4 rounded shadow-sm">
                {isRoastMode ? (
                  <>
                    <h4 className="text-danger mb-3">🔥 Resume Roast</h4>
                    <pre className="text-danger fs-5" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                      {response?.feedback || 'No feedback received. Try uploading a different resume.'}
                    </pre>
                  </>
                ) : (
                  <>
                    <h4 className="text-info mb-3">💡 Optimization Suggestions</h4>
                    <pre className="custom-suggestions-box">{response.suggestions}</pre>
                    <h4 className="mt-4 text-warning">📊 ATS Score: {response.atsScore} / 100</h4>
                    <div
                      className={`p-3 mt-2 rounded fw-semibold ${response.atsCompatible ? 'bg-success text-dark' : 'bg-warning text-dark'}`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {response.atsFeedback}
                    </div>

                    {response.optimizedPdf && (
                      <div className="mt-4 text-center">
                        <a
                          className="btn btn-outline-success btn-lg"
                          href={`data:application/pdf;base64,${response.optimizedPdf}`}
                          download="Optimized_Resume.pdf"
                        >
                          ⬇ Download Optimized Resume PDF
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
