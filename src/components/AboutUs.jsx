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
            image: 'https://media.licdn.com/dms/image/v2/D5603AQHjs4EbHJVNoQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723965089206?e=1747267200&v=beta&t=btdC_4WtIdgFaeR5rRp3kxCQd7i7c-yJZkGKhddSk_k',
            github: 'https://github.com/Jivan052',
            linkedin: 'https://www.linkedin.com/in/jivan-jamdar/'
        },
        {
            name: 'Arjun Mishra',
            role: 'General Manager',
            image: 'https://i.pinimg.com/736x/12/44/a8/1244a868b7f3d46894b2d690f1c0ddd4.jpg',
            github: 'https://github.com/arjunmishraaa',
            linkedin: 'https://www.linkedin.com/in/arjunmishraaa-/'
        },
        {
            name: 'Durgesh Shukla',
            role: 'Community Manager',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQF4sFztSzSyJQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725894738632?e=1747267200&v=beta&t=I6L_r4640d7LfqUXNhkV4HUtk7latYtQ2ccTgio7us4',
            github: 'https://github.com/durgeshshukla18',
            linkedin: 'https://linkedin.com/in/durgesh'
        },
        {
            name: 'Kathikeya Bendi',
            role: 'Core Team Member',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQGi28d_o7okyw/profile-displayphoto-shrink_400_400/B56ZR69tshGoAg-/0/1737229786606?e=1747267200&v=beta&t=GgJXcYR9xMTNaCoHzWuHJZSmqvBK9NeWfp-9tfSNaVQ',
            github: 'https://github.com/bendikarthikeya',
            linkedin: 'https://www.linkedin.com/in/karthikeyabendi/'
        },
        {
            name: 'Allan Joseph',
            role: 'Core Team Member',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQHvCSm5yY_aUQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1700297739139?e=1747267200&v=beta&t=JPl1xoY7mSeZjqdS3xz9WYWKIVIbtAx1m3sjvTNL_8Q',
            github: 'https://github.com/allanjoseph01',
            linkedin: 'https://www.linkedin.com/in/allan-santosh-joseph/'
        },
        {
            name: 'Najma Khatun',
            role: 'Core Team Member',
            image: 'https://media.licdn.com/dms/image/v2/D5603AQEyXCCvbjcJLQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725130094832?e=1747267200&v=beta&t=Xw16WvA1CZXJeZDWgKpfMxuqqjnyoDjHDWJrUJmuiyw',
            github: 'https://github.com/Najma099',
            linkedin: 'https://www.linkedin.com/in/najma-khatun/'
        },
        {
            name: 'Mithesh Agrawal',
            role: 'Core Team Member',
            image: 'https://media.licdn.com/dms/image/v2/D4D35AQHrPN1YVrlJeA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1738944901437?e=1742587200&v=beta&t=TyBu-B0glv9aBZ6ntGzpdbm9yJET3dPvMDj4sBIYQtk',
            github: 'https://github.com/orgs/OpenOct-Guild/people/Mitesh766',
            linkedin: 'https://www.linkedin.com/in/mitesh-agrawal76/'
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
                        At OpenOct, we're dedicated to fostering innovation and collaboration 
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
                            contact@openoct.com
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
