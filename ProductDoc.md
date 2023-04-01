# **E-Partogram**

`What United Nations' Sustainable Development goal(s) AND target(s) did you choose for your solution? What inspired you to select these specific goal(s) AND target(s)?`

* The ePartogram project aligns with SDG 3, which aims to improve global health and wellbeing by reducing mortality rates, increasing access to healthcare, and promoting healthy lifestyles. In India and Africa, this is particularly important as both regions face significant maternal and child health challenges.

* India has one of the highest maternal mortality rates in the world, with an estimated 44,000 maternal deaths occurring each year. Many of these deaths are preventable, but due to limited access to healthcare and inadequate quality of care, women in India are at a higher risk of dying during childbirth. Similarly, Africa has some of the highest maternal and child mortality rates in the world, with an estimated 830 women dying each day due to preventable causes related to pregnancy and childbirth.

* The ePartogram project aims to address these challenges by providing a digital platform for recording and monitoring maternal and foetal health during labour. By leveraging technology, the project can provide real-time decision support, improve data entry, and strengthen referral chains, which can greatly reduce maternal and child mortality rates.

* In India and Africa, the ePartogram project can have a significant impact by providing healthcare workers with an easy-to-use tool for monitoring labour progress and identifying potential complications. By utilising the digital platform, healthcare workers can access valuable insights and receive alerts when the plotted graph crosses alert or action lines, indicating the need for intervention. This can help ensure timely interventions and referrals, which can greatly reduce maternal and child mortality rates in both regions.

# Features

* The challenge that the ePartogram project is solving for is the suboptimal utilisation of partograms in healthcare facilities, which can lead to maternal and child mortality. Partograms are essential tools for healthcare workers to assess the progress of labour and take appropriate actions to avert complications. However, in many healthcare facilities, partograms are not used correctly or are underutilised due to various reasons. This can result in delayed intervention, mismanagement of labour, and ultimately, maternal and child mortality.

* The ePartogram project aims to address this challenge by developing a digital platform for recording and monitoring partograms. The platform is designed to provide real-time decision support, improve data entry, and strengthen the referral chain. It is intended for use by healthcare workers at all levels, including doctors, nurses, and hospital administrators.

* The ePartogram platform is designed to be user-friendly and accessible, with separate login portals for doctors, nurses, and hospital administrators. Nurses can add patients to the system and record maternal and foetal indicators, such as vital signs, uterine contractions, and foetal heart rate. The platform's alert and action lines can help to identify potential risks during labour, such as abnormal blood pressure or heart rate, and provide suggestions for appropriate actions.

* The platform's real-time monitoring and alert system can help healthcare workers to identify potential risks and take timely action to prevent complications during labour. In the event of complications, doctors can refer patients to higher hospitals, and the platform can choose the best option based on proximity and available beds. This can help to optimise resource allocation and ensure that patients receive the care they need in a timely manner.

* The ePartogram platform also includes various Google technologies, such as `Firebase`, `PWA`, `TWA`, `Google Maps API`,`Google Translatation API` and `Google Cloud Platform`. These technologies can help to streamline app development and improve app performance, scalability, and security.

# Implementation

