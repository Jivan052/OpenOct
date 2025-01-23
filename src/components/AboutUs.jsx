import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const TeamMemberCard = ({ name, role, image, github, linkedin }) => {
    return (
        <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img 
                src={image} 
                alt={name} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover transition-transform transform hover:scale-110" 
            />
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600 mb-3">{role}</p>
            <div className="flex justify-center space-x-4">
                {github && (
                    <a 
                        href={github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-600 hover:text-gray-900 text-xl"
                    >
                        <FaGithub />
                    </a>
                )}
                {linkedin && (
                    <a 
                        href={linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 text-xl"
                    >
                        <FaLinkedin />
                    </a>
                )}
            </div>
        </div>
    );
};

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'Jivan Jamdar',
            role: 'Club Co-ordinator',
            image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
            github: 'https://github.com/Jivan052',
            linkedin: 'https://www.linkedin.com/in/jivan-jamdar/'
        },
        {
            name: 'Durgesh Shukla',
            role: 'Community Manager',
            image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
            github: 'https://github.com/durgesh',
            linkedin: 'https://linkedin.com/in/durgesh'
        },
        {
            name: 'John Doe',
            role: 'Technical Lead',
            image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe'
        },

    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-12 text-primary-600">
                    About Us
                </h1>
                
                {/* Mission Section */}
                <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-primary-600">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At OpenUp, we're dedicated to fostering innovation and collaboration 
                        within our community. Our mission is to provide a platform where creators can 
                        showcase their projects, connect with like-minded individuals, and inspire the 
                        next generation of developers.
                    </p>
                </section>
                
                {/* Team Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-8 text-primary-600 text-center">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard
                                key={index}
                                {...member}
                            />
                        ))}
                    </div>
                </section>
                
                {/* Contact Section */}
                <section className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-primary-600">Get in Touch</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Have questions or want to collaborate? We'd love to hear from you!
                    </p>
                    <div className="flex flex-col space-y-2">
                        <a 
                            href="mailto:contact@projectshowcase.com" 
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            contact@openup.com
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;