import React from 'react'
export const TeamSection = () => {
  const team = [
    {
      name: 'Emma Thompson',
      role: 'Master Stylist',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
      specialties: ['Color Specialist', 'Precision Cutting'],
    },
    {
      name: 'David Chen',
      role: 'Senior Stylist',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
      specialties: ["Men's Styling", 'Beard Grooming'],
    },
    {
      name: 'Sophie Martinez',
      role: 'Style Director',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3',
      specialties: ['Bridal Styling', 'Extensions'],
    },
  ]
  return (
    <section className="py-24 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="mt-4 text-gray-600">
            Expert stylists ready to transform your look
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