`Describe the architecture that your team chose for your solution. What are the high-level components of your architecture? What is the responsibility of each component?

![](https://imgur.com/X3wau2Z.png)

`Technical components - Backend, Frontend, Technologies, Programming languages and Tools used`

![tech-stack](https://imgur.com/MXtiN2l.png)
The ePartogram solution consists of two primary components: the frontend and the backend.

* **[Web-Client](https://github.com/indreshp135/e-partogram-client)**: The frontend of the solution is developed using React, a popular JavaScript library for building user interfaces. The frontend is responsible for handling the user interface and user interactions, including logging in, viewing patient information, entering patient data, and sending notifications to users. The frontend also uses `Google Translate` to provide support for multiple languages, and the `Google Maps Platform` to help healthcare professionals locate nearby hospitals. Hosted using `Firebase Hosting`

* **[Android-App](https://github.com/Muhesh7/epartogram-TWA)**: The Android App of the solution is developed using `Trusted Web Activity`, it is a feature in `Google Chrome` that allows a website to be opened in fullscreen mode within an Android app, providing a native app-like experience to users. The Application is OfflineFirst and incorporates Native android Push Notification using `Firebase Cloud Messaging(FCM)` Service to provide an optimal user experience to the end-user.

* **[Backend](https://github.com/CaptainIRS/epartogram-server)**: The backend of the solution is developed using `Node.js`, and it communicates with Firebase services through the `Firebase Admin SDK`. Firebase provides several services that are used to power the backend, including `Firebase Authentication` for user authentication, `Firebase Cloud Firestore` for storing patient data, and `Firebase Cloud Messaging` for sending push notifications. The backend is responsible for handling requests from the frontend, communicating with Firebase services, and performing business logic to support the functionality of the application. Hosted in `Google Cloud Platform`

* **[Scheduler](https://github.com/Muhesh7/epartogram-scheduler)**: The Scheduler Application written in `Golang` which runs a periodic cronJob to dial a `gRPC` call to epartogram-server in a `goroutine`. Scans through patient readings in the database every 30 minutes and notifies the alloted nurse if she missed out any patient readings in last 30 minutes in real-time. Hosted in `Google Cloud Platform`

* Overall, the architecture is designed to provide a scalable and flexible solution that can be accessed from any device and provides real-time decision support to healthcare professionals. The use of React for the frontend ensures that the user interface is responsive and provides a seamless experience for users. The use of `Firebase services` provides a secure and reliable backend infrastructure that can be easily scaled to accommodate growing user bases. Additionally, the use of `Node.js` provides a flexible and extensible backend that can be easily modified to meet changing requirements. The integration of `Google Translate` and the `Google Maps Platform` enhances the user experience and provides additional functionality to healthcare professionals.


`Which specific products and platforms did you choose to implement these components and why?`

* For our ePartogram solution, we have chosen several products and platforms that are well-suited to our requirements. These include `Firebase`, `Google Cloud Platform`, `Google Translate`, `Android`, `Kotlin`, `TWA`, `React`, and `Google Maps Platform`.

* Firebase was chosen as our primary backend technology due to its ease of use and scalability. Firebase provides a real-time database, hosting, and authentication services, which made it easy for our team to build and deploy the backend for our ePartogram solution. Firebase also provides features like Cloud Firestore, which we use to store and retrieve patient data in real-time. Firebase Cloud Messaging is another service that we use to send push notifications to healthcare providers whenever there is a change in the patient's status.

* For the frontend, we have used React. React is a widely popular JavaScript library for building user interfaces. It is fast, flexible, and easy to use. The ability to create reusable components made it a natural choice for our ePartogram solution. The React library also provides several useful tools for debugging and testing, which makes it easy for our team to identify and fix issues.

* To facilitate communication between the frontend and backend, we use a REST API built using Node.js. Node.js is a popular JavaScript runtime that is known for its scalability and high-performance. We chose Node.js for its ease of use and the large community of developers who are already familiar with the technology.

* We have also leveraged Google Translate to provide support for multiple languages. This is important because our solution is designed to be used by healthcare providers in different regions of the world. By providing support for multiple languages, we can ensure that our solution is accessible to a wider audience.

* Finally, we have also used Google Maps Platform to facilitate the referral process. The platform provides location-based services that help healthcare providers identify the nearest hospital that can provide specialised care for patients who require referral. By using Google Maps Platform, we can ensure that healthcare providers have access to the information they need to make informed decisions about patient care.

## Feedback / Testing / Iteration

`What did you learn and how did it help improve your solution? What are three specific things you implemented and improved for your solution based on the feedback from users?`

* Testing our solution with real users was a critical step in ensuring that our platform meets the needs of its intended users. To do this, we conducted a 2-hour Zoom call with a practicing nurse in Africa to gather feedback and understand their requirements. This helped us identify the need for the ability to input measurements and view a WHO-style partogram chart that is compatible with existing physical records and suitable for archival.

* We received valuable feedback from the nurse on several aspects of our solution. Here are three specific points:

* User Interface: The nurse suggested that the user interface could be more intuitive and easy to use. This feedback helped us improve the user interface by simplifying the design and adding more intuitive controls.

* Charting and Recording: The nurse emphasised the importance of accurately charting and recording measurements for patient care. Based on this feedback, we implemented a feature that allows users to easily input and record measurements, ensuring that data is accurately captured.

* Language Translation: The nurse also noted the importance of language translation to serve a wider audience. To address this, we integrated Google Translate into the platform to enable real-time language translation for users.


`Highlight one challenge you faced while building your code, including detail on how you addressed the issue and the technical decisions and implementations you had to make.`

* One of the challenges we faced during the development of our solution was displaying the partogram in a WHO compliant format. A partogram is a chart used to monitor the progress of labor and identify any potential issues that may arise. It is an important tool for healthcare professionals, particularly in low-resource settings where monitoring equipment may be limited. However, there were no existing packages that provided a partogram in a format that met the WHO standards.

* To address this issue, our team decided to create a custom partogram using canvas and an API wrapper to integrate it easily in our project. We chose canvas because it is a powerful tool for drawing graphics and can be easily manipulated to create custom charts. Additionally, it can be integrated easily into React components.

* The first step in creating the partogram was to understand the requirements set by the WHO. This involved researching the guidelines and understanding the various data points that needed to be displayed on the chart. We then created a wireframe of the chart, identifying the various sections and data points that needed to be included.

* Next, we began coding the chart using canvas. This involved creating various shapes, lines, and text elements that would make up the chart. We also implemented various calculations and algorithms to ensure that the data was displayed accurately and in real-time. One of the challenges we faced during this process was ensuring that the chart was responsive and displayed properly on different screen sizes.

* To integrate the partogram into our project, we created an API wrapper that allowed us to easily pass data to the chart and display it in real-time. This involved creating various functions and components that interacted with the canvas element and displayed the relevant data. We also had to ensure that the chart was accessible and could be used by users with disabilities.

* After completing the partogram, we conducted extensive testing to ensure that it met the WHO standards and was easy to use for healthcare professionals. We also obtained feedback from real users, including a practising nurse in Africa, to identify any potential issues and improve the chart.

# Success and Completion of Solution

`Please describe your project's impact using cause and effect. How does your solution address the problem you are looking to solve? How were some of the goals of your solution evidenced? What was the quantifiable data collected? What tools did you use to help understand your solution's impact?`

* Our solution aims to address the challenge of maternal and foetal mortality rates in low-income countries by providing a digital platform that can improve the quality and availability of care. The platform enables healthcare workers to efficiently monitor maternal and foetal indicators and identify potential risks, leading to earlier interventions and better outcomes for patients. By providing access to real-time data and automated risk assessments, our solution can help to reduce the occurrence of preventable complications during labour and delivery.

* While our project is not yet in production, we have tested it with real users, including practising nurses in Africa, to gather feedback and refine the user experience. The feedback we received has been positive, with users noting that the platform is easy to use and can help them to better track and manage patient data. While we have not yet collected quantifiable data on the impact of our solution, we believe that it has the potential to improve maternal and foetal outcomes in low-income countries and contribute to the achievement of SDG 3.

# Scalability / Next Steps

`What do you see as the future / next steps for your project? How would you expand your solution to reach a larger audience?`

* The next steps for our project involve further development and implementation of new features to improve the user experience and increase the reach of our solution to a larger audience. Here are some of the steps we plan to take:

* Integration with existing healthcare systems: To improve the adoption of our solution, we plan to integrate with existing healthcare systems such as electronic health records (EHR) and hospital information systems (HIS). This will help healthcare workers to seamlessly integrate our solution into their workflows and improve the overall efficiency of their work.
* Improve the scalability and performance of the backend: As more users start to use the application, there is a need to improve the scalability and performance of the backend to handle increased traffic. We plan to use cloud technologies such as Google Kubernetes Engine to improve the scalability and reliability of our solution.
* Improve data analytics: We plan to integrate analytics tools to better understand how healthcare workers use the application and identify areas for improvement. This will help us to make data-driven decisions and improve the overall user experience.
* Partnership with healthcare organisations: To increase the reach of our solution, we plan to partner with healthcare organisations, government agencies, and NGOs to promote the use of our solution and provide training to healthcare workers.
* Conduct user testing and feedback: To continuously improve our solution, we plan to conduct user testing and gather feedback from healthcare workers. This will help us to identify areas for improvement and ensure that our solution meets the needs of its users.


`Explain how the technical architecture of your solution could support (in its current state or with minor changes) scaling to a larger audience.`

* The technical architecture of our solution is designed to be scalable and flexible to accommodate a larger audience. The current architecture is based on a client-server model where the client is a React-based web application and the server is a Node.js backend hosted on Firebase. Firebase provides the ability to scale our backend easily as our user base grows.

* In addition to Firebase, we also use the Google Maps Platform and Google Translate API. These platforms offer scalable services that can handle large amounts of traffic and support multiple languages. Google Maps Platform offers a reliable and scalable geolocation service that can easily be scaled as our user base grows. Google Translate API supports multiple languages and can handle large amounts of text, making it an ideal choice for our solution.

* We also use React, a popular frontend library, which is known for its scalability and ability to handle large, complex applications. React allows for efficient rendering of components, which can help improve performance as our application scales.

* To ensure the scalability of our solution, we have implemented best practices such as using caching to reduce the load on the server and optimising database queries to improve performance. We have also designed our backend to be modular, making it easy to add or remove components as needed.


## The Above Contents can also be found in [Google-Docs](https://docs.google.com/document/d/1AVUR81gr6qmMwQLtdoe3PUBVXrnrzQbr8ziY75lVjDw/edit?usp=sharing).

