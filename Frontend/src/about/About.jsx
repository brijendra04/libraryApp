import React from 'react';
import './About.css'; 

const About = () => {
    return (
        <div className="about-container">
            <h1>About Our E-Library</h1>
            <p>
                Welcome to our E-Library! This platform is designed to revolutionize the way users access and manage their reading materials. Whether you're a student, professional, or avid reader, our application offers a seamless experience to explore and manage a vast collection of books and resources.
            </p>

            <h2>Key Features</h2>
            <ul>
                <li><strong>User Authentication:</strong> Secure and personalized access for all users.</li>
                <li><strong>Search and Filter:</strong> Quickly find books and resources using advanced search and filter options.</li>
                <li><strong>Theme Customization:</strong> Personalize your reading environment with light and dark mode themes.</li>
            </ul>

            <h2>Our Mission</h2>
            <p>
                Our mission is to make knowledge accessible to everyone and empower individuals with tools to organize and manage their reading effectively. We believe in fostering a love for learning through technology.
            </p>

            <h2>Connect With Us</h2>
            <p>
                Explore the codebase or contribute to our project on <a href="https://github.com/brijendra04/libraryApp">GitHub</a>. We value community input and collaboration.
            </p>

            <footer className="about-footer"> 
                <p>&copy; {new Date().getFullYear()} E-Library | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default About;
