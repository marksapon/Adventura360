import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const Bugmodal = ({ visible, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [showThankYouModal, setShowThankYouModal] = useState(true);

  const handleCloseAndReset = () => {
    onClose();
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    // Validate the form
    if (!selectedItem || !email || !message) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Prepare the data
    const data = {
      embeds: [
        {
          title: "New Feedback Received",
          color: 3447003,
          fields: [
            {
              name: "Email",
              value: email,
              inline: false,
            },
            {
              name: "Category",
              value: selectedItem,
              inline: false,
            },
            {
              name: "Message",
              value: message,
              inline: false,
            },
          ],
          footer: {
            text: "Adventura Feedback",
          },
          thumbnail: {
            url: "https://scontent.fmnl17-4.fna.fbcdn.net/v/t1.15752-9/439255024_961391562298668_1004643935197430412_n.png?stp=dst-png_p1080x2048&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=McAOgH_N4N0Ab4ms1xl&_nc_oc=AdgmbmPjlzKXsjKzq2RO4oKCQQASs4K88eHwYa_D1ImzQfuanpoAGZRonDGCMTK_bFs&_nc_ht=scontent.fmnl17-4.fna&oh=03_Q7cD1QHCOj9Uu5bD9iFigL9fAgkud1vYbp-a8EBcWWFHlIY9zw&oe=664DD562", // Replace with your bot's avatar URL
          },
        },
      ],
      username: "Adventura Feedback",
      avatar_url:
        "https://scontent.fmnl17-4.fna.fbcdn.net/v/t1.15752-9/439255024_961391562298668_1004643935197430412_n.png?stp=dst-png_p1080x2048&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=McAOgH_N4N0Ab4ms1xl&_nc_oc=AdgmbmPjlzKXsjKzq2RO4oKCQQASs4K88eHwYa_D1ImzQfuanpoAGZRonDGCMTK_bFs&_nc_ht=scontent.fmnl17-4.fna&oh=03_Q7cD1QHCOj9Uu5bD9iFigL9fAgkud1vYbp-a8EBcWWFHlIY9zw&oe=664DD562", // Replace with your bot's avatar URL
    };

    console.log("Sending request", data); // Checker

    // Send the data to the server
    fetch(
      "https://discord.com/api/webhooks/1231840482485866559/oiG4krs25gabtTUWd33p5PLZlN0yRbdzqekHzBq5-2ukxyMAF5oV7LlNmne16C9b3nMl",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          setShowThankYouModal(true); // Show the "Thank You" modal
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetState = () => {
    setSelectedItem(null);
    setEmail("");
    setMessage("");
    setIsOpen(false);
    setShowThankYouModal(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 px-2">
        <div className="flex h-auto w-full items-center justify-center">
          {/* Modal Content */}
          {!showThankYouModal && (
            <div className="flex h-[520px] w-[300px] flex-col justify-center rounded-2xl border border-black bg-white px-4">
              <div className="flex h-full flex-col items-end py-2">
                <button
                  className="flex items-center justify-center"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <IoIosClose className="h-10 w-10" />
                </button>
                <div className="gap-2">
                  <h1 className="flex text-3xl font-bold text-green-600">
                    Feedback
                  </h1>
                  <p className="text-full text-1xl mt-3 flex font-sans">
                    Your feedback is crucial to us. Please share any thoughts or
                    concerns to help us improve. Thank you for being part of our
                    journey!
                  </p>
                </div>
              </div>
              <div className="flex h-full w-full flex-col justify-between">
                <div className="mb-2 h-full w-full">
                  <div
                    className="dropdown-header h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-green-600 p-2"
                    onClick={toggleDropdown}
                  >
                    {selectedItem ? selectedItem : "Category"}
                    {isOpen && (
                      <ul className="relative z-auto mt-6 w-full max-w-[508px] flex-row rounded-lg border border-green-600 bg-white shadow-lg">
                        <li
                          className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                          onClick={() => selectItem("Bug")}
                        >
                          Bug Report
                        </li>
                        <li
                          className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                          onClick={() => selectItem("Suggestions")}
                        >
                          Suggestions
                        </li>
                        <li
                          className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                          onClick={() => selectItem("Content Request")}
                        >
                          Content Request
                        </li>
                        <li
                          className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                          onClick={() => selectItem("Feature Request")}
                        >
                          Feature Request
                        </li>
                        <li
                          className="cursor-pointer border-b p-2 text-center hover:bg-gray-100"
                          onClick={() => selectItem("Others")}
                        >
                          Others
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="flex w-full">
                    <input
                      type="email"
                      className="mt-2 h-12 w-full rounded-lg border border-green-600 p-2"
                      placeholder="Enter your email here..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="flex w-full">
                    <textarea
                      id="message"
                      className="mt-2 h-36 w-full resize-none rounded-lg border border-green-600 bg-white p-2 text-sm text-gray-900"
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex w-auto items-center justify-center">
                  <button
                    className=" mb-4 h-auto w-auto rounded-full border border-gray-400 bg-white px-4 text-3xl text-green-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {showThankYouModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
            <div className="relative flex h-auto w-1/2 flex-col rounded-lg border border-green-600 bg-white p-2 shadow-lg">
              <button
                className="absolute right-0 top-0 h-12 w-12"
                onClick={() => setShowThankYouModal(false)}
              >
                <IoIosClose className="h-full w-full" />
              </button>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-green-600">
                  Thank You!
                </h1>

                <div className="mb-4 mt-4 flex items-center justify-center">
                  <p className="text-center text-lg text-gray-700">
                    Your feedback has been submitted successfully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Bugmodal;
