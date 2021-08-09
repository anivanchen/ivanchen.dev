import React, { Fragment } from 'react';

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

  function handleContactFormSubmit() {
    // var mailOptions = {
    //   from: constants.loginUser,
    //   to: constants.sendToUser,
    //   subject: subject,
    //   text: message
    // };
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: constants.loginUser,
    //         pass: constants.loginPass
    //     }
    // });
    // transporter.sendMail (mailOptions, function (error, info) {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // })
  }

  return (
    <Fragment>
      <div className="contact-wrapper">
        <h1>Contact Me</h1>
        <form onSubmit={handleContactFormSubmit}>
          <input type="text" style={input} placeholder="Name" required />
          <input type="email" style={input} placeholder="Email" required />
          <input type="text" style={input} placeholder="Subject" required />
          <input type="textarea" style={input} placeholder="Message" required />
          <button type="submit" style={submit}>Submit</button>
        </form>
      </div>
    </Fragment>
  )
}

export default ContactForm;