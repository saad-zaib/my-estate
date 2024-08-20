import React from "react";
// import GoogleAPI from "./GoogleAPI";
import { useState } from "react";
const About = () => {
    const [lessonIndex, setLessonIndex] = useState(0);

    const clients = [{
        first_name: "Mary",
        last_name: "Baker",
        email: "mary@mary.com",
        level: "intermediate",
        arrival_date: "05/03/2021",
        departure_date: "05/06/2021",
        lesson_count: 3,
        lessons: [{date: "05/03/2021", time: "08:00 AM", location: "Tamarindo"}, {date: "05/04/2021", time: "07:00 AM", location: "Casitas"}, {date: "05/05/2021", time: "06:00 AM", location: "Avellanas"}],
        instructor: [{name: "Jluis", phone: "+1 (555) 555-5555"}],
        notes: "Mary is beginner intermediate. She needs help catching waves on her own."
    }]

    const handleOnClick = (e, index) => {
        setLessonIndex(index)
    }

    const lessons = clients.map((client) => {
        return client.lessons.map((lesson, index) => {
                return(
                <button onClick={(e) => {
                    return handleOnClick(e, index)
                }} class="inline-flex items-center justify-center px-1 py-1 border border-transparent text-base font-medium rounded-md text-white bg-turquoise-light hover:bg-turquoise m-1">
                    {lesson.date}
                </button>
                )
        })
    })
  return (
    <div>
      {/* <div>
        <div class="relative bg-white overflow-hidden">
          <div class="max-w-7xl mx-auto">
            <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl py-1">
                  <span class="block">Your Surf Itinerary</span>
                </h2>
                <p class="mb-4 mx-1">
                  Select a date below to see your itinerary for that day.
                </p>
                <nav
                  class="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div class="inline-flex flex-wrap">{lessons}</div>
                </nav>
              </div>

              <main class="mt-4 mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6 md:mt-4 lg:mt-4 lg:px-8 xl:mt-4">
                <div class="sm:text-center lg:text-left">
                  <p class="mt-3 text-base text-gray-darkest sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    <p>
                      <span class="font-bold">Date: </span>
                      {clients[0].lessons[lessonIndex].date}
                    </p>
                    <p>
                      <span class="font-bold">Time: </span>
                      {clients[0].lessons[lessonIndex].time}
                    </p>
                    <p>
                      <span class="font-bold">Location: </span>{" "}
                      {clients[0].lessons[lessonIndex].location}
                    </p>
                    <p>
                      <span class="font-bold">Instructor:</span>{" "}
                      {clients[0].instructor[lessonIndex].name}
                    </p>
                    <p>
                      <span class="font-bold">WhatsApp: </span>
                      {clients[0].instructor[lessonIndex].phone}
                    </p>
                  </p>
                </div>
              </main>
            </div>
          </div>
          <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <GoogleAPI class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"></GoogleAPI>
          </div>
        </div>
      </div> */}
      <section className="py-12">
        <div className="container max-w-7xl px-6 mx-auto space-y-12 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-center sm:text-5xl">
             Who We Are? 
            </h2>
            <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
              Explore the latest features that enhance your learning experience
              and make it even more exciting.
            </p>
          </div>
          <div className="flex flex-row sm:flex-col">
            <div aria-hidden="true" className="mt-10 w-full lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                className="max-w-xs mx-auto rounded-lg shadow-lg lg:max-w-md"
                alt="Feature Illustration"
              />
            </div>
            <div aria-hidden="true" className="mt-10 w-full lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                className="max-w-xs mx-auto rounded-lg shadow-lg lg:max-w-md"
                alt="Feature Illustration"
              />
            </div>
            <div aria-hidden="true" className="mt-10 w-full lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxNHx8Y29tcHV0ZXJ8ZW58MHwwfHx8MTY5OTE3MDk1N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                className="max-w-xs mx-auto rounded-lg shadow-lg lg:max-w-md"
                alt="Feature Illustration"
              />
            </div>
          </div>
          <div className="grid lg:gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mt-8 space-y-12">
                {[
                  {
                    title: "Advanced Learning Algorithms",
                    description:
                      "Discover our improved learning algorithms that adapt to your preferences and provide even more personalized learning suggestions.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-rocket"
                      >
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                      </svg>
                    ),
                  },
                  {
                    title: "Interactive Learning Resources",
                    description:
                      "Access an extensive library of interactive resources that make your learning journey engaging and interactive.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-bookmark-plus"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                        <line x1="12" x2="12" y1="7" y2="13"></line>
                        <line x1="15" x2="9" y1="10" y2="10"></line>
                      </svg>
                    ),
                  },
                  {
                    title: "Enhanced Video Streaming",
                    description:
                      "Experience seamless video integration with enhanced streaming capabilities, providing a better and more uninterrupted learning experience.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-video"
                      >
                        <path d="m22 8-6 4 6 4V8Z"></path>
                        <rect
                          width="14"
                          height="12"
                          x="2"
                          y="6"
                          rx="2"
                          ry="2"
                        ></rect>
                      </svg>
                    ),
                  },
                  {
                    title: "Advanced Quiz Generation",
                    description:
                      "Take your knowledge testing to the next level with advanced quiz generation, providing more customization options for your quizzes.",
                    icon: (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-file-question"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                    ),
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-100">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leading-tight">
                        {feature.title}
                      </h4>
                      <p className="mt-2 text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
