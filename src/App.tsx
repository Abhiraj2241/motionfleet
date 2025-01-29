import React, { useState } from 'react';
import { 
  Truck, 
  Target, 
  BarChart3, 
  Users, 
  MessageSquare, 
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import ChatBot from './components/ChatBot';
import AdPreview from './components/AdPreview';
import DriverRegistration from './components/DriverRegistration';
import CompanyListing from './components/CompanyListing';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showDriverRegistration, setShowDriverRegistration] = useState(false);
  const [showCompanyListing, setShowCompanyListing] = useState(false);
  const [showAdPreview, setShowAdPreview] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold text-white">MotionFleet</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-yellow-400">About</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-yellow-400">How It Works</a>
              <a href="#advertisers" className="text-gray-300 hover:text-yellow-400">Advertisers</a>
              <a href="#drivers" className="text-gray-300 hover:text-yellow-400">Drivers</a>
              <a href="#contact" className="text-gray-300 hover:text-yellow-400">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <video 
            className="w-full h-full object-cover opacity-50"
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-street-at-night-34573-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Transforming Mobility into <span className="text-yellow-400">Opportunity</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Revolutionary AI-powered outdoor advertising through dynamic LED panels on commercial vehicles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowCompanyListing(true)}
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Browse Drivers
            </button>
            <button 
              onClick={() => setShowAdPreview(true)}
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
            >
              Preview Ad Display
            </button>
            <button 
              onClick={() => setShowDriverRegistration(true)}
              className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Register as Driver
            </button>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showDriverRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Driver Registration</h2>
              <button 
                onClick={() => setShowDriverRegistration(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <DriverRegistration />
            </div>
          </div>
        </div>
      )}

      {/* Company Listing Modal */}
      {showCompanyListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Available Drivers</h2>
              <button 
                onClick={() => setShowCompanyListing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <CompanyListing />
            </div>
          </div>
        </div>
      )}

      {/* Ad Preview Modal */}
      {showAdPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Ad Display Preview</h2>
              <button 
                onClick={() => setShowAdPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <AdPreview />
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About MotionFleet</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing outdoor advertising by combining AI technology with mobile digital displays
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                alt="MotionFleet Team" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                Founded by Abhiraj Sharma and Akash Yadav, MotionFleet envisions a future where advertising 
                adapts to its environment in real-time, creating meaningful connections between brands and audiences.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Target className="h-6 w-6 text-yellow-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mission</h4>
                    <p className="text-gray-600">To revolutionize outdoor advertising through innovative technology and data-driven solutions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BarChart3 className="h-6 w-6 text-yellow-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Innovation</h4>
                    <p className="text-gray-600">Leveraging AI and real-time analytics to deliver targeted, impactful advertising campaigns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Register & Connect",
                description: "Sign up as an advertiser or driver and connect with our platform",
                icon: Users
              },
              {
                title: "Plan Your Campaign",
                description: "Set your budget, target audience, and campaign duration",
                icon: Target
              },
              {
                title: "Track Performance",
                description: "Monitor your campaign's performance with real-time analytics",
                icon: BarChart3
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <step.icon className="h-12 w-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-gray-900 rounded-lg focus:ring-2 focus:ring-yellow-400 border-none"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 bg-gray-900 rounded-lg focus:ring-2 focus:ring-yellow-400 border-none"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 rounded-lg focus:ring-2 focus:ring-yellow-400 border-none"
                  ></textarea>
                </div>
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-yellow-400 mr-3" />
                    <span>123 Innovation Drive, Tech City</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-yellow-400 mr-3" />
                    <span>contact@motionfleet.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-yellow-400 mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-yellow-400">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-yellow-400">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Bot Toggle */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-yellow-400 text-black p-4 rounded-full shadow-lg hover:bg-yellow-300 transition-colors z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat Bot */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  );
}

export default App;