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
    <div className="mx-auto my-12 max-w-screen-2xl px-4 lg:px-14 " id="blog">
      <div className="md:1/2 mx-auto text-center">
        <h2 className="mb-4 text-4xl font-semibold text-gray-700">
          Place holder lng to guys pati mga pic kayo na bahala kung ano gusto
          nyo ilagay
        </h2>
        <p className="mx-auto mb-8 text-sm text-gray-700 md:w-3/4">
          Virtual campus tours have become increasingly popular in recent years,
          providing prospective students with a glimpse into the academic and
          social life of universities. In this thesis, ADVENTURA, a 360-degree
          virtual campus map designed to provide an immersive experience for
          prospective students, faculty, accreditors, and students at the Cavite
          State University, is presented.
        </p>
      </div>

      {/* All blogs */}
      <div className="grid items-center justify-between gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative mx-auto mb-12 cursor-pointer ">
            <img src={blog.image} alt="" />
            <div className="absolute -bottom-12 left-0 right-0 mx-auto rounded-md bg-white px-4 py-8 text-center shadow-lg md:w-3/4">
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
