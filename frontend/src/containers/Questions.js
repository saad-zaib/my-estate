import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import  { Oval } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { HelmetProvider,Helmet } from 'react-helmet-async';

const Questions = ({ setAlert }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { name, email, subject, message } = formData;

    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/api/contact/`, { name, email, subject, message }, config)
            .then(res => {
                setAlert('Message Sent', 'success');
                setLoading(false);
                window.scrollTo(0, 0);
            })
            .catch(err => {
                setAlert('Error with Sending Message', 'error');
                console.log("error at contact on page number 49")
                setLoading(false);
                window.scrollTo(0, 0);
            })
    };

    return (
        <section
        className={`self-stretch bg-primary-50 flex flex-row flex-wrap items-start justify-center py-[86px] px-[5px] text-center text-21xl text-primary-800 font-body-large-400 `}
      >
        <div className="w-[900px] flex flex-col items-center justify-start py-0 px-2.5 box-border gap-[40px] max-w-[900px]">
          <div className="w-[688px] flex flex-col items-center justify-start gap-[24px] max-w-[95%] lg:max-w-[95%] md:self-stretch md:w-auto">
            <h1 className="m-0 self-stretch relative text-inherit leading-[48px] font-semibold font-inherit">
              Any Query
            </h1>
            <div className="self-stretch relative text-xl leading-[28px] text-lightslategray">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Proin sodales ultrices nulla blandit
              volutpat.
            </div>
          </div>
          <div className="self-stretch shadow-[0px_0px_24px_rgba(0,_0,_0,_0.03)] rounded-xl bg-gray-white flex flex-col items-center justify-start py-7 px-[30px] gap-[17px] text-left text-5xl text-darkslategray font-poppins">
            <div className="self-stretch flex flex-col items-center justify-start gap-[6px]">
              <h3 className="m-0 self-stretch h-9 relative text-inherit leading-[36px] font-bold font-inherit inline-block">
                Enquiry Form
              </h3>
              <div className="self-stretch relative text-lg leading-[30px] font-components-input-text text-slategray">
                Are you looking for details about a certain property? Ask us a
                question using the form below.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-start gap-[10px]">
              <div className="self-stretch flex flex-row items-start justify-center gap-[10px] md:flex-col md:gap-[10px] md:items-start md:justify-center">
                <input
                  className="[outline:none] font-components-input-text text-base bg-[transparent] self-stretch flex-1 rounded flex flex-col items-start justify-start py-4 px-3 text-darkgray border-[1px] border-solid border-gray1 md:flex-[unset] md:self-stretch"
                  value={name}
                  name="name"
                  onChange={onChange}
                  placeholder="First name"
                  type="text"
                />
                <div className="self-stretch flex-1 rounded flex flex-col items-start justify-center py-4 px-3 border-[1px] border-solid border-gray1 md:flex-[unset] md:self-stretch">
                  <input
                    className="[border:none] [outline:none] font-components-input-text text-base bg-[transparent] relative tracking-[0.15px] leading-[24px] text-darkgray text-left"
                    placeholder="Last name"
                    type="text"
                  />
                </div>
              </div>
              <input
                className="[outline:none] font-components-input-text text-base bg-[transparent] self-stretch rounded flex flex-col items-start justify-start py-4 px-3 text-darkgray border-[1px] border-solid border-gray1"
                value={email}
                name="email"
                onChange={onChange}
                placeholder="Email id"
                type="text"
              />
              <textarea
                className="bg-[transparent] font-components-input-text text-base [outline:none] self-stretch rounded box-border h-[105px] flex flex-col items-start justify-start p-3 text-darkgray border-[1px] border-solid border-gray1"
                value={message}
                name="message"
                onChange={onChange}
                placeholder="Comments or questions"
              />
              <button className="cursor-pointer [border:none] p-0 bg-my-color w-[222px] rounded h-[46px] flex flex-col items-center justify-center" onClick={onSubmit}>
                <div className="w-[203.1px] relative text-base font-components-input-text text-gray-white text-center inline-block">
                  Submit
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
};

Questions.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Questions);
