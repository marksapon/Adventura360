import React from "react";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Mark Sapon",
      image: "/assets/mak.jpg",
      Links: "https://www.facebook.com/mark.sapon.33",
    },
    { id: 2, title: "Kevin Nuesca", image: "/assets/kevs.jpg" },
    { id: 3, title: "Joshua Sagpao", image: "/assets/me.jpg" },
    { id: 4, title: "Alex Buenviaje", image: "/assets/lex.jpg" },
  ];
  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-12 " id="blog">
      <div className="text-center md:1/2 mx-auto">
        <h2 className="text-4xl text-gray-700 font-semibold mb-4">
          Place holder lng to guys pati mga pic kayo na bahala kung ano gusto
          nyo ilagay
        </h2>
        <p className="text-sm text-gray-700 mb-8 md:w-3/4 mx-auto">
          Virtual campus tours have become increasingly popular in recent years,
          providing prospective students with a glimpse into the academic and
          social life of universities. In this thesis, ADVENTURA, a 360-degree
          virtual campus map designed to provide an immersive experience for
          prospective students, faculty, accreditors, and students at the Cavite
          State University, is presented.
        </p>
      </div>

      {/* All blogs */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 items-center justify-between">
        {blogs.map((blog) => (
          <div key={blog.id} className="mx-auto relative mb-12 cursor-pointer ">
            <img src={blog.image} alt="" />
            <div className="text-center px-4 py-8 bg-white shadow-lg rounded-md md:w-3/4 mx-auto absolute left-0 right-0 -bottom-12">
              <h3>{blog.title}</h3>
              <a href={blog.Links}>
                <button>Login</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
