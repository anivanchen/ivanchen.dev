import React, { Fragment, useState } from 'react';
const nodemailer = require('nodemailer');

function ContactForm() {

  const input = {
    fontFamily: "Lato",
    fontSize: "15px",
    height: "30px",
    width: "50%",
    margin: "20px",
    paddingBottom: "5px",
    boxSizing: "border-box",
    background: "transparent",
    border: "none",
    borderBottom: "2px solid var(--color)",
    color: "var(--color)",
    outline: "none"
  }
  const submit = {
    fontFamily: "Lato",
    fontSize: "20px",
    height: "30px",
    width: "50%",
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleContactFormSubmit() {
    var mailOptions = {
      from: name,
      to: "",
      subject: subject,
      text: message + `\n\nContact me at ${email}.`
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "",
            pass: ""
        }
    });
    transporter.sendMail (mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
  }

  return (
    <Fragment>
      <div className="contact-wrapper">
        <h1>Contact Me</h1>
        <form onSubmit={handleContactFormSubmit}>
          <input type="text" style={input} placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" style={input} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" style={input} placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
          <input type="textarea" style={input} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
          <button type="submit" style={submit}>Submit</button>
        </form>
      </div>
    </Fragment>
  )
}

export default ContactForm;