
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-crime-blue-800 mb-4">About India Crime Tracker</h1>
          <p className="text-xl text-gray-600 mb-12">Understanding crime trends for a safer future</p>
          
          <div className="space-y-10">
            {/* Mission section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
                <CardDescription>Making crime data accessible and understandable</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  India Crime Tracker is dedicated to providing transparent, accessible, and user-friendly crime statistics 
                  across major Indian cities. Our mission is to empower citizens, researchers, and policymakers with 
                  data-driven insights about safety trends nationwide.
                </p>
                <p>
                  By visualizing complex crime data in intuitive charts and graphs, we aim to promote better understanding 
                  of crime patterns, facilitate informed decision-making, and contribute to safer communities throughout India.
                </p>
              </CardContent>
            </Card>
            
            {/* Data sources section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Data Sources</CardTitle>
                <CardDescription>Reliable information for accurate insights</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Our statistics are compiled from multiple authoritative sources to ensure accuracy and reliability:
                </p>
                <ul>
                  <li>National Crime Records Bureau (NCRB) annual reports</li>
                  <li>State Police Department crime statistics</li>
                  <li>Ministry of Home Affairs data</li>
                  <li>Independent research organizations</li>
                  <li>Verified media reports</li>
                </ul>
                <p>
                  We regularly update our database to reflect the most recent available information, typically with 
                  quarterly refreshes for major statistics and annual comprehensive updates.
                </p>
              </CardContent>
            </Card>
            
            {/* Team section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Team</CardTitle>
                <CardDescription>Experts committed to data integrity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <TeamMember 
                    name="Dr. Anjali Sharma" 
                    role="Criminology Expert" 
                    image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  />
                  <TeamMember 
                    name="Rajiv Patel" 
                    role="Data Scientist" 
                    image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  />
                  <TeamMember 
                    name="Priya Gupta" 
                    role="Security Analyst" 
                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Contact section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Us</CardTitle>
                <CardDescription>Get in touch with our team</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  We welcome feedback, questions, and collaboration opportunities. Reach out to us at:
                </p>
                <ul>
                  <li>Email: <a href="mailto:contact@indiacrimetracker.org" className="text-crime-blue-600">contact@indiacrimetracker.org</a></li>
                  <li>Phone: +91 98765 43210</li>
                  <li>Address: 45 Data Drive, New Delhi, 110001</li>
                </ul>
                <p>
                  For media inquiries, please contact our press team at <a href="mailto:media@indiacrimetracker.org" className="text-crime-blue-600">media@indiacrimetracker.org</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMember = ({ name, role, image }: { name: string; role: string; image: string }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  );
};

export default AboutPage;
