import React from 'react';
import './About.css'; 
import { FaBook, FaSearch, FaPalette, FaGithub } from 'react-icons/fa';

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">📚 About Our E-Library</h1>
            <p className="about-description">
                Welcome to <span className="highlight">E-Library</span>, your digital gateway to a vast world of knowledge. Whether you're a student, a professional, or an avid reader, our platform is crafted to provide a seamless reading experience.
            </p>
            
            <h2 className="section-title">✨ Key Features</h2>
            <ul className="features-list">
                <li><FaBook className="icon" /> <strong>User Authentication:</strong> Secure and personalized access for all users.</li>
                <li><FaSearch className="icon" /> <strong>Search & Filter:</strong> Easily find books with advanced filters.</li>
                <li><FaPalette className="icon" /> <strong>Theme Customization:</strong> Light & dark modes for a better reading experience.</li>
            </ul>
            
            <h2 className="section-title">🎯 Our Mission</h2>
            <p className="about-description">
                Our mission is to make knowledge accessible to everyone and empower individuals with smart tools to organize and manage their reading effectively. We believe in fostering a love for learning through innovation.
            </p>
            
            <h2 className="section-title">🌍 Connect With Us</h2>
            <p className="about-description">
                Join our open-source journey! Explore the codebase or contribute to our project on <a href="https://github.com/brijendra04/libraryApp" className="github-link"><FaGithub /> GitHub</a>. We value community input and collaboration.
            </p>

            <footer className="about-footer"> 
                <p>&copy; {new Date().getFullYear()} <span className="highlight">E-Library</span> | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default About;