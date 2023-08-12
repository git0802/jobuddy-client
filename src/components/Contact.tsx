"use client";

import React, { ChangeEvent, ReactHTMLElement, useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  function handleText  (event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  const submitForm = () => {
    console.log('Form Submit');
  }
  return (

    <div className="max-w-6xl my-36 mx-auto bg-infraYellow px-4 py-12 md:p-16 rounded-none md:rounded-lg" id="contact">

      <h3 className="text-5xl font-bold">Wanna Talk?</h3>
      <form className="max-w-3xl mx-auto mt-8 text-center" onSubmit={submitForm}>
        <div className="flex flex-col md:flex-row text-left md:justify-between gap-4">
          <div className="flex flex-col md:flex-row">
            <label className="mr-2 font-semibold min-w-fit my-auto pt-2">Name</label>
            <input
              type="name"
              value={name}
              placeholder="John Doe"
              name="name"
              className="border p-2 rounded-md mt-2"
              onChange={handleName}
              ></input>
          </div>
          <div className="flex flex-col md:flex-row">
            <label className="mr-2 font-semibold min-w-fit my-auto pt-2">Email</label>
            <input
              type="email"
              value={email}
              placeholder="johndoe@email.com"
              className="border p-2 rounded-md mt-2"
              onChange={handleEmail}
              ></input>
          </div>
        </div>
        <div className="flex flex-col mt-4 text-left">
          <label className=" font-semibold">Any thing you wanna add?</label>
          <textarea
            value={text}
            placeholder=""
            rows={3}
            className="mt-2 p-2 border-2 rounded-md"
            onChange={handleText}
          ></textarea>
        </div>
        <button
          type="submit"
          className="py-4 px-12 text-lg mt-8 bg-black rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
