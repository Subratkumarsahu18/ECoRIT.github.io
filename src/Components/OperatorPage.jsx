import React from 'react';

const operators = [
  {
    name: 'Airtel',
    color: 'bg-red-500',
    logo: 'path_to_airtel_logo.png', // Add the correct path to the Airtel logo
    url: 'https://www.airtel.in',
    plans: [
      { title: 'Airtel Plan A', description: 'Description of Airtel Plan A', price: '$10/month' },
      { title: 'Airtel Plan B', description: 'Description of Airtel Plan B', price: '$20/month' },
      { title: 'Airtel Plan C', description: 'Description of Airtel Plan C', price: '$30/month' },
    ],
  },
  {
    name: 'JIO',
    color: 'bg-blue-500',
    logo: 'path_to_jio_logo.png', // Add the correct path to the JIO logo
    url: 'https://www.jio.com',
    plans: [
      { title: 'JIO Plan A', description: 'Description of JIO Plan A', price: '$15/month' },
      { title: 'JIO Plan B', description: 'Description of JIO Plan B', price: '$25/month' },
      { title: 'JIO Plan C', description: 'Description of JIO Plan C', price: '$35/month' },
    ],
  },
  {
    name: 'Vodafone',
    color: 'bg-green-500',
    logo: 'path_to_vodafone_logo.png', // Add the correct path to the Vodafone logo
    url: 'https://www.vodafone.com',
    plans: [
      { title: 'Vodafone Plan A', description: 'Description of Vodafone Plan A', price: '$12/month' },
      { title: 'Vodafone Plan B', description: 'Description of Vodafone Plan B', price: '$22/month' },
      { title: 'Vodafone Plan C', description: 'Description of Vodafone Plan C', price: '$32/month' },
    ],
  },
];

const OperatorPage = () => {
  const handleChoosePlan = (operatorName, planTitle) => {
    alert(`You have selected ${planTitle} from ${operatorName}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-pink-700 py-4 flex justify-center items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Operator Plans and Offers</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {operators.map((operator) => (
          <div key={operator.name} className="w-full max-w-4xl mb-8">
            <div className={`flex items-center ${operator.color} text-white p-2 rounded-lg`}>
              <a href={operator.url} target="_blank" rel="noopener noreferrer">
                <img src={operator.logo} alt={`${operator.name} logo`} className="h-10 w-10 rounded-full mr-2" />
              </a>
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
    </div>
  );
};

export default OperatorPage;
