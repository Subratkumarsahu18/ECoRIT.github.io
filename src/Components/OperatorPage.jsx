import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const operators = [
  {
    name: 'Airtel',
    color: 'bg-red-500',
    url: 'https://www.airtel.in',
    plans: [
      { title: 'Plan A', description: 'Description of Airtel Plan A', price: '₹10/month' },
      { title: 'Plan B', description: 'Description of Airtel Plan B', price: '₹20/month' },
      { title: 'Plan C', description: 'Description of Airtel Plan C', price: '₹30/month' },
    ],
  },
  {
    name: 'JIO',
    color: 'bg-[#0e3dc9]',
    url: 'https://www.jio.com',
    plans: [
      { title: 'Plan A', description: 'Description of JIO Plan A', price: '₹15/month' },
      { title: 'Plan B', description: 'Description of JIO Plan B', price: '₹25/month' },
      { title: 'Plan C', description: 'Description of JIO Plan C', price: '₹35/month' },
    ],
  },
  {
    name: 'Vodafone',
    color: 'bg-[#e60000]',
    url: 'https://www.vodafone.com',
    plans: [
      { title: 'Plan A', description: 'Description of Vodafone Plan A', price: '₹12/month' },
      { title: 'Plan B', description: 'Description of Vodafone Plan B', price: '₹22/month' },
      { title: 'Plan C', description: 'Description of Vodafone Plan C', price: '₹32/month' },
    ],
  },
];

const OperatorPage = () => {
  const handleChoosePlan = (operatorName, planTitle) => {
    alert(`You have selected ${planTitle} from ${operatorName}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {operators.map((operator) => (
          <div key={operator.name} className="w-full max-w-4xl mb-8">
            <div className={`flex items-center ${operator.color} text-white p-2 rounded-lg`}>
              <a href={operator.url} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold">
                {operator.name}
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {operator.plans.map((plan, index) => (
                <div key={index} className="bg-gray-100 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                  <p className="text-gray-700 mb-4">{plan.description}</p>
                  <span className="block text-lg font-bold mb-4">{plan.price}</span>
                  <button
                    onClick={() => handleChoosePlan(operator.name, plan.title)}
                    className={`${operator.color} text-white py-2 px-4 rounded-lg hover:opacity-75`}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default OperatorPage;
