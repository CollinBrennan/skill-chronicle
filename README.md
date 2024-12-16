## Assessment

When I first created the application, I had the opportunity to collaborate with a friend of mine who is a UI/UX designer, so we began by discussing the features the application should have and then designing wireframes for the user interface. The application was originally a small demo of an idea my friend had and wanted to present to those who might be interested. We communicated regularly about design decisions and the specific look and functionality of the user interface, but all implementation was ultimately up to me. 

The original wireframes for the app UI
![Original wireframes](https://github.com/user-attachments/assets/950033ba-4579-47c9-b2d3-7369634a18f6)

Rebuilding the application from the ground up has given me a chance to demonstrate the skills and knowledge I have gained since then. Since I could use any tools I wanted, I thought it would make sense to make use of popular and growing technologies. This has allowed me to make decisions that make sense for the success of the application and not just what would be easiest.  

Since the client interacts so heavily with a database, I knew from the start that I wanted to write the new application using the NextJS framework to utilize server-side rendering and server actions. This made the application a lot more secure since all database calls would only run on the server, never giving the client direct access. Since security was such a big factor, I also wanted to implement an industry-standard form of authentication, so I decided to use Google’s OAuth 2.0 API for logins which is widely used and has been proven to be very secure. 

I also wanted to demonstrate my knowledge of databases, so the application moved from Firestore, a NoSQL database, to PostgreSQL which offers a more rigid schema and well-defined rules. Working with a SQL database also gave me a chance to use a popular and lightweight ORM called Drizzle which made the process of constructing database calls very efficient. It was also important to show my knowledge of data structures and algorithms, and this is mostly found in the methods used to preprocess the data returned by the database before it gets shown to the user.

## Code Review

[https://www.youtube.com/watch?v=2-QOXNseFdg](https://www.youtube.com/watch?v=2-QOXNseFdg)

## Original Artifact

[Application](https://skill-chronicle.web.app)

[GitHub](https://github.com/CollinBrennan/skillchronicle)

## Enhanced Artifact
[Application](https://skill-chronicle-23pr.vercel.app)

[GitHub](https://github.com/CollinBrennan/skill-chronicle)


## Narratives 

This project is a web application that allows users to log the amount of time they spend learning new skills. The dashboard displays the user's recent logs, how close they are to completing their goal each week, and how much time they have spent learning skills over time. 

### Enhancement 1: Software Engineering and Design 

This application shows my knowledge of designing and implementing a full stack web application. I wanted to improve the original application by updating the tools and underlying framework used in development as well as make use of industry-standard practices like project structure and naming conventions. A big challenge when updating the original application was deciding what to keep. As I mentioned, the new application is built on an entirely new framework, so reusing old code was not often viable and most of the application had to be rewritten from the ground up. 

### Enhancement 2: Data Structures and Algorithms 

Algorithms are a fundamental part of computer science and software development, and I believe this application was a good opportunity to display my skills. The biggest use of algorithms are the data aggregation functions that process data from the database before it is finally displayed on the interface in the form of graphs and tables. The biggest challenge I ran into when designing these methods was how to make them efficient since they could potentially be performed countless database entries. The main function that aggregates the total time the user has logged per interval of time (such as per day over the current week or month) runs in O(n) time since it makes one pass over the array of logs returned by the database. 

### Enhancement 3: Databases 

This is the area where I had the biggest opportunity to shine since I had no real knowledge of databases when I created the original application. The old application used a NoSQL database called Firestore that, while it was easy for someone new to databases to use, was not very rigid or efficient and in my experience was prone to errors during development. I have since learned how to work with SQL databases and I knew from the beginning that I wanted to implement a remote PostgreSQL database hosted on a platform called Neon. The database uses one branch for production and one branch for local development so that they do not interfere with each other. The biggest challenge when developing the database was designing the schema which had to be updated several times with new tables and properties. 
